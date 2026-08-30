'use client'
import { useEffect, useState, useRef } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '../../../../lib/supabase' 
import { formatLKR } from '../../../../lib/utils'
import Link from 'next/link'
import toast from 'react-hot-toast'

// ── CLIENT-SIDE SCANNABLE BARCODE COMPONENT ──
function OrderBarcode({ value }) {
  const svgRef = useRef(null)

  useEffect(() => {
    if (svgRef.current && value) {
      import('jsbarcode').then((JsBarcode) => {
        JsBarcode.default(svgRef.current, value, {
          format: 'CODE128',
          width: 1.5,
          height: 38,
          displayValue: false, // Clean barcode without text underneath
          margin: 0,
          background: 'transparent',
          lineColor: '#000000'
        })
      }).catch(err => console.error('Barcode generation error:', err))
    }
  }, [value])

  return <svg ref={svgRef}></svg>
}

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

      const cleanNum = String(order.order_number || '').replace(/^#/, '')

      const options = {
        margin:       [10, 15, 10, 15], 
        filename:     `TechoConnect_Invoice_${cleanNum}.pdf`,
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
    const cleanNum = String(order?.order_number || '').replace(/^#/, '')
    const shareData = {
      title: `Techo Connect Invoice ${cleanNum}`,
      text: `Hi! Here is my invoice for order ${cleanNum}.`,
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

  // ── SANITIZE ORDER NUMBER (REMOVE `#` PREFIX) ──
  const cleanOrderNumber = String(order.order_number || order.id || '').replace(/^#/, '')

  const isCOD = order.payment_method === 'cod'

  const hasYagiWarranty = order.items.some(item => 
    item.name?.toLowerCase().includes('yagi pro') || 
    item.name?.toLowerCase().includes('yagi elite') ||
    item.name?.toLowerCase().includes('yagi ultra')
  )

  const purchaseDate = new Date(order.created_at).toLocaleDateString()

  // ── FINANCIAL CALCULATION MATRIX ──
  const productTotal = parseFloat(order.product_total || 0)
  const deliveryCharge = parseFloat(order.delivery_charge || 0)
  const grossInvoiceTotal = productTotal + deliveryCharge
  
  // PROMO CODE DETECTION FALLBACK
  const calculatedDeduction = Math.max(0, grossInvoiceTotal - parseFloat(order.grand_total || 0))
  const promoDiscount = parseFloat(order.discount_applied || order.discount || calculatedDeduction || 0)
  const promoCode = order.promo_code || (promoDiscount > 0 ? "PROMO" : null)

  const depositPaid = parseFloat(order.deposit_amount || order.advance_paid || 500)
  const balanceDue = Math.max(0, parseFloat(order.grand_total || 0) - depositPaid)

  return (
    <div className="invoice-page-bg">
      
      {/* ── DESKTOP ONLY VIEW ── */}
      <div className="view-desktop">
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
            
            {/* HEADER LAYER WITH BARCODE AND NO '#' SYMBOL */}
            <div className="invoice-header">
              <div className="header-left">
                <div className="nav__logo" style={{ marginBottom: '0.5rem' }}>
                  <div className="nav__logo-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.93 19.07a10 10 0 0 1 0-14.14M7.76 16.24a6 6 0 0 1 0-8.48M10 12a2 2 0 1 0 4 0 2 2 0 1 0-4 0M16.24 7.76a6 6 0 0 1 0 8.48M19.07 4.93a10 10 0 0 1 0 14.14M12 12l-4.5 9M13 15l2.5 6"/></svg>
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
                <div className="inv-label">Official Invoice</div>
                
                {/* Clean Order Number Without '#' */}
                <h1 className="invoice-no">{cleanOrderNumber}</h1>
                
                {/* Scannable Barcode Container */}
                <div style={{ background: '#F8FAFC', padding: '4px 10px', borderRadius: '6px', border: '1px solid var(--border-light)', display: 'inline-block', margin: '0.4rem 0' }}>
                  <OrderBarcode value={cleanOrderNumber} />
                </div>

                <div>
                  <span className={`badge ${isCOD ? 'badge-orange' : 'badge-green'}`}>
                    {isCOD ? 'Deposit Confirmed' : 'Fully Paid'}
                  </span>
                </div>
              </div>
            </div>

            <div className="invoice-grid">
              <div className="info-col">
                <span className="small-label">Billed To</span>
                <p style={{ fontSize: '1.05rem', margin: '0.1rem 0' }}><strong>{order.customer_name}</strong></p>
                <p>{order.customer_address}</p>
                <p>{order.customer_district}, Sri Lanka</p>
                <p>{order.customer_phone1},{order.customer_phone2}</p>
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
                  <td style={{ textAlign: 'right' }}>{formatLKR(deliveryCharge)}</td>
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
                      <span>Products Subtotal</span>
                      <span>{formatLKR(productTotal)}</span>
                    </div>
                    <div className="summary-row">
                      <span>Delivery Fee</span>
                      <span>{formatLKR(deliveryCharge)}</span>
                    </div>
                    <div className="summary-row" style={{ fontWeight: 700, borderTop: '1px solid var(--border-light)', paddingTop: '0.3rem' }}>
                      <span>Gross Order Value</span>
                      <span>{formatLKR(grossInvoiceTotal)}</span>
                    </div>
                    {promoDiscount > 0 && (
                      <div className="summary-row" style={{ color: '#0D9B6A', fontWeight: 600 }}>
                        <span>Promo Discount {promoCode && `(${promoCode})`}</span>
                        <span>-{formatLKR(promoDiscount)}</span>
                      </div>
                    )}
                    <div className="summary-row" style={{ color: '#B91C1C' }}>
                      <span>Less: Advance Deposit Paid</span>
                      <span>-{formatLKR(depositPaid)}</span>
                    </div>
                    <div className="summary-row grand-total">
                      <span>Net Balance Due</span>
                      <span>{formatLKR(balanceDue)}</span>
                    </div>
                    <p className="summary-note">* Remaining net balance is payable in cash directly to the courier upon arrival.</p>
                  </>
                ) : (
                  <>
                    <div className="summary-row">
                      <span>Products Subtotal</span>
                      <span>{formatLKR(productTotal)}</span>
                    </div>
                    <div className="summary-row">
                      <span>Delivery Fee</span>
                      <span>{formatLKR(deliveryCharge)}</span>
                    </div>
                    {promoDiscount > 0 && (
                      <div className="summary-row" style={{ color: '#0D9B6A', fontWeight: 600 }}>
                        <span>Promo Discount {promoCode && `(${promoCode})`}</span>
                        <span>-{formatLKR(promoDiscount)}</span>
                      </div>
                    )}
                    <div className="summary-row grand-total">
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
      </div>

      {/* ── MOBILE ONLY VIEW ── */}
      <div className="view-mobile no-print">
        {/* Mobile Sticky Action Bar */}
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, background: 'white', borderBottom: '1px solid var(--border-light)', padding: '0.75rem 1rem', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '0.5rem', boxShadow: 'var(--shadow-sm)' }}>
          <Link href="/checkout/confirm" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted)' }}>&larr; Back to Confirmation</Link>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <button onClick={handleDownloadPDF} disabled={downloading} className="btn btn-primary btn-sm" style={{ padding: '0.6rem', fontSize: '0.85rem' }}>
              {downloading ? '⏳ Saving...' : '⬇️ Download PDF'}
            </button>
            <button onClick={handleShare} className="btn btn-wa btn-sm" style={{ padding: '0.6rem', fontSize: '0.85rem' }}>🔗 Share Invoice</button>
          </div>
        </div>

        {/* Mobile Card Payload Content */}
        <div style={{ padding: '5.5rem 1rem 2rem' }}>
          <div style={{ background: 'white', borderRadius: 12, border: '1px solid var(--border-light)', padding: '1.25rem', boxShadow: 'var(--shadow-card)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--surface)', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div className="nav__logo-icon" style={{ width: '28px', height: '28px', borderRadius: '6px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                </div>
                <strong style={{ fontFamily: 'var(--font-head)', fontSize: '0.9rem', color: 'var(--ink)' }}>TECHO CONNECT</strong>
              </div>
              <span className={`badge ${isCOD ? 'badge-orange' : 'badge-green'}`} style={{ fontSize: '0.68rem', padding: '0.2rem 0.5rem' }}>
                {isCOD ? 'Deposit Confirmed' : 'Fully Paid'}
              </span>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <span style={{ display: 'block', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--light-text)' }}>Invoice Number</span>
              
              {/* Clean Order Number Without '#' */}
              <h2 style={{ fontFamily: 'var(--font-head)', fontSize: '1.3rem', color: 'var(--ink)', margin: 0 }}>{cleanOrderNumber}</h2>
              
              {/* Mobile Barcode Render */}
              <div style={{ background: '#F8FAFC', padding: '4px 8px', borderRadius: '6px', border: '1px solid var(--border-light)', display: 'inline-block', margin: '0.3rem 0 0.1rem' }}>
                <OrderBarcode value={cleanOrderNumber} />
              </div>

              <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.15rem' }}>Date: {purchaseDate}</div>
            </div>

            <div style={{ background: 'var(--bg)', padding: '1rem', borderRadius: 8, border: '1px solid var(--border-light)', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
              <span style={{ display: 'block', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.25rem' }}>Billed To</span>
              <div style={{ fontWeight: 700, color: 'var(--ink)' }}>{order.customer_name}</div>
              <div style={{ color: 'var(--slate)', marginTop: '0.15rem', lineHeight: 1.4 }}>{order.customer_address}, {order.customer_district}</div>
              <div style={{ color: 'var(--muted)', marginTop: '0.15rem' }}>{order.customer_phone1}</div>
            </div>

            <div style={{ fontSize: '0.85rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--surface)', paddingBottom: '0.75rem' }}>
              <span style={{ display: 'block', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--light-text)', marginBottom: '0.15rem' }}>Payment Method</span>
              <strong style={{ color: 'var(--ink)' }}>{isCOD ? 'Cash on Delivery (COD)' : 'Bank Deposit'}</strong>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ display: 'block', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--light-text)', marginBottom: '0.5rem' }}>Line Items</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {order.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', fontSize: '0.85rem', gap: '0.5rem', borderBottom: '1px dashed var(--surface)', paddingBottom: '0.5rem' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, color: 'var(--ink)' }}>{item.name}</div>
                      {item.variant && <div style={{ fontSize: '0.75rem', color: 'var(--green)', marginTop: '0.1rem' }}>{item.variant}</div>}
                      <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '0.1rem' }}>Qty: {item.qty}</div>
                    </div>
                    <strong style={{ color: 'var(--ink)', whiteSpace: 'nowrap' }}>{formatLKR(item.price * item.qty)}</strong>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--muted)' }}>
                  <span>Courier Shipping</span>
                  <span>{formatLKR(deliveryCharge)}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {hasYagiWarranty && (
                <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', padding: '1rem', borderRadius: 8, fontSize: '0.8rem', lineHeight: 1.5 }}>
                  <strong style={{ display: 'block', color: 'var(--ink)', marginBottom: '0.25rem' }}>🛡️ Hardware Warranty</strong>
                  <div>Checking Guarantee: 5 Days Only</div>
                  <div>Technical Service: 12 Months</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '0.3rem', fontStyle: 'italic' }}>Active from purchase date: {purchaseDate}</div>
                </div>
              )}

              <div style={{ borderTop: '1px solid var(--surface)', paddingTop: '0.75rem' }}>
                {isCOD ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.875rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--slate)' }}>
                      <span>Gross Order Value:</span><span>{formatLKR(grossInvoiceTotal)}</span>
                    </div>
                    {promoDiscount > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#0D9B6A', fontWeight: 600 }}>
                        <span>Promo Discount {promoCode && `(${promoCode})`}:</span><span>-{formatLKR(promoDiscount)}</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#B91C1C' }}>
                      <span>Deposit Paid:</span><span>-{formatLKR(depositPaid)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.1rem', color: 'var(--green)', borderTop: '1px solid var(--border-light)', paddingTop: '0.4rem', marginTop: '0.2rem' }}>
                      <span>Net Balance Due:</span><span>{formatLKR(balanceDue)}</span>
                    </div>
                    <p style={{ fontSize: '0.72rem', color: 'var(--muted)', fontStyle: 'italic', marginTop: '0.2rem', textAlign: 'right' }}>* Collectible in cash upon courier arrival.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--slate)', fontSize: '0.875rem' }}>
                      <span>Gross Order Value:</span><span>{formatLKR(grossInvoiceTotal)}</span>
                    </div>
                    {promoDiscount > 0 && (
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#0D9B6A', fontWeight: 600, fontSize: '0.875rem' }}>
                        <span>Promo Discount {promoCode && `(${promoCode})`}:</span><span>-{formatLKR(promoDiscount)}</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '0.4rem', marginTop: '0.2rem' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--slate)' }}>Total Amount Paid:</span>
                      <strong style={{ fontSize: '1.2rem', color: 'var(--green)', fontFamily: 'var(--font-head)' }}>{formatLKR(order.grand_total)}</strong>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', background: '#FAFDFB', border: '1px dashed var(--border)', padding: '0.85rem', borderRadius: 8, fontSize: '0.78rem', lineHeight: 1.4 }}>
              <p style={{ color: 'var(--ink)' }}>⚠️ <strong>Important Note:</strong> Keep this invoice safe to present for any future warranty claims.</p>
            </div>

            <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--light-text)', marginTop: '1.5rem', borderTop: '1px solid var(--surface)', paddingTop: '0.75rem' }}>
              Techo Connect &bull; Kallady, Batticaloa
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .invoice-page-bg { background: var(--bg); min-height: 100vh; padding: 60px 0 40px; }
        .invoice-toolbar { position: fixed; top: 0; left: 0; right: 0; background: rgba(255,255,255,0.85); backdrop-filter: blur(12px); padding: 1rem 0; border-bottom: 1px solid var(--border-light); z-index: 100; box-shadow: var(--shadow-sm); }
        .btn-back { font-size: 0.85rem; font-weight: 600; color: var(--muted); transition: color 0.2s; }
        .btn-back:hover { color: var(--green); }
        
        .invoice-container { max-width: 840px; margin: 0 auto; padding: 0 1.5rem; }
        
        .invoice-paper { 
          background: var(--white); 
          padding: 2.2rem 3.5rem; 
          border: 1px solid var(--border); 
          box-shadow: var(--shadow-lg); 
          font-size: 0.9rem;
          page-break-inside: avoid;
          break-inside: avoid;
        }
        
        .invoice-header { 
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          align-items: start;
          gap: 1.5rem; 
          border-bottom: 2px solid var(--surface); 
          padding-bottom: 1.25rem; 
          margin-bottom: 1.5rem; 
        }
        .header-left { width: 100%; }
        .header-right { text-align: right; width: 100%; }

        .inv-label {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--green);
        }

        .company-info { font-size: 0.85rem; color: var(--muted); line-height: 1.5; margin-top: 0.3rem; }
        
        .invoice-no { 
          font-family: var(--font-head); 
          font-weight: 800; 
          font-size: 1.5rem; 
          color: var(--ink); 
          margin: 0.15rem 0 0; 
          line-height: 1.2; 
          word-break: break-all;
        }
        
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
        
        .invoice-footer { border-top: 1px solid var(--surface); margin-top: 1.75rem; padding-top: 1rem; text-align: center; font-size: 0.8rem; color: var(--light-text); }
        .loader { height: 100vh; display: flex; align-items: center; justify-content: center; font-family: var(--font-head); font-weight: 600; color: var(--green); }
        
        .print-only { display: none !important; }

        @media (min-width: 769px) {
          .view-mobile { display: none !important; }
        }
        
        @media (max-width: 768px) {
          .view-desktop {
            position: absolute !important;
            left: -9999px !important;
            top: 0 !important;
            width: 840px !important;
            opacity: 0.001 !important;
            pointer-events: none !important;
          }
        }

        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          .view-mobile { display: none !important; }
          .view-desktop { position: static !important; width: 100% !important; opacity: 1 !important; }
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