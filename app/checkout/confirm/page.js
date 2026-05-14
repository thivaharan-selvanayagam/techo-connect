'use client'
import React from 'react'
import Link from 'next/link'
import Nav from '../../../components/layout/Nav'
import Footer from '../../../components/layout/Footer'
import WAFloat from '../../../components/ui/WAFloat'
import { useCheckoutStore } from '../../../store/cart'
import { WA_LINK } from '../../../lib/utils'

export default function ConfirmPage() {
  const { orderNumber, customer, paymentMethod } = useCheckoutStore()

  if (!orderNumber) {
    return (
      <>
        <Nav />
        <div style={{ paddingTop: '6rem', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
          <p style={{ color: 'var(--muted)' }}>No active order found.</p>
          <Link href="/products" className="btn btn-primary">Start Shopping</Link>
        </div>
        <Footer />
      </>
    )
  }

  // const waMsg = `Hi! I just placed order ${orderNumber}. My name is ${customer?.name}. Please confirm my order.`

  return (
    <>
      <Nav />
      <div style={{ paddingTop: '5.5rem', background: 'var(--bg)', padding: '5.5rem 0 5rem' }}>
        <div className="container-sm" style={{ maxWidth: 640 }}>

          {/* Steps */}
            <div className="steps" style={{ marginBottom: '3rem' }}>
              {['Cart', 'Your Details', 'Payment', 'Confirmation'].map((s, i) => (
                <React.Fragment key={s}> {/* ✅ Use formal Fragment with a key */}
                  <div className="step done">
                    <div className="step-num">✓</div>
                    {s}
                  </div>
                  {i < 3 && <div className="step-line" style={{ background: 'var(--green)' }} />}
                </React.Fragment>
              ))}
            </div>

          <div style={{ background: 'white', borderRadius: 20, border: '1px solid var(--border-light)', padding: '3rem', textAlign: 'center', boxShadow: 'var(--shadow-md)' }}>
            {/* Success icon */}
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(10,173,110,0.12)', border: '2px solid rgba(10,173,110,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '2.5rem' }}>
              ✅
            </div>

            <h1 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '2rem', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
              Order Confirmed!
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.7 }}>
              Thank you, {customer?.name}! Your order has been received and our team has been notified via WhatsApp.
            </p>

            {/* Order number */}
            <div style={{ background: 'var(--bg)', borderRadius: 12, padding: '1.25rem', marginBottom: '2rem', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.3rem' }}>Your Order Number</div>
              <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.8rem', color: 'var(--green)', letterSpacing: '0.02em' }}>{orderNumber}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.3rem' }}>Save this for reference</div>
            </div>

            {/* What happens next */}
            <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
              <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1rem', color: 'var(--ink)', marginBottom: '1rem' }}>What Happens Next</div>
              {[
                { icon: '📲', title: 'Team Notified', desc: 'Our team has received your order via WhatsApp and will process it shortly.' },
                { icon: '✅', title: 'Receipt Verified', desc: `Your ${paymentMethod === 'cod' ? 'LKR 500 deposit' : 'bank deposit'} will be verified within 1–2 working hours.` },
                { icon: '📦', title: 'Dispatched', desc: 'Your antenna will be packed and handed to our courier within 24 hours of verification.' },
                { icon: '🚚', title: 'Delivered', desc: `Delivery to ${customer?.district} typically takes 1–3 working days.` },
              ].map(step => (
                <div key={step.title} style={{ display: 'flex', gap: '1rem', padding: '0.75rem 0', borderBottom: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{step.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--ink)', marginBottom: '0.1rem' }}>{step.title}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {/* Add this inside your existing ConfirmPage component */}
            <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(10,173,110,0.05)', borderRadius: 15, border: '1px dashed var(--green)' }}>
              <p style={{ fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 500 }}>
                Need a receipt for your deposit?
              </p>
              <Link 
                href={`/orders/${orderNumber}/invoice`} 
                className="btn btn-outline" 
                style={{ width: '100%', background: 'white' }}
              >
                📄 View & Download Invoice
              </Link>
            </div>

              {/* <a href={`${WA_LINK}${encodeURIComponent(waMsg)}`} target="_blank" rel="noopener" className="btn btn-wa btn-lg" style={{ width: '100%' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
                Follow Up on WhatsApp
              </a> */}
              <Link href="/products" className="btn btn-outline" style={{ width: '100%' }}>Continue Shopping</Link>
            </div>

            <p style={{ fontSize: '0.78rem', color: 'var(--light-text)', marginTop: '1.5rem' }}>
              Questions? Call <strong style={{ color: 'var(--green)' }}>+94 70 665 6007</strong> or email <strong style={{ color: 'var(--green)' }}>connect@techotraders.com.lk</strong>
            </p>
          </div>
        </div>
      </div>
      <Footer />
      <WAFloat />
    </>
  )
}
