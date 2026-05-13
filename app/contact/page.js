'use client'
import { useState } from 'react'
import Nav from '../../components/layout/Nav'
import Footer from '../../components/layout/Footer'
import WAFloat from '../../components/ui/WAFloat'
import { useReveal } from '../../components/ui/useReveal'
import { WA_LINK, WA_COMMUNITY, FB_PAGE } from '../../lib/utils'

export default function Contact() {
  useReveal()
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: 'general', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.phone) return
    const label = form.type === 'wholesale' ? '🏷️ WHOLESALE INQUIRY' : form.type === 'warranty' ? '🔧 WARRANTY CLAIM' : '📨 General Inquiry'
    const msg = `${label}\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\n\nMessage: ${form.message}`
    window.open(`${WA_LINK}${encodeURIComponent(msg)}`, '_blank')
    setSubmitted(true)
  }

  return (
    <>
      <Nav />

      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="page-hero__label">Techo Connect / Contact</div>
          <h1 className="page-hero__title">We're Here<br /><em>to Help.</em></h1>
          <p className="page-hero__desc">Reach us via WhatsApp, email, or the form below. Our technical team responds fast.</p>
        </div>
      </section>

      {/* WHOLESALE BANNER */}
      <section style={{ padding: '4rem 0', background: 'linear-gradient(135deg, #0AAD6E 0%, #078A57 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.3rem 0.9rem', background: 'rgba(255,255,255,0.2)', borderRadius: 100, fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'white', marginBottom: '1rem' }}>
                🏷️ Wholesale Program
              </div>
              <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 'clamp(1.8rem,3.5vw,2.5rem)', color: 'white', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1rem' }}>
                Are You a Reseller<br />or Bulk Buyer?
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                We offer special wholesale pricing for registered resellers and bulk buyers. Purchase 5+ antennas and unlock exclusive benefits that retail customers don't get.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[
                  '💸 Special discounted wholesale price',
                  '🛡️ 2-Year one-to-one replacement warranty (any manufacturing error)',
                  '📦 Priority dispatch and bulk packing',
                  '🤝 Dedicated account manager via WhatsApp',
                  '📊 Monthly invoice and reporting support',
                ].map(b => (
                  <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
                    {b}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', borderRadius: 16, padding: '2rem', border: '1px solid rgba(255,255,255,0.2)' }}>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.2rem', color: 'white', marginBottom: '0.4rem' }}>Qualify for Wholesale</div>
                <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)', marginBottom: '1.5rem' }}>Minimum 5 units per order. Reach out to discuss your requirements.</p>
                <a href={`${WA_LINK}${encodeURIComponent('Hello! I\'m interested in the Techo Connect wholesale program. Please share pricing and terms.')}`} target="_blank" rel="noopener" className="btn" style={{ background: 'white', color: 'var(--green)', fontWeight: 700, width: '100%', justifyContent: 'center', marginBottom: '0.75rem' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#0AAD6E"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
                  Enquire via WhatsApp
                </a>
                <a href="mailto:connect@techotraders.com.lk" className="btn" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', width: '100%', justifyContent: 'center' }}>
                  Email Us Instead
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTACT */}
      <section style={{ padding: '6rem 0', background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>

            {/* Contact info */}
            <div>
              <div className="label" style={{ marginBottom: '0.75rem' }}>Get In Touch</div>
              <h2 className="section-title reveal" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Contact <em>Details</em></h2>

              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {[
                  { icon: '📞', label: 'Phone / WhatsApp', value: '+94 70 665 6007', sub: 'Mon–Fri 9am–5pm, Sat 9am–12pm', href: 'tel:+94706656007' },
                  { icon: '✉️', label: 'Email', value: 'connect@techotraders.com.lk', sub: 'Response within 4 business hours', href: 'mailto:connect@techotraders.com.lk' },
                  { icon: '📍', label: 'Address', value: 'Kallady, Batticaloa, Sri Lanka', sub: 'Island-wide delivery from here', href: null },
                  { icon: '🌐', label: 'Parent Company', value: 'Techo Traders (Pvt) Ltd', sub: 'techotraders.com.lk', href: 'https://www.techotraders.com.lk' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1.25rem 0', borderBottom: '1px solid var(--border-light)' }}>
                    <div style={{ width: 42, height: 42, background: 'rgba(10,173,110,0.1)', border: '1px solid rgba(10,173,110,0.2)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }}>{item.icon}</div>
                    <div>
                      <div style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '0.2rem' }}>{item.label}</div>
                      {item.href ? (
                        <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noopener" style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--ink)' }}>{item.value}</a>
                      ) : (
                        <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--ink)' }}>{item.value}</div>
                      )}
                      <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.1rem' }}>{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social / Community */}
              <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <a href={`${WA_LINK}${encodeURIComponent('Hello Techo Connect! I have a question.')}`} target="_blank" rel="noopener" className="btn btn-wa" style={{ justifyContent: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
                  Chat on WhatsApp — +94 70 665 6007
                </a>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <a href={WA_COMMUNITY} target="_blank" rel="noopener" className="btn btn-outline" style={{ justifyContent: 'center', fontSize: '0.82rem' }}>Join WA Community</a>
                  <a href={FB_PAGE} target="_blank" rel="noopener" className="btn btn-ghost" style={{ justifyContent: 'center', fontSize: '0.82rem' }}>Follow on Facebook</a>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="reveal" data-d="1">
              <div style={{ background: 'white', borderRadius: 16, border: '1px solid var(--border-light)', padding: '2.5rem', boxShadow: 'var(--shadow-sm)' }}>
                {submitted ? (
                  <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                    <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>✅</div>
                    <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.3rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>Message Sent!</div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.7 }}>Your message has been sent to our WhatsApp. We'll respond shortly during working hours.</p>
                    <button onClick={() => setSubmitted(false)} className="btn btn-outline" style={{ marginTop: '1.5rem' }}>Send Another Message</button>
                  </div>
                ) : (
                  <>
                    <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.3rem', color: 'var(--ink)', marginBottom: '0.4rem' }}>Send a Message</div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '1.75rem' }}>We'll respond via WhatsApp during working hours.</p>
                    <form onSubmit={handleSubmit}>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Your Name *</label>
                          <input className="form-control" placeholder="Full name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required />
                        </div>
                        <div className="form-group">
                          <label>Phone / WhatsApp *</label>
                          <input className="form-control" type="tel" placeholder="0712345678" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} required />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input className="form-control" type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
                      </div>
                      <div className="form-group">
                        <label>Inquiry Type</label>
                        <select className="form-control" value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>
                          <option value="general">General Inquiry</option>
                          <option value="order">Order / Delivery Question</option>
                          <option value="wholesale">Wholesale / Bulk Pricing</option>
                          <option value="warranty">Warranty / Return Claim</option>
                          <option value="technical">Technical Support</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Message</label>
                        <textarea className="form-control" placeholder="How can we help you?" value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} style={{ minHeight: 100 }} />
                      </div>
                      <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                        Send via WhatsApp
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WAFloat />

      <style jsx>{`
        @media (max-width: 768px) {
          section > div > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
