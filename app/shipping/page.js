'use client'
import { useState } from 'react'
import Link from 'next/link'
import Nav from '../../components/layout/Nav'
import Footer from '../../components/layout/Footer'
import WAFloat from '../../components/ui/WAFloat'
import { WA_LINK } from '../../lib/utils'

export default function Shipping() {
  const deliveryExamples = [
    { weight: '600g (Yagi Pro – Base)', charge: 500, note: 'First 1kg = LKR 500' },
    { weight: '850g (Yagi Elite – Base)', charge: 500, note: 'Under 1kg = LKR 500' },
    { weight: '1,200g (Any order over 1kg)', charge: 600, note: 'LKR 500 + 1 extra kg × LKR 100' },
    { weight: '1,800g (Combo order)', charge: 700, note: 'LKR 500 + 2 extra kg × LKR 100' },
    { weight: '2,500g (Large combo)', charge: 800, note: 'LKR 500 + 3 extra kg × LKR 100' },
  ]

  // Shared inner content loop for mobile and desktop rendering maps
  const renderDispatchTimelineSteps = () => (
    [
      { step: 'Receipt Verified', time: 'Within 1–2 working hours', icon: '✅' },
      { step: 'Order Packed & Handed to Courier', time: 'Within 24 hours of verification', icon: '📦' },
      { step: 'Delivery to Your District', time: '1–3 working days after dispatch', icon: '🚚' },
    ].map(s => (
      <div key={s.step} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem', background: 'var(--bg)', borderRadius: 10, border: '1px solid var(--border-light)' }}>
        <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{s.icon}</span>
        <div>
          <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--ink)' }}>{s.step}</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--green)', fontWeight: 600 }}>{s.time}</div>
        </div>
      </div>
    ))
  )

  const renderDistrictBadgesList = () => (
    ['Ampara','Anuradhapura','Badulla','Batticaloa','Colombo','Galle','Gampaha','Hambantota','Jaffna','Kalutara','Kandy','Kegalle','Kilinochchi','Kurunegala','Mannar','Matale','Matara','Monaragala','Mullaitivu','Nuwara Eliya','Polonnaruwa','Puttalam','Ratnapura','Trincomalee','Vavuniya'].map(d => (
      <span key={d} style={{ padding: '0.25rem 0.65rem', background: 'rgba(10,173,110,0.08)', border: '1px solid rgba(10,173,110,0.15)', borderRadius: 6, fontSize: '0.78rem', color: 'var(--slate)', fontWeight: 500 }}>
        {d}
      </span>
    ))
  )

  return (
    <>
      <Nav />

      <section className="page-hero" style={{ paddingBottom: '3rem' }}>
        <div className="page-hero__bg" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="page-hero__label">Techo Connect / Legal</div>
          <h1 className="page-hero__title">Shipping<br /><em>Policy</em></h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: '0.75rem', position: 'relative', zIndex: 2 }}>
            Last Updated: <strong>January 2026</strong>
          </p>
        </div>
      </section>

      <section style={{ padding: '4rem 0 6rem', background: 'white' }}>
        <div className="container-sm">

          {/* ── DESKTOP ONLY REGION (100% Original styling parameters preserved) ── */}
          <div className="desktop-only">
            {/* Delivery charge calculator highlight */}
            <div style={{ background: 'linear-gradient(135deg, rgba(10,173,110,0.08) 0%, rgba(10,173,110,0.14) 100%)', border: '1px solid rgba(10,173,110,0.2)', borderRadius: 16, padding: '2rem', marginBottom: '3rem' }}>
              <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.3rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>
                📦 How Delivery Charges Work
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                <div style={{ background: 'white', borderRadius: 12, padding: '1.25rem', border: '1px solid rgba(10,173,110,0.15)', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '2rem', color: 'var(--green)', lineHeight: 1 }}>LKR 500</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: '0.35rem' }}>First kilogram (0–1000g)</div>
                </div>
                <div style={{ background: 'white', borderRadius: 12, padding: '1.25rem', border: '1px solid rgba(10,173,110,0.15)', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '2rem', color: 'var(--green)', lineHeight: 1 }}>+LKR 100</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: '0.35rem' }}>Per additional kilogram</div>
                </div>
              </div>
            </div>

            <div className="legal-content">
              <div style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--ink)', marginBottom: '1rem', paddingBottom: '0.6rem', borderBottom: '2px solid rgba(10,173,110,0.15)' }}>
                  Delivery Charge Examples
                </h2>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ background: 'var(--bg)' }}>
                        <th style={{ padding: '0.85rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--slate)', borderBottom: '1px solid var(--border-light)' }}>Order Weight</th>
                        <th style={{ padding: '0.85rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--slate)', borderBottom: '1px solid var(--border-light)' }}>Delivery Charge</th>
                        <th style={{ padding: '0.85rem 1rem', textAlign: 'left', fontWeight: 600, color: 'var(--slate)', borderBottom: '1px solid var(--border-light)' }}>Calculation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deliveryExamples.map((row, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid var(--border-light)' }}>
                          <td style={{ padding: '0.85rem 1rem', color: 'var(--slate)' }}>{row.weight}</td>
                          <td style={{ padding: '0.85rem 1rem', fontFamily: 'var(--font-head)', fontWeight: 700, color: 'var(--green)', fontSize: '1rem' }}>LKR {row.charge.toLocaleString()}</td>
                          <td style={{ padding: '0.85rem 1rem', color: 'var(--muted)', fontSize: '0.82rem' }}>{row.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: '0.75rem' }}>
                  * Delivery charges are calculated automatically at checkout based on the total weight of your order.
                </p>
              </div>

              <div style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--ink)', marginBottom: '1rem', paddingBottom: '0.6rem', borderBottom: '2px solid rgba(10,173,110,0.15)' }}>
                  Order Confirmation & Deposit
                </h2>
                <p>All orders require a <strong>LKR 500 deposit</strong> to be confirmed, regardless of payment method:</p>
                <ul>
                  <li><strong>Bank Deposit orders:</strong> Deposit the full order amount + LKR 500. Upload the receipt to confirm.</li>
                  <li><strong>Cash on Delivery orders:</strong> Deposit LKR 500 to our bank account first, then pay the remainder on delivery.</li>
                </ul>
                <p>Orders are dispatched only after the deposit receipt has been verified by our team (within 1–2 working hours on business days).</p>
              </div>

              <div style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--ink)', marginBottom: '1rem', paddingBottom: '0.6rem', borderBottom: '2px solid rgba(10,173,110,0.15)' }}>
                  Dispatch Timeline
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {renderDispatchTimelineSteps()}
                </div>
              </div>

              <div style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--ink)', marginBottom: '1rem', paddingBottom: '0.6rem', borderBottom: '2px solid rgba(10,173,110,0.15)' }}>
                  Delivery Coverage
                </h2>
                <p>We deliver to <strong>all 25 districts of Sri Lanka</strong> via third-party courier services. All 25 districts are covered:</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.75rem' }}>
                  {renderDistrictBadgesList()}
                </div>
              </div>

              <div style={{ marginBottom: '2.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--ink)', marginBottom: '1rem', paddingBottom: '0.6rem', borderBottom: '2px solid rgba(10,173,110,0.15)' }}>
                  Delivery Liability
                </h2>
                <p>Techo Connect is not liable for delivery delays caused by:</p>
                <ul>
                  <li>Third-party courier delays or disruptions</li>
                  <li>Incorrect or incomplete delivery address provided by the customer</li>
                  <li>Natural disasters, floods, or extreme weather</li>
                  <li>Public holidays or courier operational closures</li>
                </ul>
                <p>If your parcel is delayed beyond 5 working days after dispatch, please contact us immediately via WhatsApp with your order number.</p>
              </div>
            </div>

            {/* Related policies desktop link cards row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '2rem' }}>
              {[
                { href: '/returns', label: 'Returns & Refunds', icon: '↩️' },
                { href: '/terms', label: 'Terms & Conditions', icon: '📋' },
                { href: '/privacy', label: 'Privacy Policy', icon: '🔒' },
              ].map(link => (
                <Link key={link.href} href={link.href} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '1rem 1.25rem', background: 'var(--bg)', border: '1px solid var(--border-light)', borderRadius: 10, fontSize: '0.875rem', fontWeight: 600, color: 'var(--slate)' }}>
                  <span>{link.icon}</span>{link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ── MOBILE ONLY REGION (Fluid stacked reading layouts) ── */}
          <div className="mobile-only">
            {/* Mobile delivery mechanisms layout grid block */}
            <div style={{ background: 'linear-gradient(135deg, rgba(10,173,110,0.08) 0%, rgba(10,173,110,0.14) 100%)', border: '1px solid rgba(10,173,110,0.15)', borderRadius: 12, padding: '1.25rem', marginBottom: '2rem' }}>
              <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.15rem', color: 'var(--ink)', marginBottom: '0.75rem', textAlign: 'center' }}>
                📦 How Delivery Charges Work
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ background: 'white', borderRadius: 8, padding: '1rem', border: '1px solid rgba(10,173,110,0.1)', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.6rem', color: 'var(--green)' }}>LKR 500</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.25rem' }}>First kilogram (0–1000g)</div>
                </div>
                <div style={{ background: 'white', borderRadius: 8, padding: '1rem', border: '1px solid rgba(10,173,110,0.1)', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.6rem', color: 'var(--green)' }}>+LKR 100</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.25rem' }}>Per additional kilogram</div>
                </div>
              </div>
            </div>

            <div className="legal-content" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
              {/* Delivery Examples Stacked list */}
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--ink)', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '2px solid rgba(10,173,110,0.15)' }}>
                  Delivery Charge Examples
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {deliveryExamples.map((row, i) => (
                    <div key={i} style={{ padding: '0.85rem', background: 'var(--bg)', borderRadius: 8, border: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--slate)' }}>{row.weight.split('(')[0].trim()}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{row.note}</div>
                      </div>
                      <strong style={{ color: 'var(--green)', fontSize: '0.95rem', fontFamily: 'var(--font-head)', fontWeight: 800 }}>LKR {row.charge}</strong>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.5rem' }}>
                  * Delivery charges are calculated automatically at checkout based on the total weight of your order.
                </p>
              </div>

              {/* Order Confirmation Block */}
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--ink)', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '2px solid rgba(10,173,110,0.15)' }}>
                  Order Confirmation & Deposit
                </h2>
                <p style={{ marginBottom: '0.5rem' }}>All orders require a <strong>LKR 500 deposit</strong> to be confirmed, regardless of payment method:</p>
                <ul style={{ paddingLeft: '1.2rem', marginBottom: '0.5rem' }}>
                  <li><strong>Bank Deposit orders:</strong> Deposit full amount + LKR 500. Upload receipt to confirm.</li>
                  <li><strong>Cash on Delivery orders:</strong> Deposit LKR 500 to our account first, then pay the remainder on arrival.</li>
                </ul>
                <p>Orders are dispatched only after the deposit receipt has been verified by our team (within 1–2 working hours on business days).</p>
              </div>

              {/* Timeline Block */}
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--ink)', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '2px solid rgba(10,173,110,0.15)' }}>
                  Dispatch Timeline
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {renderDispatchTimelineSteps()}
                </div>
              </div>

              {/* Coverage Block */}
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--ink)', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '2px solid rgba(10,173,110,0.15)' }}>
                  Delivery Coverage
                </h2>
                <p style={{ marginBottom: '0.5rem' }}>We deliver to <strong>all 25 districts of Sri Lanka</strong> via third-party courier services. All 25 districts are covered:</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.5rem' }}>
                  {renderDistrictBadgesList()}
                </div>
              </div>

              {/* Liability Block */}
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--ink)', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '2px solid rgba(10,173,110,0.15)' }}>
                  Delivery Liability
                </h2>
                <p style={{ marginBottom: '0.5rem' }}>Techo Connect is not liable for delivery delays caused by:</p>
                <ul style={{ paddingLeft: '1.2rem', marginBottom: '0.5rem' }}>
                  <li>Third-party courier delays or disruptions</li>
                  <li>Incorrect delivery address provided by the customer</li>
                  <li>Natural disasters, floods, or extreme weather</li>
                  <li>Public holidays or courier operational closures</li>
                </ul>
                <p>If your parcel is delayed beyond 5 working days after dispatch, please contact us immediately via WhatsApp with your order number.</p>
              </div>
            </div>

            {/* Vertically stacked links cross metrics link lists on mobile */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '2rem' }}>
              {[
                { href: '/returns', label: 'Returns & Refunds', icon: '↩️' },
                { href: '/terms', label: 'Terms & Conditions', icon: '📋' },
                { href: '/privacy', label: 'Privacy Policy', icon: '🔒' },
              ].map(link => (
                <Link key={link.href} href={link.href} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.85rem 1rem', background: 'var(--bg)', border: '1px solid var(--border-light)', borderRadius: 8, fontSize: '0.85rem', fontWeight: 600, color: 'var(--slate)' }}>
                  <span>{link.icon}</span>{link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA (Shared wrapper bounds container) */}
          <div style={{ background: 'var(--bg)', border: '1px solid var(--border-light)', borderRadius: 16, padding: '2rem', textAlign: 'center', marginTop: '2rem' }}>
            <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>Delivery Questions?</div>
            <p style={{ fontSize: '0.875rem', color: 'var(--muted)', marginBottom: '1.25rem' }}>Contact us on WhatsApp with your order number and we'll check your delivery status right away.</p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={`${WA_LINK}${encodeURIComponent('Hello! I have a question about my Techo Connect delivery.')}`} target="_blank" rel="noopener" className="btn btn-wa" style={{ padding: '0.75rem 1.25rem' }}>
                WhatsApp +94 70 665 6007
              </a>
              <Link href="/contact" className="btn btn-outline" style={{ padding: '0.75rem 1.25rem' }}>Contact Page</Link>
            </div>
          </div>

        </div>
      </section>

      <Footer />
      <WAFloat />
    </>
  )
}