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
import toast from 'react-hot-toast'

export default function JobDetail({ params }) {
  const { slug } = params 
  const job = jobOpenings.find(j => j.slug === slug)
  if (!job) notFound()

  useReveal()
  const [form, setForm] = useState({ name: '', phone: '', email: '', location: '', experience: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleApply = async (e) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.location) return

    setLoading(true)
    const toastId = toast.loading('Sending your application...')

    const applicationMessage = `Position: ${job.title}
Preferred Location: ${form.location}
Years of Experience: ${form.experience || 'Not specified'}

Additional Notes:
${form.message || 'No additional message provided.'}`

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          type: `Job Application: ${job.title}`,
          message: applicationMessage,
        })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to submit application')

      toast.success('Application submitted successfully!', { id: toastId })
      setSubmitted(true)
    } catch (err) {
      console.error(err)
      toast.error('Email gateway busy. Redirecting to WhatsApp fallback...', { id: toastId })

      // Fallback: Open WhatsApp directly if API email fails
      const msg = `Hi Techo Connect! I want to apply for the ${job.title} position.\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nPreferred Location: ${form.location}\nExperience: ${form.experience}\n\n${form.message}`
      window.open(`${WA_LINK}${encodeURIComponent(msg)}`, '_blank')
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  // Shared Form Render Function to prevent code duplication between Desktop/Mobile views
  const renderFormContent = () => (
    submitted ? (
      <div>
        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>✅</div>
          <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>Application Sent!</div>
          <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>Your details have been submitted successfully. Our team will review your application and reach out shortly.</p>
        </div>
        <Link href="/careers" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>← Back to Careers</Link>
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
        <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
          {loading ? 'Sending Application...' : 'Submit Application'}
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
        </button>
      </form>
    )
  )

  return (
    <>
      <Nav />

      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: 'var(--green)' }}>Home</Link>
            <span>›</span>
            <Link href="/careers" style={{ color: 'var(--green)' }}>Careers</Link>
            <span>›</span>
            <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{job.title}</span>
          </div>
          <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span className="badge badge-green">{job.type}</span>
            <span className="badge" style={{ background: 'rgba(10,79,212,0.1)', color: '#073AA0' }}>{job.department}</span>
            <span className="badge badge-orange">{job.vacancies} / location</span>
          </div>
          <h1 className="page-hero__title" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>{job.title}</h1>
          <p className="page-hero__desc">{job.description.substring(0, 140)}...</p>
        </div>
      </section>

      <section style={{ padding: '4rem 0', background: 'var(--bg)' }}>
        <div className="container">
          
          {/* DESKTOP VIEW */}
          <div className="desktop-only" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '3rem', alignItems: 'start' }}>
            {/* Left Column */}
            <div>
              <div style={{ background: 'white', borderRadius: 16, border: '1px solid var(--border-light)', padding: '2rem', marginBottom: '1.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--ink)', marginBottom: '1rem' }}>About This Role</h2>
                <p style={{ fontSize: '0.925rem', color: 'var(--muted)', lineHeight: 1.85 }}>{job.description}</p>
              </div>

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

            {/* Right Sticky Sidebar Content */}
            <div style={{ position: 'sticky', top: '6rem' }}>
              <div style={{ background: 'white', borderRadius: 16, border: '1px solid var(--border-light)', padding: '2rem', boxShadow: 'var(--shadow-md)' }}>
                <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--ink)', marginBottom: '0.4rem' }}>Apply Now</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '1.5rem' }}>Fill in your details to apply directly for this role.</p>
                {renderFormContent()}
              </div>
            </div>
          </div>

          {/* MOBILE VIEW */}
          <div className="mobile-only" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* About Block */}
            <div style={{ background: 'white', borderRadius: 12, border: '1px solid var(--border-light)', padding: '1.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--ink)', marginBottom: '0.75rem' }}>About This Role</h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.65 }}>{job.description}</p>
            </div>

            {/* Application Form */}
            <div style={{ background: 'white', borderRadius: 12, border: '1px solid var(--border-light)', padding: '1.5rem', boxShadow: 'var(--shadow-md)' }}>
              <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--ink)', marginBottom: '0.35rem' }}>Apply Now</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '1.25rem' }}>Fill in your details to apply directly for this role.</p>
              {renderFormContent()}
            </div>

            {/* Responsibilities Block */}
            <div style={{ background: 'white', borderRadius: 12, border: '1px solid var(--border-light)', padding: '1.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--ink)', marginBottom: '0.75rem' }}>Responsibilities</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {job.responsibilities.map(r => (
                  <div key={r} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--slate)', lineHeight: 1.5 }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(10,173,110,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    {r}
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements Block */}
            <div style={{ background: 'white', borderRadius: 12, border: '1px solid var(--border-light)', padding: '1.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--ink)', marginBottom: '0.75rem' }}>Requirements</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {job.requirements.map(r => (
                  <div key={r} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--slate)', lineHeight: 1.5 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--green)', flexShrink: 0, marginTop: 7 }} />
                    {r}
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits Block Stacked */}
            <div style={{ background: 'white', borderRadius: 12, border: '1px solid var(--border-light)', padding: '1.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--ink)', marginBottom: '0.75rem' }}>What We Offer</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {job.benefits.map(b => (
                  <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', padding: '0.75rem', background: 'rgba(10,173,110,0.05)', borderRadius: 8, border: '1px solid rgba(10,173,110,0.12)', fontSize: '0.82rem', color: 'var(--slate)' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 2 }}><polyline points="20 6 9 17 4 12"/></svg>
                    {b}
                  </div>
                ))}
              </div>
            </div>

            {/* Locations Block */}
            <div style={{ background: 'white', borderRadius: 12, border: '1px solid var(--border-light)', padding: '1.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>Hiring Locations</h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.75rem' }}>We are hiring {job.vacancies} technician(s) in each of the following locations:</p>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {job.locations.map(loc => (
                  <span key={loc} style={{ padding: '0.25rem 0.6rem', background: 'var(--bg)', border: '1px solid var(--border-light)', borderRadius: 6, fontSize: '0.75rem', color: 'var(--slate)' }}>
                    📍 {loc}
                  </span>
                ))}
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