'use client'
import Link from 'next/link'
import Nav from '../../components/layout/Nav'
import Footer from '../../components/layout/Footer'
import WAFloat from '../../components/ui/WAFloat'
import { useCartStore } from '../../store/cart'
import { formatLKR, calcDelivery } from '../../lib/utils'

export default function Cart() {
  const { items, updateQty, removeItem, productTotal } = useCartStore()
  const totalWeight = items.reduce((s, i) => s + i.weight * i.qty, 0)
  const delivery = calcDelivery(totalWeight)
  const grand = (useCartStore.getState().productTotal || 0) + delivery

  const prodTotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const grandTotal = prodTotal + delivery

  return (
    <>
      <Nav />
      <div style={{ paddingTop: '5.5rem', minHeight: '80vh' }}>
        <section style={{ padding: '3rem 0 5rem', background: 'var(--bg)' }}>
          <div className="container-sm">
            <h1 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '2rem', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>Your Cart</h1>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>{items.length} item{items.length !== 1 ? 's' : ''}</p>

            {/* Steps */}
            <div className="steps" style={{ marginBottom: '2.5rem' }}>
              <div className="step active"><div className="step-num">1</div>Cart</div>
              <div className="step-line"/>
              <div className="step"><div className="step-num">2</div>Your Details</div>
              <div className="step-line"/>
              <div className="step"><div className="step-num">3</div>Payment</div>
              <div className="step-line"/>
              <div className="step"><div className="step-num">4</div>Confirmation</div>
            </div>

            {items.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'white', borderRadius: 16, border: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>Your cart is empty</div>
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Browse our products and add antennas or spare parts</p>
                <Link href="/products" className="btn btn-primary">Shop Now</Link>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem', alignItems: 'start' }}>
                <div>
                  {items.map(item => (
                    <div key={item.key} style={{ background: 'white', borderRadius: 12, border: '1px solid var(--border-light)', padding: '1.25rem 1.5rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                      <div style={{ width: 56, height: 56, background: 'var(--surface)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', flexShrink: 0 }}>📡</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--ink)', marginBottom: '0.15rem' }}>{item.name}</div>
                        {item.variantName && <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginBottom: '0.15rem' }}>{item.variantName}</div>}
                        <div style={{ fontSize: '0.72rem', color: 'var(--light-text)' }}>{item.weight}g each</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-light)', borderRadius: 8, overflow: 'hidden' }}>
                          <button onClick={() => updateQty(item.key, item.qty - 1)} style={{ width: 32, height: 32, cursor: 'pointer', border: 'none', background: 'var(--bg)', fontSize: '1rem', color: 'var(--slate)' }}>−</button>
                          <div style={{ width: 36, textAlign: 'center', fontWeight: 700, fontSize: '0.875rem' }}>{item.qty}</div>
                          <button onClick={() => updateQty(item.key, item.qty + 1)} style={{ width: 32, height: 32, cursor: 'pointer', border: 'none', background: 'var(--bg)', fontSize: '1rem', color: 'var(--slate)' }}>+</button>
                        </div>
                        <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1rem', color: 'var(--green)', whiteSpace: 'nowrap' }}>{formatLKR(item.price * item.qty)}</div>
                        <button onClick={() => removeItem(item.key)} style={{ color: '#EF4444', fontSize: '0.78rem', cursor: 'pointer', padding: '0.25rem' }}>Remove</button>
                      </div>
                    </div>
                  ))}
                  <Link href="/products" style={{ fontSize: '0.85rem', color: 'var(--green)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.5rem' }}>
                    ← Continue Shopping
                  </Link>
                </div>

                {/* Order summary */}
                <div style={{ background: 'white', borderRadius: 16, border: '1px solid var(--border-light)', padding: '1.5rem', position: 'sticky', top: '6rem' }}>
                  <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '1.25rem' }}>Order Summary</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--muted)', marginBottom: '0.5rem' }}>
                    <span>Subtotal</span><span>{formatLKR(prodTotal)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--muted)', marginBottom: '0.5rem' }}>
                    <span>Total Weight</span><span>{totalWeight}g</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--muted)', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
                    <span>Est. Delivery</span><span>{formatLKR(delivery)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--ink)', marginBottom: '1.5rem' }}>
                    <span>Total</span><span style={{ color: 'var(--green)' }}>{formatLKR(grandTotal)}</span>
                  </div>
                  <div className="alert alert-info" style={{ marginBottom: '1.25rem', fontSize: '0.8rem' }}>
                    <span>📦</span>
                    <span>LKR 500 deposit required to confirm your order</span>
                  </div>
                  <Link href="/checkout/address" className="btn btn-primary" style={{ width: '100%' }}>
                    Proceed to Checkout
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
      <WAFloat />
    </>
  )
}
