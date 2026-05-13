import Link from 'next/link'
import Nav from '../../components/layout/Nav'
import Footer from '../../components/layout/Footer'
import WAFloat from '../../components/ui/WAFloat'

export const metadata = {
  title: 'Privacy Policy',
  description: 'How Techo Connect collects, uses, and protects your personal information.',
}

const Section = ({ num, title, children }) => (
  <div style={{ marginBottom: '2.5rem' }}>
    <h2 style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--ink)', marginBottom: '1rem', paddingBottom: '0.6rem', borderBottom: '2px solid rgba(10,173,110,0.15)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: '50%', background: 'rgba(10,173,110,0.1)', color: 'var(--green)', fontSize: '0.8rem', fontWeight: 800, flexShrink: 0 }}>{num}</span>
      {title}
    </h2>
    {children}
  </div>
)

export default function Privacy() {
  return (
    <>
      <Nav />

      <section className="page-hero" style={{ paddingBottom: '3rem' }}>
        <div className="page-hero__bg" />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="page-hero__label">Techo Connect / Legal</div>
          <h1 className="page-hero__title">Privacy<br /><em>Policy</em></h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginTop: '0.75rem', position: 'relative', zIndex: 2 }}>
            Last Updated: <strong>January 2026</strong>
          </p>
        </div>
      </section>

      <section style={{ padding: '4rem 0 6rem', background: 'white' }}>
        <div className="container-sm">

          <div style={{ background: 'rgba(10,173,110,0.05)', border: '1px solid rgba(10,173,110,0.15)', borderRadius: 12, padding: '1.5rem', marginBottom: '3rem' }}>
            <p style={{ fontSize: '0.925rem', color: 'var(--slate)', lineHeight: 1.8 }}>
              Techo Connect (a Techo Traders company) is committed to protecting your privacy. This policy explains what personal information we collect, how we use it, and how we keep it safe when you use our website or purchase our products.
            </p>
          </div>

          <div className="legal-content">

            <Section num="1" title="Information We Collect">
              <p>When you place an order or contact us, we collect the following personal information:</p>
              <ul>
                <li><strong>Full name</strong> — to identify your order and for delivery labelling</li>
                <li><strong>Delivery address</strong> — to dispatch your order to the correct location</li>
                <li><strong>District</strong> — to calculate delivery charges and routing</li>
                <li><strong>Phone numbers</strong> — to contact you regarding your order and delivery</li>
                <li><strong>Email address</strong> (optional) — for order confirmation and support</li>
                <li><strong>Payment receipt</strong> — uploaded image or PDF for order confirmation</li>
              </ul>
              <p>We also collect standard website usage data (page visits, device type, browser) through analytics tools to improve our website experience.</p>
            </Section>

            <Section num="2" title="How We Use Your Information">
              <p>Your personal information is used solely for:</p>
              <ul>
                <li>Processing and fulfilling your order</li>
                <li>Communicating delivery status and updates via WhatsApp or phone</li>
                <li>Handling warranty claims and return requests</li>
                <li>Responding to customer support enquiries</li>
                <li>Improving our website and product offerings</li>
              </ul>
              <p>We <strong>do not use your personal information for marketing</strong> purposes without your explicit consent. We do not sell, rent, or share your data with third parties for commercial purposes.</p>
            </Section>

            <Section num="3" title="Data Storage & Security">
              <p>Your order data is securely stored in <strong>Supabase</strong>, a cloud database platform with industry-standard encryption. Payment receipts are stored in an encrypted cloud storage bucket with restricted access.</p>
              <ul>
                <li>All data is encrypted at rest and in transit (HTTPS)</li>
                <li>Access to order data is restricted to authorised Techo Connect team members only</li>
                <li>We do not store card numbers or bank details — payments are handled offline via bank deposit</li>
              </ul>
            </Section>

            <Section num="4" title="Third-Party Services">
              <p>We use the following third-party services which may process your data as part of our operations:</p>
              <ul>
                <li><strong>Supabase</strong> — order database and file storage</li>
                <li><strong>WhatsApp (Meta)</strong> — customer communication and order notifications</li>
                <li><strong>Vercel</strong> — website hosting</li>
                <li><strong>Sri Lankan courier services</strong> — for physical delivery of products</li>
              </ul>
              <p>Each of these services operates under their own privacy policies. We ensure they meet adequate data protection standards before sharing any information with them.</p>
            </Section>

            <Section num="5" title="Data Retention">
              <p>We retain your order data for a minimum of <strong>2 years</strong> for warranty and dispute resolution purposes. After this period, data may be anonymised or deleted.</p>
              <p>You may request deletion of your personal data at any time by contacting us via WhatsApp or email, subject to any legal or operational retention requirements.</p>
            </Section>

            <Section num="6" title="Your Rights">
              <p>You have the right to:</p>
              <ul>
                <li><strong>Access</strong> the personal data we hold about you</li>
                <li><strong>Correct</strong> any inaccurate information</li>
                <li><strong>Request deletion</strong> of your data (subject to retention requirements)</li>
                <li><strong>Withdraw consent</strong> for any optional communications</li>
              </ul>
              <p>To exercise any of these rights, contact us at <strong>connect@techotraders.com.lk</strong> or via WhatsApp.</p>
            </Section>

            <Section num="7" title="Cookies">
              <p>Our website uses essential cookies for functionality (e.g., maintaining your shopping cart) and optional analytics cookies to understand website usage. You can manage cookie preferences through your browser settings.</p>
            </Section>

            <Section num="8" title="Children's Privacy">
              <p>Our website and products are not directed at children under 13 years of age. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us immediately.</p>
            </Section>

            <Section num="9" title="Changes to This Policy">
              <p>We may update this Privacy Policy periodically. The "Last Updated" date at the top of this page reflects the most recent revision. Continued use of our website after changes constitutes acceptance of the updated policy.</p>
            </Section>

            <Section num="10" title="Contact Us">
              <p>For any privacy-related questions or requests:</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--slate)' }}>
                <div>✉️ <strong>Email:</strong> connect@techotraders.com.lk</div>
                <div>📞 <strong>WhatsApp:</strong> +94 70 665 6007</div>
                <div>📍 <strong>Address:</strong> Kallady, Batticaloa, Sri Lanka</div>
              </div>
            </Section>

          </div>

          {/* Related policies */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '3rem' }}>
            {[
              { href: '/terms', label: 'Terms & Conditions', icon: '📋' },
              { href: '/returns', label: 'Returns & Refunds', icon: '↩️' },
              { href: '/shipping', label: 'Shipping Policy', icon: '🚚' },
            ].map(link => (
              <Link key={link.href} href={link.href} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '1rem 1.25rem', background: 'var(--bg)', border: '1px solid var(--border-light)', borderRadius: 10, fontSize: '0.875rem', fontWeight: 600, color: 'var(--slate)' }}>
                <span>{link.icon}</span>{link.label}
              </Link>
            ))}
          </div>

        </div>
      </section>

      <Footer />
      <WAFloat />
    </>
  )
}
