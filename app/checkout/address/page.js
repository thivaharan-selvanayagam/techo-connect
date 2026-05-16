'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Nav from '../../../components/layout/Nav'
import Footer from '../../../components/layout/Footer'
import { useCartStore } from '../../../store/cart'
import { useCheckoutStore } from '../../../store/cart'
import { SRI_LANKA_DISTRICTS, formatLKR, calcDelivery } from '../../../lib/utils'

export default function AddressPage() {
  const router = useRouter()
  const items = useCartStore(s => s.items)
  const setCustomer = useCheckoutStore(s => s.setCustomer)
  const savedCustomer = useCheckoutStore(s => s.customer)

  const totalWeight = items.reduce((s, i) => s + i.weight * i.qty, 0)
  const productTotal = items.reduce((s, i) => s + i.price * i.qty, 0)
  const delivery = calcDelivery(totalWeight)

  const [form, setForm] = useState({
    name: savedCustomer.name || '',
    address: savedCustomer.address || '',
    district: savedCustomer.district || '',
    phone1: savedCustomer.phone1 || '',
    phone2: savedCustomer.phone2 || '',
  })
  const [errors, setErrors] = useState({})

  if (items.length === 0) {
    return (
      <>
        <Nav />
        <div style={{ paddingTop: '6rem', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'var(--muted)', marginBottom: '1rem' }}>Your cart is empty.</p>
            <Link href="/products" className="btn btn-primary">Shop Now</Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!form.address.trim()) e.address = 'Delivery address is required'
    if (!form.district) e.district = 'Please select your district'
    if (!form.phone1.trim()) e.phone1 = 'Phone number is required'
    else if (!/^0\d{9}$/.test(form.phone1.replace(/\s/g, ''))) e.phone1 = 'Enter a valid Sri Lankan phone number (e.g. 0712345678)'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setCustomer(form)
    router.push('/checkout/payment')
  }

  const field = (name, label, required, type = 'text', placeholder = '') => (
    <div className="form-group">
      <label htmlFor={name}>{label} {required && <span style={{ color: '#EF4444' }}>*</span>}</label>
      <input
        id={name} name={name} type={type}
        className="form-control"
        placeholder={placeholder}
        value={form[name]}
        onChange={e => { setForm(p => ({ ...p, [name]: e.target.value })); setErrors(p => ({ ...p, [name]: '' })) }}
        style={{ borderColor: errors[name] ? '#EF4444' : '' }}
      />
      {errors[name] && <div style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '0.3rem' }}>{errors[name]}</div>}
    </div>
  )

  // Shared inner content function for the order items block
  const renderOrderSummaryItems = () => (
    <>
      <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1rem', color: 'var(--ink)', marginBottom: '1.1rem' }}>Order Summary</div>
      {items.map(item => (
        <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.5rem', gap: '0.5rem' }}>
          <span style={{ color: 'var(--slate)' }}>{item.name} {item.variantName ? `(${item.variantName.split('+')[0].trim()})` : ''} × {item.qty}</span>
          <span style={{ fontWeight: 600, color: 'var(--ink)', whiteSpace: 'nowrap' }}>{formatLKR(item.price * item.qty)}</span>
        </div>
      ))}
      <div style={{ borderTop: '1px solid var(--border-light)', marginTop: '0.75rem', paddingTop: '0.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.4rem' }}>
          <span>Delivery ({totalWeight}g)</span><span>{formatLKR(delivery)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--ink)', marginTop: '0.5rem' }}>
          <span>Total</span><span style={{ color: 'var(--green)' }}>{formatLKR(productTotal + delivery)}</span>
        </div>
      </div>
    </>
  )

  return (
    <>
      <Nav />
      <div style={{ paddingTop: '5.5rem', minHeight: '80vh', background: 'var(--bg)', padding: '5.5rem 0 4rem' }}>
        <div className="container-sm">

          {/* Steps */}
          <div className="steps" style={{ marginBottom: '2.5rem' }}>
            <div className="step done"><div className="step-num">✓</div>Cart</div>
            <div className="step-line" style={{ background: 'var(--green)' }} />
            <div className="step active"><div className="step-num">2</div>Your Details</div>
            <div className="step-line" />
            <div className="step"><div className="step-num">3</div>Payment</div>
            <div className="step-line" />
            <div className="step"><div className="step-num">4</div>Confirmation</div>
          </div>

          {/* DESKTOP VIEW (100% Unchanged original dual column grid setup) */}
          <div className="desktop-only" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '2rem', alignItems: 'start' }}>
            {/* Form */}
            <div style={{ background: 'white', borderRadius: 16, border: '1px solid var(--border-light)', padding: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.4rem', color: 'var(--ink)', marginBottom: '0.4rem' }}>Delivery Details</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '1.75rem' }}>We'll deliver to this address. Please double-check before proceeding.</p>

              <form onSubmit={handleSubmit} noValidate>
                {field('name', 'Full Name', true, 'text', 'Your full name')}
                {field('address', 'Delivery Address', true, 'text', 'House no, street, city')}

                <div className="form-group">
                  <label htmlFor="district">District <span style={{ color: '#EF4444' }}>*</span></label>
                  <select
                    id="district" name="district"
                    className="form-control"
                    value={form.district}
                    onChange={e => { setForm(p => ({ ...p, district: e.target.value })); setErrors(p => ({ ...p, district: '' })) }}
                    style={{ borderColor: errors.district ? '#EF4444' : '' }}
                  >
                    <option value="">Select your district...</option>
                    {SRI_LANKA_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  {errors.district && <div style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '0.3rem' }}>{errors.district}</div>}
                </div>

                <div className="form-row">
                  <div>
                    {field('phone1', 'Phone Number 1', true, 'tel', '0712345678')}
                  </div>
                  <div>
                    {field('phone2', 'Phone Number 2 (Optional)', false, 'tel', '0712345678')}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <Link href="/checkout" className="btn btn-ghost" style={{ flex: 1 }}>&larr; Back to Cart</Link>
                  <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                    Continue to Payment
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                  </button>
                </div>
              </form>
            </div>

            {/* Order summary sidebar */}
            <div style={{ background: 'white', borderRadius: 16, border: '1px solid var(--border-light)', padding: '1.5rem', position: 'sticky', top: '6rem' }}>
              {renderOrderSummaryItems()}
            </div>
          </div>

          {/* MOBILE VIEW (Fluid vertical stack alternative layout configuration) */}
          <div className="mobile-only" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Quick Summary View Box at Top for Mobile Contextual Reference */}
            <div style={{ background: 'white', borderRadius: 12, border: '1px solid var(--border-light)', padding: '1.25rem' }}>
              {renderOrderSummaryItems()}
            </div>

            {/* Delivery Inputs Box */}
            <div style={{ background: 'white', borderRadius: 12, border: '1px solid var(--border-light)', padding: '1.25rem' }}>
              <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--ink)', marginBottom: '0.35rem' }}>Delivery Details</h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '1.25rem' }}>We'll deliver to this address. Please double-check before proceeding.</p>

              <form onSubmit={handleSubmit} noValidate>
                {field('name', 'Full Name', true, 'text', 'Your full name')}
                {field('address', 'Delivery Address', true, 'text', 'House no, street, city')}

                <div className="form-group">
                  <label htmlFor="mobile-district">District <span style={{ color: '#EF4444' }}>*</span></label>
                  <select
                    id="mobile-district" name="district"
                    className="form-control"
                    value={form.district}
                    onChange={e => { setForm(p => ({ ...p, district: e.target.value })); setErrors(p => ({ ...p, district: '' })) }}
                    style={{ borderColor: errors.district ? '#EF4444' : '' }}
                  >
                    <option value="">Select your district...</option>
                    {SRI_LANKA_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  {errors.district && <div style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '0.3rem' }}>{errors.district}</div>}
                </div>

                {/* Relying on core global form-row stack framework properties natively optimized in globals.css */}
                <div className="form-row">
                  <div>
                    {field('phone1', 'Phone Number 1', true, 'tel', '0712345678')}
                  </div>
                  <div>
                    {field('phone2', 'Phone Number 2 (Optional)', false, 'tel', '0712345678')}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.8rem' }}>
                    Continue to Payment
                  </button>
                  <Link href="/checkout" className="btn btn-ghost" style={{ width: '100%', padding: '0.8rem', textAlign: 'center' }}>
                    &larr; Back to Cart
                  </Link>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  )
}