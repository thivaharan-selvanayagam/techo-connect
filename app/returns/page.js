import Link from 'next/link'
import Nav from '../../components/layout/Nav'
import Footer from '../../components/layout/Footer'
import WAFloat from '../../components/ui/WAFloat'
import { WA_LINK } from '../../lib/utils'

export const metadata = {
  title: 'Returns & Refunds Policy',
  description: 'Techo Connect return, refund and warranty policy. 5-day checking warranty and 12-month service warranty on all antenna products.',
}

const Section = ({ title, children }) => (
  <div style={{ marginBottom: '2.5rem' }}>
    <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--ink)', marginBottom: '1rem', paddingBottom: '0.6rem', borderBottom: '2px solid rgba(10,173,110,0.15)' }}>
      {title}
    </h2>
    {children}
  </div>
)

export default function Returns() {
  return (
    <>
      <Nav />

      <section className="page-hero" style={{ paddingBottom: '3rem' }}>
        <div className="page-hero__bg" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="page-hero__label">Techo Connect / Legal</div>
          <h1 className="page-hero__title">Returns &amp; Refunds<br /><em>Policy</em></h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.9' + 'rem', marginTop: '0.75rem', position: 'relative', zIndex: 2 }}>
            Effective Date: <strong>18 April 2026</strong>
          </p>
        </div>
      </section>

      <section style={{ padding: '4rem 0 6rem', background: 'white' }}>
        <div className="container-sm">

          {/* Intro */}
          <div style={{ background: 'rgba(10,173,110,0.05)', border: '1px solid rgba(10,173,110,0.15)', borderRadius: 12, padding: '1.5rem', marginBottom: '3rem' }}>
            <p style={{ fontSize: '0.925rem', color: 'var(--slate)', lineHeight: 1.8 }}>
              At <strong>Techo Traders</strong>, customer satisfaction is important to us. Please read this Return, Refund, and Warranty Policy carefully before purchasing. By purchasing from us, you agree to the terms below.
            </p>
          </div>

          <div className="legal-content">

            <Section title="1. 5-Day Checking Warranty (Signal Issue Return)">
              <p>If you do not receive any signal from our antenna, you may request a return within <strong>5 days</strong> from the date of delivery, subject to the following conditions.</p>

              <h3>Conditions</h3>
              <ul>
                <li>The antenna must be <strong>properly fixed in an outdoor installation</strong>.</li>
                <li>The product must be in <strong>original condition</strong>, without physical damage.</li>
                <li>The return request must be made <strong>within 5 days of delivery</strong>.</li>
              </ul>

              <h3>Mandatory Evidence (Compulsory)</h3>
              <div style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: 10, padding: '1.25rem', margin: '1rem 0' }}>
                <ul style={{ margin: 0 }}>
                  <li>📸 <strong>Clear photo of the outdoor antenna installation</strong></li>
                  <li>📸 <strong>Clear photo of the router with the antenna connected</strong></li>
                </ul>
                <p style={{ fontSize: '0.875rem', color: '#B91C1C', marginTop: '0.75rem', marginBottom: 0 }}>
                  ⚠️ Requests without the above evidence will <strong>not be accepted</strong>.
                </p>
              </div>
            </Section>

            <Section title="2. Refund Process">
              <ul>
                <li>Refunds will be issued <strong>only after receiving and inspecting</strong> the returned antenna.</li>
                <li>Refunds will be made via <strong>bank deposit only</strong>.</li>
              </ul>

              <h3>Refund Deductions</h3>
              <p>If any damage, misuse, or missing parts are found during inspection, the relevant amount will be <strong>deducted from the refund</strong>.</p>

              {/* ── 🌟 INTERACTIVE REFUND CALCULATOR WIDGET INTEGRATION ── */}
              <div style={{ background: 'rgba(10,173,110,0.03)', border: '1px dashed #0AAD6E', borderRadius: 12, padding: '1.5rem', margin: '1.25rem 0', textAlign: 'left' }}>
                <h4 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--ink)', fontSize: '1rem', fontWeight: 700 }}>
                  🧮 Interactive Value Deduction Estimator
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--slate)', margin: '0 0 1.25rem 0', lineHeight: 1.5 }}>
                  Calculate your adjusted claim settlements instantly before scheduling a return. Use our self-service calculator to cross-match your antenna model variant and itemize any micro-component reductions (such as cables, U-bolts, dipole box modules, or structural elements) automatically.
                </p>
                <Link href="/refund-calculator" style={{ display: 'inline-block', background: '#0AAD6E', color: 'white', padding: '0.6rem 1.2rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 700, textDecoration: 'none', boxShadow: '0 2px 5px rgba(10,173,110,0.1)' }}>
                  Launch Refund Calculator &rarr;
                </Link>
              </div>

              <h3>Refund Timeline</h3>
              <p>Approved refunds will be processed within <strong>3 working days</strong> after the return parcel is received and inspected at our facility.</p>
            </Section>

            <Section title="3. 12-Month Service Warranty">
              <div style={{ background: 'rgba(10,173,110,0.05)', border: '1px solid rgba(10,173,110,0.15)', borderRadius: 10, padding: '1.25rem', marginBottom: '1rem' }}>
                <ul style={{ margin: 0 }}>
                  <li>✅ <strong>No refunds</strong> are provided under this warranty.</li>
                  <li>✅ We will <strong>repair and return the same antenna</strong> to you.</li>
                  <li>✅ <strong>No service charges</strong> for repairs under this warranty.</li>
                  <li>✅ If parts need replacement, <strong>only the part cost</strong> will be charged.</li>
                  <li>✅ Payment for parts must be made via <strong>bank deposit in advance</strong>.</li>
                </ul>
              </div>
            </Section>

            <Section title="4. Customized Orders">
              <p>Since customized items are tailor-made exclusively according to your specific requirements, they cannot be resold to other customers. Therefore, customized orders are <strong>not eligible for returns, refunds, or replacements</strong>.</p>
              <p>However, your custom order is fully covered under our <strong>Service Warranty</strong> for any necessary repairs or maintenance.</p>
            </Section>

            <Section title="5. Cash on Delivery (COD)">
              <p><strong>Cash on Delivery is not available</strong> for service warranty claims or parts replacement orders. All warranty-related transactions must be handled via bank deposit.</p>
            </Section>

            <Section title="6. How to Submit a Warranty or Return Claim">
              <ol style={{ paddingLeft: '1.25rem', listStyle: 'decimal', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li style={{ fontSize: '0.925rem', color: 'var(--slate)', lineHeight: 1.75 }}>Contact us on WhatsApp at <strong>+94 70 665 6007</strong></li>
                <li style={{ fontSize: '0.925rem', color: 'var(--slate)', lineHeight: 1.75 }}>Provide your <strong>order number</strong> and purchase date</li>
                <li style={{ fontSize: '0.925rem', color: 'var(--slate)', lineHeight: 1.75 }}>Send the mandatory photos as described above</li>
                <li style={{ fontSize: '0.925rem', color: 'var(--slate)', lineHeight: 1.75 }}>Our team will review and respond within <strong>1 working day</strong></li>
                <li style={{ fontSize: '0.925rem', color: 'var(--slate)', lineHeight: 1.75 }}>If approved, we'll provide the return address and instructions</li>
              </ol>
            </Section>

          </div>

          {/* Contact CTA */}
          <div style={{ background: 'var(--bg)', border: '1px solid var(--border-light)', borderRadius: 16, padding: '2rem', textAlign: 'center', marginTop: '2rem' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>📞</div>
            <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '0.5rem' }}>Questions About Your Warranty?</div>
            <p style={{ fontSize: '0.875rem', color: 'var(--muted)', marginBottom: '1.25rem' }}>Contact us directly — we're here to help resolve every genuine issue.</p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={`${WA_LINK}${encodeURIComponent('Hello! I need to make a warranty claim for my Techo Connect antenna.')}`} target="_blank" rel="noopener" className="btn btn-wa">
                WhatsApp: +94 70 665 6007
              </a>
              <Link href="/contact" className="btn btn-outline">Contact Form</Link>
            </div>
          </div>

        </div>
      </section>

      <Footer />
      <WAFloat />
    </>
  )
}