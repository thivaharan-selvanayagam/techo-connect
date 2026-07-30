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
    { icon: '🏭', title: 'Swisstek Aluminium', desc: 'Crafted exclusively using premium Swisstek branded aluminium bars for long-lasting structural strength.' },
    { icon: '🎯', title: '100% QC Passed', desc: 'Every antenna is carefully handmade, individually inspected, and quality tested before leaving our hub.' },
    { icon: '🚚', title: 'Island-Wide Delivery', desc: 'Fast courier delivery to all 25 districts of Sri Lanka. Same-day dispatch on confirmed orders.' },
  ]

  // Image path mapping function for antenna variants
  const getProductImage = (id) => {
    if (id === 'yagi-pro') return '/products/yagi-pro/yagi-pro-v1-1.webp'
    if (id === 'yagi-elite') return '/products/yagi-elite/yagi-elite-v1-1.webp'
    if (id === 'yagi-ultra') return '/products/yagi-ultra/yagi-ultra-v1-1.webp'
    return '/antenna.webp'
  }

  return (
    <>
      <Nav />

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__grid" />
        <div className="hero__body">
          <div className="container">
            
            {/* DESKTOP HERO */}
            <div className="desktop-only" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
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
                  Handcrafted with premium Swisstek Aluminium and engineered for Sri Lankan carrier frequencies. Transform weak 4G/LTE signals into fast, stable internet.
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
                  {['Handmade & QC Passed', 'Swisstek Aluminium', 'Island-Wide Delivery'].map(t => (
                    <div key={t} className="hero__trust-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                      {t}
                    </div>
                  ))}
                </div>
              </div>

              <div className="reveal" data-d="1">
                <div style={{ position: 'relative' }}>
                  <div style={{ background: 'linear-gradient(135deg, rgba(10,173,110,0.08) 0%, rgba(10,173,110,0.15) 100%)', borderRadius: 24, border: '1px solid rgba(10,173,110,0.2)', padding: '2.5rem', textAlign: 'center', boxShadow: '0 20px 60px rgba(10,173,110,0.15)' }}>
                    <svg viewBox="0 0 300 280" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 280, margin: '0 auto' }}>
                      <path d="M150 200 Q110 180 100 150" stroke="#0AAD6E" strokeWidth="2" strokeDasharray="6 3" opacity="0.4"/>
                      <path d="M150 200 Q90 170 80 130" stroke="#0AAD6E" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.3"/>
                      <path d="M150 200 Q190 180 200 150" stroke="#0AAD6E" strokeWidth="2" strokeDasharray="6 3" opacity="0.4"/>
                      <path d="M150 200 Q210 170 220 130" stroke="#0AAD6E" strokeWidth="1.5" strokeDasharray="6 3" opacity="0.3"/>
                      <rect x="145" y="80" width="10" height="140" rx="3" fill="#0AAD6E"/>
                      {[95,115,135,155,175].map((y,i) => (
                        <rect key={i} x={125-(i*3)} y={y} width={50+(i*6)} height="5" rx="2.5" fill="#078A57"/>
                      ))}
                      <rect x="110" y="195" width="80" height="7" rx="3" fill="#056B44"/>
                      <rect x="148" y="220" width="4" height="50" fill="#9AB5A4"/>
                      <path d="M90 100 Q75 85 90 70" stroke="#12C97F" strokeWidth="2" fill="none" opacity="0.7"/>
                      <path d="M75 110 Q55 85 75 60" stroke="#12C97F" strokeWidth="1.5" fill="none" opacity="0.5"/>
                      <path d="M210 100 Q225 85 210 70" stroke="#12C97F" strokeWidth="2" fill="none" opacity="0.7"/>
                      <path d="M225 110 Q245 85 225 60" stroke="#12C97F" strokeWidth="1.5" fill="none" opacity="0.5"/>
                      <rect x="108" y="245" width="84" height="26" rx="6" fill="white" stroke="#0AAD6E" strokeWidth="1.5"/>
                      <circle cx="120" cy="258" r="4" fill="#0AAD6E"/>
                      <circle cx="132" cy="258" r="4" fill="#12C97F"/>
                      <circle cx="144" cy="258" r="4" fill="#0AAD6E" opacity="0.5"/>
                      <text x="165" y="263" fill="#0AAD6E" fontSize="8" fontFamily="monospace" fontWeight="bold">4G+</text>
                    </svg>
                    <div style={{ position: 'absolute', top: 20, right: -10, background: 'white', borderRadius: 12, padding: '0.5rem 0.9rem', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', border: '1px solid rgba(10,173,110,0.2)', fontSize: '0.78rem', fontWeight: 700, color: '#0AAD6E' }}>
                      📶 Signal Boosted!
                    </div>
                    <div style={{ position: 'absolute', bottom: 60, left: -10, background: 'white', borderRadius: 12, padding: '0.5rem 0.9rem', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', border: '1px solid rgba(10,173,110,0.2)', fontSize: '0.78rem', fontWeight: 700, color: '#078A57' }}>
                      ⚡ 4x Faster
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* MOBILE HERO */}
            <div className="mobile-only" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', textAlign: 'center', alignItems: 'center' }}>
              <div className="hero__content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                  Handcrafted with premium Swisstek Aluminium and engineered for Sri Lankan carrier frequencies. Transform weak 4G/LTE signals into fast, stable internet.
                </p>
                <div className="hero__actions" style={{ justifyContent: 'center', width: '100%' }}>
                  <Link href="/products" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                    Shop Now
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                  </Link>
                  <a href={`${WA_LINK}${encodeURIComponent('Hello! I want to know more about Techo Connect Yagi Antennas.')}`} target="_blank" rel="noopener" className="btn btn-wa btn-lg" style={{ width: '100%' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
                    WhatsApp Us
                  </a>
                </div>
                <div className="hero__trust" style={{ justifyContent: 'center' }}>
                  {['Handmade & QC Passed', 'Swisstek Aluminium', 'Island-Wide Delivery'].map(t => (
                    <div key={t} className="hero__trust-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CARRIER SUPPORT BAND ── */}
      <div style={{ background: 'white', borderTop: '1px solid rgba(10,173,110,0.1)', borderBottom: '1px solid rgba(10,173,110,0.1)', padding: '1.25rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
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

      {/* ── MAIN PRODUCTS COMPARISON SECTION ── */}
      <section style={{ padding: '6rem 0', background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.4rem', 
              fontSize: '0.75rem', 
              fontWeight: 800, 
              letterSpacing: '0.12em', 
              textTransform: 'uppercase', 
              color: 'var(--green)', 
              background: 'rgba(10,173,110,0.08)', 
              padding: '0.35rem 0.9rem', 
              borderRadius: 100, 
              marginBottom: '0.85rem' 
            }}>
              ✦ MODEL COMPARISON
            </div>
            <h2 className="section-title reveal" style={{ fontSize: '2.5rem', letterSpacing: '-0.02em' }}>
              Select Your <em>Antenna Setup</em>
            </h2>
            <p className="reveal" data-d="1" style={{ color: 'var(--muted)', fontSize: '0.98rem', maxWidth: 540, margin: '0.6rem auto 0', lineHeight: 1.65 }}>
              All models feature identical handcrafted Swisstek Aluminium frames. Pick the antenna variant engineered for your specific cable requirement.
            </p>
          </div>

          {/* 3-CARD MODERN COMPARISON GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'stretch' }}>
            {mainProducts.map((product, idx) => {
              const isFeatured = product.id === 'yagi-elite'
              const startingPrice = product.variants?.[0]?.price || 3700

              // Dynamic Cable Highlights
              let cableInfo = {
                title: '10M Low-Loss Black Cable',
                tag: 'Standard Reach',
                color: '#0AAD6E',
                bg: 'rgba(10,173,110,0.06)',
                border: 'rgba(10,173,110,0.2)'
              }

              if (product.id === 'yagi-elite') {
                cableInfo = {
                  title: '15M Low-Loss Black Cable',
                  tag: 'Extended Reach',
                  color: '#D44F0A',
                  bg: 'rgba(212,79,10,0.06)',
                  border: 'rgba(212,79,10,0.2)'
                }
              } else if (product.id === 'yagi-ultra') {
                cableInfo = {
                  title: '15M Dialog Original White Cable',
                  tag: 'Original Dialog Spec',
                  color: '#7C3AED',
                  bg: 'rgba(124,58,237,0.06)',
                  border: 'rgba(124,58,237,0.2)'
                }
              }

              return (
                <div 
                  key={product.id} 
                  className="reveal" 
                  data-d={String(idx)} 
                  style={{ 
                    position: 'relative',
                    background: 'white', 
                    borderRadius: 24, 
                    border: isFeatured ? '2px solid var(--green)' : '1px solid #E2E8F0', 
                    boxShadow: isFeatured ? '0 20px 48px -10px rgba(10,173,110,0.18)' : '0 10px 30px -5px rgba(0,0,0,0.04)',
                    padding: '2.25rem 1.75rem 2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transform: isFeatured ? 'translateY(-8px)' : 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    overflow: 'hidden'
                  }}
                >
                  {/* FEATURED RIBBON */}
                  {isFeatured && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      background: 'var(--green)',
                      color: 'white',
                      fontSize: '0.65rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      padding: '0.35rem 1.25rem',
                      borderBottomLeftRadius: 16,
                      boxShadow: '0 4px 12px rgba(10,173,110,0.3)'
                    }}>
                      ★ MOST POPULAR
                    </div>
                  )}

                  <div>
                    {/* Top Meta info */}
                    <div style={{ marginBottom: '1rem' }}>
                      <span style={{ 
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: product.badgeColor || 'var(--green)',
                        background: `${product.badgeColor || '#0AAD6E'}15`,
                        padding: '0.3rem 0.8rem',
                        borderRadius: 100,
                        display: 'inline-block'
                      }}>
                        {product.badge || 'Variant'}
                      </span>
                    </div>

                    <h3 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.85rem', color: 'var(--ink)', margin: '0 0 0.3rem' }}>
                      {product.name}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--muted)', margin: 0, lineHeight: 1.5, minHeight: '2.6em' }}>
                      {product.tagline}
                    </p>

                    {/* 🌟 ENLARGED PRODUCT PREVIEW WINDOW (Height 190px, minimal padding) */}
                    <div style={{ 
                      textAlign: 'center', 
                      margin: '1.25rem 0', 
                      background: '#F8FAFC', 
                      padding: '0.5rem', 
                      borderRadius: 16, 
                      border: '1px solid #EDF2F7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: 190,
                      overflow: 'hidden'
                    }}>
                      <img 
                        src={getProductImage(product.id)} 
                        alt={product.name} 
                        style={{ height: '100%', width: '100%', objectFit: 'contain', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.06))' }}
                        onError={(e) => { e.currentTarget.src = '/antenna.webp' }}
                      />
                    </div>

                    {/* Price Header */}
                    <div style={{ textAlign: 'center', padding: '0.85rem 0 1.25rem', borderBottom: '1px border-dash #E2E8F0' }}>
                      <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--muted)', fontWeight: 700 }}>Starting Price</div>
                      <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '2.25rem', color: 'var(--ink)', lineHeight: 1.1, marginTop: '0.2rem' }}>
                        {formatLKR(startingPrice)}
                      </div>
                    </div>

                    {/* CABLE SPEC HIGHLIGHT BOX */}
                    <div style={{ 
                      background: cableInfo.bg, 
                      border: `1px solid ${cableInfo.border}`, 
                      borderRadius: 16, 
                      padding: '1rem 1.15rem', 
                      margin: '1.25rem 0'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)', fontWeight: 700 }}>Cable Type</span>
                        <span style={{ fontSize: '0.62rem', fontWeight: 800, color: cableInfo.color, background: 'white', padding: '2px 8px', borderRadius: 100, border: `1px solid ${cableInfo.border}` }}>
                          {cableInfo.tag}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--ink)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                        <span style={{ fontSize: '1.1rem' }}>🔌</span> {cableInfo.title}
                      </div>
                    </div>

                    {/* Modern Clean Features Checklist */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem' }}>
                        <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(10,173,110,0.12)', color: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800, flexShrink: 0 }}>✓</div>
                        <span style={{ color: 'var(--slate)' }}>Frame: <strong style={{ color: 'var(--ink)', fontWeight: 700 }}>Swisstek Branded Aluminium</strong></span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem' }}>
                        <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(10,173,110,0.12)', color: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800, flexShrink: 0 }}>✓</div>
                        <span style={{ color: 'var(--slate)' }}>Frequency: <strong style={{ color: 'var(--ink)', fontWeight: 700 }}>700 - 2700 MHz (4G LTE)</strong></span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem' }}>
                        <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(10,173,110,0.12)', color: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800, flexShrink: 0 }}>✓</div>
                        <span style={{ color: 'var(--slate)' }}>Connector: <strong style={{ color: 'var(--ink)', fontWeight: 700 }}>Gold Plated Universal SMA</strong></span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.875rem' }}>
                        <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(10,173,110,0.12)', color: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800, flexShrink: 0 }}>✓</div>
                        <span style={{ color: 'var(--slate)' }}>Carriers: <strong style={{ color: 'var(--ink)', fontWeight: 700 }}>Dialog, Mobitel, SLT, Hutch</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Actions / CTA Buttons */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: 'auto' }}>
                    <Link 
                      href={`/products/${product.slug}`} 
                      className="btn btn-primary" 
                      style={{ 
                        width: '100%', 
                        padding: '0.85rem', 
                        justifyContent: 'center',
                        fontWeight: 700,
                        background: isFeatured ? 'var(--green)' : 'var(--ink)',
                        borderColor: isFeatured ? 'var(--green)' : 'var(--ink)',
                        borderRadius: 12,
                        boxShadow: isFeatured ? '0 8px 20px rgba(10,173,110,0.25)' : 'none'
                      }}
                    >
                      View Details &amp; Order ↗
                    </Link>
                    <a 
                      href={`${WA_LINK}${encodeURIComponent(`Hi! I'm interested in ordering the ${product.name}. Please assist me.`)}`} 
                      target="_blank" 
                      rel="noopener" 
                      className="btn btn-wa" 
                      style={{ width: '100%', padding: '0.75rem', justifyContent: 'center', gap: '0.5rem', fontSize: '0.875rem', borderRadius: 12 }}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
                      Order via WhatsApp
                    </a>
                  </div>

                </div>
              )
            })}
          </div>

          {/* Help Banner */}
          <div className="reveal" style={{ marginTop: '3rem', padding: '1.5rem 1.75rem', background: 'white', border: '1px solid #E2E8F0', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(10,173,110,0.1)', color: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>💡</div>
              <div>
                <strong style={{ fontSize: '0.98rem', color: 'var(--ink)' }}>Need help choosing your cable setup?</strong>
                <p style={{ fontSize: '0.85rem', color: 'var(--muted)', margin: '0.15rem 0 0' }}>Send us your router model and location on WhatsApp for instant engineering guidance.</p>
              </div>
            </div>
            <a href={`${WA_LINK}${encodeURIComponent('Hello! I need help selecting the best Yagi antenna model for my area.')}`} target="_blank" rel="noopener" className="btn btn-primary btn-sm" style={{ padding: '0.65rem 1.4rem', borderRadius: 10 }}>
              Ask an Expert 💬
            </a>
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

          {/* DESKTOP WHY US */}
          <div className="desktop-only" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5px', background: 'var(--border-light)', border: '1px solid var(--border-light)', borderRadius: 16, overflow: 'hidden' }}>
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

          {/* MOBILE WHY US */}
          <div className="mobile-only" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {whyUs.map((item) => (
              <div key={item.title} style={{ background: 'white', padding: '1.5rem', borderRadius: 12, border: '1px solid var(--border-light)' }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1rem', color: 'var(--ink)', marginBottom: '0.4rem' }}>{item.title}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>{item.desc}</div>
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

          {/* DESKTOP SPARES */}
          <div className="desktop-only" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
            {featuredSpares.map((p, i) => (
              <div key={p.id} className="spare-card reveal" data-d={String(i % 2)}>
                <div style={{ width: '64px', height: '64px', borderRadius: '8px', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(0,0,0,0.04)' }}>
                  <img 
                    src={`/spares/${p.id}.webp`} 
                    alt={p.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }} 
                    onError={(e) => { e.currentTarget.src = '/antenna.webp' }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="spare-card__name">{p.name}</div>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.2rem', flexWrap: 'wrap' }}>
                    <span className="spare-card__cat">{p.category}</span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--light-text)' }}>· {p.weight}g</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
                  <div className="spare-card__price">{formatLKR(p.price)}</div>
                  <button onClick={() => { addItem(p, null, 1); toast.success(`${p.name} added!`) }} className="btn btn-primary btn-sm">+ Add</button>
                </div>
              </div>
            ))}
          </div>

          {/* MOBILE SPARES */}
          <div className="mobile-only" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {featuredSpares.map((p) => (
              <div key={p.id} className="spare-card" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '1rem', padding: '1.25rem 1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', width: '100%', alignItems: 'center' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '8px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0, border: '1px solid var(--border-light)' }}>
                    <img 
                      src={`/spares/${p.id}.webp`} 
                      alt={p.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }} 
                      onError={(e) => { e.currentTarget.src = '/antenna.webp' }}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="spare-card__name" style={{ fontSize: '0.9rem', lineHeight: 1.4 }}>{p.name}</div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                      <span className="spare-card__cat">{p.category}</span>
                      <span style={{ fontSize: '0.68rem', color: 'var(--light-text)' }}>· {p.weight}g</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', borderTop: '1px solid rgba(0,0,0,0.04)', paddingTop: '0.75rem' }}>
                  <div className="spare-card__price" style={{ fontSize: '1rem' }}>{formatLKR(p.price)}</div>
                  <button onClick={() => { addItem(p, null, 1); toast.success(`${p.name} added!`) }} className="btn btn-primary btn-sm" style={{ padding: '0.4rem 1rem' }}>+ Add to Cart</button>
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
              <iframe
                src="https://www.youtube.com/embed/5-TLEw9rHVU?si=n4ih4HFJPt5byVB4"
                title="Techo Connect Yagi Antenna Review"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              />
            </div>
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

          {/* DESKTOP TESTIMONIALS */}
          <div className="desktop-only" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
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

          {/* MOBILE TESTIMONIALS */}
          <div className="mobile-only" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {testimonials.map((t) => (
              <div key={t.id} style={{ background: 'var(--bg)', border: '1px solid var(--border-light)', borderRadius: 16, padding: '1.25rem' }}>
                <div className="stars" style={{ marginBottom: '0.5rem' }}>
                  {[...Array(t.rating)].map((_, i) => <span key={i} className="star">★</span>)}                 
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--slate)', lineHeight: 1.6, marginBottom: '1rem', fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--ink)' }}>{t.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>📍 {t.location}</div>
                  </div>
                  {t.hasScreenshot && (
                    <button className="btn btn-ghost btn-sm" style={{ fontSize: '0.72rem' }}>View</button>
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
            <a href={WA_COMMUNITY} target="_blank" rel="noopener" className="btn btn-white" style={{ width: '100%', maxWidth: '290px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#0AAD6E"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
              Join WhatsApp Community
            </a>
            <a href={FB_PAGE} target="_blank" rel="noopener" className="btn" style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1.5px solid rgba(255,255,255,0.3)', width: '100%', maxWidth: '290px' }}>
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