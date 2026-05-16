'use client'
import Link from 'next/link'
import Nav from '../../components/layout/Nav'
import Footer from '../../components/layout/Footer'
import WAFloat from '../../components/ui/WAFloat'
import { useReveal } from '../../components/ui/useReveal'
import { jobOpenings } from '../../lib/data'
import { WA_LINK } from '../../lib/utils'

export default function Careers() {
  useReveal()

  const benefits = [
    { icon: '💰', title: 'Paid Per Installation', desc: 'Earn competitively for every antenna you install. The more you do, the more you earn — on your schedule.' },
    { icon: '🕐', title: 'Flexible Hours', desc: 'Part-time role — fit installations around your existing commitments. You choose your availability.' },
    { icon: '📱', title: 'WhatsApp Support', desc: 'Our technical team supports you directly via WhatsApp for every installation question you encounter.' },
    { icon: '🎓', title: 'Full Training', desc: 'We provide complete product training on all Techo Connect antenna models before you start.' },
    { icon: '🌍', title: 'Work Near Home', desc: 'We place technicians in their own district — no long-distance travel required.' },
    { icon: '📈', title: 'Grow With Us', desc: 'As Techo Connect expands, we promote skilled technicians into senior and team lead positions.' },
  ]

  return (
    <>
      <Nav />

      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="page-hero__label">Techo Connect / Careers</div>
          <h1 className="page-hero__title">Build Sri Lanka's<br /><em>Signal Network</em></h1>
          <p className="page-hero__desc">Join our growing team of antenna technicians and signal engineers working island-wide to connect Sri Lanka.</p>
        </div>
      </section>

      {/* WHY JOIN */}
      <section style={{ padding: '5rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="label" style={{ justifyContent: 'center', marginBottom: '0.75rem' }}>Why Techo Connect</div>
            <h2 className="section-title reveal">Work With a <em>Growing Team</em></h2>
          </div>

          {/* DESKTOP BENEFITS GRID (100% Unchanged original 3-column configuration) */}
          <div className="desktop-only" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            {benefits.map((b, i) => (
              <div key={b.title} className="reveal" data-d={String(i % 3)} style={{ background: 'var(--bg)', border: '1px solid var(--border-light)', borderRadius: 14, padding: '1.75rem' }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.6rem' }}>{b.icon}</div>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '0.95rem', color: 'var(--ink)', marginBottom: '0.4rem' }}>{b.title}</div>
                <div style={{ fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.7 }}>{b.desc}</div>
              </div>
            ))}
          </div>

          {/* MOBILE BENEFITS LIST (Optimized vertical stack) */}
          <div className="mobile-only" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {benefits.map((b) => (
              <div key={b.title} style={{ background: 'var(--bg)', border: '1px solid var(--border-light)', borderRadius: 12, padding: '1.5rem' }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{b.icon}</div>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1rem', color: 'var(--ink)', marginBottom: '0.4rem' }}>{b.title}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.55 }}>{b.desc}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* JOB OPENINGS */}
      <section style={{ padding: '5rem 0', background: 'var(--bg)' }}>
        <div className="container">
          <div className="label" style={{ marginBottom: '0.75rem' }}>Current Openings</div>
          <h2 className="section-title reveal" style={{ marginBottom: '2.5rem' }}>Open <em>Positions</em></h2>

          {/* DESKTOP JOB OPENINGS (100% Unchanged original layout matrix) */}
          <div className="desktop-only">
            {jobOpenings.filter(j => j.active).map(job => (
              <div key={job.slug} className="reveal" style={{ background: 'white', border: '1px solid var(--border-light)', borderRadius: 16, padding: '2rem', marginBottom: '1.25rem', boxShadow: 'var(--shadow-card)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                      <span className="badge badge-green">{job.type}</span>
                      <span className="badge" style={{ background: 'rgba(10,79,212,0.08)', color: '#073AA0' }}>{job.department}</span>
                      <span className="badge badge-orange">{job.vacancies} / location</span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.4rem', color: 'var(--ink)', letterSpacing: '-0.01em', marginBottom: '0.5rem' }}>{job.title}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--muted)', lineHeight: 1.7, maxWidth: 560, marginBottom: '1rem' }}>{job.description.substring(0, 160)}...</p>

                    <div style={{ marginBottom: '0.75rem' }}>
                      <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.4rem' }}>Hiring Locations</div>
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                        {job.locations.map(loc => (
                          <span key={loc} style={{ padding: '0.2rem 0.6rem', background: 'var(--bg)', border: '1px solid var(--border-light)', borderRadius: 6, fontSize: '0.75rem', fontWeight: 500, color: 'var(--slate)' }}>
                            📍 {loc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', flexShrink: 0 }}>
                    <Link href={`/careers/${job.slug}`} className="btn btn-primary">
                      View & Apply
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                    </Link>
                    <a href={`${WA_LINK}${encodeURIComponent(`Hi! I'm interested in the ${job.title} position at Techo Connect. Please share more details.`)}`} target="_blank" rel="noopener" className="btn btn-wa">
                      Ask on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* MOBILE JOB OPENINGS (Stacked block alternative layout) */}
          <div className="mobile-only" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {jobOpenings.filter(j => j.active).map(job => (
              <div key={job.slug} style={{ background: 'white', border: '1px solid var(--border-light)', borderRadius: 14, padding: '1.25rem', boxShadow: 'var(--shadow-card)' }}>
                <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                  <span className="badge badge-green" style={{ fontSize: '0.68rem', padding: '0.2rem 0.5rem' }}>{job.type}</span>
                  <span className="badge" style={{ background: 'rgba(10,79,212,0.08)', color: '#073AA0', fontSize: '0.68rem', padding: '0.2rem 0.5rem' }}>{job.department}</span>
                  <span className="badge badge-orange" style={{ fontSize: '0.68rem', padding: '0.2rem 0.5rem' }}>{job.vacancies} Vacant</span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--ink)', lineHeight: 1.3, marginBottom: '0.5rem' }}>{job.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.5, marginBottom: '1rem' }}>{job.description.substring(0, 140)}...</p>

                <div style={{ marginBottom: '1.25rem', borderTop: '1px solid rgba(0,0,0,0.04)', paddingTop: '0.75rem' }}>
                  <div style={{ fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.4rem' }}>Hiring Locations</div>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {job.locations.map(loc => (
                      <span key={loc} style={{ padding: '0.2rem 0.5rem', background: 'var(--bg)', border: '1px solid var(--border-light)', borderRadius: 6, fontSize: '0.72rem', color: 'var(--slate)' }}>
                        📍 {loc}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
                  <Link href={`/careers/${job.slug}`} className="btn btn-primary" style={{ width: '100%', padding: '0.75rem' }}>
                    View & Apply
                  </Link>
                  <a href={`${WA_LINK}${encodeURIComponent(`Hi! I'm interested in the ${job.title} position at Techo Connect. Please share more details.`)}`} target="_blank" rel="noopener" className="btn btn-wa" style={{ width: '100%', padding: '0.75rem', textAlign: 'center' }}>
                    Ask on WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* No more openings note */}
          <div style={{ textAlign: 'center', padding: '2rem', background: 'white', borderRadius: 12, border: '1px dashed var(--border-light)', marginTop: '1rem' }}>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Don't see a position that fits? Send your CV to <a href="mailto:connect@techotraders.com.lk" style={{ color: 'var(--green)', fontWeight: 600 }}>connect@techotraders.com.lk</a></p>
          </div>
        </div>
      </section>

      <Footer />
      <WAFloat />
    </>
  )
}