'use client'
import { useState } from 'react'
import Link from 'next/link'
import Nav from '../../components/layout/Nav'
import Footer from '../../components/layout/Footer'
import WAFloat from '../../components/ui/WAFloat'
import { useReveal } from '../../components/ui/useReveal'
import { mainProducts, spareProducts } from '../../lib/data'
import { formatLKR, WA_LINK } from '../../lib/utils'
import { useCartStore } from '../../store/cart'
import toast from 'react-hot-toast'

const SPARE_CATEGORIES = ['All', 'Cable', 'Connector', 'Element', 'Hardware', 'Cap', 'Accessory', 'Structure', 'Tool']

export default function Products() {
  useReveal()
  const addItem = useCartStore(s => s.addItem)
  const [activeSpareTab, setActiveSpareTab] = useState('All')

  const filteredSpares = activeSpareTab === 'All' ? spareProducts : spareProducts.filter(p => p.category === activeSpareTab)

  return (
    <>
      <Nav />

      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="page-hero__label">Techo Connect / Products</div>
          <h1 className="page-hero__title">Antenna Solutions<br /><em>For Every Need</em></h1>
          <p className="page-hero__desc">2 main antenna models, 25 spare parts & components — all engineered for Sri Lankan 4G/LTE networks.</p>
        </div>
      </section>

      {/* ── MAIN PRODUCTS ── */}
      <section style={{ padding: '5rem 0', background: 'white' }}>
        <div className="container">
          <div className="label" style={{ marginBottom: '0.75rem' }}>Main Antennas</div>
          <h2 className="section-title reveal" style={{ marginBottom: '2.5rem' }}>Yagi <em>Antenna Models</em></h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            {mainProducts.map((product, idx) => (
              <div key={product.id} className="reveal" data-d={String(idx)} style={{ background: 'var(--bg)', border: '1px solid var(--border-light)', borderRadius: 20, overflow: 'hidden' }}>
                {/* Visual header */}
                <div style={{ padding: '2.5rem 2rem', background: 'linear-gradient(135deg, rgba(10,173,110,0.06) 0%, rgba(10,173,110,0.12) 100%)', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span className="badge" style={{ background: idx === 0 ? 'rgba(10,173,110,0.15)' : 'rgba(212,79,10,0.12)', color: idx === 0 ? '#078A57' : '#A33C07', marginBottom: '0.75rem', display: 'inline-flex' }}>{product.badge}</span>
                    <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.8rem', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>{product.name}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--muted)' }}>{product.tagline}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginBottom: '0.2rem' }}>From</div>
                    <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.5rem', color: 'var(--green)' }}>{formatLKR(product.variants[0].price)}</div>
                  </div>
                </div>

                {/* Variants */}
                <div style={{ padding: '1.5rem 2rem' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.75rem' }}>Available Variants</div>
                  {product.variants.map(v => (
                    <div key={v.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid var(--border-light)', gap: '1rem', flexWrap: 'wrap' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--ink)', marginBottom: '0.15rem' }}>{v.name}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>Weight: {v.weight}g</div>
                      </div>
                      <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1rem', color: 'var(--green)', whiteSpace: 'nowrap' }}>{formatLKR(v.price)}</div>
                    </div>
                  ))}

                  {/* Warranties */}
                  <div style={{ display: 'flex', gap: '0.75rem', margin: '1.25rem 0', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--green)', fontWeight: 600 }}>✓ {product.warranty.checking} Checking Warranty</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--green)', fontWeight: 600 }}>✓ {product.warranty.service} Service Warranty</span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <Link href={`/products/${product.slug}`} className="btn btn-primary" style={{ flex: 1 }}>
                      View Details & Order
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                    </Link>
                    <a href={`${WA_LINK}${encodeURIComponent(`Hi! I want to order the ${product.name}. Please help me.`)}`} target="_blank" rel="noopener" className="btn btn-wa">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPARE PARTS ── */}
      <section style={{ padding: '5rem 0', background: 'var(--bg)' }} id="spares">
        <div className="container">
          <div className="label" style={{ marginBottom: '0.75rem' }}>Spare Parts & Components</div>
          <h2 className="section-title reveal" style={{ marginBottom: '0.75rem' }}>All <em>Components</em></h2>
          <p className="reveal" data-d="1" style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '2rem' }}>Order individual components to build or repair your antenna.</p>

          {/* Category filter */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {SPARE_CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveSpareTab(cat)}
                style={{ padding: '0.4rem 1rem', borderRadius: 100, fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', border: '1px solid', borderColor: activeSpareTab === cat ? 'var(--green)' : 'var(--border-light)', background: activeSpareTab === cat ? 'var(--green)' : 'white', color: activeSpareTab === cat ? 'white' : 'var(--muted)' }}>
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
            {filteredSpares.map((p, i) => (
              <div key={p.id} className="spare-card reveal" data-d={String(i % 2)}>
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
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '4rem 0', background: 'white', textAlign: 'center' }}>
        <div className="container">
          <h2 className="section-title reveal" style={{ marginBottom: '1rem' }}>Need Help <em>Choosing?</em></h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '1.75rem' }}>Chat with us on WhatsApp — we'll recommend the right antenna for your location and router.</p>
          <a href={`${WA_LINK}${encodeURIComponent('Hello! I need help choosing the right Yagi antenna for my area.')}`} target="_blank" rel="noopener" className="btn btn-wa btn-lg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
            Chat With Us on WhatsApp
          </a>
        </div>
      </section>

      <Footer />
      <WAFloat />
    </>
  )
}
