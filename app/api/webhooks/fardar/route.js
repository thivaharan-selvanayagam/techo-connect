import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// ── 🌟 NEW: DIAGNOSTIC TEST ROUTE FOR YOUR BROWSER ──
// This lets you open the link in Chrome/Safari to confirm the file exists live.
export async function GET() {
  return NextResponse.json({ 
    status: "Online & Active", 
    message: "Techo Connect Webhook endpoint is correctly mapped in Next.js! Waiting for Fardar POST payloads.",
    timestamp: new Date().toISOString()
  }, { status: 200 })
}

// ── EXISTING FARDAR WEBHOOK LOGIC ──
export async function POST(req) {
  try {
    const formData = await req.formData()
    const waybill_id = formData.get('waybill_id')
    const last_update_time = formData.get('last_update_time')
    const delivery_status = formData.get('delivery_status') || formData.get('current_status')

    if (!waybill_id) {
      return NextResponse.json({ error: 'Missing Tracking ID parameter' }, { status: 400 })
    }

    const { data: order, error: fetchError } = await supabaseAdmin
      .from('orders')
      .select('courier_history')
      .eq('tracking_number', waybill_id.trim().toUpperCase())
      .maybeSingle()

    if (fetchError || !order) {
      return NextResponse.json({ error: 'Waybill reference mismatch' }, { status: 404 })
    }

    const incomingLog = { 
      status: delivery_status || 'Package Movement Logged', 
      time: last_update_time || new Date().toISOString() 
    }

    const updatedHistory = [
      ...(Array.isArray(order.courier_history) ? order.courier_history : []),
      incomingLog
    ]

    const { error: updateError } = await supabaseAdmin
      .from('orders')
      .update({
        courier_status: delivery_status || 'In Transit',
        courier_history: updatedHistory
      })
      .eq('tracking_number', waybill_id.trim().toUpperCase())

    if (updateError) throw updateError

    return new NextResponse(JSON.stringify({ success: true, message: 'Sync Complete' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://www.fdedomestic.com',
      }
    })

  } catch (err) {
    console.error('Fardar Webhook System Error:', err)
    return NextResponse.json({ error: 'Internal processing runtime crash' }, { status: 500 })
  }
}