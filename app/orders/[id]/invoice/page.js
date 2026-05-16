'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '../../../../lib/supabase' 
import { formatLKR } from '../../../../lib/utils'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function InvoicePage() {
  const params = useParams()
  const orderId = params.id

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState(null)
  const [downloading, setDownloading] = useState(false)

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

  // EXPLICIT SINGLE PAGE A4 FORCE MATRIX
  const handleDownloadPDF = async () => {
    if (!order) return
    setDownloading(true)
    const loadToast = toast.loading('Compacting and downloading your single-page A4 PDF...')

    try {
      const element = document.getElementById('invoice-capture-area')
      const html2pdf = (await import('html2pdf.js')).default

      const options = {
        margin:       [8, 12, 8, 12], // Trimmed printing margins to maximize vertical sheet real estate
        filename:     `TechoConnect_Invoice_${order.order_number}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, logging: false },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }

      await html2pdf().set(options).from(element).save()
      toast.success('Invoice saved successfully on a single page!', { id: loadToast })
    } catch (err) {
      console.error('PDF Generation Failure:', err)
      toast.error('Direct download failed. Please use the Print Sheet option.', { id: loadToast })
    } finally {
      setDownloading(false)
    }
  }

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
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button onClick={handleDownloadPDF} disabled={downloading} className="btn btn-primary btn-sm">
              {downloading ? '⏳ Saving...' : '⬇️ Download PDF'}
            </button>
            <button onClick={() => window.print()} className="btn btn-ghost btn-sm">💾 Print Sheet</button>
            <button onClick={handleShare} className="btn btn-wa btn-sm">🔗 Share</button>
          </div>
        </div>
      </div>

      {/* THE PAPER FOOTPRINT */}
      <div className="invoice-container" id="invoice-capture-area">
        <div className="invoice-paper card">
          
          {/* HEADER LAYER WITH REPAIRED OVERLAP CONTROLS */}
          <div className="invoice-header">
            <div className="header-left">
              <div className="nav__logo" style={{ marginBottom: '0.5rem' }}>
                <div className="nav__logo-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                </div>
                <div>
                  <div className="nav__logo-name">TECHO<span style={{color:'var(--green)'}}>CONNECT</span></div>
                  <div className="nav__logo-sub">HARDWARE SOLUTIONS</div>
                </div>
              </div>
              <p className="company-info">
                Professional Signal Hardware Solutions<br />
                Kallady, Batticaloa, Sri Lanka<br />
                <strong>+94 70 665 6007</strong>
              </p>
            </div>
            <div className="header-right">
              <div className="label" style={{ marginBottom: '0.25rem' }}>Official Invoice</div>
              <h1 className="invoice-no">#{order.order_number}</h1>
              <div className={`badge ${isCOD ? 'badge-orange' : 'badge-green'}`} style={{ marginTop: '0.4rem' }}>
                {isCOD ? 'Deposit Confirmed' : 'Fully Paid'}
              </div>
            </div>
          </div>

          <div className="invoice-grid">
            <div className="info-col">
              <span className="small-label">Billed To</span>
              <p style={{ fontSize: '1.05rem', margin: '0.1rem 0' }}><strong>{order.customer_name}</strong></p>
              <p>{order.customer_address}</p>
              <p>{order.customer_district}, Sri Lanka</p>
              <p>{order.customer_phone1}</p>
            </div>
            <div className="info-col" style={{ textAlign: 'right' }}>
              <span className="small-label">Order Reference</span>
              <p>Payment Method: <strong>{isCOD ? 'Cash on Delivery (COD)' : 'Bank Deposit'}</strong></p>
              <p>Purchasing Date: {purchaseDate}</p>
            </div>
          </div>

          <table className="invoice-table">
            <thead>
              <tr>
                <th>Item Description</th>
                <th style={{ textAlign: 'center', width: '80px' }}>Qty</th>
                <th style={{ textAlign: 'right', width: '150px' }}>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, i) => (
                <tr key={i}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--ink)', fontSize: '0.95rem' }}>{item.name}</div>
                    {item.variant && <div style={{ fontSize: '0.8rem', color: 'var(--green)', marginTop: '0.1rem' }}>{item.variant}</div>}
                  </td>
                  <td style={{ textAlign: 'center' }}>{item.qty}</td>
                  <td style={{ textAlign: 'right', fontWeight: 600 }}>{formatLKR(item.price * item.qty)}</td>
                </tr>
              ))}
              <tr>
                <td style={{ color: 'var(--muted)' }}>Standard Island-wide Courier Shipping ({order.customer_district})</td>
                <td style={{ textAlign: 'center' }}>1</td>
                <td style={{ textAlign: 'right' }}>{formatLKR(order.delivery_charge)}</td>
              </tr>
            </tbody>
          </table>

          <div className="invoice-summary-block">
            {hasYagiWarranty ? (
              <div className="warranty-box">
                <strong>🛡️ Hardware Warranty Statement</strong>
                <div className="warranty-row-item">Checking Guarantee: <span>5 Days Only</span></div>
                <div className="warranty-row-item">Technical Support/Service: <span>12 Months</span></div>
                <p className="warranty-date-clause">Coverage activates natively from the official purchasing date: {purchaseDate}</p>
              </div>
            ) : (
              <div style={{ flex: 1 }} />
            )}

            <div className="invoice-summary">
              {isCOD ? (
                <>
                  <div className="summary-row">
                    <span>Subtotal Invoice</span>
                    <span>{formatLKR(order.product_total + order.delivery_charge)}</span>
                  </div>
                  <div className="summary-row" style={{ color: '#B91C1C' }}>
                    <span>Confirmation Deposit</span>
                    <span>-{formatLKR(order.deposit_amount || 500)}</span>
                  </div>
                  <div className="summary-row grand-total">
                    <span>Balance Due</span>
                    <span>{formatLKR(order.grand_total - (order.deposit_amount || 500))}</span>
                  </div>
                  <p className="summary-note">* Remaining balance is payable in cash directly to the courier agent upon arrival.</p>
                </>
              ) : (
                <>
                  <div className="summary-row grand-total" style={{ borderTop: 'none', paddingTop: 0 }}>
                    <span>Total Amount Paid</span>
                    <span>{formatLKR(order.grand_total)}</span>
                  </div>
                  <p className="summary-note" style={{ color: 'var(--green)', fontStyle: 'normal', fontWeight: 600, fontSize: '0.8rem' }}>
                    ✓ Transaction settled via Upfront Bank Transfer
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="invoice-legal-notes">
            <p className="main-warning">
              ⚠️ <strong>Important Note:</strong> This invoice must be submitted to claim any warranty inquiries or support metrics.
            </p>
            <div className="legal-links no-print">
              <Link href="/terms">📄 Service Terms & Conditions</Link>
              <span style={{ color: 'var(--border-light)' }}>|</span>
              <Link href="/returns">🔄 Warranty Claims & Returns</Link>
            </div>
            <p className="legal-links-print print-only">
              Terms & Conditions: techoconnect.lk/terms &bull; Warranty Claims & Returns: techoconnect.lk/returns
            </p>
          </div>

          <div className="invoice-footer">
            Thank you for choosing Techo Connect — Delivering the strongest signals across Sri Lanka.
          </div>
        </div>
      </div>

      <style jsx>{`
        .invoice-page-bg { background: var(--bg); min-height: 100vh; padding: 60px 0 40px; }
        .invoice-toolbar { position: fixed; top: 0; left: 0; right: 0; background: rgba(255,255,255,0.85); backdrop-filter: blur(12px); padding: 1rem 0; border-bottom: 1px solid var(--border-light); z-index: 100; box-shadow: var(--shadow-sm); }
        .btn-back { font-size: 0.85rem; font-weight: 600; color: var(--muted); transition: color 0.2s; }
        .btn-back:hover { color: var(--green); }
        
        .invoice-container { max-width: 840px; margin: 0 auto; padding: 0 1.5rem; }
        
        /* Tightened vertical padding aggressively to guarantee single page execution */
        .invoice-paper { 
          background: var(--white); 
          padding: 2.2rem 3.5rem; 
          border: 1px solid var(--border); 
          box-shadow: var(--shadow-lg); 
          font-size: 0.9rem;
          page-break-inside: avoid;
          break-inside: avoid;
        }
        
        /* REPAIRED: Strict width control + flex protection prevents overlapping elements */
        .invoice-header { 
          display: flex; 
          justify-content: space-between; 
          align-items: flex-start;
          gap: 2rem; 
          border-bottom: 2px solid var(--surface); 
          padding-bottom: 1.25rem; 
          margin-bottom: 1.5rem; 
        }
        .header-left { flex: 1; min-width: 0; }
        .header-right { flex-shrink: 0; text-align: right; }

        .company-info { font-size: 0.85rem; color: var(--muted); line-height: 1.5; margin-top: 0.3rem; }
        .invoice-no { font-family: var(--font-head); font-weight: 800; font-size: 1.5rem; color: var(--ink); margin: 0; line-height: 1.2; }
        
        .invoice-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; margin-bottom: 1.5rem; }
        .small-label { display: block; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--light-text); margin-bottom: 0.3rem; }
        .info-col p { font-size: 0.9rem; color: var(--slate); margin-bottom: 0.15rem; line-height: 1.4; }
        
        .invoice-table { width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; }
        .invoice-table th { background: var(--surface); padding: 0.75rem 1rem; text-align: left; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--muted); }
        .invoice-table td { padding: 0.85rem 1rem; border-bottom: 1px solid var(--surface); font-size: 0.9rem; }
        
        .invoice-summary-block { display: flex; justify-content: space-between; gap: 3rem; align-items: flex-start; margin-bottom: 1.5rem; }
        .warranty-box { flex: 1; background: var(--bg); border: 1px solid var(--border); padding: 1rem; border-radius: 12px; font-size: 0.82rem; line-height: 1.5; color: var(--slate); }
        .warranty-box strong { display: block; color: var(--ink); font-size: 0.88rem; margin-bottom: 0.4rem; }
        .warranty-row-item { display: flex; justify-content: space-between; margin-bottom: 0.2rem; }
        .warranty-date-clause { font-size: 0.72rem; color: var(--muted); margin-top: 0.4rem; font-style: italic; border-top: 1px dashed var(--border); padding-top: 0.4rem; }
        
        .invoice-summary { width: 320px; }
        .summary-row { display: flex; justify-content: space-between; padding: 0.4rem 0; font-size: 0.9rem; color: var(--slate); }
        .grand-total { border-top: 2px solid var(--green); margin-top: 0.4rem; padding-top: 0.8rem; font-family: var(--font-head); font-weight: 800; font-size: 1.4rem; color: var(--green); }
        .summary-note { font-size: 0.75rem; color: var(--muted); text-align: right; margin-top: 0.4rem; line-height: 1.4; }
        
        .invoice-legal-notes { background: #FAFDFB; border: 1px dashed var(--border); padding: 1rem; border-radius: 12px; margin-top: 1.5rem; }
        .main-warning { font-size: 0.85rem; color: var(--ink); margin-bottom: 0.6rem; line-height: 1.4; }
        .legal-links { display: flex; gap: 1rem; font-size: 0.8rem; font-weight: 600; color: var(--green); }
        .legal-links :hover { text-decoration: underline; }
        .legal-links-print { display: none; font-size: 0.75rem; color: var(--muted); line-height: 1.4; }
        
        /* Pulled up margins to guarantee footer stays on page 1 */
        .invoice-footer { border-top: 1px solid var(--surface); margin-top: 2rem; padding-top: 1rem; text-align: center; font-size: 0.8rem; color: var(--light-text); }
        .loader { height: 100vh; display: flex; align-items: center; justify-content: center; font-family: var(--font-head); font-weight: 600; color: var(--green); }
        
        .print-only { display: none !important; }

        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          @page { size: A4 portrait; margin: 10mm 15mm; }
          body { background: white; color: black; }
          .invoice-page-bg { padding: 0; background: white; min-height: auto; }
          .invoice-container { max-width: 100%; width: 100%; padding: 0; margin: 0; }
          .invoice-paper { box-shadow: none; border: none; padding: 0; width: 100%; }
          .invoice-legal-notes { background: none; padding: 1rem 0; }
          .legal-links-print { display: block !important; }
        }
      `}</style>
    </div>
  )
}