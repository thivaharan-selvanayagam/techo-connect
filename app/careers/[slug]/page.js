'use client'
import { useState } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Nav from '../../../components/layout/Nav'
import Footer from '../../../components/layout/Footer'
import WAFloat from '../../../components/ui/WAFloat'
import { useReveal } from '../../../components/ui/useReveal'
import { jobOpenings } from '../../../lib/data'
import { WA_LINK } from '../../../lib/utils'

export default function JobDetail({ params }) {
  // 2. Change this line: Remove use(params) and just use params
  const { slug } = params 
  const job = jobOpenings.find(j => j.slug === slug)
  if (!job) notFound()

  useReveal()
  const [form, setForm] = useState({ name: '', phone: '', email: '', location: '', experience: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleApply = (e) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.location) return
    const msg = `Hi Techo Connect! I want to apply for the ${job.title} position.\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nPreferred Location: ${form.location}\nExperience: ${form.experience}\n\n${form.message}`
    window.open(`${WA_LINK}${encodeURIComponent(msg)}`, '_blank')
    setSubmitted(true)
  }

  return (
    <>
      <Nav />

      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '1rem' }}>
            <Link href="/" style={{ color: 'var(--green)' }}>Home</Link>
            <span>›</span>
            <Link href="/careers" style={{ color: 'var(--green)' }}>Careers</Link>
            <span>›</span>
            <span>{job.title}</span>
          </div>
          <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span className="badge badge-green">{job.type}</span>
            <span className="badge" style={{ background: 'rgba(10,79,212,0.1)', color: '#073AA0' }}>{job.department}</span>
            <span className="badge badge-orange">{job.vacancies} / location</span>
          </div>
          <h1 className="page-hero__title">{job.title}</h1>
          <p className="page-hero__desc">{job.description.substring(0, 140)}...</p>
        </div>
      </section>

      <section style={{ padding: '5rem 0', background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '3rem', alignItems: 'start' }}>

            {/* Left — full job details */}
            <div>
              {/* Full description */}
              <div style={{ background: 'white', borderRadius: 16, border: '1px solid var(--border-light)', padding: '2rem', marginBottom: '1.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--ink)', marginBottom: '1rem' }}>About This Role</h2>
                <p style={{ fontSize: '0.925rem', color: 'var(--muted)', lineHeight: 1.85 }}>{job.description}</p>
              </div>

              {/* Responsibilities */}
              <div style={{ background: 'white', borderRadius: 16, border: '1px solid var(--border-light)', padding: '2rem', marginBottom: '1.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--ink)', marginBottom: '1rem' }}>Responsibilities</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {job.responsibilities.map(r => (
                    <div key={r} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.7rem', fontSize: '0.9rem', color: 'var(--slate)' }}>
                      <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(10,173,110,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      {r}
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div style={{ background: 'white', borderRadius: 16, border: '1px solid var(--border-light)', padding: '2rem', marginBottom: '1.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--ink)', marginBottom: '1rem' }}>Requirements</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {job.requirements.map(r => (
                    <div key={r} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.7rem', fontSize: '0.9rem', color: 'var(--slate)' }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', flexShrink: 0, marginTop: 7 }} />
                      {r}
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div style={{ background: 'white', borderRadius: 16, border: '1px solid var(--border-light)', padding: '2rem', marginBottom: '1.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--ink)', marginBottom: '1rem' }}>What We Offer</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  {job.benefits.map(b => (
                    <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', padding: '0.85rem', background: 'rgba(10,173,110,0.05)', borderRadius: 10, border: '1px solid rgba(10,173,110,0.12)', fontSize: '0.85rem', color: 'var(--slate)' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 1 }}><polyline points="20 6 9 17 4 12"/></svg>
                      {b}
                    </div>
                  ))}
                </div>
              </div>

              {/* Hiring locations */}
              <div style={{ background: 'white', borderRadius: 16, border: '1px solid var(--border-light)', padding: '2rem' }}>
                <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--ink)', marginBottom: '1rem' }}>Hiring Locations</h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '1rem' }}>We are hiring {job.vacancies} technician(s) in each of the following locations:</p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {job.locations.map(loc => (
                    <span key={loc} style={{ padding: '0.3rem 0.75rem', background: 'var(--bg)', border: '1px solid var(--border-light)', borderRadius: 8, fontSize: '0.8rem', fontWeight: 500, color: 'var(--slate)' }}>
                      📍 {loc}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — apply sidebar */}
            <div style={{ position: 'sticky', top: '6rem' }}>
              <div style={{ background: 'white', borderRadius: 16, border: '1px solid var(--border-light)', padding: '2rem', boxShadow: 'var(--shadow-md)' }}>
                <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--ink)', marginBottom: '0.4rem' }}>Apply Now</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '1.5rem' }}>Fill in your details and we'll connect you via WhatsApp.</p>

                {submitted ? (
                  <div>
                    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                      <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>✅</div>
                      <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>Application Sent!</div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Your details were sent to our WhatsApp. We'll get back to you shortly.</p>
                    </div>
                    <Link href="/careers" className="btn btn-outline" style={{ width: '100%' }}>← Back to Careers</Link>
                  </div>
                ) : (
                  <form onSubmit={handleApply}>
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input className="form-control" placeholder="Your name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required />
                    </div>
                    <div className="form-group">
                      <label>Phone / WhatsApp *</label>
                      <input className="form-control" type="tel" placeholder="0712345678" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} required />
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input className="form-control" type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
                    </div>
                    <div className="form-group">
                      <label>Preferred Location *</label>
                      <select className="form-control" value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} required>
                        <option value="">Select location...</option>
                        {job.locations.map(l => <option key={l} value={l}>{l}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Years of Experience</label>
                      <select className="form-control" value={form.experience} onChange={e => setForm(p => ({ ...p, experience: e.target.value }))}>
                        <option value="">Select...</option>
                        <option value="1 year">1 year</option>
                        <option value="2–3 years">2–3 years</option>
                        <option value="4+ years">4+ years</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Additional Message</label>
                      <textarea className="form-control" placeholder="Tell us about your experience..." value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} style={{ minHeight: 80 }} />
                    </div>
                    <button type="submit" className="btn btn-wa" style={{ width: '100%' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
                      Submit via WhatsApp
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WAFloat />
    </>
  )
}
