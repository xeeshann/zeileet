import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowLeft01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons'

function makeRequestId() {
  const stamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).slice(2, 7).toUpperCase()
  return `ADR-${stamp}-${random}`
}

export default function AccountDeletionRequestPage() {
  const initialRequestId = useMemo(() => makeRequestId(), [])
  const [requestId, setRequestId] = useState(initialRequestId)
  const [lastSubmittedRequestId, setLastSubmittedRequestId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitted(false)
    setSubmitError('')
    setIsSubmitting(true)

    try {
      const formData = new FormData(event.currentTarget)
      formData.set('requestId', requestId)
      formData.set('submittedAt', new Date().toISOString())

      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData).toString(),
      })

      const isAcceptedResponse =
        response.ok ||
        response.type === 'opaqueredirect' ||
        (response.status >= 300 && response.status < 400)

      if (!isAcceptedResponse) {
        throw new Error('Request submission failed')
      }

      setLastSubmittedRequestId(requestId)
      setIsSubmitted(true)
      setIsSubmitting(false)
      setRequestId(makeRequestId())
      event.currentTarget.reset()
    } catch (err) {
      setIsSubmitting(false)
      setSubmitError('Failed to submit deletion request. Please email us directly at contact@zeileet.in.')
    }
  }

  return (
    <div className="page">
      <header className="site-header">
        <Link className="logo" to="/">
          zeileet<span className="logo-dot">.</span><span className="logo-tld">in</span>
        </Link>

        <div className="header-actions">
          <Link className="btn-editorial-light" to="/privacy-policy">
            Privacy Policy <HugeiconsIcon icon={ArrowRight01Icon} size={15} color="currentColor" strokeWidth={1.5} />
          </Link>
          <Link className="btn-editorial-dark" to="/">
            <HugeiconsIcon icon={ArrowLeft01Icon} size={16} color="currentColor" strokeWidth={1.5} /> Back Home
          </Link>
        </div>
      </header>

      <div className="site-container">
        <main className="subpage-container">
          <p className="section-label">Compliance Portal</p>
          <h1 className="section-title">
            Universal <strong>Account Deletion Request</strong>
          </h1>
          <p className="section-subtitle">
            Submit a formal account and personal data deletion request across all Zeileet apps and web platforms.
          </p>

          <div className="contact-editorial-grid" style={{ marginTop: '3rem' }}>
            <div className="contact-form-box">
              <form
                className="editorial-form"
                name="account-deletion-request"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={onSubmit}
              >
                <input type="hidden" name="form-name" value="account-deletion-request" />
                <input type="hidden" name="requestId" value={requestId} />
                <input type="hidden" name="submittedAt" value="" />
                <p hidden>
                  <label>
                    Do not fill this out: <input name="bot-field" />
                  </label>
                </p>

                <label>
                  Product Name
                  <input name="productName" type="text" required placeholder="e.g. JkssbPrep, Getusefeed" />
                </label>

                <label>
                  Platform
                  <select name="platform" defaultValue="Android" required>
                    <option value="Android">Android App (Google Play Store)</option>
                    <option value="iOS">iOS App (Apple App Store)</option>
                    <option value="Website">Web Platform</option>
                    <option value="Other">Other Digital Service</option>
                  </select>
                </label>

                <label>
                  App Identifier or URL
                  <input
                    name="appIdentifier"
                    type="text"
                    required
                    placeholder="e.g. com.jkssbprep.app or https://jkssbprep.in"
                  />
                </label>

                <label>
                  Registered Account Email
                  <input name="accountEmail" type="email" required placeholder="user@example.com" />
                </label>

                <label>
                  Username or User ID (Optional)
                  <input name="accountIdentifier" type="text" placeholder="Optional identifier" />
                </label>

                <label>
                  Request Type
                  <select name="requestType" defaultValue="Delete account and personal data" required>
                    <option value="Delete account and personal data">Delete account and all associated personal data</option>
                    <option value="Delete account only">Delete account credentials only (preserve non-identifying logs)</option>
                    <option value="Delete specific personal data">Delete specific historical data logs</option>
                  </select>
                </label>

                <label>
                  Additional Details (Optional)
                  <textarea
                    name="details"
                    rows="3"
                    placeholder="Provide any additional account information to help expedite identity verification."
                  />
                </label>

                <label className="deletion-checkbox-label">
                  <input name="declaration" type="checkbox" required />
                  <span>I confirm that I am the verified account owner or authorized to submit this deletion request.</span>
                </label>

                <button className="btn-editorial-dark" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting Request...' : 'Submit Deletion Request'} <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} color="currentColor" strokeWidth={1.5} />
                </button>

                {isSubmitted && (
                  <div className="form-success-alert">
                    Request submitted successfully. Please record your reference ID: <strong>{lastSubmittedRequestId}</strong>
                  </div>
                )}

                {submitError && (
                  <div className="form-error-alert">{submitError}</div>
                )}
              </form>
            </div>

            <div className="contact-channels-box">
              <div className="subpage-card">
                <h3 style={{ margin: '0 0 1rem', fontSize: '1.2rem', fontWeight: 700 }}>Processing Timeline</h3>
                <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', display: 'grid', gap: '0.75rem', fontSize: '0.9rem', margin: '0 0 1.5rem' }}>
                  <li>Ownership validation initiated within 24 hours.</li>
                  <li>Account & personal data purged within 72 hours.</li>
                  <li>Irreversible removal of credentials and profiles.</li>
                </ul>

                <h4 style={{ margin: '0 0 0.5rem', fontSize: '1rem', fontWeight: 700 }}>Direct Contact</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', margin: '0 0 1.5rem' }}>
                  If you have questions, email{' '}
                  <a href="mailto:contact@zeileet.in" style={{ color: 'var(--text-primary)', fontWeight: 700, textDecoration: 'underline' }}>
                    contact@zeileet.in
                  </a>.
                </p>

                <Link className="btn-editorial-light" to="/" style={{ width: '100%', justifyContent: 'center' }}>
                  <HugeiconsIcon icon={ArrowLeft01Icon} size={16} color="currentColor" strokeWidth={1.5} /> Return to Home
                </Link>
              </div>
            </div>
          </div>
        </main>

        <footer className="site-footer">
          <div className="footer-copy">
            © {new Date().getFullYear()} <strong>Zeileet</strong>. All rights reserved.
          </div>
          <div className="footer-links">
            <Link className="footer-link" to="/">Home</Link>
            <Link className="footer-link" to="/privacy-policy">Privacy Policy</Link>
          </div>
        </footer>
      </div>
    </div>
  )
}
