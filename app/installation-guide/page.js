'use client'
import Link from 'next/link'
import Nav from '../../components/layout/Nav'
import Footer from '../../components/layout/Footer'
import WAFloat from '../../components/ui/WAFloat'
import { useReveal } from '../../components/ui/useReveal'
import { WA_LINK } from '../../lib/utils'

const Step = ({ num, title, children, visual }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', padding: '3.5rem 0', borderBottom: '1px solid var(--border-light)' }} className="guide-step">
    <div className={num % 2 === 0 ? '' : ''} style={{ order: num % 2 === 0 ? 2 : 1 }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 40, height: 40, borderRadius: '50%', background: 'var(--green)', color: 'white', fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1rem', marginBottom: '1rem' }}>{num}</div>
      <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.6rem', color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: '1rem' }}>{title}</h2>
      <div style={{ fontSize: '0.925rem', color: 'var(--muted)', lineHeight: 1.85 }}>{children}</div>
    </div>
    <div style={{ order: num % 2 === 0 ? 1 : 2, background: 'linear-gradient(135deg, rgba(10,173,110,0.06) 0%, rgba(10,173,110,0.12) 100%)', borderRadius: 20, border: '1px solid rgba(10,173,110,0.15)', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200 }}>
      {visual}
    </div>
  </div>
)

export default function InstallationGuide() {
  useReveal()
  return (
    <>
      <Nav />

      <section className="page-hero">
        <div className="page-hero__bg" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="page-hero__label">Techo Connect / Installation Guide</div>
          <h1 className="page-hero__title">Antenna Installation<br /><em>Step by Step</em></h1>
          <p className="page-hero__desc">Follow these 5 steps to install your Yagi antenna and get maximum signal strength from your 4G router.</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
            <a href={`${WA_LINK}${encodeURIComponent('Hello! I need help installing my Techo Connect Yagi Antenna.')}`} target="_blank" rel="noopener" className="btn btn-wa">
              Need Help? WhatsApp Us
            </a>
            <Link href="/products" className="btn btn-outline">Shop Antennas</Link>
          </div>
        </div>
      </section>

      {/* OVERVIEW TIMELINE */}
      <div style={{ background: 'var(--green)', padding: '2rem 0', overflow: 'hidden' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0', flexWrap: 'wrap' }}>
            {['Choose Location', 'Mount on Pole', 'Connect to Router', 'Align Antenna', 'Test Signal'].map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem', padding: '0 1.5rem' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '0.9rem', color: 'white' }}>{i + 1}</div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'rgba(255,255,255,0.85)', textAlign: 'center', whiteSpace: 'nowrap' }}>{s}</div>
                </div>
                {i < 4 && <div style={{ width: 40, height: 2, background: 'rgba(255,255,255,0.3)', flexShrink: 0 }} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* STEPS */}
      <section style={{ padding: '2rem 0 5rem', background: 'white' }}>
        <div className="container">

          {/* STEP 1 */}
          <Step num={1} title="Choose the Best Location"
            visual={
              <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
                {/* Tower */}
                <rect x="220" y="40" width="6" height="130" fill="#9AB5A4"/>
                <line x1="210" y1="60" x2="235" y2="60" stroke="#6B8577" strokeWidth="2"/>
                <line x1="205" y1="80" x2="240" y2="80" stroke="#6B8577" strokeWidth="2"/>
                <circle cx="223" cy="40" r="6" fill="#0AAD6E"/>
                {/* Signal waves from tower */}
                <path d="M223 40 Q180 30 140 50" stroke="#0AAD6E" strokeWidth="1.5" strokeDasharray="5 3" fill="none"/>
                <path d="M223 40 Q170 20 120 45" stroke="#0AAD6E" strokeWidth="1" strokeDasharray="5 3" fill="none" opacity="0.6"/>
                {/* House */}
                <rect x="30" y="110" width="60" height="50" fill="#F0FAF7" stroke="#0AAD6E" strokeWidth="1.5"/>
                <polygon points="30,110 90,110 60,80" fill="#E0F5EA" stroke="#0AAD6E" strokeWidth="1.5"/>
                {/* Antenna on roof */}
                <rect x="57" y="65" width="5" height="35" fill="#0AAD6E"/>
                {[72, 82, 92].map((y, i) => (
                  <rect key={i} x={47 + i*2} y={y} width={20 - i*4} height="3" rx="1.5" fill="#078A57" opacity="0.8"/>
                ))}
                {/* Signal from antenna to tower */}
                <path d="M60 70 Q140 50 220 45" stroke="#0AAD6E" strokeWidth="2" strokeDasharray="6 3" fill="none"/>
                {/* Clear path indicator */}
                <text x="130" y="35" fill="#0AAD6E" fontSize="9" fontFamily="var(--font-body)" fontWeight="600" textAnchor="middle">Clear Line of Sight ✓</text>
                {/* Trees (obstruction) */}
                <circle cx="150" cy="120" r="20" fill="#C8E6C9" opacity="0.5"/>
                <rect x="147" y="130" width="6" height="20" fill="#A5D6A7" opacity="0.5"/>
                <text x="150" y="160" fill="#EF4444" fontSize="8" textAnchor="middle" opacity="0.7">Avoid obstacles</text>
              </svg>
            }>
            <p>Make sure there is no obstruction between your antenna and the signal tower — no large trees, tall buildings, or metal structures. A clear, open line of sight is the single most important factor for strong signal reception.</p>
            <p style={{ marginTop: '0.75rem' }}>💡 <strong>Tip:</strong> Use your phone's signal to roughly identify the direction of the nearest tower. Walk around your property to find the spot with the most bars before mounting.</p>
          </Step>

          {/* STEP 2 */}
          <Step num={2} title="Fix the Antenna on a Pole"
            visual={
              <svg viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
                {/* Pole */}
                <rect x="132" y="10" width="10" height="200" fill="#9AB5A4" rx="3"/>
                {/* U-bolts */}
                <path d="M115 70 Q105 70 105 80 Q105 90 115 90" stroke="#6B8577" strokeWidth="3" fill="none" strokeLinecap="round"/>
                <line x1="115" y1="70" x2="150" y2="70" stroke="#6B8577" strokeWidth="2"/>
                <line x1="115" y1="90" x2="150" y2="90" stroke="#6B8577" strokeWidth="2"/>
                {/* Antenna boom */}
                <rect x="148" y="60" width="8" height="100" rx="3" fill="#0AAD6E"/>
                {/* Directors */}
                {[70, 87, 104, 121, 138].map((y, i) => (
                  <rect key={i} x={130 - i * 4} y={y} width={44 + i * 8} height="5" rx="2.5" fill="#078A57" opacity={0.7 + i * 0.06}/>
                ))}
                {/* Reflector */}
                <rect x="122" y="145" width="60" height="7" rx="3" fill="#056B44" opacity="0.6"/>
                {/* Cable */}
                <path d="M152 160 Q160 175 145 185 Q130 195 130 210" stroke="#555" strokeWidth="2" strokeDasharray="4 2" fill="none"/>
                {/* Cable tie */}
                <rect x="127" y="185" width="10" height="4" rx="2" fill="#0AAD6E" opacity="0.6"/>
                {/* Height indicator */}
                <line x1="90" y1="10" x2="90" y2="210" stroke="var(--border-light)" strokeWidth="1" strokeDasharray="4 2"/>
                <text x="72" y="110" fill="var(--muted)" fontSize="9" textAnchor="middle" transform="rotate(-90, 72, 110)">20–25 feet</text>
              </svg>
            }>
            <p>Mount the antenna on a metal pole that is <strong>20–25 feet (6–8 metres) high</strong>. The higher the pole, the fewer obstructions and the stronger the signal. Clamp it securely using the U-bolts provided so it stays stable in wind and rain.</p>
            <div style={{ marginTop: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {['Tighten all U-bolts firmly — the antenna must not rotate on its own', 'Run the cable neatly down the pole using cable ties', 'Leave a small drip loop at the bottom of the cable before entering the building'].map(t => (
                <div key={t} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--slate)' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 2 }}><polyline points="20 6 9 17 4 12"/></svg>
                  {t}
                </div>
              ))}
            </div>
          </Step>

          {/* STEP 3 */}
          <Step num={3} title="Connect to Your Router"
            visual={
              <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
                {/* Router box */}
                <rect x="80" y="100" width="120" height="60" rx="8" fill="white" stroke="#0AAD6E" strokeWidth="2"/>
                {/* Antenna ports */}
                <rect x="95" y="85" width="12" height="20" rx="3" fill="#9AB5A4"/>
                <rect x="115" y="85" width="12" height="20" rx="3" fill="#9AB5A4"/>
                {/* SMA connector */}
                <circle cx="101" cy="85" r="6" fill="#0AAD6E"/>
                <circle cx="121" cy="85" r="6" fill="#0AAD6E"/>
                {/* Crossed old antennas */}
                <line x1="95" y1="55" x2="107" y2="75" stroke="#EF4444" strokeWidth="2" opacity="0.4"/>
                <line x1="107" y1="55" x2="95" y2="75" stroke="#EF4444" strokeWidth="2" opacity="0.4"/>
                <line x1="115" y1="55" x2="127" y2="75" stroke="#EF4444" strokeWidth="2" opacity="0.4"/>
                <line x1="127" y1="55" x2="115" y2="75" stroke="#EF4444" strokeWidth="2" opacity="0.4"/>
                <text x="111" y="50" fill="#EF4444" fontSize="8" textAnchor="middle" opacity="0.7">Remove old antennas</text>
                {/* Cable coming from antenna */}
                <path d="M101 85 Q101 70 80 60 Q60 50 50 30" stroke="#555" strokeWidth="2" strokeDasharray="4 2" fill="none"/>
                <circle cx="50" cy="30" r="5" fill="#0AAD6E"/>
                <text x="35" y="22" fill="#0AAD6E" fontSize="8" fontWeight="600">SMA ✓</text>
                {/* Router LEDs */}
                <circle cx="110" cy="130" r="4" fill="#0AAD6E" opacity="0.7"/>
                <circle cx="125" cy="130" r="4" fill="#0AAD6E" opacity="0.5"/>
                <circle cx="140" cy="130" r="4" fill="#F59E0B" opacity="0.7"/>
                <text x="140" y="155" fill="var(--muted)" fontSize="9" textAnchor="middle">Router</text>
              </svg>
            }>
            <p>Go to your wireless broadband router and follow these steps:</p>
            <ol style={{ paddingLeft: '1.25rem', marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', listStyle: 'decimal' }}>
              <li style={{ fontSize: '0.9rem', color: 'var(--slate)' }}>Unscrew and <strong>remove the small stick antennas</strong> currently on your router</li>
              <li style={{ fontSize: '0.9rem', color: 'var(--slate)' }}>Take the <strong>gold SMA Male connectors</strong> of the outdoor antenna cable</li>
              <li style={{ fontSize: '0.9rem', color: 'var(--slate)' }}>Screw them into the router's antenna ports — <strong>finger tight</strong>, then a quarter turn more</li>
            </ol>
            <div className="alert alert-info" style={{ marginTop: '1rem' }}>
              <span>💡</span>
              <span>Most 4G routers have 2 antenna ports. Connect both cables for maximum MIMO gain.</span>
            </div>
          </Step>

          {/* STEP 4 */}
          <Step num={4} title="Align the Antenna for Best Signal"
            visual={
              <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
                {/* Antenna (rotatable) */}
                <rect x="134" y="30" width="8" height="100" rx="3" fill="#0AAD6E"/>
                {[45, 60, 75, 90, 105].map((y, i) => (
                  <rect key={i} x={118 - i * 3} y={y} width={40 + i * 6} height="4.5" rx="2" fill="#078A57" opacity="0.75"/>
                ))}
                {/* Rotation arc */}
                <path d="M80 80 Q90 50 138 30" stroke="#0AAD6E" strokeWidth="1.5" strokeDasharray="5 3" fill="none" opacity="0.5"/>
                <path d="M200 80 Q190 50 138 30" stroke="#0AAD6E" strokeWidth="1.5" strokeDasharray="5 3" fill="none" opacity="0.5"/>
                <text x="62" y="88" fill="var(--muted)" fontSize="9">Rotate</text>
                <text x="190" y="88" fill="var(--muted)" fontSize="9">Rotate</text>
                {/* Signal bars */}
                {[0, 1, 2, 3, 4].map(i => (
                  <rect key={i} x={68 + i * 16} y={180 - i * 12} width="10" height={10 + i * 12} rx="2" fill={i < 4 ? '#0AAD6E' : '#E0E0E0'} opacity={i < 4 ? 1 : 0.4}/>
                ))}
                <text x="100" y="175" fill="var(--green)" fontSize="8" textAnchor="middle" fontWeight="600">Maximise bars ↑</text>
                {/* Timer */}
                <rect x="185" y="145" width="70" height="36" rx="8" fill="rgba(10,173,110,0.1)" stroke="rgba(10,173,110,0.3)" strokeWidth="1"/>
                <text x="220" y="160" fill="var(--green)" fontSize="9" textAnchor="middle" fontWeight="600">Wait 20s</text>
                <text x="220" y="173" fill="var(--muted)" fontSize="8" textAnchor="middle">after each turn</text>
              </svg>
            }>
            <p>This step requires patience — it's the most important part of the installation:</p>
            <ol style={{ paddingLeft: '1.25rem', marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', listStyle: 'decimal' }}>
              <li style={{ fontSize: '0.9rem', color: 'var(--slate)' }}>Point the antenna roughly toward the signal tower</li>
              <li style={{ fontSize: '0.9rem', color: 'var(--slate)' }}><strong>Rotate the antenna slightly</strong> (5–10 degrees at a time)</li>
              <li style={{ fontSize: '0.9rem', color: 'var(--slate)' }}><strong>Wait 20 seconds</strong> for the router's signal bars to update</li>
              <li style={{ fontSize: '0.9rem', color: 'var(--slate)' }}>Check the signal bar count on your router</li>
              <li style={{ fontSize: '0.9rem', color: 'var(--slate)' }}>Repeat until you reach the <strong>highest signal bar count</strong></li>
              <li style={{ fontSize: '0.9rem', color: 'var(--slate)' }}><strong>Tighten the bracket</strong> firmly to lock the antenna in place</li>
            </ol>
          </Step>

          {/* STEP 5 */}
          <Step num={5} title="If Signal is Weak — Troubleshoot"
            visual={
              <svg viewBox="0 0 280 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }}>
                {/* Checklist graphic */}
                {[
                  { y: 40, text: 'Try a different location', done: true },
                  { y: 75, text: 'Higher pole if possible', done: true },
                  { y: 110, text: 'No sharp cable bends', done: true },
                  { y: 145, text: 'Connectors tight', done: false },
                ].map(item => (
                  <g key={item.y}>
                    <rect x="20" y={item.y} width="240" height="28" rx="8" fill={item.done ? 'rgba(10,173,110,0.08)' : 'rgba(245,158,11,0.08)'} stroke={item.done ? 'rgba(10,173,110,0.2)' : 'rgba(245,158,11,0.2)'} strokeWidth="1"/>
                    <circle cx="38" cy={item.y + 14} r="9" fill={item.done ? '#0AAD6E' : '#F59E0B'}/>
                    <text x="38" y={item.y + 18} fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">{item.done ? '✓' : '!'}</text>
                    <text x="56" y={item.y + 18} fill="var(--slate)" fontSize="10" fontWeight="500">{item.text}</text>
                  </g>
                ))}
              </svg>
            }>
            <p>If you still don't get a good signal after alignment:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '0.85rem 0' }}>
              {[
                'Try moving the antenna to a completely different outdoor location',
                'Raise the pole higher — even 2 feet of extra height can make a big difference',
                'Avoid sharp bends in the cable — this causes signal loss',
                'Make sure all SMA connectors are screwed in finger-tight',
                'Check that the antenna points toward the tower, not parallel to it',
              ].map(t => (
                <div key={t} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--slate)' }}>
                  <span style={{ color: 'var(--green)', flexShrink: 0 }}>→</span>
                  {t}
                </div>
              ))}
            </div>
            <div style={{ background: 'rgba(10,173,110,0.06)', border: '1px solid rgba(10,173,110,0.2)', borderRadius: 10, padding: '1rem', marginTop: '1rem', fontSize: '0.85rem', color: 'var(--slate)' }}>
              📞 <strong>Still no signal?</strong> You may be eligible for our <strong>5-Day Checking Warranty</strong>. Send us a photo of your installation on <a href={`${WA_LINK}${encodeURIComponent('Hello! I need help with my antenna installation. Here is my photo:')}`} target="_blank" rel="noopener" style={{ color: 'var(--green)', fontWeight: 600 }}>WhatsApp +94 70 665 6007</a>
            </div>
          </Step>

          {/* TIPS BOX */}
          <div style={{ background: 'linear-gradient(135deg, rgba(10,173,110,0.06) 0%, rgba(10,173,110,0.12) 100%)', border: '1px solid rgba(10,173,110,0.2)', borderRadius: 20, padding: '2.5rem', marginTop: '3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: '1.5rem', color: 'var(--ink)', marginBottom: '1.5rem' }}>💡 Tips for Best Results</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {[
                { icon: '📏', tip: 'Higher pole = stronger signal. Every extra foot of height helps.' },
                { icon: '🔄', tip: 'Never bend RG6 cable sharply — this degrades signal quality.' },
                { icon: '🔗', tip: 'Secure cables with clips or ties along the pole and wall.' },
                { icon: '👁️', tip: 'Always ensure the antenna has a clear, direct view toward the tower.' },
                { icon: '🌧️', tip: 'Use the dipole weather protection cover in heavy rainfall areas.' },
                { icon: '⏱️', tip: 'Wait at least 20 seconds between alignment adjustments for signal to stabilise.' },
              ].map(t => (
                <div key={t.tip} style={{ display: 'flex', gap: '0.75rem', padding: '1rem', background: 'white', borderRadius: 12, border: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{t.icon}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--slate)', lineHeight: 1.65 }}>{t.tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 0', background: 'var(--bg)', textAlign: 'center' }}>
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>Still Need Help?</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '2rem' }}>Our technical team is on WhatsApp to guide you through installation personally.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`${WA_LINK}${encodeURIComponent('Hello! I need installation support for my Techo Connect Yagi Antenna.')}`} target="_blank" rel="noopener" className="btn btn-wa btn-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
              WhatsApp Installation Support
            </a>
            <Link href="/products" className="btn btn-outline btn-lg">Shop Our Antennas</Link>
          </div>
        </div>
      </section>

      <Footer />
      <WAFloat />

      <style jsx>{`
        .guide-step > div:first-child { order: 1; }
        .guide-step > div:last-child { order: 2; }
        @media (max-width: 768px) {
          .guide-step { grid-template-columns: 1fr !important; }
          .guide-step > div { order: unset !important; }
        }
      `}</style>
    </>
  )
}
