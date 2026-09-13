import { Link } from 'react-router-dom'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowLeft01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons'

const policySections = [
  {
    title: '1. Scope of this policy',
    body: 'This Privacy Policy applies to all websites, mobile apps, web applications, and digital services operated by Zeileet (collectively, the "Services"). It is designed to be a single, general policy that works across current and future Services unless a product-specific policy states otherwise.',
  },
  {
    title: '2. Information we collect',
    body: 'We may collect information you provide directly (such as your name, email address, phone number, and project details), technical information (such as IP address, browser type, device information, app version, and usage logs), and information from cookies or similar technologies used for analytics, security, and Service improvement.',
  },
  {
    title: '3. How we use information',
    body: 'We use personal information to provide and improve the Services, communicate with you, support your requests, maintain security, analyze performance, comply with legal obligations, and prevent fraud or misuse.',
  },
  {
    title: '4. Legal bases for processing',
    body: 'When required by applicable law, we process personal information based on one or more legal bases: consent, performance of a contract, compliance with legal obligations, and legitimate business interests.',
  },
  {
    title: '5. Sharing of information',
    body: 'We do not sell your personal information. We may share information with trusted service providers (for hosting, analytics, communication, and support), professional advisors, and authorities where legally required. Service providers are contractually required to protect your information.',
  },
  {
    title: '6. Data retention',
    body: 'We retain personal information only for as long as necessary for the purposes described in this policy, including legal, accounting, reporting, and security requirements. Retention periods vary by data type and business need.',
  },
  {
    title: '7. International data transfers',
    body: 'Our Services may be operated from multiple regions. Where personal information is transferred across borders, we use appropriate safeguards required by applicable law to protect your information.',
  },
  {
    title: '8. Your privacy rights',
    body: 'Depending on your location, you may have rights to access, correct, delete, restrict, object to processing, or receive a copy of your personal information. You may also withdraw consent where processing is based on consent. To exercise rights, contact us using the details below.',
  },
  {
    title: '9. Children\'s privacy',
    body: 'Our Services are not directed to children under 13 (or the age required by local law), and we do not knowingly collect personal information from children without appropriate consent.',
  },
  {
    title: '10. Security',
    body: 'We use reasonable technical and organizational safeguards to protect personal information. No method of transmission or storage is completely secure, but we continuously improve our security controls.',
  },
  {
    title: '11. Third-party links and services',
    body: 'Some Services may contain links to third-party websites or integrations. Their privacy practices are governed by their own policies, and we are not responsible for those third-party practices.',
  },
  {
    title: '12. Changes to this policy',
    body: 'We may update this Privacy Policy from time to time. Material updates will be reflected by revising the effective date and, where required, by providing additional notice.',
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="page">
      <header className="site-header">
        <Link className="logo" to="/">
          zeileet<span className="logo-dot">.</span><span className="logo-tld">in</span>
        </Link>

        <div className="header-actions">
          <Link className="btn-editorial-light" to="/account-deletion-request">
            Delete Account <HugeiconsIcon icon={ArrowRight01Icon} size={15} color="currentColor" strokeWidth={1.5} />
          </Link>
          <Link className="btn-editorial-dark" to="/">
            <HugeiconsIcon icon={ArrowLeft01Icon} size={16} color="currentColor" strokeWidth={1.5} /> Back Home
          </Link>
        </div>
      </header>

      <div className="site-container">
        <main className="subpage-container">
          <p className="section-label">Legal & Privacy</p>
          <h1 className="section-title">
            General <strong>Privacy Policy</strong>
          </h1>
          <p className="section-subtitle">
            Effective date: April 25, 2026. This policy applies to all websites, web applications, and Expo mobile apps operated by Zeileet.
          </p>

          <div className="subpage-grid">
            {policySections.map((section) => (
              <article key={section.title} className="subpage-card">
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </article>
            ))}
          </div>

          <div className="subpage-card" style={{ marginTop: '2rem', border: '1.5px solid var(--text-primary)' }}>
            <h2>13. Contact & Rights Requests</h2>
            <p style={{ marginBottom: '1rem' }}>
              For privacy inquiries, contact us at{' '}
              <a href="mailto:contact@zeileet.in" style={{ color: 'var(--text-primary)', fontWeight: 700, textDecoration: 'underline' }}>
                contact@zeileet.in
              </a>.
            </p>
            <p>
              To submit an account or personal data deletion request, visit the{' '}
              <Link to="/account-deletion-request" style={{ color: 'var(--text-primary)', fontWeight: 700, textDecoration: 'underline', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                Universal Account Deletion Portal <HugeiconsIcon icon={ArrowRight01Icon} size={15} color="currentColor" strokeWidth={1.5} />
              </Link>
            </p>
          </div>
        </main>

        <footer className="site-footer">
          <div className="footer-copy">
            © {new Date().getFullYear()} <strong>Zeileet</strong>. All rights reserved.
          </div>
          <div className="footer-links">
            <Link className="footer-link" to="/">Home</Link>
            <Link className="footer-link" to="/timeline">Timeline</Link>
            <Link className="footer-link" to="/account-deletion-request">Account Deletion</Link>
          </div>
        </footer>
      </div>
    </div>
  )
}
