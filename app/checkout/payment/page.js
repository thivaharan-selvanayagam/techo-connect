'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Nav from '../../../components/layout/Nav'
import Footer from '../../../components/layout/Footer'
import { useCartStore, useCheckoutStore } from '../../../store/cart'
import { formatLKR, calcDelivery, BANK_DETAILS } from '../../../lib/utils'
import { supabase } from '../../../lib/supabase'
import toast from 'react-hot-toast'

export default function PaymentPage() {
  const router = useRouter()
  const items = useCartStore(s => s.items)
  const clearCart = useCartStore(s => s.clearCart)
  const customer = useCheckoutStore(s => s.customer)

  const [method, setMethod] = useState(null)
  const [receipt, setReceipt] = useState(null)
  const [placing, setPlacing] = useState(false)
  const fileRef = useRef()

  const totalWeight = items.reduce((s, i) => s + i.weight * i.qty, 0)
  const productTotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const delivery = calcDelivery(totalWeight)
  const grandTotal = productTotal + delivery
  const depositAmount = 500

  if (!customer?.name || items.length === 0) {
    return (
      <>
        <Nav />
        <div style={{ paddingTop: '6rem', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
          <p style={{ color: 'var(--muted)' }}>Please complete your delivery details first.</p>
          <Link href="/checkout/address" className="btn btn-primary">Go to Address</Link>
        </div>
        <Footer />
      </>
    )
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) { toast.error('File too large. Max 10MB.'); return }
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
    if (!allowed.includes(file.type)) { toast.error('Only JPG, PNG, WebP or PDF allowed.'); return }
    setReceipt(file)
  }

  const uploadReceipt = async (orderNumber) => {
    if (!receipt) return null
    try {
      const ext = receipt.name.split('.').pop()
      const path = `${orderNumber}.${ext}` 

      const { data, error } = await supabase.storage
        .from('receipts')
        .upload(path, receipt, { upsert: true })

      if (error) throw error
      
      const { data: urlData } = supabase.storage.from('receipts').getPublicUrl(path)
      return urlData.publicUrl
    } catch (err) {
      console.error('Upload error:', err)
      return null
    }
  }

  const handlePlaceOrder = async () => {
    if (!method) { toast.error('Please select a payment method.'); return }
    if (!receipt) { toast.error('Please upload your deposit receipt.'); return }

    setPlacing(true)
    try {
      const orderItems = items.map(i => ({
        key: i.key,
        productId: i.productId,
        name: i.name,
        variant: i.variantName || null,
        price: i.price,
        weight: i.weight,
        qty: i.qty,
      }))

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: orderItems,
          customer,
          paymentMethod: method,
          receiptUrl: null, 
          productTotal,
          deliveryCharge: delivery,
          grandTotal,
          totalWeight,
        }),
      })

      if (!res.ok) throw new Error('Order creation failed')
      const { orderId, orderNumber } = await res.json()

      const receiptUrl = await uploadReceipt(orderNumber)

      if (receiptUrl) {
        await supabase.from('orders').update({ receipt_url: receiptUrl }).eq('id', orderId)
      }

      await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order: {
            order_number: orderNumber,
            customer_name: customer.name,
            customer_phone1: customer.phone1,
            customer_district: customer.district,
            customer_address: customer.address,
            items: items,
            grand_total: grandTotal,
            payment_method: method
          },
          receiptUrl: receiptUrl 
        })
      })

      clearCart()
      router.push(`/checkout/confirm?orderNumber=${orderNumber}`)

    } catch (err) {
      console.error(err)
      toast.error('Something went wrong. Please try again or contact us on WhatsApp.')
    } finally {
      setPlacing(false)
    }
  }

  // Shared inner content layout logic for order sidebar arrays
  const renderSidebarSummary = () => (
    <>
      <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1rem', color: 'var(--ink)', marginBottom: '1.1rem' }}>Order Total</div>
      {items.map(item => (
        <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.4rem' }}>
          <span style={{ color: 'var(--muted)' }}>{item.name} × {item.qty}</span>
          <span style={{ fontWeight: 600 }}>{formatLKR(item.price * item.qty)}</span>
        </div>
      ))}
      <div style={{ borderTop: '1px solid var(--border-light)', marginTop: '0.75rem', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--muted)' }}><span>Delivery</span><span>{formatLKR(delivery)}</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.15rem', color: 'var(--ink)', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border-light)' }}>
          <span>Grand Total</span>
          <span style={{ color: 'var(--green)' }}>{formatLKR(method === 'bank' ? grandTotal : depositAmount)}</span>
        </div>
        <div style={{ fontSize: '0.72rem', color: 'var(--muted)', textAlign: 'right' }}>
          {method === 'bank' ? 'Full amount to deposit now' : 'Deposit now, rest on delivery'}
        </div>
      </div>
    </>
  )

  // Shared visual wrapper layout for file state rendering feedback
  const renderReceiptUploadBox = () => (
    <div>
      <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--slate)', marginBottom: '0.75rem' }}>
        Upload Deposit Receipt <span style={{ color: '#EF4444' }}>*</span>
      </div>
      <div
        onClick={() => fileRef.current.click()}
        style={{ border: '2px dashed', borderColor: receipt ? 'var(--green)' : 'var(--border-light)', borderRadius: 12, padding: '2rem', textAlign: 'center', cursor: 'pointer', background: receipt ? 'rgba(10,173,110,0.04)' : 'var(--bg)', transition: 'all 0.2s' }}
      >
        {receipt ? (
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--green)' }}>{receipt.name}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.25rem' }}>{(receipt.size / 1024).toFixed(0)} KB · Click to change</div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📎</div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--slate)', marginBottom: '0.25rem' }}>Click to upload receipt</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>JPG, PNG, WebP or PDF · Max 10MB</div>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <>
      <Nav />
      {/* Hidden single node global hook controller file pointer safely accessible by both layouts */}
      <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,application/pdf" style={{ display: 'none' }} onChange={handleFileChange} />

      <div style={{ paddingTop: '5.5rem', background: 'var(--bg)', padding: '5.5rem 0 4rem' }}>
        <div className="container-sm">

          {/* Steps */}
          <div className="steps" style={{ marginBottom: '2.5rem' }}>
            <div className="step done"><div className="step-num">✓</div>Cart</div>
            <div className="step-line" style={{ background: 'var(--green)' }} />
            <div className="step done"><div className="step-num">✓</div>Your Details</div>
            <div className="step-line" style={{ background: 'var(--green)' }} />
            <div className="step active"><div className="step-num">3</div>Payment</div>
            <div className="step-line" />
            <div className="step"><div className="step-num">4</div>Confirmation</div>
          </div>

          {/* DESKTOP VIEW (100% Original styling metrics untouched) */}
          <div className="desktop-only">
            <div className="payment-layout">
              <div className="main-content">
                {/* Delivery summary */}
                <div style={{ background: 'white', borderRadius: 12, border: '1px solid var(--border-light)', padding: '1.25rem 1.5rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.3rem' }}>Delivering To</div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--ink)' }}>{customer.name}</div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>{customer.address}, {customer.district}</div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>{customer.phone1}</div>
                    </div>
                    <Link href="/checkout/address" style={{ fontSize: '0.78rem', color: 'var(--green)', fontWeight: 600 }}>Edit</Link>
                  </div>
                </div>

                {/* Payment method selector */}
                <div style={{ background: 'white', borderRadius: 16, border: '1px solid var(--border-light)', padding: '2rem', marginBottom: '1.5rem' }}>
                  <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.3rem', color: 'var(--ink)', marginBottom: '1.5rem' }}>Choose Payment Method</h2>

                  <div className="methods-grid">
                    <button onClick={() => setMethod('cod')} className={`method-btn ${method === 'cod' ? 'selected' : ''}`}>
                      <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>🤝</div>
                      <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1rem', color: 'var(--ink)', marginBottom: '0.25rem' }}>Cash on Delivery</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.5 }}>Pay when you receive. Deposit of LKR 500 required to confirm.</div>
                    </button>

                    <button onClick={() => setMethod('bank')} className={`method-btn ${method === 'bank' ? 'selected' : ''}`}>
                      <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>🏦</div>
                      <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1rem', color: 'var(--ink)', marginBottom: '0.25rem' }}>Bank Deposit</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.5 }}>Deposit full amount + LKR 500 delivery deposit.</div>
                    </button>
                  </div>

                  {method === 'cod' && (
                    <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#92400E', marginBottom: '0.5rem' }}>⚠️ COD Deposit Required</div>
                      <p style={{ fontSize: '0.85rem', color: '#78350F', lineHeight: 1.7, marginBottom: '0.75rem' }}>
                        To confirm a Cash on Delivery order, you must first deposit <strong>LKR 500</strong> to our bank account below. This deposit goes towards your final payment on delivery.
                      </p>
                      <div style={{ background: 'white', borderRadius: 8, padding: '1rem', fontSize: '0.85rem', lineHeight: 1.8 }}>
                        <div><strong>Bank:</strong> {BANK_DETAILS.bank}</div>
                        <div><strong>Branch:</strong> {BANK_DETAILS.branch}</div>
                        <div><strong>Account Name:</strong> {BANK_DETAILS.accountName}</div>
                        <div><strong>Account No:</strong> {BANK_DETAILS.accountNumber}</div>
                        <div style={{ marginTop: '0.4rem', fontSize: '0.78rem', color: 'var(--muted)' }}>Deposit exactly <strong>LKR 500</strong> as confirmation deposit</div>
                      </div>
                    </div>
                  )}

                  {method === 'bank' && (
                    <div style={{ background: 'rgba(10,173,110,0.05)', border: '1px solid var(--border)', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--green-dark)', marginBottom: '0.5rem' }}>🏦 Bank Account Details</div>
                      <div style={{ background: 'white', borderRadius: 8, padding: '1rem', fontSize: '0.85rem', lineHeight: 1.8, marginBottom: '0.75rem' }}>
                        <div><strong>Bank:</strong> {BANK_DETAILS.bank}</div>
                        <div><strong>Branch:</strong> {BANK_DETAILS.branch}</div>
                        <div><strong>Account Name:</strong> {BANK_DETAILS.accountName}</div>
                        <div><strong>Account No:</strong> {BANK_DETAILS.accountNumber}</div>
                        <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-light)' }}>
                          <div><strong>Deposit Amount:</strong> <span style={{ color: 'var(--green)', fontWeight: 700 }}>{formatLKR(grandTotal)}</span></div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>({formatLKR(productTotal)} + {formatLKR(delivery)} delivery )</div>
                        </div>
                      </div>
                      <p style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{BANK_DETAILS.note}</p>
                    </div>
                  )}

                  {method && renderReceiptUploadBox()}
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <Link href="/checkout/address" className="btn btn-ghost" style={{ flex: 1 }}>&larr; Back</Link>
                  <button onClick={handlePlaceOrder} disabled={placing || !method || !receipt} className="btn btn-primary" style={{ flex: 2, opacity: (placing || !method || !receipt) ? 0.6 : 1 }}>
                    {placing ? 'Placing Order...' : 'Confirm & Place Order'}
                    {!placing && <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 8h10M9 4l4 4-4 4"/></svg>}
                  </button>
                </div>
              </div>

              <div className="summary-sidebar">
                {renderSidebarSummary()}
              </div>
            </div>
          </div>

          {/* MOBILE VIEW (Independent fluid single column architecture) */}
          <div className="mobile-only" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* Context Total Box at Top */}
            <div style={{ background: 'white', borderRadius: 12, border: '1px solid var(--border-light)', padding: '1.25rem' }}>
              {renderSidebarSummary()}
            </div>

            {/* Delivery address banner display summary */}
            <div style={{ background: 'white', borderRadius: 12, border: '1px solid var(--border-light)', padding: '1rem 1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.2rem' }}>Delivering To</div>
                  <strong style={{ fontSize: '0.875rem', color: 'var(--ink)' }}>{customer.name}</strong>
                  <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: '0.1rem', lineHeight: 1.3 }}>{customer.address}, {customer.district}</div>
                </div>
                <Link href="/checkout/address" style={{ fontSize: '0.78rem', color: 'var(--green)', fontWeight: 600, shrink: 0 }}>Edit</Link>
              </div>
            </div>

            {/* Core payment mechanism selection cards list */}
            <div style={{ background: 'white', borderRadius: 12, border: '1px solid var(--border-light)', padding: '1.25rem' }}>
              <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--ink)', marginBottom: '1rem' }}>Choose Payment Method</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <button onClick={() => setMethod('cod')} style={{ display: 'flex', flexDirection: 'column', padding: '1.25rem', borderRadius: 10, border: '2px solid', borderColor: method === 'cod' ? 'var(--green)' : 'var(--border-light)', background: method === 'cod' ? 'rgba(10,173,110,0.03)' : 'white', textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>🤝</span>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--ink)' }}>Cash on Delivery</strong>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.4 }}>Pay when you receive. Deposit of LKR 500 required to confirm.</p>
                </button>

                <button onClick={() => setMethod('bank')} style={{ display: 'flex', flexDirection: 'column', padding: '1.25rem', borderRadius: 10, border: '2px solid', borderColor: method === 'bank' ? 'var(--green)' : 'var(--border-light)', background: method === 'bank' ? 'rgba(10,173,110,0.03)' : 'white', textAlign: 'left' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>🏦</span>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--ink)' }}>Bank Deposit</strong>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.4 }}>Deposit full amount + LKR 500 delivery deposit.</p>
                </button>
              </div>

              {/* Dynamic instruction render blocks with customized safe padding values */}
              {method === 'cod' && (
                <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 10, padding: '1rem', marginBottom: '1.25rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#92400E', marginBottom: '#0.35rem' }}>⚠️ COD Deposit Required</div>
                  <p style={{ fontSize: '0.82rem', color: '#78350F', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                    To confirm a Cash on Delivery order, you must first deposit <strong>LKR 500</strong> to our bank account. This deposit goes towards your final payment on delivery.
                  </p>
                  <div style={{ background: 'white', borderRadius: 6, padding: '0.85rem', fontSize: '0.82rem', lineHeight: 1.6 }}>
                    <div><strong>Bank:</strong> {BANK_DETAILS.bank}</div>
                    <div><strong>Account Name:</strong> {BANK_DETAILS.accountName}</div>
                    <div><strong>Account No:</strong> {BANK_DETAILS.accountNumber}</div>
                  </div>
                </div>
              )}

              {method === 'bank' && (
                <div style={{ background: 'rgba(10,173,110,0.05)', border: '1px solid rgba(10,173,110,0.15)', borderRadius: 10, padding: '1rem', marginBottom: '1.25rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--green-dark)', marginBottom: '0.35rem' }}>🏦 Bank Account Details</div>
                  <div style={{ background: 'white', borderRadius: 6, padding: '0.85rem', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                    <div><strong>Bank:</strong> {BANK_DETAILS.bank}</div>
                    <div><strong>Account Name:</strong> {BANK_DETAILS.accountName}</div>
                    <div><strong>Account No:</strong> {BANK_DETAILS.accountNumber}</div>
                    <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', marginTop: '0.5rem', paddingTop: '0.5rem', fontWeight: 700 }}>
                      Deposit: <span style={{ color: 'var(--green)' }}>{formatLKR(grandTotal)}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--muted)', lineHeight: 1.4 }}>{BANK_DETAILS.note}</p>
                </div>
              )}

              {method && (
                <div style={{ borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1rem' }}>
                  {renderReceiptUploadBox()}
                </div>
              )}
            </div>

            {/* Mobile submission terminal panel layout links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
              <button onClick={handlePlaceOrder} disabled={placing || !method || !receipt} className="btn btn-primary" style={{ width: '100%', padding: '0.8rem', opacity: (placing || !method || !receipt) ? 0.6 : 1 }}>
                {placing ? 'Placing Order...' : 'Confirm & Place Order'}
              </button>
              <Link href="/checkout/address" className="btn btn-ghost" style={{ width: '100%', padding: '0.8rem', textAlign: 'center' }}>
                &larr; Back
              </Link>
            </div>

          </div>

        </div>
      </div>
      <Footer />

      {/* COMPACT STYLED JSX RESPONSIVE CONTROLS */}
      <style jsx>{`
        .payment-layout {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 2rem;
          align-items: start;
        }
        .main-content {
          width: 100%;
        }
        .methods-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .method-btn {
          padding: 1.5rem;
          border: 2px solid var(--border-light);
          border-radius: 12px;
          background: white;
          cursor: pointer;
          text-align: left;
          transition: all 0.2s;
        }
        .method-btn.selected {
          border-color: var(--green);
          background: rgba(10,173,110,0.05);
        }
        .summary-sidebar {
          background: white;
          border-radius: 16px;
          border: 1px solid var(--border-light);
          padding: 1.5rem;
          position: sticky;
          top: 6rem;
        }
      `}</style>
    </>
  )
}