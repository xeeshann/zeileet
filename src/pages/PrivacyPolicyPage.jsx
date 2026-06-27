import { useState, useEffect } from 'react'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

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
          zeileet<span className="logo-dot">.</span>
        </Link>

        <div className="header-actions">
          <Link className="pill-btn" to="/account-deletion-request">
            Delete Account <ArrowRight size={18} strokeWidth={2.2} />
          </Link>
          <Link className="pill-btn" to="/">
            Back Home <ArrowRight size={18} strokeWidth={2.2} />
          </Link>
        </div>
      </header>

      <main className="hero-shell privacy-shell">
        <div className="hero-shell-clip-bg" aria-hidden="true" />

        <section className="privacy-hero">
          <p className="privacy-eyebrow">
            <ShieldCheck size={16} /> Privacy Policy
          </p>
          <h1 className="privacy-title">General Privacy Policy for all Zeileet Services</h1>
          <p className="privacy-copy">
            Effective date: April 25, 2026. This policy is intended to be reusable across
            our websites, web apps, mobile apps, and future digital products.
          </p>
        </section>

        <section className="privacy-grid" aria-label="Privacy policy sections">
          {policySections.map((section) => (
            <article key={section.title} className="privacy-card">
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </section>

        <section className="privacy-contact" aria-label="Privacy contact details">
          <h2>13. Contact us</h2>
          <p>
            For privacy questions or requests, contact us at{' '}
            <a href="mailto:zeileet3@gmail.com">zeileet3@gmail.com</a>.
          </p>
          <p>
            For account deletion requests across any Zeileet product, use the{' '}
            <Link to="/account-deletion-request">Universal Account Deletion Request page</Link>.
          </p>
        </section>
      </main>
    </div>
  )
}
