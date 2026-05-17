'use client'
import { useState } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Nav from '../../../components/layout/Nav'
import Footer from '../../../components/layout/Footer'
import WAFloat from '../../../components/ui/WAFloat'
import { mainProducts } from '../../../lib/data'
import { formatLKR, calcDelivery, WA_LINK } from '../../../lib/utils'
import { useCartStore } from '../../../store/cart'
import toast from 'react-hot-toast'

export default function ProductDetail({ params }) {
  const { slug } = params 
  
  const product = mainProducts.find(p => p.slug === slug)
  if (!product) notFound()
    
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0)
  const [activePhotoIdx, setActivePhotoIdx] = useState(1)
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState('includes')
  const addItem = useCartStore(s => s.addItem)

  // 🌟 NEW ZOOM STATES FOR DESKTOP HOVER MATRIX
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const variant = product.variants[selectedVariantIdx]
  const totalWeight = variant.weight * qty
  const delivery = calcDelivery(totalWeight)
  const productTotal = variant.price * qty
  const grandTotal = productTotal + delivery

  const handleAddToCart = () => {
    addItem(product, variant, qty)
    toast.success(`${product.name} (${variant.name}) added to cart!`)
  }

  // TRACKS CURSOR TRACKPAD COORDINATES RELATIVE TO PICTURE CONTAINER BOUNDS
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setZoomPos({ x, y })
  }

  const tabs = [
    { id: 'includes', label: "What's Included" },
    { id: 'specs', label: 'Specifications' },
    { id: 'compatible', label: 'Compatible Routers' },
    { id: 'warranty', label: 'Warranty' },
  ]

  const photoSlots = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  return (
    <>
      <Nav />

      <div style={{ paddingTop: '5.5rem' }}>
        {/* Breadcrumb */}
        <div style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border-light)', padding: '0.75rem 0' }}>
          <div className="container">
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.8rem', color: 'var(--muted)', flexWrap: 'wrap' }}>
              <Link href="/" style={{ color: 'var(--green)' }}>Home</Link>
              <span>›</span>
              <Link href="/products" style={{ color: 'var(--green)' }}>Products</Link>
              <span>›</span>
              <span style={{ color: 'var(--ink)', fontWeight: 500 }}>{product.name}</span>
            </div>
          </div>
        </div>

        {/* Main product section */}
        <section style={{ padding: '3rem 0', background: 'white' }}>
          <div className="container">
            
            {/* DESKTOP PRODUCT INFO GRID */}
            <div className="desktop-only" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
              {/* Left - Image/Visual */}
              <div>
                {/* 🌟 ADDED EVENT LISTENERS TO IMAGE VIEWPORT CONTAINER BOX */}
                <div 
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  style={{ background: 'linear-gradient(135deg, rgba(10,173,110,0.06) 0%, rgba(10,173,110,0.12) 100%)', borderRadius: 20, border: '1px solid rgba(10,173,110,0.15)', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 320, marginBottom: '1rem', position: 'relative', overflow: 'hidden', cursor: 'zoom-in' }}
                >
                  <span className="badge badge-green" style={{ position: 'absolute', top: 16, left: 16, zIndex: 5 }}>{product.badge}</span>
                  {/* 🌟 APPLIED CSS TRANSFORM FILTERS DEPENDING ON HOVER LOGIC */}
                  <img 
                    src={`/products/${product.slug}/${variant.id}-${activePhotoIdx}.webp`}
                    alt={`${product.name} ${variant.name}`}
                    style={{ 
                      width: '100%', 
                      height: 'auto', 
                      maxHeight: '300px', 
                      objectFit: 'contain',
                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                      transform: isHovered ? 'scale(1.8)' : 'scale(1)',
                      transition: isHovered ? 'none' : 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onError={(e) => { e.target.src = '/antenna.webp' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {photoSlots.map(n => (
                    <div 
                      key={n} 
                      style={{ width: 64, height: 64, background: 'white', borderRadius: 8, border: activePhotoIdx === n ? '2px solid var(--green)' : '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', overflow: 'hidden' }}
                      onClick={() => setActivePhotoIdx(n)}
                    >
                      <img 
                        src={`/products/${product.slug}/${variant.id}-${n}.webp`} 
                        alt="" 
                        style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }}
                        onError={(e) => { e.target.parentElement.style.display = 'none' }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right - Details */}
              <div>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '0.5rem' }}>{product.name}</div>
                <div style={{ fontSize: '0.95rem', color: 'var(--muted)', marginBottom: '1.25rem', lineHeight: 1.7 }}>{product.description}</div>

                <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                  <span className="badge badge-green">✓ {product.warranty.checking} Checking Warranty</span>
                  <span className="badge badge-green">✓ {product.warranty.service} Service Warranty</span>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--slate)', marginBottom: '0.6rem' }}>SELECT VARIANT</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {product.variants.map((v, i) => (
                      <button key={v.id} onClick={() => { setSelectedVariantIdx(i); setActivePhotoIdx(1); }}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.9rem 1.1rem', border: '2px solid', borderColor: selectedVariantIdx === i ? 'var(--green)' : 'var(--border-light)', borderRadius: 10, background: selectedVariantIdx === i ? 'rgba(10,173,110,0.05)' : 'white', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', gap: '1rem' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--ink)', marginBottom: '0.1rem' }}>{v.name}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>Weight: {v.weight}g</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--green)', whiteSpace: 'nowrap' }}>{formatLKR(v.price)}</div>
                          {selectedVariantIdx === i && <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg></div>}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--slate)' }}>QUANTITY</div>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--border-light)', borderRadius: 8, overflow: 'hidden' }}>
                    <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', cursor: 'pointer', fontSize: '1.1rem', color: 'var(--slate)', border: 'none' }}>−</button>
                    <div style={{ width: 44, textAlign: 'center', fontWeight: 700, fontSize: '0.9rem', color: 'var(--ink)' }}>{qty}</div>
                    <button onClick={() => setQty(qty + 1)} style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', cursor: 'pointer', fontSize: '1.1rem', color: 'var(--slate)', border: 'none' }}>+</button>
                  </div>
                </div>

                <div style={{ background: 'var(--bg)', borderRadius: 12, padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--muted)', marginBottom: '0.4rem' }}>
                    <span>Product ({qty} × {formatLKR(variant.price)})</span>
                    <span>{formatLKR(productTotal)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--muted)', marginBottom: '0.75rem' }}>
                    <span>Est. Delivery ({totalWeight}g)</span>
                    <span>{formatLKR(delivery)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.25rem', color: 'var(--ink)', paddingTop: '0.75rem', borderTop: '1px solid var(--border-light)' }}>
                    <span>Estimated Total</span>
                    <span>{formatLKR(grandTotal)}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  <button onClick={handleAddToCart} className="btn btn-primary" style={{ flex: 1 }}>
                    Add to Cart
                  </button>
                  <Link href="/checkout" onClick={handleAddToCart} className="btn btn-outline" style={{ flex: 1 }}>
                    Buy Now
                  </Link>
                </div>
                <a href={`${WA_LINK}${encodeURIComponent(`I want to order the ${product.name}.`)}`} target="_blank" rel="noopener" className="btn btn-wa" style={{ width: '100%' }}>
                  Order via WhatsApp Instead
                </a>
              </div>
            </div>

            {/* MOBILE PRODUCT INFO VIEW (100% Unchanged standalone design view parameters) */}
            <div className="mobile-only" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <div style={{ background: 'linear-gradient(135deg, rgba(10,173,110,0.06) 0%, rgba(10,173,110,0.12) 100%)', borderRadius: 16, border: '1px solid rgba(10,173,110,0.15)', padding: '2rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                  <span className="badge badge-green" style={{ position: 'absolute', top: 12, left: 12, zIndex: 5 }}>{product.badge}</span>
                  <img 
                    src={`/products/${product.slug}/${variant.id}-${activePhotoIdx}.webp`}
                    alt={`${product.name} ${variant.name}`}
                    style={{ width: '100%', height: 'auto', maxHeight: '240px', objectFit: 'contain' }}
                    onError={(e) => { e.target.src = '/antenna.webp' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
                  {photoSlots.map(n => (
                    <div 
                      key={n} 
                      style={{ width: 56, height: 56, background: 'white', borderRadius: 8, border: activePhotoIdx === n ? '2px solid var(--green)' : '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', flexShrink: 0, overflow: 'hidden' }}
                      onClick={() => setActivePhotoIdx(n)}
                    >
                      <img 
                        src={`/products/${product.slug}/${variant.id}-${n}.webp`} 
                        alt="" 
                        style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }}
                        onError={(e) => { e.target.parentElement.style.display = 'none' }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.8rem', color: 'var(--ink)', letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: '0.5rem' }}>{product.name}</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--muted)', marginBottom: '1.25rem', lineHeight: 1.6 }}>{product.description}</div>

                <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.5rem', flexDirection: 'column' }}>
                  <span className="badge badge-green" style={{ width: 'fit-content' }}>✓ {product.warranty.checking} Checking Warranty</span>
                  <span className="badge badge-green" style={{ width: 'fit-content' }}>✓ {product.warranty.service} Service Warranty</span>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--slate)', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>SELECT VARIANT</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {product.variants.map((v, i) => (
                      <button key={v.id} onClick={() => { setSelectedVariantIdx(i); setActivePhotoIdx(1); }}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', border: '2px solid', borderColor: selectedVariantIdx === i ? 'var(--green)' : 'var(--border-light)', borderRadius: 8, background: selectedVariantIdx === i ? 'rgba(10,173,110,0.05)' : 'white', cursor: 'pointer', textAlign: 'left', gap: '0.5rem' }}>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--ink)' }}>{v.name}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>Weight: {v.weight}g</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '0.95rem', color: 'var(--green)' }}>{formatLKR(v.price)}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', background: 'var(--bg)', padding: '0.5rem 1rem', borderRadius: 8 }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--slate)' }}>QUANTITY</div>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--border-light)', borderRadius: 6, overflow: 'hidden', background: 'white' }}>
                    <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>−</button>
                    <div style={{ width: 36, textAlign: 'center', fontWeight: 700, fontSize: '0.85rem' }}>{qty}</div>
                    <button onClick={() => setQty(qty + 1)} style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>+</button>
                  </div>
                </div>

                <div style={{ background: 'var(--bg)', borderRadius: 12, padding: '1rem', marginBottom: '1.5rem', border: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.4rem' }}>
                    <span>Product ({qty} × Price)</span>
                    <span>{formatLKR(productTotal)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.6rem' }}>
                    <span>Est. Delivery ({totalWeight}g)</span>
                    <span>{formatLKR(delivery)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.15rem', color: 'var(--ink)', paddingTop: '0.6rem', borderTop: '1px solid var(--border-light)' }}>
                    <span>Estimated Total</span>
                    <span style={{ color: 'var(--green)' }}>{formatLKR(grandTotal)}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <button onClick={handleAddToCart} className="btn btn-primary" style={{ width: '100%', padding: '0.8rem' }}>Add to Cart</button>
                  <Link href="/checkout" onClick={handleAddToCart} className="btn btn-outline" style={{ width: '100%', padding: '0.8rem', textAlign: 'center' }}>Buy Now</Link>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Tabs */}
        <section style={{ padding: '3rem 0 5rem', background: 'var(--bg)' }}>
          <div className="container">
            <div style={{ display: 'flex', gap: 0, borderBottom: '2px solid var(--border-light)', marginBottom: '2rem', overflowX: 'auto' }}>
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  style={{ padding: '0.75rem 1.5rem', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', border: 'none', background: 'none', color: activeTab === tab.id ? 'var(--green)' : 'var(--muted)', borderBottom: activeTab === tab.id ? '2px solid var(--green)' : '2px solid transparent', marginBottom: -2, whiteSpace: 'nowrap', transition: 'color 0.2s' }}>
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="desktop-only">
              {activeTab === 'includes' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem', maxWidth: 600 }}>
                  {variant.includes.map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 0', fontSize: '0.875rem', color: 'var(--slate)' }}>
                      <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(10,173,110,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'specs' && (
                <div style={{ maxWidth: 500 }}>
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid var(--border-light)', fontSize: '0.875rem' }}>
                      <span style={{ color: 'var(--muted)', fontWeight: 500 }}>{key}</span>
                      <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{val}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'compatible' && (
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {product.compatible.map(r => (
                    <div key={r} style={{ padding: '0.6rem 1.1rem', background: 'white', border: '1px solid var(--border-light)', borderRadius: 8, fontSize: '0.875rem', fontWeight: 600, color: 'var(--ink)' }}>
                      📡 {r}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'warranty' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', maxWidth: 700 }}>
                  <div style={{ background: 'white', border: '1px solid var(--border-light)', borderRadius: 12, padding: '1.5rem' }}>
                    <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>5-Day Checking Warranty</div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.7 }}>If you don't receive any signal within 5 days of delivery (with proper outdoor installation), you can return the antenna. Photo evidence of installation required.</p>
                  </div>
                  <div style={{ background: 'white', border: '1px solid var(--border-light)', borderRadius: 12, padding: '1.5rem' }}>
                    <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>12-Month Service Warranty</div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.7 }}>We repair and return your antenna at no service charge. Only part replacement costs apply. No cash refunds under this warranty.</p>
                  </div>
                  <div style={{ gridColumn: '1 / -1', padding: '1rem 1.25rem', background: 'rgba(10,173,110,0.05)', border: '1px solid rgba(10,173,110,0.15)', borderRadius: 10, fontSize: '0.82rem', color: 'var(--muted)' }}>
                    📞 Warranty claims: WhatsApp <strong style={{ color: 'var(--green)' }}>0706656007</strong> or see our <Link href="/returns" style={{ color: 'var(--green)', fontWeight: 600 }}>Returns & Refunds Policy</Link>
                  </div>
                </div>
              )}
            </div>

            <div className="mobile-only">
              {activeTab === 'includes' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {variant.includes.map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0', fontSize: '0.85rem', color: 'var(--slate)' }}>
                      <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(10,173,110,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'specs' && (
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.65rem 0', borderBottom: '1px solid var(--border-light)', fontSize: '0.85rem' }}>
                      <span style={{ color: 'var(--muted)' }}>{key}</span>
                      <span style={{ color: 'var(--ink)', fontWeight: 600, textAlign: 'right', marginLeft: '0.5rem' }}>{val}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'compatible' && (
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {product.compatible.map(r => (
                    <div key={r} style={{ padding: '0.5rem 0.85rem', background: 'white', border: '1px solid var(--border-light)', borderRadius: 6, fontSize: '0.82rem', fontWeight: 600, color: 'var(--ink)' }}>
                      📡 {r}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'warranty' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ background: 'white', border: '1px solid var(--border-light)', borderRadius: 8, padding: '1rem' }}>
                    <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1rem', color: 'var(--ink)', marginBottom: '0.35rem' }}>5-Day Checking Warranty</div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6 }}>If you don't receive any signal within 5 days of delivery (with proper outdoor installation), you can return the antenna. Photo evidence of installation required.</p>
                  </div>
                  <div style={{ background: 'white', border: '1px solid var(--border-light)', borderRadius: 8, padding: '1rem' }}>
                    <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1rem', color: 'var(--ink)', marginBottom: '0.35rem' }}>12-Month Service Warranty</div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6 }}>We repair and return your antenna at no service charge. Only part replacement costs apply. No cash refunds under this warranty.</p>
                  </div>
                  <div style={{ padding: '0.85rem', background: 'rgba(10,173,110,0.05)', border: '1px solid rgba(10,173,110,0.15)', borderRadius: 8, fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.5 }}>
                    📞 Warranty claims: WhatsApp <strong style={{ color: 'var(--green)' }}>0706656007</strong> or see our <Link href="/returns" style={{ color: 'var(--green)', fontWeight: 600 }}>Returns Policy</Link>
                  </div>
                </div>
              )}
            </div>

          </div>
        </section>
      </div>

      <Footer />
      <WAFloat />
    </>
  )
}