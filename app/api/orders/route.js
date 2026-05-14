import { createServerClient } from '../../../lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const body = await req.json()
    const { items, customer, paymentMethod, receiptUrl, productTotal, deliveryCharge, grandTotal, totalWeight } = body

    // 1. Basic Validation
    if (!items?.length || !customer?.name || !customer?.phone1) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = createServerClient()

    // 2. Generate order number (RPC call or fallback)
    const { data: numData } = await supabase.rpc('generate_order_number')
    const orderNumber = numData || `TC-${Date.now()}`

    // 3. Prepare Payload (Match your Supabase column names exactly!)
    const orderPayload = {
      order_number: orderNumber,
      customer_name: customer.name,
      customer_address: customer.address,
      customer_district: customer.district,
      customer_phone1: customer.phone1,
      customer_phone2: customer.phone2 || null,
      items,
      total_weight_g: totalWeight,
      product_total: productTotal,
      delivery_charge: deliveryCharge,
      grand_total: grandTotal,
      payment_method: paymentMethod,
      deposit_amount: 500,
      receipt_url: receiptUrl || null,
      status: 'pending',
    }

    // 4. Insert into Database
    const { data: order, error } = await supabase
      .from('orders')
      .insert(orderPayload)
      .select()
      .single()

    if (error) {
      console.error('Database Error:', error.message)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // 5. Return success (Frontend will handle the notification next)
    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.order_number,
    })

  } catch (err) {
    console.error('API Crash:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}