'use client'
import React, { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Nav from '../../../components/layout/Nav'
import Footer from '../../../components/layout/Footer'
import WAFloat from '../../../components/ui/WAFloat'
import { useCheckoutStore } from '../../../store/cart'

// Main inner component that reads search params
function ConfirmPageContent() {
  const searchParams = useSearchParams()
  
  // 1. Prioritize order number from the URL bar to survive store resets
  const urlOrderNumber = searchParams.get('orderNumber')
  const { orderNumber: storeOrderNumber, customer, paymentMethod } = useCheckoutStore()
  
  const orderNumber = urlOrderNumber || storeOrderNumber

  // Fallbacks if store state was wiped completely
  const customerName = customer?.name || 'Valued Customer'
  const districtName = customer?.district ? `to ${customer.district}` : 'island-wide'
  const displayMethod = paymentMethod === 'cod' ? 'LKR 500 deposit' : 'bank deposit'

  if (!orderNumber) {
    return (
      <div style={{ paddingTop: '6rem', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <p style={{ color: 'var(--muted)' }}>No active order found.</p>
        <Link href="/products" className="btn btn-primary">Start Shopping</Link>
      </div>
    )
  }

  // Shared content rendering matrix array to prevent variable data sync fragmentation
  const nextStepsData = [
    { icon: '📲', title: 'Team Notified', desc: 'Our team has received your order via WhatsApp and will process it shortly.' },
    { icon: '🛡️', title: 'Receipt Verified', desc: `Your ${displayMethod} will be verified within 1–2 working hours.` },
    { icon: '📦', title: 'Dispatched', desc: 'Your antenna will be packed and handed to our courier within 24 hours of verification.' },
    { icon: '🚚', title: 'Delivered', desc: `Delivery ${districtName} typically takes 1–3 working days.` },
  ]

  return (
    <div style={{ paddingTop: '5.5rem', background: 'var(--bg)', padding: '5.5rem 0 5rem' }}>
      <div className="container-sm" style={{ maxWidth: 640 }}>

        {/* Steps */}
        <div className="steps" style={{ marginBottom: '3rem' }}>
          {['Cart', 'Your Details', 'Payment', 'Confirmation'].map((s, i) => (
            <React.Fragment key={s}>
              <div className="step done">
                <div className="step-num">✓</div>
                {s}
              </div>
              {i < 3 && <div className="step-line" style={{ background: 'var(--green)' }} />}
            </React.Fragment>
          ))}
        </div>

        {/* DESKTOP CONFIRMATION CONTAINER (100% Unchanged original card alignment metrics) */}
        <div className="desktop-only" style={{ background: 'white', borderRadius: 20, border: '1px solid var(--border-light)', padding: '3rem', textAlign: 'center', boxShadow: 'var(--shadow-md)' }}>
          {/* Success icon */}
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(10,173,110,0.12)', border: '2px solid rgba(10,173,110,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2.5rem' }}>
            ✅
          </div>

          <h1 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '2rem', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
            Order Confirmed!
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.7 }}>
            Thank you, {customerName}! Your order has been received and our team has been notified via WhatsApp.
          </p>

          {/* Order number box */}
          <div style={{ background: 'var(--bg)', borderRadius: 12, padding: '1.25rem', marginBottom: '2rem', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.3rem' }}>Your Order Number</div>
            <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.8rem', color: 'var(--green)', letterSpacing: '0.02em' }}>{orderNumber}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.3rem' }}>Save this for reference</div>
          </div>

          {/* What happens next */}
          <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
            <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1rem', color: 'var(--ink)', margin: '1.5rem 0 1rem' }}>What Happens Next</div>
            {nextStepsData.map(step => (
              <div key={step.title} style={{ display: 'flex', gap: '1rem', padding: '0.75rem 0', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{step.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--ink)', marginBottom: '0.1' }}>{step.title}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions Workspace */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {/* Invoice Link Wrapper Box */}
            <div style={{ padding: '1.5rem', background: 'rgba(10,173,110,0.04)', borderRadius: 15, border: '1px dashed var(--green)', marginBottom: '0.5rem' }}>
              <p style={{ fontSize: '0.88rem', marginBottom: '0.75rem', fontWeight: 600, color: 'var(--slate)' }}>
                Need an official payment receipt?
              </p>
              <Link 
                href={`/orders/${orderNumber}/invoice`} 
                className="btn btn-primary" 
                style={{ width: '100%', textAlign: 'center' }}
              >
                📄 View & Download Invoice
              </Link>
            </div>

            <Link href="/products" className="btn btn-outline" style={{ width: '100%', textAlign: 'center' }}>
              Continue Shopping
            </Link>
          </div>

          <p style={{ fontSize: '0.78rem', color: 'var(--light-text)', marginTop: '2rem' }}>
            Questions? Call <strong style={{ color: 'var(--green)' }}>+94 70 665 6007</strong> or email <strong style={{ color: 'var(--green)' }}>connect@techotraders.com.lk</strong>
          </p>
        </div>

        {/* MOBILE CONFIRMATION CONTAINER (Fluid vertical stack alternative layout configuration) */}
        <div className="mobile-only" style={{ background: 'white', borderRadius: 16, border: '1px solid var(--border-light)', padding: '2rem 1.25rem', textAlign: 'center', boxShadow: 'var(--shadow-md)' }}>
          {/* Compact success status icon row */}
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(10,173,110,0.12)', border: '2px solid rgba(10,173,110,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '2rem' }}>
            ✅
          </div>

          <h1 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.6rem', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
            Order Confirmed!
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
            Thank you, {customerName}! Your order has been received and our team has been notified via WhatsApp.
          </p>

          {/* Compressed Order number tracking token layout badge */}
          <div style={{ background: 'var(--bg)', borderRadius: 10, padding: '1rem', marginBottom: '1.5rem', border: '1px solid var(--border-light)' }}>
            <div style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.25rem' }}>Your Order Number</div>
            <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.5rem', color: 'var(--green)' }}>{orderNumber}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '0.2rem' }}>Save this for reference</div>
          </div>

          {/* Step matrix items mapping row stacker layout block */}
          <div style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
            <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--ink)', marginBottom: '0.75rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.4rem' }}>What Happens Next</div>
            {nextStepsData.map(step => (
              <div key={step.title} style={{ display: 'flex', gap: '0.75rem', padding: '0.65rem 0', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: '0.1rem' }}>{step.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--ink)' }}>{step.title}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.4, marginTop: '0.1rem' }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Responsive Action Terminals buttons element arrays stack wrapper */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
            <div style={{ padding: '1rem', background: 'rgba(10,173,110,0.04)', borderRadius: 10, border: '1px dashed var(--green)' }}>
              <p style={{ fontSize: '0.82rem', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--slate)' }}>
                Need an official payment receipt?
              </p>
              <Link 
                href={`/orders/${orderNumber}/invoice`} 
                className="btn btn-primary" 
                style={{ width: '100%', padding: '0.75rem', textAlign: 'center' }}
              >
                📄 Download Invoice
              </Link>
            </div>

            <Link href="/products" className="btn btn-outline" style={{ width: '100%', padding: '0.75rem', textAlign: 'center' }}>
              Continue Shopping
            </Link>
          </div>

          <p style={{ fontSize: '0.75rem', color: 'var(--light-text)', marginTop: '1.5rem', lineHeight: 1.5 }}>
            Questions? Call <strong style={{ color: 'var(--green)' }}>+94 70 665 6007</strong> <br />or email <strong style={{ color: 'var(--green)' }}>connect@techotraders.com.lk</strong>
          </p>
        </div>

      </div>
    </div>
  )
}

// Next.js App Router requirement: wrap parts that use useSearchParams in a Suspense boundary
export default function ConfirmPage() {
  return (
    <>
      <Nav />
      <Suspense fallback={<div style={{ paddingTop: '10rem', textAlign: 'center', color: 'var(--muted)' }}>Loading confirmation details...</div>}>
        <ConfirmPageContent />
      </Suspense>
      <Footer />
      <WAFloat />
    </>
  )
}