import Link from 'next/link'
import Nav from '../components/layout/Nav'
import Footer from '../components/layout/Footer'

export default function NotFound() {
  return (
    <>
      <Nav />
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        background: 'white',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '5rem',
      }}>
        {/* Background grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(10,173,110,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(10,173,110,0.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          pointerEvents: 'none',
        }}/>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, white 100%)',
          pointerEvents: 'none',
        }}/>

        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* Big 404 */}
          <div style={{
            fontFamily: 'var(--font-head)', fontWeight: 800,
            fontSize: 'clamp(8rem, 22vw, 16rem)',
            color: 'rgba(10,173,110,0.08)',
            lineHeight: 1, letterSpacing: '-0.05em',
            userSelect: 'none',
          }}>404</div>

          {/* Icon */}
          <div style={{ marginTop: '-3rem', marginBottom: '1.5rem', fontSize: '3rem' }}>📡</div>

          {/* Label */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            padding: '0.3rem 1rem', background: 'rgba(10,173,110,0.08)',
            border: '1px solid rgba(10,173,110,0.2)', borderRadius: 100,
            fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: 'var(--green)', marginBottom: '1.25rem',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', animation: 'blink 2s ease infinite' }}/>
            Signal Lost
          </div>

          <h1 style={{
            fontFamily: 'var(--font-head)', fontWeight: 800,
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            color: 'var(--ink)', letterSpacing: '-0.02em',
            lineHeight: 1.1, marginBottom: '1rem',
          }}>
            This Page Doesn't<br /><span style={{ color: 'var(--green)' }}>Exist.</span>
          </h1>

          <p style={{ color: 'var(--muted)', maxWidth: 380, margin: '0 auto 2.5rem', fontSize: '0.975rem', lineHeight: 1.7 }}>
            The page you're looking for has been moved, deleted, or never existed. Let's get your signal back on track.
          </p>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" className="btn btn-primary btn-lg">
              Back to Home
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
            </Link>
            <Link href="/products" className="btn btn-outline btn-lg">Shop Antennas</Link>
            <Link href="/contact" className="btn btn-ghost btn-lg">Contact Us</Link>
          </div>

          <p style={{ fontSize: '0.75rem', color: 'var(--light-text)', marginTop: '2.5rem', fontFamily: 'monospace', letterSpacing: '0.1em' }}>
            ERROR 404 · TECHO CONNECT · SIGNAL NOT FOUND
          </p>
        </div>
      </section>
      <Footer />
    </>
  )
}
