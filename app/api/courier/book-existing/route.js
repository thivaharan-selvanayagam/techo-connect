import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(req) {
  try {
    const { orderNumber, stickerNumber } = await req.json()

    if (!orderNumber || !stickerNumber) {
      return NextResponse.json({ error: 'Missing order number or waybill ID' }, { status: 400 })
    }

    // 1. Fetch order safely by matching your text-based order_number column
    const { data: order, error: fetchError } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('order_number', orderNumber.trim().toUpperCase())
      .maybeSingle()

    if (fetchError || !order) {
      return NextResponse.json({ error: `Order ${orderNumber} could not be found.` }, { status: 404 })
    }

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

    // 2. Dispatch data payload to Fardar Express Gateway
    const fardarFormPayload = new URLSearchParams()
    fardarFormPayload.append('api_key', process.env.FARDAR_API_KEY)
    fardarFormPayload.append('client_id', process.env.FARDAR_CLIENT_ID)
    fardarFormPayload.append('waybill_id', stickerNumber.trim().toUpperCase())
    fardarFormPayload.append('order_id', String(order.order_number))
    fardarFormPayload.append('parcel_weight', '1') 
    fardarFormPayload.append('parcel_description', dynamicDescription)
    fardarFormPayload.append('recipient_name', order.customer_name)
    fardarFormPayload.append('recipient_contact_1', order.customer_phone1)
    fardarFormPayload.append('recipient_contact_2', order.customer_phone2 || '')
    fardarFormPayload.append('recipient_address', order.customer_address)
    fardarFormPayload.append('recipient_city', order.customer_district)
    fardarFormPayload.append('amount', String(order.grand_total))
    fardarFormPayload.append('exchange', '0')

    const fardarResponse = await fetch('https://www.fdedomestic.com/api/parcel/existing_waybill_api_v1.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: fardarFormPayload.toString()
    })

    const result = await fardarResponse.json()
    const responseStatus = String(result.status)

    // Fardar returns "200" string on successful manifest creation
    if (responseStatus === '200') {
      
      // ── 🌟 UPDATED: SATISFIES YOUR DATABASE CONSTRAINTS PERFECTLY ──
      const { data: updatedRows, error: updateError } = await supabaseAdmin
        .from('orders')
        .update({
          tracking_number: stickerNumber.trim().toUpperCase(),
          courier_status: 'Dispatched via Fardar Express Barcode System',
          status: 'shipped' // Matches your explicit 'shipped' constraint value
        })
        .eq('order_number', order.order_number)
        .select() // Ensures tracking writes verify immediately

      if (updateError) throw updateError

      if (!updatedRows || updatedRows.length === 0) {
        return NextResponse.json({ error: 'Database record failed to lock and update.' }, { status: 500 })
      }

      return NextResponse.json({ success: true, waybill: stickerNumber })
    } 
    else {
      let friendlyMessage = `Fardar API Error (${responseStatus})`
      if (responseStatus === '201') friendlyMessage = "Incorrect sticker type! Fardar API only accepts CRE or CCP barcodes."
      if (responseStatus === '202') friendlyMessage = "This waybill sticker has already been used on another parcel."
      if (responseStatus === '203') friendlyMessage = "This barcode number hasn't been assigned to your client account yet."
      if (responseStatus === '213') friendlyMessage = "Fardar rejected the District name. Ensure it matches their accepted hubs."

      return NextResponse.json({ error: friendlyMessage }, { status: 422 })
    }

  } catch (err) {
    console.error('Outbound courier handler error:', err)
    return NextResponse.json({ error: 'Internal server pipeline error' }, { status: 500 })
  }
}