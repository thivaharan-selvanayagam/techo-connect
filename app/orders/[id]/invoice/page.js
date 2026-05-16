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

  // 🛠️ DYNAMIC WARRANTY CHECK
  // Checks if either "Yagi Pro" or "Yagi Elite" exists in the order items
  const hasYagiWarranty = order.items.some(item => 
    item.name?.toLowerCase().includes('yagi pro') || 
    item.name?.toLowerCase().includes('yagi elite')
  )

  const purchaseDate = new Date(order.created_at).toLocaleDateString()

  return (
    <div className="invoice-page-bg">
      {/* TOOLBAR */}
      <div className="invoice-toolbar no-print">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/checkout/confirm" className="btn-back">← Back to Confirmation</Link>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={() => window.print()} className="btn btn-ghost btn-sm">💾 Save PDF / Print</button>
            <button onClick={handleShare} className="btn btn-wa btn-sm">🔗 Share to WhatsApp</button>
          </div>
        </div>
      </div>

      {/* THE PAPER (Proportioned to match standard A5 Dimensions on screen) */}
      <div className="invoice-container">
        <div className="invoice-paper card">
          
          <div className="invoice-header">
            <div>
              <div className="nav__logo" style={{ marginBottom: '0.4rem' }}>
                <div className="nav__logo-icon" style={{ width: '28px', height: '28px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                </div>
                <div>
                  <div className="nav__logo-name" style={{ fontSize: '0.95rem' }}>TECHO<span style={{color:'var(--green)'}}>CONNECT</span></div>
                </div>
              </div>
              <p className="company-info">
                Kallady, Batticaloa, Sri Lanka<br />
                <strong>+94 70 665 6007</strong>
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="label" style={{ marginBottom: '0.2rem', fontSize: '0.6rem' }}>Official Invoice</div>
              <h1 className="invoice-no">#{order.order_number}</h1>
              <div className={`badge ${isCOD ? 'badge-orange' : 'badge-green'}`} style={{ marginTop: '0.3rem', fontSize: '0.65rem' }}>
                {isCOD ? 'Deposit Confirmed' : 'Fully Paid'}
              </div>
            </div>
          </div>

          <div className="invoice-grid">
            <div className="info-col">
              <span className="small-label">Billed To</span>
              <p><strong>{order.customer_name}</strong></p>
              <p>{order.customer_address}, {order.customer_district}</p>
              <p>{order.customer_phone1}</p>
            </div>
            <div className="info-col" style={{ textAlign: 'right' }}>
              <span className="small-label">Order Details</span>
              <p>Method: <strong>{isCOD ? 'COD' : 'Bank Deposit'}</strong></p>
              <p>Date: {purchaseDate}</p>
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
                    {item.variant && <div style={{ fontSize: '0.7rem', color: 'var(--green)' }}>{item.variant}</div>}
                  </td>
                  <td style={{ textAlign: 'center' }}>{item.qty}</td>
                  <td style={{ textAlign: 'right' }}>{formatLKR(item.price * item.qty)}</td>
                </tr>
              ))}
              <tr>
                <td>Delivery Charge</td>
                <td style={{ textAlign: 'center' }}>1</td>
                <td style={{ textAlign: 'right' }}>{formatLKR(order.delivery_charge)}</td>
              </tr>
            </tbody>
          </table>

          {/* DYNAMIC INVOICE SUMMARY */}
          <div className="invoice-summary-block">
            
            {/* Conditional Warranty Info Box - ONLY SHOWS FOR YAGI PRO & ELITE */}
            {hasYagiWarranty ? (
              <div className="warranty-box">
                <strong>🛡️ Product Warranty Details</strong>
                <div>Checking Warranty: <span style={{fontWeight: 600}}>5 Days</span></div>
                <div>Service Warranty: <span style={{fontWeight: 600}}>12 Months</span></div>
                <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: '0.15rem' }}>Effective from purchasing date: {purchaseDate}</div>
              </div>
            ) : (
              <div style={{ flex: 1 }} /> /* Empty spacer if no warranty items match */
            )}

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
                </>
              ) : (
                <>
                  <div className="summary-row grand-total" style={{ borderTop: 'none', paddingTop: 0 }}>
                    <span>Total Paid</span>
                    <span>{formatLKR(order.grand_total)}</span>
                  </div>
                  <p className="summary-note" style={{ color: 'var(--green)', fontStyle: 'normal', fontWeight: 600 }}>
                    ✓ Paid via Bank Transfer
                  </p>
                </>
              )}
            </div>
          </div>

          {/* REQUIRED bottom TERMS & LAWS CLAUSE WARNINGS */}
          <div className="invoice-legal-notes">
            <p className="main-warning">
              ⚠️ <strong>Note:</strong> This invoice must be submitted to claim any warranty inquiries.
            </p>
            <div className="legal-links no-print">
              <Link href="/terms">📄 View Terms & Conditions</Link>
              <Link href="/returns">🔄 Warranty Claims & Returns</Link>
            </div>
            {/* Printable alternate visible fallbacks for physical sheets */}
            <p className="legal-links-print print-only">
              Terms & Conditions: connect.techoconnect.lk/terms &bull; Returns: connect.techoconnect.lk/returns
            </p>
          </div>

          <div className="invoice-footer">
            Thank you for choosing Techo Connect — Strongest signals in Sri Lanka.
          </div>
        </div>
      </div>

      <style jsx>{`
        .invoice-page-bg { background: var(--bg); min-height: 100vh; padding: 60px 0; }
        .invoice-toolbar { position: fixed; top: 0; left: 0; right: 0; background: rgba(255,255,255,0.8); backdrop-filter: blur(10px); padding: 0.6rem 0; border-bottom: 1px solid var(--border-light); z-index: 100; }
        .btn-back { font-size: 0.8rem; font-weight: 600; color: var(--muted); }
        
        /* scaled carefully down to mimic an A5 footprint container on viewports */
        .invoice-container { max-width: 148mm; margin: 40px auto 0; padding: 0 10px; }
        .invoice-paper { background: var(--white); padding: 25mm 20mm; border: 1px solid var(--border); box-shadow: var(--shadow-md); font-size: 0.82rem; }
        
        .invoice-header { display: flex; justify-content: space-between; border-bottom: 2px solid var(--surface); padding-bottom: 1rem; margin-bottom: 1.5rem; }
        .company-info { font-size: 0.75rem; color: var(--muted); line-height: 1.5; }
        .invoice-no { font-family: var(--font-head); font-weight: 800; font-size: 1rem; color: var(--ink); margin: 0; }
        
        .invoice-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem; }
        .small-label { display: block; font-size: 0.6rem; font-weight: 700; text-transform: uppercase; color: var(--light-text); margin-bottom: 0.25rem; }
        .info-col p { font-size: 0.8rem; color: var(--slate); margin-bottom: 0.15rem; }
        
        .invoice-table { width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; }
        .invoice-table th { background: var(--surface); padding: 0.6rem; text-align: left; font-size: 0.65rem; text-transform: uppercase; color: var(--muted); }
        .invoice-table td { padding: 0.75rem 0.6rem; border-bottom: 1px solid var(--surface); font-size: 0.8rem; }
        
        .invoice-summary-block { display: flex; justify-content: space-between; gap: 1.5rem; align-items: flex-start; margin-bottom: 2rem; }
        .warranty-box { flex: 1; background: var(--bg); border: 1px solid var(--border); padding: 0.75rem; border-radius: 8px; font-size: 0.75rem; line-height: 1.5; color: var(--slate); }
        .warranty-box strong { display: block; color: var(--ink); margin-bottom: 0.25rem; }
        
        .invoice-summary { width: 200px; }
        .summary-row { display: flex; justify-content: space-between; padding: 0.4rem 0; font-size: 0.8rem; color: var(--slate); }
        .grand-total { border-top: 2px solid var(--green); margin-top: 0.3rem; padding-top: 0.6rem; font-family: var(--font-head); font-weight: 800; font-size: 1.15rem; color: var(--green); }
        .summary-note { font-size: 0.7rem; color: var(--muted); text-align: right; margin-top: 0.25rem; }
        
        .invoice-legal-notes { background: #FAFDFB; border: 1px dashed var(--border); padding: 0.9rem; border-radius: 8px; margin-top: 2rem; text-align: left; }
        .main-warning { font-size: 0.8rem; color: var(--ink); margin-bottom: 0.5rem; }
        .legal-links { display: flex; gap: 1rem; font-size: 0.75rem; font-weight: 600; color: var(--green); }
        .legal-links :hover { text-decoration: underline; }
        .legal-links-print { display: none; font-size: 0.7rem; color: var(--muted); }
        
        .invoice-footer { border-top: 1px solid var(--surface); margin-top: 2.5rem; padding-top: 1rem; text-align: center; font-size: 0.7rem; color: var(--light-text); letter-spacing: 0.02em; }
        .loader { height: 100vh; display: flex; align-items: center; justify-content: center; font-family: var(--font-head); font-weight: 600; color: var(--green); }
        
        .print-only { display: none !important; }

        /* 🖨️ A5 PRINT SPECIFIC RULES */
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          
          @page { 
            size: A5 portrait; 
            margin: 6mm 8mm; 
          }
          
          body { background: white; color: black; }
          .invoice-page-bg { padding: 0; background: white; min-height: auto; }
          .invoice-container { max-width: 100%; width: 100%; padding: 0; margin: 0; }
          .invoice-paper { box-shadow: none; border: none; padding: 0; width: 100%; }
          .invoice-legal-notes { background: none; }
          .legal-links-print { display: block !important; }
        }
      `}</style>
    </div>
  )
}