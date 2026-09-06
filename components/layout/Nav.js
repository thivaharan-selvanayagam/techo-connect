'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCartStore } from '../../store/cart'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const pathname = usePathname()
  const itemCount = useCartStore(s => s.items.reduce((sum, i) => sum + i.qty, 0))

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close menus on path change
  useEffect(() => {
    setDrawerOpen(false)
    setMoreDropdownOpen(false)
  }, [pathname])

  // Click outside listener for the dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMoreDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const primaryLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ]

  const secondaryLinks = [
    { href: '/careers', label: 'Careers' },
    { href: '/track', label: 'Track' },
    { href: '/analyzer', label: 'Signal Analyzer' },
  ]

  const allLinks = [...primaryLinks, ...secondaryLinks]
  const isDropdownActive = secondaryLinks.some(link => pathname === link.href)

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav__inner">
          <Link href="/" className="nav__logo" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <img 
              src="/icon.png" 
              alt="Techo Connect Icon" 
              style={{ height: '32px', width: 'auto', objectFit: 'contain' }} 
            />
            <div>
              <div className="nav__logo-name">TECHO CONNECT</div>
              <div className="nav__logo-sub">Signal Hardware</div>
            </div>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <nav className="nav__links">
            {primaryLinks.map(l => (
              <Link key={l.href} href={l.href} className={pathname === l.href ? 'active' : ''}>
                {l.label}
              </Link>
            ))}

            {/* MORE DROPDOWN CONTAINER */}
            <div ref={dropdownRef} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              {/* Trigger configured as an anchor <a> to inherit your exact CSS link styles */}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  setMoreDropdownOpen(!moreDropdownOpen)
                }}
                className={isDropdownActive ? 'active' : ''}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer' }}
              >
                More
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  style={{
                    transform: moreDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                  }}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </a>

              {/* DROPDOWN MENU */}
              {moreDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 15px)',
                    right: 0,
                    minWidth: '200px',
                    backgroundColor: 'white',
                    border: '1px solid var(--border-light, #e2e8f0)',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                    padding: '0.5rem 0',
                    zIndex: 100,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {secondaryLinks.map(l => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className={pathname === l.href ? 'active' : ''}
                      onClick={() => setMoreDropdownOpen(false)}
                      style={{
                        padding: '0.75rem 1.25rem',
                        margin: 0, // Resets margin in case your global CSS adds margins to nav links
                        display: 'block',
                        width: '100%',
                      }}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link href="/checkout" className="nav__cart">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              Cart
              {itemCount > 0 && <span className="nav__cart-count">{itemCount}</span>}
            </Link>
            <button className="nav__burger" onClick={() => setDrawerOpen(true)} aria-label="Open menu">
              <span/><span/><span/>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <div className={`nav__drawer ${drawerOpen ? 'open' : ''}`}>
        <button className="nav__drawer-close" onClick={() => setDrawerOpen(false)}>✕</button>
        {allLinks.map(l => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}
        <Link href="/checkout">🛒 Cart {itemCount > 0 && `(${itemCount})`}</Link>
      </div>
      <div className={`nav__overlay ${drawerOpen ? 'open' : ''}`} onClick={() => setDrawerOpen(false)} />
    </>
  )
}