'use client'
import Link from 'next/link'
import Nav from '../../components/layout/Nav'
import Footer from '../../components/layout/Footer'
import WAFloat from '../../components/ui/WAFloat'
import { useReveal } from '../../components/ui/useReveal'
import { WA_LINK, WA_COMMUNITY, FB_PAGE } from '../../lib/utils'

export default function About() {
  useReveal()

  const whyUs = [
    { icon: '🇱🇰', title: 'Local Engineering', desc: 'Every antenna is tested on Sri Lankan carrier frequencies — Dialog, Mobitel, SLT, Hutch — to ensure perfect sync with local towers.' },
    { icon: '🏭', title: 'Premium Materials', desc: 'Industrial-grade PVC and high-conductivity aluminum-coated cables designed for lifetime durability in tropical weather conditions.' },
    { icon: '🎯', title: 'Expert Support', desc: 'Our technical team provides direct WhatsApp guidance to ensure your router achieves the lowest latency possible, wherever you are.' },
    { icon: '🚚', title: 'Island-Wide Delivery', desc: 'Fast courier delivery to all 25 districts of Sri Lanka. Confirmed orders are dispatched within 24 hours.' },
    { icon: '🔧', title: 'Warranty Backed', desc: '5-day checking warranty and 6-month service warranty on all main antenna models. No service charge on repairs.' },
    { icon: '📡', title: 'Signal-Optimised Design', desc: 'Precision-tuned Yagi elements targeting 700MHz–2700MHz — the frequency bands used by all major Sri Lankan 4G carriers.' },
  ]

  const hours = [
    { day: 'Monday – Friday', time: '9:00 AM – 5:00 PM' },
    { day: 'Saturday', time: '9:00 AM – 12:00 PM' },
    { day: 'Sunday & Public Holidays', time: 'Closed' },
  ]

  return (
    <>
      <Nav />

      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="page-hero__label">Techo Connect / About Us</div>
          <h1 className="page-hero__title">Connecting Sri Lanka<br /><em>One Signal at a Time</em></h1>
          <p className="page-hero__desc">We're a hardware engineering team based in Batticaloa, building Yagi antennas specifically tuned for Sri Lankan 4G networks.</p>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section style={{ padding: '6rem 0', background: 'white' }}>
        <div className="container">
          
          {/* DESKTOP WHO WE ARE (100% Unchanged original layout matrix) */}
          <div className="desktop-only" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
            <div>
              <div className="label" style={{ marginBottom: '0.75rem' }}>Who We Are</div>
              <h2 className="section-title reveal" style={{ marginBottom: '1.5rem' }}>Built for the<br /><em>Last Signal Mile</em></h2>
              <p className="reveal" data-d="1" style={{ color: 'var(--muted)', fontSize: '0.975rem', lineHeight: 1.85, marginBottom: '1rem' }}>
                Techo Connect is the hardware and antenna manufacturing arm of <a href="https://www.techotraders.com.lk" target="_blank" rel="noopener" style={{ color: 'var(--green)', fontWeight: 600 }}>Techo Traders</a>. We design, manufacture, and sell Yagi antennas built specifically for one purpose: boosting weak 4G/LTE signals for wireless routers across Sri Lanka.
              </p>
              <p className="reveal" data-d="2" style={{ color: 'var(--muted)', fontSize: '0.975rem', lineHeight: 1.85, marginBottom: '1rem' }}>
                Our products are the result of real-world testing in areas with notoriously poor signal — remote villages, hilly terrain, districts far from towers. Every element, every cable, every connector is chosen because it performs in the conditions our customers actually face.
              </p>
              <p className="reveal" data-d="3" style={{ color: 'var(--muted)', fontSize: '0.975rem', lineHeight: 1.85 }}>
                Based in Kallady, Batticaloa, we deliver island-wide and support every customer personally — not through a call centre, but directly via WhatsApp from our technical team.
              </p>
            </div>
            <div className="reveal" data-d="1">
              <div style={{ background: 'var(--bg)', border: '1px solid var(--border-light)', borderRadius: 20, padding: '2.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  {[
                    { val: '2', suffix: '+', lbl: 'Antenna Models' },
                    { val: '25', suffix: '', lbl: 'Districts Served' },
                    { val: '4', suffix: '', lbl: 'Carrier Networks' },
                    { val: '6', suffix: 'mo', lbl: 'Service Warranty' },
                  ].map(s => (
                    <div key={s.lbl} style={{ textAlign: 'center', padding: '1.25rem', background: 'white', borderRadius: 12, border: '1px solid var(--border-light)' }}>
                      <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '2.2rem', color: 'var(--green)', lineHeight: 1 }}>{s.val}<span style={{ fontSize: '1.3rem' }}>{s.suffix}</span></div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontWeight: 500, marginTop: '0.3rem' }}>{s.lbl}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {[
                    { icon: '📞', val: '+94 70 665 6007' },
                    { icon: '✉️', val: 'connect@techotraders.com.lk' },
                    { icon: '📍', val: 'Kallady, Batticaloa, Sri Lanka' },
                  ].map(c => (
                    <div key={c.val} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', fontSize: '0.875rem', color: 'var(--slate)' }}>
                      <span>{c.icon}</span><span>{c.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE WHO WE ARE (Stacked layout view) */}
          <div className="mobile-only" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div>
              <div className="label" style={{ marginBottom: '0.5rem' }}>Who We Are</div>
              <h2 className="section-title" style={{ marginBottom: '1.25rem', fontSize: '1.75rem' }}>Built for the<br /><em>Last Signal Mile</em></h2>
              <p style={{ color: 'var(--muted)', fontSize: '0.925rem', lineHeight: 1.65, marginBottom: '1rem' }}>
                Techo Connect is the hardware and antenna manufacturing arm of <a href="https://www.techotraders.com.lk" target="_blank" rel="noopener" style={{ color: 'var(--green)', fontWeight: 600 }}>Techo Traders</a>. We design, manufacture, and sell Yagi antennas built specifically for one purpose: boosting weak 4G/LTE signals for wireless routers across Sri Lanka.
              </p>
              <p style={{ color: 'var(--muted)', fontSize: '0.925rem', lineHeight: 1.65, marginBottom: '1rem' }}>
                Our products are the result of real-world testing in areas with notoriously poor signal — remote villages, hilly terrain, districts far from towers. Every element, every cable, every connector is chosen because it performs in the conditions our customers actually face.
              </p>
              <p style={{ color: 'var(--muted)', fontSize: '0.925rem', lineHeight: 1.65 }}>
                Based in Kallady, Batticaloa, we deliver island-wide and support every customer personally — directly via WhatsApp from our technical team.
              </p>
            </div>
            <div>
              <div style={{ background: 'var(--bg)', border: '1px solid var(--border-light)', borderRadius: 16, padding: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  {[
                    { val: '2', suffix: '+', lbl: 'Antenna Models' },
                    { val: '25', suffix: '', lbl: 'Districts Served' },
                    { val: '4', suffix: '', lbl: 'Carrier Networks' },
                    { val: '6', suffix: 'mo', lbl: 'Service Warranty' },
                  ].map(s => (
                    <div key={s.lbl} style={{ textAlign: 'center', padding: '1rem 0.5rem', background: 'white', borderRadius: 8, border: '1px solid var(--border-light)' }}>
                      <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.75rem', color: 'var(--green)', lineHeight: 1 }}>{s.val}<span style={{ fontSize: '1.1rem' }}>{s.suffix}</span></div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--muted)', fontWeight: 500, marginTop: '0.25rem' }}>{s.lbl}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1rem' }}>
                  {[
                    { icon: '📞', val: '+94 70 665 6007' },
                    { icon: '✉️', val: 'connect@techotraders.com.lk' },
                    { icon: '📍', val: 'Kallady, Batticaloa, Sri Lanka' },
                  ].map(c => (
                    <div key={c.val} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', fontSize: '0.82rem', color: 'var(--slate)' }}>
                      <span>{c.icon}</span><span>{c.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* MISSION & VISION */}
      <section style={{ padding: '6rem 0', background: 'var(--bg)' }}>
        <div className="container">
          
          {/* DESKTOP MISSION & VISION (100% Unchanged original layout block) */}
          <div className="desktop-only" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div style={{ background: 'var(--green)', borderRadius: 20, padding: '3rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
              <div style={{ position: 'relative' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎯</div>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.5rem', color: 'white', marginBottom: '1rem' }}>Our Mission</div>
                <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', lineHeight: 1.8 }}>
                  To eliminate the "no signal" barrier for every Sri Lankan household and business. We believe access to reliable internet is not a luxury — it is essential infrastructure, and we intend to build it.
                </p>
              </div>
            </div>
            <div style={{ background: 'white', borderRadius: 20, padding: '3rem', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔭</div>
              <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.5rem', color: 'var(--ink)', marginBottom: '1rem' }}>Our Vision</div>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.8 }}>
                To become Sri Lanka's most trusted signal hardware company — with a technician network in every district, and antennas on every tower-challenged rooftop from Jaffna to Matara.
              </p>
            </div>
          </div>

          {/* MOBILE MISSION & VISION */}
          <div className="mobile-only" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ background: 'var(--green)', borderRadius: 16, padding: '2rem 1.5rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎯</div>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.3rem', color: 'white', marginBottom: '0.5rem' }}>Our Mission</div>
                <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                  To eliminate the "no signal" barrier for every Sri Lankan household and business. We believe access to reliable internet is not a luxury — it is essential infrastructure, and we intend to build it.
                </p>
              </div>
            </div>
            <div style={{ background: 'white', borderRadius: 16, padding: '2rem 1.5rem', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔭</div>
              <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.3rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>Our Vision</div>
              <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                To become Sri Lanka's most trusted signal hardware company — with a technician network in every district, and antennas on every tower-challenged rooftop from Jaffna to Matara.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section style={{ padding: '6rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="label" style={{ justifyContent: 'center', marginBottom: '0.75rem' }}>Why Choose Us</div>
            <h2 className="section-title reveal">The Techo Connect<br /><em>Difference</em></h2>
          </div>

          {/* DESKTOP WHY CHOOSE US (100% Unchanged original 3-column configuration) */}
          <div className="desktop-only" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            {whyUs.map((w, i) => (
              <div key={w.title} className="reveal" data-d={String(i % 3)} style={{ background: 'var(--bg)', border: '1px solid var(--border-light)', borderRadius: 16, padding: '2rem 1.75rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{w.icon}</div>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>{w.title}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.7 }}>{w.desc}</div>
              </div>
            ))}
          </div>

          {/* MOBILE WHY CHOOSE US */}
          <div className="mobile-only" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {whyUs.map((w) => (
              <div key={w.title} style={{ background: 'var(--bg)', border: '1px solid var(--border-light)', borderRadius: 12, padding: '1.25rem' }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{w.icon}</div>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1rem', color: 'var(--ink)', marginBottom: '0.4rem' }}>{w.title}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.55 }}>{w.desc}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ECOSYSTEM */}
      <section style={{ padding: '6rem 0', background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="label" style={{ justifyContent: 'center', marginBottom: '0.75rem' }}>Part of Something Bigger</div>
            <h2 className="section-title reveal">The Techo <em>Ecosystem</em></h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.95rem', maxWidth: 500, margin: '0.75rem auto 0', lineHeight: 1.75 }}>
              Techo Connect is one of three companies under Techo Traders — each powering a different dimension of modern connectivity.
            </p>
          </div>

          {/* DESKTOP ECOSYSTEM (100% Unchanged original layout metrics) */}
          <div className="desktop-only" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            {[
              { emoji: '🧠', name: 'Techo Labs', color: '#0A4FD4', desc: 'Web development, digital marketing, and market research.', here: false },
              { emoji: '📡', name: 'Techo Connect', color: '#0AAD6E', desc: 'Antenna and hardware manufacturing for Sri Lankan 4G networks.', here: true },
              { emoji: '💪', name: 'Techo Xpress', color: '#D44F0A', desc: 'Courier and logistics service with real-time tracking.', here: false },
            ].map(e => (
              <div key={e.name} style={{ background: 'white', border: `1px solid ${e.here ? e.color : 'var(--border-light)'}`, borderLeft: `4px solid ${e.color}`, borderRadius: 12, padding: '1.5rem' }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.6rem' }}>{e.emoji}</div>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1rem', color: 'var(--ink)', marginBottom: '0.3rem' }}>
                  {e.name} {e.here && <span style={{ fontSize: '0.7rem', color: e.color, fontWeight: 600 }}>(You're here)</span>}
                </div>
                <div style={{ fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.65 }}>{e.desc}</div>
              </div>
            ))}
          </div>

          {/* MOBILE ECOSYSTEM */}
          <div className="mobile-only" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { emoji: '🧠', name: 'Techo Labs', color: '#0A4FD4', desc: 'Web development, digital marketing, and market research.', here: false },
              { emoji: '📡', name: 'Techo Connect', color: '#0AAD6E', desc: 'Antenna and hardware manufacturing for Sri Lankan 4G networks.', here: true },
              { emoji: '💪', name: 'Techo Xpress', color: '#D44F0A', desc: 'Courier and logistics service with real-time tracking.', here: false },
            ].map(e => (
              <div key={e.name} style={{ background: 'white', border: `1px solid ${e.here ? e.color : 'var(--border-light)'}`, borderLeft: `4px solid ${e.color}`, borderRadius: 12, padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{e.emoji}</span>
                  <strong style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1rem', color: 'var(--ink)' }}>
                    {e.name} {e.here && <span style={{ fontSize: '0.65rem', color: e.color, fontWeight: 600 }}>(Here)</span>}
                  </strong>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.5 }}>{e.desc}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* WORKING HOURS */}
      <section style={{ padding: '5rem 0', background: 'white' }}>
        <div className="container">
          
          {/* DESKTOP WORKING HOURS (100% Unchanged original format layout) */}
          <div className="desktop-only" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <div className="label" style={{ marginBottom: '0.75rem' }}>Working Hours</div>
              <h2 className="section-title reveal" style={{ marginBottom: '2rem' }}>When We're <em>Available</em></h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {hours.map((h, i) => (
                  <div key={h.day} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid var(--border-light)', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--slate)' }}>{h.day}</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: h.time === 'Closed' ? '#EF4444' : 'var(--green)' }}>{h.time}</span>
                  </div>
                ))}
              </div>
              <div className="alert alert-info" style={{ marginTop: '1.5rem' }}>
                <span>💡</span>
                <span style={{ fontSize: '0.85rem' }}>WhatsApp support is available outside working hours for urgent queries.</span>
              </div>
            </div>
            <div className="reveal" data-d="1">
              <div style={{ background: 'var(--bg)', border: '1px solid var(--border-light)', borderRadius: 20, padding: '2.5rem', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '1.5rem' }}>Get In Touch</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <a href={`${WA_LINK}${encodeURIComponent('Hello Techo Connect! I need help with my antenna.')}`} target="_blank" rel="noopener" className="btn btn-wa btn-lg" style={{ width: '100%' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
                    Chat on WhatsApp
                  </a>
                  <a href={WA_COMMUNITY} target="_blank" rel="noopener" className="btn btn-outline" style={{ width: '100%' }}>Join Our Community</a>
                  <Link href="/contact" className="btn btn-ghost" style={{ width: '100%' }}>Contact Page</Link>
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE WORKING HOURS */}
          <div className="mobile-only" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            <div>
              <div className="label" style={{ marginBottom: '0.5rem' }}>Working Hours</div>
              <h2 className="section-title" style={{ marginBottom: '1.25rem', fontSize: '1.75rem' }}>When We're <em>Available</em></h2>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {hours.map((h) => (
                  <div key={h.day} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.85rem 0', borderBottom: '1px solid var(--border-light)', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--slate)' }}>{h.day}</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: h.time === 'Closed' ? '#EF4444' : 'var(--green)' }}>{h.time}</span>
                  </div>
                ))}
              </div>
              <div className="alert alert-info" style={{ marginTop: '1.25rem', padding: '0.75rem 1rem' }}>
                <span style={{ fontSize: '0.82rem' }}>💡 WhatsApp support is available outside working hours for urgent queries.</span>
              </div>
            </div>
            <div>
              <div style={{ background: 'var(--bg)', border: '1px solid var(--border-light)', borderRadius: 16, padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1rem', color: 'var(--ink)', marginBottom: '1.25rem' }}>Get In Touch</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <a href={`${WA_LINK}${encodeURIComponent('Hello Techo Connect! I need help with my antenna.')}`} target="_blank" rel="noopener" className="btn btn-wa btn-lg" style={{ width: '100%', padding: '0.75rem' }}>
                    Chat on WhatsApp
                  </a>
                  <a href={WA_COMMUNITY} target="_blank" rel="noopener" className="btn btn-outline" style={{ width: '100%', padding: '0.75rem', textAlign: 'center' }}>Join Community</a>
                  <Link href="/contact" className="btn btn-ghost" style={{ width: '100%', padding: '0.75rem', textAlign: 'center' }}>Contact Page</Link>
                </div>
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