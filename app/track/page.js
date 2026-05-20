'use client'
import { useState } from 'react'
import Link from 'next/link'
import Nav from '../../components/layout/Nav'
import Footer from '../../components/layout/Footer'
import { supabase } from '../../lib/supabase'
import { formatLKR } from '../../lib/utils'
import toast from 'react-hot-toast'

// ── LIVE STRING PARSER: CONVERTS JARGON TO PROFESSIONAL UPDATES ──
function formatShortStatus(rawText) {
  if (!rawText) return { title: 'Status Update', desc: '' };
  
  const text = rawText.toLowerCase();

  if (text.includes('add a ccp') || text.includes('add a cre') || text.includes('add a parcel')) {
    return { title: '📦 Parcel Registered', desc: 'Package registered into Fardar logistics network.' };
  }
  if (text.includes('mark as pickup') || text.includes('marked as pickup')) {
    return { title: '🚚 Package Picked Up', desc: 'Collected successfully by the courier agent.' };
  }
  if (text.includes('marked as transfer')) {
    return { title: '🔄 In Transit', desc: 'Dispatched to central transit hub sorting facility.' };
  }
  
  if (text.includes('received to hub')) {
    const hubMatch = rawText.match(/hub\s+([A-Za-z\s]+)\s*\(/i);
    const hubName = hubMatch ? hubMatch[1].trim() : 'Local Hub';
    return { title: '📍 Arrived at Hub', desc: `Package safely received at the ${hubName} Hub.` };
  }
  
  if (text.includes('dispatched to')) {
    return { title: '🛵 Out for Delivery', desc: 'Your package is out with the local rider and on its way to you!' };
  }
  if (text.includes('mark as delivered') || text.includes('delivered')) {
    return { title: '🎉 Delivered Successfully', desc: 'Hardware safely handed over to the customer.' };
  }

  return { title: rawText.split('|')[0].trim(), desc: '' };
}

export default function TrackPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  // ── 🎉 FIXED: PURE TEXT SEARCH ROUTE FOR YOUR SQL SCHEMA ──
  const handleSearch = async (e) => {
    e.preventDefault()
    const query = searchQuery.trim().toUpperCase()
    if (!query) return

    setLoading(true)
    setHasSearched(true)
    setOrder(null)

    try {
      // 1. Search directly as a text string to match your 'text' order_number column format
      const { data: matchedByOrder, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('order_number', query)
        .maybeSingle()

      if (orderError) throw orderError

      let matchedOrder = matchedByOrder

      // 2. Fallback: If no match found by order number, check the tracking_number text column
      if (!matchedOrder) {
        const { data: trackingData, error: trackingError } = await supabase
          .from('orders')
          .select('*')
          .eq('tracking_number', query)
          .maybeSingle()

        if (trackingError) throw trackingError
        matchedOrder = trackingData
      }

      if (matchedOrder) {
        setOrder(matchedOrder)
        toast.success('Tracking data loaded!')
      } else {
        toast.error('No matching records found. Please double-check your number.')
      }
    } catch (err) {
      console.error('Tracking fetch error:', err)
      toast.error('Could not retrieve tracking details.')
    } finally {
      setLoading(false)
    }
  }

  const renderSearchForm = () => (
    <div style={{ background: 'white', borderRadius: 16, border: '1px solid var(--border-light)', padding: '2.5rem 2rem', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📡</div>
      <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.5rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>Track Your Hardware Delivery</h2>
      <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '2rem', maxWidth: '420px', margin: '0 auto 2rem' }}>
        Enter your official Techo Connect order number or your Fardar tracking code below to check live shipping milestones.
      </p>
      
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem', maxWidth: '460px', margin: '0 auto' }}>
        <input 
          type="text" 
          placeholder="e.g. 11044773 or CCP barcode" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 1, padding: '0.75rem 1rem', border: '1px solid var(--border-light)', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', textTransform: 'uppercase' }}
          required
        />
        <button type="submit" disabled={loading} className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', fontSize: '0.9rem' }}>
          {loading ? 'Searching...' : 'Track Order'}
        </button>
      </form>
    </div>
  )

  const renderOrderDetails = () => {
    const historyLogs = Array.isArray(order.courier_history) ? order.courier_history : []

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        {/* TOP META LINE BAR */}
        <div style={{ background: 'white', borderRadius: 12, border: '1px solid var(--border-light)', padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--muted)', marginRight: '0.5rem' }}>Order Reference:</span>
            <strong style={{ color: 'var(--ink)' }}>#{order.order_number}</strong>
            <span style={{ color: 'var(--border-light)', margin: '0 0.5rem' }}>|</span>
            <span style={{ color: 'var(--muted)' }}>Date: {new Date(order.created_at || order.date).toLocaleDateString()}</span>
          </div>
          <div style={{ background: 'rgba(10, 173, 110, 0.08)', color: 'var(--green)', padding: '0.3rem 0.75rem', borderRadius: '20px', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
            {order.status || 'Processing'}
          </div>
        </div>

        {/* TWO COLUMN COMPACT CONSOLIDATED VIEWPORT FRAMEWORK */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          
          {/* TIMELINE PROGRESS HOUSING LEFT CARD MODULE */}
          <div style={{ flex: '1 1 340px', background: 'white', borderRadius: 12, border: '1px solid var(--border-light)', padding: '1.25rem' }}>
            <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--ink)', marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span>Live Shipment Progress</span>
              {order.tracking_number && <small style={{ fontSize: '0.75rem', fontWeight: 400, color: 'var(--muted)' }}>Waybill: {order.tracking_number}</small>}
            </div>

            {order.tracking_number ? (
              historyLogs.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative', paddingLeft: '1.25rem', borderLeft: '2px solid var(--border-light)', margin: '0.25rem 0 0.25rem 0.25rem' }}>
                  {historyLogs.map((checkpoint, idx) => {
                    const isLatest = idx === historyLogs.length - 1
                    const cleanData = formatShortStatus(checkpoint.status);

                    return (
                      <div key={idx} style={{ position: 'relative', fontSize: '0.82rem' }}>
                        <div style={{ 
                          position: 'absolute', 
                          left: '-1.725rem', 
                          top: '4px', 
                          width: isLatest ? '10px' : '8px', 
                          height: isLatest ? '10px' : '8px', 
                          borderRadius: '50%', 
                          background: isLatest ? 'var(--green)' : 'var(--muted)',
                          border: isLatest ? '2px solid rgba(10, 173, 110, 0.25)' : 'none',
                          boxSizing: 'content-box',
                          zIndex: 2
                        }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '0.5rem' }}>
                          <span style={{ fontWeight: isLatest ? 700 : 600, color: isLatest ? 'var(--green)' : 'var(--ink)' }}>
                            {cleanData.title}
                          </span>
                          <span style={{ fontSize: '0.68rem', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
                            {checkpoint.time ? new Date(checkpoint.time).toLocaleDateString([], {month: 'short', day: 'numeric'}) + ' ' + new Date(checkpoint.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : ''}
                          </span>
                        </div>
                        {cleanData.desc && (
                          <p style={{ color: 'var(--muted)', margin: '0.15rem 0 0', fontSize: '0.75rem', lineHeight: 1.35 }}>
                            {cleanData.desc}
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div style={{ padding: '0.75rem 1rem', background: 'var(--bg)', borderRadius: '8px', fontSize: '0.78rem', color: 'var(--slate)', lineHeight: 1.4 }}>
                  🚚 <strong>Manifest Registered:</strong> Your tracking sticker has been successfully linked. Shipment is packed and awaiting loading scans at the local terminal depot.
                </div>
              )
            ) : (
              <div style={{ padding: '0.75rem 1rem', background: 'var(--bg)', borderRadius: '8px', fontSize: '0.78rem', color: 'var(--slate)', lineHeight: 1.4 }}>
                📦 <strong>Order Processing:</strong> Your signal hardware items are being prepared. Live milestones will populate as soon as the carrier vehicle registers the entry manifest barcode scan.
              </div>
            )}
          </div>

          {/* RIGHT SIDE DETAILS COLUMN PANELS */}
          <div style={{ flex: '1 1 240px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* SHIPPING PROFILE COMPONENT */}
            <div style={{ background: 'white', borderRadius: 12, border: '1px solid var(--border-light)', padding: '1rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.4rem', borderBottom: '1px solid var(--bg)', paddingBottom: '0.25rem' }}>
                Delivery Destination
              </div>
              <div style={{ fontSize: '0.8rem', lineHeight: 1.4, color: 'var(--slate)' }}>
                <strong style={{ color: 'var(--ink)' }}>{order.customer_name}</strong>
                <div style={{ marginTop: '0.15rem' }}>{order.customer_address}</div>
                <div style={{ fontWeight: 600 }}>{order.customer_district} District</div>
                <div style={{ marginTop: '0.35rem', fontSize: '0.75rem', color: 'var(--muted)' }}>📞 Contact Number: {order.customer_phone1}</div>
              </div>
            </div>

            {/* ACCOUNTING TRANSACTIONS COMPONENT */}
            <div style={{ background: 'white', borderRadius: 12, border: '1px solid var(--border-light)', padding: '1rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.5rem', borderBottom: '1px solid var(--bg)', paddingBottom: '0.25rem' }}>
                Receipt Breakdown
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--muted)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}><span>Method</span><span style={{ fontWeight: 600, color: 'var(--ink)', textTransform: 'uppercase' }}>{order.payment_method}</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}><span>Shipping</span><span>{formatLKR(order.delivery_charge || 0)}</span></div>
                {order.discount_applied > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#0D9B6A', fontWeight: 600 }}><span>Discount</span><span>-{formatLKR(order.discount_applied)}</span></div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed var(--border-light)', marginTop: '0.35rem', paddingTop: '0.35rem', fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '0.95rem', color: 'var(--ink)' }}>
                  <span>Grand Total</span><span style={{ color: 'var(--green)' }}>{formatLKR(order.grand_total)}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* RESET CONTROL LINK */}
        <button 
          onClick={() => { setHasSearched(false); setOrder(null); setSearchQuery(''); }} 
          className="btn btn-ghost" 
          style={{ width: 'fit-content', margin: '0.5rem auto 0', fontSize: '0.78rem', padding: '0.5rem 1rem' }}
        >
          &larr; Track Another Package
        </button>

      </div>
    )
  }

  return (
    <>
      <Nav />
      <div style={{ paddingTop: '5.5rem', minHeight: '85vh', background: 'var(--bg)' }}>
        <section style={{ padding: '3rem 0 5rem' }}>
          <div className="container-sm" style={{ maxWidth: '640px' }}>
            
            {!hasSearched || loading || !order ? renderSearchForm() : renderOrderDetails()}
            
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}