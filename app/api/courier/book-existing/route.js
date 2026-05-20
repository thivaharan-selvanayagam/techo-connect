import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(req) {
  try {
    // Parse incoming data parameters as form data format
    const formData = await req.formData()
    
    const waybill_id = formData.get('waybill_id')
    const last_update_time = formData.get('last_update_time')
    
    // ── 🌟 FIXED: SAFE RESOLUTION FOR FARDAR DOCUMENTATION TYPOS ──
    const delivery_status = formData.get('delivery_status') || formData.get('current_status')

    if (!waybill_id) {
      return NextResponse.json({ error: 'Missing Tracking ID parameter' }, { status: 400 })
    }

    // 1. Fetch current history data array logs from Supabase
    const { data: order, error: fetchError } = await supabaseAdmin
      .from('orders')
      .select('courier_history')
      .eq('tracking_number', waybill_id.trim().toUpperCase())
      .maybeSingle()

    if (fetchError || !order) {
      return NextResponse.json({ error: 'Waybill reference mismatch mapping target not found' }, { status: 404 })
    }

    // 2. Build and sanitize new event log payload metrics
    const incomingLog = { 
      status: delivery_status || 'Package Movement Logged', 
      time: last_update_time || new Date().toISOString() 
    }

    const updatedHistory = [
      ...(Array.isArray(order.courier_history) ? order.courier_history : []),
      incomingLog
    ]

    // 3. Commit state arrays back into the database row columns
    const { error: updateError } = await supabaseAdmin
      .from('orders')
      .update({
        courier_status: delivery_status || 'In Transit',
        courier_history: updatedHistory
      })
      .eq('tracking_number', waybill_id.trim().toUpperCase())

    if (updateError) throw updateError

    // 4. Return successful verification response with Fardar origin whitelist headers
    return new NextResponse(JSON.stringify({ success: true, message: 'Sync Complete' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://www.fdedomestic.com',
      }
    })

  } catch (err) {
    console.error('Fardar Webhook System Error Exception:', err)
    return NextResponse.json({ error: 'Internal processing runtime crash' }, { status: 500 })
  }
}