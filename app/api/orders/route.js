import { createServerClient } from '../../../lib/supabase'
import { buildWhatsAppMessage, ADMIN_WA } from '../../../lib/utils'
import { NextResponse } from 'next/server'

export async function POST(req) {
  try {
    const body = await req.json()
    const { items, customer, paymentMethod, receiptUrl, productTotal, deliveryCharge, grandTotal, totalWeight } = body

    if (!items?.length || !customer?.name || !customer?.phone1) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const supabase = createServerClient()

    // Generate order number
    const { data: numData } = await supabase.rpc('generate_order_number')
    const orderNumber = numData || `TC-${Date.now()}`

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

    const { data: order, error } = await supabase
      .from('orders')
      .insert(orderPayload)
      .select()
      .single()

    if (error) {
      console.error('Order insert error:', error)
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
    }

    // Build WhatsApp notification URL for admin
    const waMsg = buildWhatsAppMessage({ ...orderPayload, created_at: new Date().toISOString() })
    const adminWaUrl = `https://wa.me/${ADMIN_WA}?text=${waMsg}`

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.order_number,
      adminWaUrl,
    })
  } catch (err) {
    console.error('Order API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
