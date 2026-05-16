'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '../../../../lib/supabase' 
import { formatLKR } from '../../../../lib/utils'
import Link from 'next/link'

export default function InvoicePage() {
  const params = useParams()
  const orderId = params.id

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    async function fetchOrder() {
      if (!orderId) return
      try {
        let { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('order_number', orderId)
          .single()
        
        if (!data && !orderId.startsWith('TC-')) {
          const { data: fallbackData } = await supabase
            .from('orders')
            .select('*')
            .eq('id', orderId)
            .single()
          data = fallbackData
        }

        if (data) setOrder(data)
        else setErrorMsg("Order not found in our records.")
      } catch (err) {
        setErrorMsg("Failed to connect to database.")
      } finally {
        setLoading(false)
      }
    }
    fetchOrder()
  }, [orderId])

  const handleShare = async () => {
    const shareData = {
      title: `Techo Connect Invoice ${order?.order_number}`,
      text: `Hi! Here is my invoice for order ${order?.order_number}.`,
      url: window.location.href,
    }
    if (navigator.share) await navigator.share(shareData)
    else window.open(`https://wa.me/?text=${encodeURIComponent(shareData.text + " " + shareData.url)}`, '_blank')
  }

  if (loading) return <div className="loader">Generating Professional Invoice...</div>
  
  if (!order) return (
    <div className="container-sm" style={{ padding: '100px 0', textAlign: 'center' }}>
      <h2 className="section-title">Order <em>Not Found</em></h2>
      <p style={{ color: 'var(--muted)', margin: '1rem 0 2rem' }}>Ref: {orderId}</p>
      <Link href="/products" className="btn btn-primary">Return to Shop</Link>
    </div>
  )

  const isCOD = order.payment_method === 'cod'

  return (
    <div className="invoice-page-bg">
      {/* TOOLBAR */}
      <div className="invoice-toolbar no-print">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/checkout/confirm" className="btn-back">← Back to Confirmation</Link>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={() => window.print()} className="btn btn-ghost btn-sm">💾 Save PDF</button>
            <button onClick={handleShare} className="btn btn-wa btn-sm">🔗 Share to WhatsApp</button>
          </div>
        </div>
      </div>

      {/* THE PAPER */}
      <div className="invoice-container container-sm">
        <div className="invoice-paper card">
          
          <div className="invoice-header">
            <div>
              <div className="nav__logo" style={{ marginBottom: '1rem' }}>
                <div className="nav__logo-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                </div>
                <div>
                  <div className="nav__logo-name">TECHO<span style={{color:'var(--green)'}}>CONNECT</span></div>
                  <div className="nav__logo-sub">HARDWARE SOLUTIONS</div>
                </div>
              </div>
              <p className="company-info">
                Kallady, Batticaloa, Sri Lanka<br />
                connect@techotraders.com.lk<br />
                <strong>+94 70 665 6007</strong>
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="label" style={{ marginBottom: '0.5rem' }}>Official Invoice</div>
              <h1 className="invoice-no">#{order.order_number}</h1>
              {/* Dynamic status badge depending on the payment type */}
              <div className={`badge ${isCOD ? 'badge-orange' : 'badge-green'}`} style={{ marginTop: '0.5rem' }}>
                {isCOD ? 'Deposit Confirmed' : 'Fully Paid'}
              </div>
            </div>
          </div>

          <div className="invoice-grid">
            <div className="info-col">
              <span className="small-label">Customer Details</span>
              <p><strong>{order.customer_name}</strong></p>
              <p>{order.customer_address}</p>
              <p>{order.customer_district}, SL</p>
              <p>{order.customer_phone1}</p>
            </div>
            <div className="info-col" style={{ textAlign: 'right' }}>
              <span className="small-label">Payment Detail</span>
              <p>Method: <strong>{isCOD ? 'Cash on Delivery (COD)' : 'Bank Deposit'}</strong></p>
              <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
            </div>
          </div>

          <table className="invoice-table">
            <thead>
              <tr>
                <th>Item Description</th>
                <th style={{ textAlign: 'center' }}>Qty</th>
                <th style={{ textAlign: 'right' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, i) => (
                <tr key={i}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--ink)' }}>{item.name}</div>
                    {item.variant && <div style={{ fontSize: '0.75rem', color: 'var(--green)' }}>{item.variant}</div>}
                  </td>
                  <td style={{ textAlign: 'center' }}>{item.qty}</td>
                  <td style={{ textAlign: 'right' }}>{formatLKR(item.price * item.qty)}</td>
                </tr>
              ))}
              <tr>
                <td>Delivery Charge ({order.customer_district})</td>
                <td style={{ textAlign: 'center' }}>1</td>
                <td style={{ textAlign: 'right' }}>{formatLKR(order.delivery_charge)}</td>
              </tr>
            </tbody>
          </table>

          {/* DYNAMIC INVOICE BREAKDOWN WORKSPACE */}
          <div className="invoice-summary">
            {isCOD ? (
              <>
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{formatLKR(order.product_total + order.delivery_charge)}</span>
                </div>
                <div className="summary-row" style={{ color: '#B91C1C' }}>
                  <span>Deposit Paid</span>
                  <span>-{formatLKR(order.deposit_amount || 500)}</span>
                </div>
                <div className="summary-row grand-total">
                  <span>Balance Due</span>
                  <span>{formatLKR(order.grand_total - (order.deposit_amount || 500))}</span>
                </div>
                <p className="summary-note">* Please pay the remaining balance in cash to the courier driver.</p>
              </>
            ) : (
              <>
                <div className="summary-row grand-total" style={{ borderTop: 'none', paddingTop: 0 }}>
                  <span>Total Paid</span>
                  <span>{formatLKR(order.grand_total)}</span>
                </div>
                <p className="summary-note" style={{ color: 'var(--green)', fontStyle: 'normal', fontWeight: 600, textAlign: 'right', marginTop: '0.5rem' }}>
                  ✓ Fully Paid Upfront via Bank Transfer
                </p>
              </>
            )}
          </div>

          <div className="invoice-footer">
            <p>Thank you for choosing Techo Connect. Your signal strength is our priority.</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .invoice-page-bg { background: var(--bg); min-height: 100vh; padding: 80px 0; }
        .invoice-toolbar { position: fixed; top: 0; left: 0; right: 0; background: rgba(255,255,255,0.8); backdrop-filter: blur(10px); padding: 0.8rem 0; border-bottom: 1px solid var(--border-light); z-index: 100; }
        .btn-back { font-size: 0.85rem; font-weight: 600; color: var(--muted); transition: color 0.2s; }
        .btn-back:hover { color: var(--green); }
        .invoice-paper { background: var(--white); padding: 3rem; border: 1px solid var(--border); box-shadow: var(--shadow-lg); }
        .invoice-header { display: flex; justify-content: space-between; border-bottom: 2px solid var(--surface); padding-bottom: 2rem; margin-bottom: 2.5rem; }
        .company-info { font-size: 0.85rem; color: var(--muted); line-height: 1.6; }
        .invoice-no { font-family: var(--font-head); font-weight: 800; font-size: 1.8rem; color: var(--ink); margin: 0; }
        .invoice-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 3rem; }
        .small-label { display: block; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--light-text); margin-bottom: 0.5rem; }
        .info-col p { font-size: 0.9rem; color: var(--slate); margin-bottom: 0.2rem; }
        .invoice-table { width: 100%; border-collapse: collapse; margin-bottom: 3rem; }
        .invoice-table th { background: var(--surface); padding: 1rem; text-align: left; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--muted); }
        .invoice-table td { padding: 1.25rem 1rem; border-bottom: 1px solid var(--surface); font-size: 0.95rem; }
        .invoice-summary { width: 280px; margin-left: auto; }
        .summary-row { display: flex; justify-content: space-between; padding: 0.6rem 0; font-size: 0.95rem; color: var(--slate); }
        .grand-total { border-top: 2px solid var(--green); margin-top: 0.5rem; padding-top: 1rem; font-family: var(--font-head); font-weight: 800; font-size: 1.4rem; color: var(--green); }
        .summary-note { font-size: 0.75rem; color: var(--muted); text-align: right; margin-top: 0.5rem; font-style: italic; }
        .invoice-footer { border-top: 1px solid var(--surface); margin-top: 4rem; padding-top: 1.5rem; text-align: center; font-size: 0.8rem; color: var(--light-text); }
        .loader { height: 100vh; display: flex; align-items: center; justify-content: center; font-family: var(--font-head); font-weight: 600; color: var(--green); }
        @media print {
          .no-print { display: none !important; }
          .invoice-page-bg { padding: 0; background: white; }
          .invoice-paper { box-shadow: none; border: none; padding: 0; }
          .invoice-container { max-width: 100%; width: 100%; padding: 0; }
        }
      `}</style>
    </div>
  )
}