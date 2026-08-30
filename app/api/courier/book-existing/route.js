import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(req) {
  try {
    const body = await req.json()

    // ── 🌟 UNIVERSAL PAYLOAD KEY EXTRACTION ──
    const orderNumber = body.orderNumber || body.order_number || body.orderId;
    const stickerNumber = body.stickerNumber || body.sticker_number || body.waybill_id;
    const passedCodAmount = body.codAmount ?? body.cod_amount;
    const passedAdvancePaid = body.advancePaid ?? body.advance_paid;

    if (!orderNumber || !stickerNumber) {
      return NextResponse.json({ 
        error: `Missing parameters. Received orderNumber: ${orderNumber}, stickerNumber: ${stickerNumber}` 
      }, { status: 400 })
    }

    // 1. Fetch order safely by matching your text-based order_number column
    const { data: order, error: fetchError } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('order_number', String(orderNumber).trim().toUpperCase())
      .maybeSingle()

    if (fetchError || !order) {
      return NextResponse.json({ error: `Order ${orderNumber} could not be found.` }, { status: 404 })
    }

    // ── 🌟 NET COD AMOUNT CALCULATION (ROUNDS TO WHOLE INTEGER FOR FARDAR API) ──
    const grossTotal = parseFloat(order.grand_total || order.total_amount) || 0
    
    let advancePaid = 500
    if (passedAdvancePaid !== undefined && passedAdvancePaid !== null) {
      advancePaid = parseFloat(passedAdvancePaid)
    } else if (order.advance_paid !== undefined && order.advance_paid !== null) {
      advancePaid = parseFloat(order.advance_paid)
    } else if (order.payment_status === 'paid' || order.is_fully_paid) {
      advancePaid = grossTotal
    }

    // Calculate net collectible balance
    const rawNetCod = passedCodAmount !== undefined && passedCodAmount !== null
      ? parseFloat(passedCodAmount)
      : Math.max(0, grossTotal - advancePaid)

    // Fardar requires whole integers without decimals
    const finalCodAmount = Math.round(rawNetCod)

    // Generate dynamic item descriptions from your jsonb items array
    let dynamicDescription = 'Techo Connect Signal Hardware'
    if (order.items && Array.isArray(order.items)) {
      dynamicDescription = order.items
        .map(item => {
          const variant = item.variant || item.variantName
          const variantString = variant ? ` (${variant})` : ''
          return `${item.name}${variantString} x${item.qty}`
        })
        .join(', ')
    }

    if (dynamicDescription.length > 180) {
      dynamicDescription = dynamicDescription.substring(0, 177) + '...'
    }

    // Clean phone number format
    const cleanContact1 = String(order.customer_phone1 || '').replace(/\D/g, '')
    const cleanContact2 = String(order.customer_phone2 || '').replace(/\D/g, '')

    // 2. Dispatch data payload to Fardar Express Gateway
    const fardarFormPayload = new URLSearchParams()
    fardarFormPayload.append('api_key', process.env.FARDAR_API_KEY)
    fardarFormPayload.append('client_id', process.env.FARDAR_CLIENT_ID)
    fardarFormPayload.append('waybill_id', String(stickerNumber).trim().toUpperCase())
    fardarFormPayload.append('order_id', String(order.order_number))
    fardarFormPayload.append('parcel_weight', '1') 
    fardarFormPayload.append('parcel_description', dynamicDescription)
    fardarFormPayload.append('recipient_name', order.customer_name)
    fardarFormPayload.append('recipient_contact_1', cleanContact1)
    fardarFormPayload.append('recipient_contact_2', cleanContact2)
    fardarFormPayload.append('recipient_address', order.customer_address)
    fardarFormPayload.append('recipient_city', order.customer_district)
    
    // 🌟 Send calculated NET COLLECTIBLE COD integer to Fardar API (e.g., "5800" instead of "6300")
    fardarFormPayload.append('amount', String(finalCodAmount))
    fardarFormPayload.append('exchange', '0')

    const fardarResponse = await fetch('https://www.fdedomestic.com/api/parcel/existing_waybill_api_v1.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: fardarFormPayload.toString()
    })

    const result = await fardarResponse.json()
    const responseStatus = String(result.status)

    if (responseStatus === '200') {
      
      const initialHistoryLog = [
        {
          status: `Add a CCP Parcel By Warehouse System | Client - Techo Connect`,
          time: new Date().toISOString(),
          description: `Package registered. Net COD Amount: LKR ${finalCodAmount} (Gross: LKR ${grossTotal}, Advance: LKR ${advancePaid}).`
        }
      ]

      const { data: updatedRows, error: updateError } = await supabaseAdmin
        .from('orders')
        .update({
          tracking_number: String(stickerNumber).trim().toUpperCase(),
          courier_status: 'Parcel Registered',
          courier_history: initialHistoryLog,
          status: 'shipped',
          cod_amount: finalCodAmount,
          advance_paid: advancePaid
        })
        .eq('order_number', order.order_number)
        .select() 

      if (updateError) throw updateError

      if (!updatedRows || updatedRows.length === 0) {
        return NextResponse.json({ error: 'Database record failed to lock and update.' }, { status: 500 })
      }

      return NextResponse.json({ success: true, waybill: stickerNumber, codAmount: finalCodAmount })
    } 
    else {
      let friendlyMessage = `Fardar API Error (${responseStatus})`
      if (responseStatus === '201') friendlyMessage = "Incorrect sticker type! Fardar API only accepts CRE or CCP barcodes."
      if (responseStatus === '202') friendlyMessage = "This waybill sticker has already been used on another parcel."
      if (responseStatus === '203') friendlyMessage = "This barcode number hasn't been assigned to your client account yet."
      if (responseStatus === '210') friendlyMessage = "Fardar API rejected the amount or parcel payload formatting."
      if (responseStatus === '213') friendlyMessage = "Fardar rejected the District name."

      return NextResponse.json({ error: friendlyMessage }, { status: 422 })
    }

  } catch (err) {
    console.error('Outbound courier handler error:', err)
    return NextResponse.json({ error: 'Internal server pipeline error' }, { status: 500 })
  }
}