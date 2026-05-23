'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCartStore } from '../../store/cart'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const pathname = usePathname()
  const itemCount = useCartStore(s => s.items.reduce((sum, i) => sum + i.qty, 0))

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setDrawerOpen(false), [pathname])

  const links = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/careers', label: 'Careers' },
    { href: '/contact', label: 'Contact' },
    { href: '/track', label: 'Track' },
    // { href: '/analyzer', label: 'Signal Analyzer' },
  ]

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav__inner">
          <Link href="/" className="nav__logo">
            <div className="nav__logo-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div>
              <div className="nav__logo-name">TECHO CONNECT</div>
              <div className="nav__logo-sub">Signal Hardware</div>
            </div>
          </Link>

          <nav className="nav__links">
            {links.map(l => (
              <Link key={l.href} href={l.href} className={pathname === l.href ? 'active' : ''}>
                {l.label}
              </Link>
            ))}
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

      <div className={`nav__drawer ${drawerOpen ? 'open' : ''}`}>
        <button className="nav__drawer-close" onClick={() => setDrawerOpen(false)}>✕</button>
        {links.map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}
        <Link href="/checkout">🛒 Cart {itemCount > 0 && `(${itemCount})`}</Link>
      </div>
      <div className={`nav__overlay ${drawerOpen ? 'open' : ''}`} onClick={() => setDrawerOpen(false)} />
    </>
  )
}
