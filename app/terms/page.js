'use client'
import { useState } from 'react'
import Link from 'next/link'
import Nav from '../../components/layout/Nav'
import Footer from '../../components/layout/Footer'
import WAFloat from '../../components/ui/WAFloat'
import { WA_LINK } from '../../lib/utils'

// Helper component for Desktop view (100% original styling rules preserved)
const Section = ({ num, title, children }) => (
  <div style={{ marginBottom: '2.5rem' }}>
    <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--ink)', marginBottom: '1rem', paddingBottom: '0.6rem', borderBottom: '2px solid rgba(10,173,110,0.15)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: '50%', background: 'rgba(10,173,110,0.1)', color: 'var(--green)', fontSize: '0.8rem', fontWeight: 800, flexShrink: 0 }}>{num}</span>
      {title}
    </h2>
    {children}
  </div>
)

// Helper component for Mobile view (Optimized spacing for fluid stacked reading)
const MobileSection = ({ num, title, children }) => (
  <div style={{ marginBottom: '2rem' }}>
    <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.15rem', color: 'var(--ink)', marginBottom: '0.75rem', paddingBottom: '0.5rem', borderBottom: '2px solid rgba(10,173,110,0.15)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: '50%', background: 'rgba(10,173,110,0.1)', color: 'var(--green)', fontSize: '0.75rem', fontWeight: 800, flexShrink: 0 }}>{num}</span>
      {title}
    </h2>
    <div style={{ fontSize: '0.9rem', lineHeight: 1.6 }} className="legal-content">
      {children}
    </div>
  </div>
)

export default function Terms() {
  return (
    <>
      <Nav />

      <section className="page-hero" style={{ paddingBottom: '3rem' }}>
        <div className="page-hero__bg" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="page-hero__label">Techo Connect / Legal</div>
          <h1 className="page-hero__title">Terms &amp;<br /><em>Conditions</em></h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: '0.75rem', position: 'relative', zIndex: 2 }}>
            Last Updated: <strong>March 2026</strong>
          </p>
        </div>
      </section>

      <section style={{ padding: '4rem 0 6rem', background: 'white' }}>
        <div className="container-sm">

          {/* Intro (Shared safe fluid block layout structure) */}
          <div style={{ background: 'rgba(10,173,110,0.05)', border: '1px solid rgba(10,173,110,0.15)', borderRadius: 12, padding: '1.5rem', marginBottom: '3rem' }}>
            <p style={{ fontSize: '0.925rem', color: 'var(--slate)', lineHeight: 1.8 }}>
              Please read these terms carefully before utilising our professional signal hardware. By accessing and using the Techo Traders website and purchasing our products, you agree to be bound by these terms and conditions.
            </p>
          </div>

          {/* ── DESKTOP ONLY REGION (100% Pristine layout logic parameters preserved) ── */}
          <div className="desktop-only">
            <div className="legal-content">
              <Section num="1" title="Acceptance of Terms">
                <p>By accessing and using the Techo Traders / Techo Connect website and purchasing our products — including the Yagi Elite, Yagi Pro, and all antenna components — you agree to be bound by these terms and conditions. These terms apply to all visitors, users, and customers.</p>
                <p>If you do not agree to any part of these terms, you must not use our website or purchase our products.</p>
              </Section>

              <Section num="2" title="Product Usage & Installation">
                <p>Our antennas are high-performance signal hardware. While we provide universal SMA connectors and mounting kits with our products, Techo Traders is not responsible for:</p>
                <ul>
                  <li>Damages caused by <strong>improper installation</strong> not following our guide</li>
                  <li>Damage from <strong>lightning strikes</strong> outside of specified safety parameters</li>
                  <li><strong>Unauthorised modifications</strong> to the equipment</li>
                  <li>Signal performance variation caused by carrier network changes or tower relocation</li>
                  <li>Physical damage caused by extreme weather events after proper installation</li>
                </ul>
                <p>We strongly recommend following our <Link href="/installation-guide" style={{ color: 'var(--green)', fontWeight: 600 }}>Installation Guide</Link> and contacting our WhatsApp support for guidance before and during installation.</p>
              </Section>

              <Section num="3" title="Shipping & Delivery">
                <p>We aim to <strong>dispatch all confirmed orders within 24–48 hours</strong> of receipt verification. Delivery times across Sri Lanka may vary based on the carrier and your district.</p>
                <p>Techo Traders is <strong>not liable</strong> for delays caused by:</p>
                <ul>
                  <li>Third-party courier services or their operations</li>
                  <li>Extreme weather conditions or natural disasters</li>
                  <li>Incorrect address information provided by the customer</li>
                  <li>Public holidays or courier operational pauses</li>
                </ul>
                <p>For detailed delivery charges and timelines, please see our <Link href="/shipping" style={{ color: 'var(--green)', fontWeight: 600 }}>Shipping Policy</Link>.</p>
              </Section>

              <Section num="4" title="Return & Refund Policy">
                <p>Returns are accepted within <strong>5 days of delivery</strong> only if the product is found to be technically defective (no signal received despite proper outdoor installation). The product must be returned in its original condition.</p>
                <p>Due to the nature of signal equipment, we <strong>do not offer refunds for 'change of mind'</strong> if the antenna is functioning as specified.</p>
                <p>
                  <Link href="/returns" style={{ color: 'var(--green)', fontWeight: 600 }}>
                    → Click here to view our full Returns & Refunds Policy
                  </Link>
                </p>
              </Section>

              <Section num="5" title="Payment Terms">
                <p>All prices are listed in <strong>Sri Lankan Rupees (LKR)</strong> and are inclusive of applicable taxes. Payment methods accepted are:</p>
                <ul>
                  <li><strong>Bank Deposit</strong> — full payment including delivery charge</li>
                  <li><strong>Cash on Delivery (COD)</strong> — requires LKR 500 deposit to confirm order</li>
                </ul>
                <p>Orders are <strong>only confirmed after deposit verification</strong>. We reserve the right to cancel unconfirmed orders after 48 hours.</p>
              </Section>

              <Section num="6" title="Intellectual Property">
                <p>All content on this website — including product designs, images, text, and the Techo Connect brand identity — is the intellectual property of Techo Traders (Pvt) Ltd. Unauthorised reproduction, distribution, or commercial use is strictly prohibited.</p>
              </Section>

              <Section num="7" title="Limitation of Liability">
                <p>To the maximum extent permitted by Sri Lankan law, Techo Traders shall not be liable for any indirect, incidental, special, or consequential damages arising from the use or inability to use our products, including but not limited to loss of revenue, loss of data, or damage to property.</p>
              </Section>

              <Section num="8" title="Governing Law">
                <p>These terms and conditions are governed by and construed in accordance with the laws of the <strong>Democratic Socialist Republic of Sri Lanka</strong>. Any disputes arising shall be subject to the exclusive jurisdiction of Sri Lankan courts.</p>
              </Section>

              <Section num="9" title="Changes to Terms">
                <p>Techo Traders reserves the right to update these terms at any time. The "Last Updated" date at the top of this page will reflect any changes. Continued use of our website or products after changes constitutes acceptance of the new terms.</p>
              </Section>

              <Section num="10" title="Contact">
                <p>If you have any questions regarding our terms, shipping, or warranty, please reach out to our support team:</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--slate)' }}>
                  <div>📞 <strong>WhatsApp:</strong> +94 70 665 6007</div>
                  <div>✉️ <strong>Email:</strong> connect@techotraders.com.lk</div>
                  <div>📍 <strong>Address:</strong> Kallady, Batticaloa, Sri Lanka</div>
                </div>
              </Section>
            </div>

            {/* Quick links to other policies on desktop layout viewports */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '3rem' }}>
              {[
                { href: '/returns', label: 'Returns & Refunds', icon: '↩️' },
                { href: '/privacy', label: 'Privacy Policy', icon: '🔒' },
                { href: '/shipping', label: 'Shipping Policy', icon: '🚚' },
              ].map(link => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="policy-card"
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.6rem', 
                    padding: '1rem 1.25rem', 
                    background: 'var(--bg)', 
                    border: '1px solid var(--border-light)', 
                    borderRadius: 10, 
                    fontSize: '0.875rem', 
                    fontWeight: 600, 
                    color: 'var(--slate)', 
                    transition: 'all 0.2s ease' 
                  }}
                >
                  <span>{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* ── MOBILE ONLY REGION (Fluid stacked reading layouts) ── */}
          <div className="mobile-only">
            <div>
              <MobileSection num="1" title="Acceptance of Terms">
                <p style={{ marginBottom: '0.5rem' }}>By accessing and using the Techo Traders / Techo Connect website and purchasing our products — including the Yagi Elite, Yagi Pro, and all antenna components — you agree to be bound by these terms and conditions. These terms apply to all visitors, users, and customers.</p>
                <p>If you do not agree to any part of these terms, you must not use our website or purchase our products.</p>
              </MobileSection>

              <MobileSection num="2" title="Product Usage & Installation">
                <p style={{ marginBottom: '0.5rem' }}>Our antennas are high-performance signal hardware. While we provide universal SMA connectors and mounting kits with our products, Techo Traders is not responsible for:</p>
                <ul style={{ paddingLeft: '1.2rem', marginBottom: '0.5rem' }}>
                  <li>Damages caused by <strong>improper installation</strong> not following our guide</li>
                  <li>Damage from <strong>lightning strikes</strong> outside of specified safety parameters</li>
                  <li><strong>Unauthorised modifications</strong> to the equipment</li>
                  <li>Signal performance variation caused by carrier network changes or tower relocation</li>
                  <li>Physical damage caused by extreme weather events after proper installation</li>
                </ul>
                <p>We strongly recommend following our <Link href="/installation-guide" style={{ color: 'var(--green)', fontWeight: 600 }}>Installation Guide</Link> and contacting our WhatsApp support for guidance before and during installation.</p>
              </MobileSection>

              <MobileSection num="3" title="Shipping & Delivery">
                <p style={{ marginBottom: '0.5rem' }}>We aim to <strong>dispatch all confirmed orders within 24–48 hours</strong> of receipt verification. Delivery times across Sri Lanka may vary based on the carrier and your district.</p>
                <p style={{ marginBottom: '0.5rem' }}>Techo Traders is <strong>not liable</strong> for delays caused by:</p>
                <ul style={{ paddingLeft: '1.2rem', marginBottom: '0.5rem' }}>
                  <li>Third-party courier services or their operations</li>
                  <li>Extreme weather conditions or natural disasters</li>
                  <li>Incorrect address information provided by the customer</li>
                  <li>Public holidays or courier operational pauses</li>
                </ul>
                <p>For detailed delivery charges and timelines, please see our <Link href="/shipping" style={{ color: 'var(--green)', fontWeight: 600 }}>Shipping Policy</Link>.</p>
              </MobileSection>

              <MobileSection num="4" title="Return & Refund Policy">
                <p style={{ marginBottom: '0.5rem' }}>Returns are accepted within <strong>5 days of delivery</strong> only if the product is found to be technically defective (no signal received despite proper outdoor installation). The product must be returned in its original condition.</p>
                <p style={{ marginBottom: '0.5rem' }}>Due to the nature of signal equipment, we <strong>do not offer refunds for 'change of mind'</strong> if the antenna is functioning as specified.</p>
                <p>
                  <Link href="/returns" style={{ color: 'var(--green)', fontWeight: 600 }}>
                    &rarr; View our full Returns & Refunds Policy
                  </Link>
                </p>
              </MobileSection>

              <MobileSection num="5" title="Payment Terms">
                <p style={{ marginBottom: '0.5rem' }}>All prices are listed in <strong>Sri Lankan Rupees (LKR)</strong> and are inclusive of applicable taxes. Payment methods accepted are:</p>
                <ul style={{ paddingLeft: '1.2rem', marginBottom: '0.5rem' }}>
                  <li><strong>Bank Deposit</strong> — full payment including delivery charge</li>
                  <li><strong>Cash on Delivery (COD)</strong> — requires LKR 500 deposit to confirm order</li>
                </ul>
                <p>Orders are <strong>only confirmed after deposit verification</strong>. We reserve the right to cancel unconfirmed orders after 48 hours.</p>
              </MobileSection>

              <MobileSection num="6" title="Intellectual Property">
                <p>All content on this website — including product designs, images, text, and the Techo Connect brand identity — is the intellectual property of Techo Traders (Pvt) Ltd. Unauthorised reproduction, distribution, or commercial use is strictly prohibited.</p>
              </MobileSection>

              <MobileSection num="7" title="Limitation of Liability">
                <p>To the maximum extent permitted by Sri Lankan law, Techo Traders shall not be liable for any indirect, incidental, special, or consequential damages arising from the use or inability to use our products, including but not limited to loss of revenue, loss of data, or damage to property.</p>
              </MobileSection>

              <MobileSection num="8" title="Governing Law">
                <p>These terms and conditions are governed by and construed in accordance with the laws of the <strong>Democratic Socialist Republic of Sri Lanka</strong>. Any disputes arising shall be subject to the exclusive jurisdiction of Sri Lankan courts.</p>
              </MobileSection>

              <MobileSection num="9" title="Changes to Terms">
                <p>Techo Traders reserves the right to update these terms at any time. The "Last Updated" date at the top of this page will reflect any changes. Continued use of our website or products after changes constitutes acceptance of the new terms.</p>
              </MobileSection>

              <MobileSection num="10" title="Contact">
                <p>If you have any questions regarding our terms, shipping, or warranty, please reach out to our support team:</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--slate)' }}>
                  <div>📞 <strong>WhatsApp:</strong> +94 70 665 6007</div>
                  <div>✉️ <strong>Email:</strong> connect@techotraders.com.lk</div>
                  <div>📍 <strong>Address:</strong> Kallady, Batticaloa, Sri Lanka</div>
                </div>
              </MobileSection>
            </div>

            {/* Vertically stacked dynamic cross links optimized for compact touch targets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '2.5rem' }}>
              {[
                { href: '/returns', label: 'Returns & Refunds', icon: '↩️' },
                { href: '/privacy', label: 'Privacy Policy', icon: '🔒' },
                { href: '/shipping', label: 'Shipping Policy', icon: '🚚' },
              ].map(link => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.6rem', 
                    padding: '0.85rem 1rem', 
                    background: 'var(--bg)', 
                    border: '1px solid var(--border-light)', 
                    borderRadius: 8, 
                    fontSize: '0.85rem', 
                    fontWeight: 600, 
                    color: 'var(--slate)'
                  }}
                >
                  <span>{link.icon}</span>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      <Footer />
      <WAFloat />
    </>
  )
}