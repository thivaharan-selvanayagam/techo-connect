'use client'
import { useState } from 'react'
import Link from 'next/link'
import Nav from '../components/layout/Nav'
import Footer from '../components/layout/Footer'
import WAFloat from '../components/ui/WAFloat'
import { useReveal } from '../components/ui/useReveal'
import { mainProducts, spareProducts, testimonials } from '../lib/data'
import { formatLKR, WA_LINK, WA_COMMUNITY, FB_PAGE } from '../lib/utils'
import { useCartStore } from '../store/cart'
import toast from 'react-hot-toast'

export default function Home() {
  useReveal()
  const addItem = useCartStore(s => s.addItem)
  const [activeFeat, setActiveFeat] = useState(0)

  const featuredSpares = spareProducts.slice(0, 4)

  const whyUs = [
    { icon: '🇱🇰', title: 'Local Engineering', desc: 'Every antenna is tested on Sri Lankan carrier frequencies — Dialog, Mobitel, SLT, Hutch — to ensure perfect sync.' },
    { icon: '🏭', title: 'Premium Materials', desc: 'Industrial-grade PVC and high-conductivity aluminum-coated cables built for lifetime durability.' },
    { icon: '🎯', title: 'Expert Support', desc: 'Our technical team provides direct guidance via WhatsApp to ensure your router achieves the lowest latency possible.' },
    { icon: '🚚', title: 'Island-Wide Delivery', desc: 'Fast courier delivery to all 25 districts of Sri Lanka. Same-day dispatch on confirmed orders.' },
  ]

  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__grid" />
        <div className="hero__body">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
              <div className="hero__content">
                <div className="hero__eyebrow">
                  <div className="hero__badge">
                    <div className="hero__badge-dot" />
                    Sri Lanka's #1 Yagi Antenna
                  </div>
                </div>
                <h1 className="hero__title">
                  Boost Your<br /><em>4G Signal</em><br />Instantly.
                </h1>
                <p className="hero__desc">
                  Engineered for Sri Lankan carrier frequencies. Our Yagi antennas transform weak 4G/LTE signals into blazing-fast internet — no matter where you are on the island.
                </p>
                <div className="hero__actions">
                  <Link href="/products" className="btn btn-primary btn-lg">
                    Shop Now
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                  </Link>
                  <a href={`${WA_LINK}${encodeURIComponent('Hello! I want to know more about Techo Connect Yagi Antennas.')}`} target="_blank" rel="noopener" className="btn btn-wa btn-lg">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
                    WhatsApp Us
                  </a>
                </div>
                <div className="hero__trust">
                  {['5-Day Checking Warranty', '12-Month Service Warranty', 'Island-Wide Delivery'].map(t => (
                    <div key={t} className="hero__trust-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                      {t}
                    </div>
                  ))}
                </div>
              </div>

              {/* Hero visual */}
              <div className="reveal" data-d="1">
                <div style={{ position: 'relative' }}>
                  <div style={{ background: 'linear-gradient(135deg, rgba(10,173,110,0.08) 0%, rgba(10,173,110,0.15) 100%)', borderRadius: 24, border: '1px solid rgba(10,173,110,0.2)', padding: '2.5rem', textAlign: 'center', boxShadow: '0 20px 60px rgba(10,173,110,0.15)' }}>
                    {/* Signal tower SVG */}
                    <svg viewBox="0 0 300 280" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 280, margin: '0 auto' }}>
                      {/* Signal waves */}
                      <path d="M150 200 Q110 180 100 150" stroke="#0AAD6E" strokeWidth="2" strokeDasharray="6 3" opacity="0.4"/>
                      <path d="M150 200 Q90 170 80 130" stroke="#0AAD6E" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.3"/>
                      <path d="M150 200 Q190 180 200 150" stroke="#0AAD6E" strokeWidth="2" strokeDasharray="6 3" opacity="0.4"/>
                      <path d="M150 200 Q210 170 220 130" stroke="#0AAD6E" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.3"/>
                      {/* Antenna boom */}
                      <rect x="145" y="80" width="10" height="140" rx="3" fill="#0AAD6E"/>
                      {/* Directors */}
                      {[95,115,135,155,175].map((y,i) => (
                        <rect key={i} x={125-(i*3)} y={y} width={50+(i*6)} height="5" rx="2.5" fill="#078A57"/>
                      ))}
                      {/* Reflector */}
                      <rect x="110" y="195" width="80" height="7" rx="3" fill="#056B44"/>
                      {/* Mast */}
                      <rect x="148" y="220" width="4" height="50" fill="#9AB5A4"/>
                      {/* Signal arcs from antenna */}
                      <path d="M90 100 Q75 85 90 70" stroke="#12C97F" strokeWidth="2" fill="none" opacity="0.7"/>
                      <path d="M75 110 Q55 85 75 60" stroke="#12C97F" strokeWidth="1.5" fill="none" opacity="0.5"/>
                      <path d="M210 100 Q225 85 210 70" stroke="#12C97F" strokeWidth="2" fill="none" opacity="0.7"/>
                      <path d="M225 110 Q245 85 225 60" stroke="#12C97F" strokeWidth="1.5" fill="none" opacity="0.5"/>
                      {/* Router icon */}
                      <rect x="108" y="245" width="84" height="26" rx="6" fill="white" stroke="#0AAD6E" strokeWidth="1.5"/>
                      <circle cx="120" cy="258" r="4" fill="#0AAD6E"/>
                      <circle cx="132" cy="258" r="4" fill="#12C97F"/>
                      <circle cx="144" cy="258" r="4" fill="#0AAD6E" opacity="0.5"/>
                      <text x="165" y="263" fill="#0AAD6E" fontSize="8" fontFamily="monospace" fontWeight="bold">4G+</text>
                    </svg>
                    {/* Floating badges */}
                    <div style={{ position: 'absolute', top: 20, right: -10, background: 'white', borderRadius: 12, padding: '0.5rem 0.9rem', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', border: '1px solid rgba(10,173,110,0.2)', fontSize: '0.78rem', fontWeight: 700, color: '#0AAD6E' }}>
                      📶 Signal Boosted!
                    </div>
                    <div style={{ position: 'absolute', bottom: 60, left: -10, background: 'white', borderRadius: 12, padding: '0.5rem 0.9rem', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', border: '1px solid rgba(10,173,110,0.2)', fontSize: '0.78rem', fontWeight: 700, color: '#078A57' }}>
                      ⚡ 10x Faster
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CARRIER SUPPORT BAND ── */}
      <div style={{ background: 'white', borderTop: '1px solid rgba(10,173,110,0.1)', borderBottom: '1px solid rgba(10,173,110,0.1)', padding: '1.25rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)' }}>Compatible With</span>
            {['Dialog 4G', 'Mobitel 4G', 'SLT 4G', 'Hutch 4G'].map(c => (
              <div key={c} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, fontSize: '0.9rem', color: 'var(--ink)' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)' }} />
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN PRODUCTS ── */}
      <section style={{ padding: '6rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="label" style={{ justifyContent: 'center', marginBottom: '0.75rem' }}>Our Antennas</div>
            <h2 className="section-title reveal">Choose Your <em>Signal Solution</em></h2>
            <p className="reveal" data-d="1" style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 500, margin: '0.75rem auto 0', lineHeight: 1.75 }}>
              Both models work identically — the only difference is cable length. Choose based on the distance between your router and your ideal antenna mounting spot.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {mainProducts.map((product, idx) => (
              <div key={product.id} className="product-card reveal" data-d={String(idx)}>
                <div className="product-card__img">
                  <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '80%' }}>
                    <rect x="150" y="20" width="8" height="120" rx="3" fill={idx === 0 ? '#0AAD6E' : '#D44F0A'}/>
                    {[35,55,75,95,115].map((y,i) => (
                      <rect key={i} x={130-(i*4)} y={y} width={60+(i*8)} height="5" rx="2.5" fill={idx === 0 ? '#078A57' : '#A33C07'} opacity={0.8}/>
                    ))}
                    <rect x="136" y="135" width="56" height="7" rx="3" fill={idx === 0 ? '#056B44' : '#7A2C05'}/>
                    <line x1="154" y1="140" x2="154" y2={idx === 0 ? 185 : 195} stroke="#9AB5A4" strokeWidth="3"/>
                    <text x="50" y="170" fill={idx === 0 ? '#0AAD6E' : '#D44F0A'} fontSize="11" fontFamily="monospace" opacity="0.5">
                      {idx === 0 ? '10M Cable' : '15M Cable'}
                    </text>
                  </svg>
                  <div style={{ position: 'absolute', top: 12, left: 12 }}>
                    <span className="badge" style={{ background: idx === 0 ? 'rgba(10,173,110,0.15)' : 'rgba(212,79,10,0.15)', color: idx === 0 ? '#078A57' : '#A33C07' }}>
                      {product.badge}
                    </span>
                  </div>
                </div>
                <div className="product-card__body">
                  <div className="product-card__name">{product.name}</div>
                  <div className="product-card__desc">{product.tagline}</div>
                  <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--green)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      ✓ {product.warranty.checking} Checking Warranty
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--green)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      ✓ {product.warranty.service} Service Warranty
                    </span>
                  </div>
                  <div className="product-card__price-from">Starting from</div>
                  <div className="product-card__price">{formatLKR(product.variants[0].price)}</div>
                  <div className="product-card__footer">
                    <Link href={`/products/${product.slug}`} className="btn btn-primary" style={{ flex: 1 }}>
                      View & Order
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                    </Link>
                    <a href={`${WA_LINK}${encodeURIComponent(`I'm interested in the ${product.name}. Please share more details.`)}`} target="_blank" rel="noopener" className="btn btn-wa">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison note */}
          <div className="reveal" style={{ marginTop: '1.5rem', padding: '1.25rem 1.5rem', background: 'rgba(10,173,110,0.05)', border: '1px solid rgba(10,173,110,0.15)', borderRadius: 12, display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>💡</span>
            <div>
              <strong style={{ fontSize: '0.875rem', color: 'var(--ink)' }}>Not sure which to choose?</strong>
              <span style={{ fontSize: '0.875rem', color: 'var(--muted)', marginLeft: '0.4rem' }}>If your router is within 10 metres of your mounting spot, go with Yagi Pro. If you need more cable reach, choose Yagi Elite with the 15M cable.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section style={{ padding: '6rem 0', background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="label" style={{ justifyContent: 'center', marginBottom: '0.75rem' }}>Why Techo Connect</div>
            <h2 className="section-title reveal">Built for <em>Sri Lanka</em></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5px', background: 'var(--border-light)', border: '1px solid var(--border-light)', borderRadius: 16, overflow: 'hidden' }}>
            {whyUs.map((item, i) => (
              <div key={item.title} className="reveal" data-d={String(i % 2)} style={{ background: 'white', padding: '2rem 1.75rem', transition: 'background 0.25s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(10,173,110,0.04)'}
                onMouseLeave={e => e.currentTarget.style.background = 'white'}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{item.icon}</div>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>{item.title}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.7 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPARE PARTS PREVIEW ── */}
      <section style={{ padding: '6rem 0', background: 'white' }} id="spares">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="label" style={{ marginBottom: '0.75rem' }}>Spare Parts</div>
              <h2 className="section-title reveal">Antenna <em>Components</em></h2>
            </div>
            <Link href="/products#spares" className="btn btn-ghost">
              View All {spareProducts.length} Parts
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
            {featuredSpares.map((p, i) => (
              <div key={p.id} className="spare-card reveal" data-d={String(i % 2)}>
                <div>
                  <div className="spare-card__name">{p.name}</div>
                  <div className="spare-card__cat">{p.category}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div className="spare-card__price">{formatLKR(p.price)}</div>
                  <button onClick={() => { addItem(p, null, 1); toast.success(`${p.name} added to cart`) }} className="btn btn-primary btn-sm">Add</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── YOUTUBE VIDEO ── */}
      <section style={{ padding: '6rem 0', background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div className="label" style={{ justifyContent: 'center', marginBottom: '0.75rem' }}>See It In Action</div>
            <h2 className="section-title reveal">Watch Our <em>Review Video</em></h2>
            <p className="reveal" data-d="1" style={{ color: 'var(--muted)', fontSize: '0.95rem', marginTop: '0.75rem' }}>Real-world installation and signal test by our customers</p>
          </div>
          <div className="reveal" data-d="1" style={{ maxWidth: 760, margin: '0 auto' }}>
            <div style={{ position: 'relative', paddingTop: '56.25%', borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 60px rgba(10,173,110,0.15)', border: '1px solid rgba(10,173,110,0.15)' }}>
              {/* Replace VIDEO_ID with your actual YouTube video ID */}
              <iframe
                src="https://www.youtube.com/embed/5-TLEw9rHVU?si=n4ih4HFJPt5byVB4"
                title="Techo Connect Yagi Antenna Review"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              />
            </div>
            {/* <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.75rem' }}>
              📌 Replace the YouTube video ID in <code style={{ background: 'var(--surface)', padding: '0.1rem 0.4rem', borderRadius: 4, fontSize: '0.72rem' }}>app/page.js</code> with your actual video ID
            </p> */}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: '6rem 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="label" style={{ justifyContent: 'center', marginBottom: '0.75rem' }}>Customer Reviews</div>
            <h2 className="section-title reveal">What Our <em>Customers Say</em></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            {testimonials.map((t, i) => (
              <div key={t.id} className="reveal" data-d={String(i % 3)} style={{ background: 'var(--bg)', border: '1px solid var(--border-light)', borderRadius: 16, padding: '1.5rem' }}>
                <div className="stars" style={{ marginBottom: '0.75rem' }}>
                  {[...Array(t.rating)].map((_, i) => <span key={i} className="star">★</span>)}                 
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--slate)', lineHeight: 1.75, marginBottom: '1rem', fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--ink)' }}>{t.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>📍 {t.location}</div>
                  </div>
                  {t.hasScreenshot && (
                    <button className="btn btn-ghost btn-sm" style={{ fontSize: '0.72rem' }}>View Screenshot</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMUNITY BAND ── */}
      <section style={{ padding: '4rem 0', background: 'linear-gradient(135deg, var(--green) 0%, var(--green-dark) 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '30px 30px', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 'clamp(1.6rem,3.5vw,2.4rem)', color: 'white', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            Join Our WhatsApp Community
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', marginBottom: '1.75rem' }}>
            Get installation tips, signal advice, and exclusive offers directly on WhatsApp
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={WA_COMMUNITY} target="_blank" rel="noopener" className="btn btn-white">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#0AAD6E"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
              Join WhatsApp Community
            </a>
            <a href={FB_PAGE} target="_blank" rel="noopener" className="btn" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1.5px solid rgba(255,255,255,0.3)' }}>
              Follow on Facebook
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WAFloat />
    </>
  )
}
