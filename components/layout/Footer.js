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
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
              <a href={`${WA_LINK}${encodeURIComponent('Hello Techo Connect!')}`} target="_blank" rel="noopener"
                style={{ width: 34, height: 34, background: '#25D366', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a href={FB_PAGE} target="_blank" rel="noopener"
                style={{ width: 34, height: 34, background: '#1877F2', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>

          <div className="footer__col">
            <h4>Products</h4>
            <ul>
              <li><Link href="/products/yagi-pro">Yagi Pro</Link></li>
              <li><Link href="/products/yagi-elite">Yagi Elite</Link></li>
              <li><Link href="/products#spares">Spare Parts</Link></li>
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