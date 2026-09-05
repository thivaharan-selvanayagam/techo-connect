import Link from 'next/link'
import { WA_LINK, WA_COMMUNITY, FB_PAGE } from '../../lib/utils'

export default function Footer() {
  const waMsg = encodeURIComponent('Hello Techo Connect! I have a question about your antennas.')
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link href="/" className="nav__logo" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
              <img 
                src="/icon.png" 
                alt="Techo Connect Icon" 
                style={{ height: '32px', width: 'auto', objectFit: 'contain' }} 
              />
              <div>
                <div className="nav__logo-name" style={{ color: 'white' }}>TECHO CONNECT</div>
                <div className="nav__logo-sub">Signal Hardware</div>
              </div>
            </Link>
            <p>Premium Yagi antennas engineered for Sri Lankan 4G/LTE frequencies. Fast island-wide delivery.</p>
            
            {/* SOCIAL MEDIA BUTTONS */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              {/* WhatsApp */}
              <a href={`${WA_LINK}${encodeURIComponent('Hello Techo Connect!')}`} target="_blank" rel="noopener"
                style={{ width: 34, height: 34, background: '#25D366', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              
              {/* Facebook */}
              <a href={FB_PAGE} target="_blank" rel="noopener"
                style={{ width: 34, height: 34, background: '#1877F2', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>

              {/* YouTube */}
              <a href="https://www.youtube.com/@ThivaharanS" target="_blank" rel="noopener"
                style={{ width: 34, height: 34, background: '#FF0000', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-label="YouTube Channel">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>

              {/* TikTok */}
              <a href="https://www.tiktok.com/@techotraders" target="_blank" rel="noopener"
                style={{ width: 34, height: 34, background: '#000000', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.2)' }}
                aria-label="TikTok Account">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M12.525 0h3.08c.12 1.348.661 2.502 1.572 3.398.91 1.002 2.115 1.545 3.528 1.63v3.13c-1.884-.043-3.528-.621-4.887-1.782v7.194c0 1.957-.59 3.653-1.768 5.09-1.178 1.436-2.7 2.155-4.568 2.155-1.867 0-3.418-.686-4.653-2.057-1.235-1.371-1.853-3.023-1.853-4.956 0-1.933.633-3.593 1.9-4.98 1.266-1.388 2.85-2.082 4.752-2.082.43 0 .88.043 1.35.13v3.302a4.42 4.42 0 0 0-1.152-.152c-1.042 0-1.921.36-2.637 1.08-.716.72-1.074 1.597-1.074 2.632 0 1.035.358 1.912 1.074 2.632.716.72 1.595 1.08 2.637 1.08 1.042 0 1.93-.36 2.666-1.08.736-.72 1.104-1.618 1.104-2.692V0z"/></svg>
              </a>
            </div>
          </div>

          <div className="footer__col">
            <h4>Products</h4>
            <ul>
              <li><Link href="/products/yagi-pro">Yagi Pro</Link></li>
              <li><Link href="/products/yagi-elite">Yagi Elite</Link></li>
              <li><Link href="/products/yagi-ultra">Yagi Ultra</Link></li>
              <li><Link href="/installation-guide">Installation Guide</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><a href="https://www.techotraders.com.lk" target="_blank" rel="noopener">Techo Traders</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Policies</h4>
            <ul>
              <li><Link href="/returns">Returns & Refunds</Link></li>
              <li><Link href="/terms">Terms & Conditions</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/shipping">Shipping Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} Techo Connect (Pvt) Ltd · A Techo Traders Company. All rights reserved.</p>
          <div className="footer__eco">TECHO TRADERS ECOSYSTEM</div>
        </div>
      </div>
    </footer>
  )
}