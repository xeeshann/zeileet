import { ArrowRight, ShieldAlert } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

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
        throw new Error('Request failed')
      }

      setLastSubmittedRequestId(requestId)
      setIsSubmitted(true)
      setIsSubmitting(false)
      setRequestId(makeRequestId())
      event.currentTarget.reset()
    } catch {
      setIsSubmitting(false)
      setSubmitError(
       
      )
    }
  }

  return (
    <div className="page">
      <main className="hero-shell deletion-shell">
        <header className="site-header">
          <Link className="logo" to="/">
            zeileet<span className="logo-dot">.</span>
          </Link>

          <div className="header-actions">
            <Link className="pill-btn" to="/privacy-policy">
              Privacy Policy <ArrowRight size={18} strokeWidth={2.2} />
            </Link>
          </div>
        </header>

        <section className="deletion-hero">
          <p className="deletion-eyebrow">
            <ShieldAlert size={16} />Account Deletion Request
          </p>
          <h1 className="deletion-title">Request account deletion across any Zeileet product</h1>
          <p className="deletion-copy">
            Use this one form for websites, web apps, Android apps, and iOS apps. This
            page is publicly accessible and intended for product compliance use,
            including Google Play Console account deletion requirements.
          </p>
        </section>

        <section className="deletion-grid">
          <article className="deletion-card">
            <h2>Submit request</h2>
            <form
              className="talk-form"
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
                  Do not fill this out if you are human: <input name="bot-field" />
                </label>
              </p>

              <label>
                Product Name
                <input name="productName" type="text" required placeholder="Example: JkssbPrep" />
              </label>

              <label>
                Platform
                <select name="platform" defaultValue="Android" required>
                  <option>Android</option>
                  <option>iOS</option>
                  <option>Website</option>
                  <option>Web App</option>
                  <option>Other</option>
                </select>
              </label>

              <label>
                Website URL Or App Name
                <input
                  name="appIdentifier"
                  type="text"
                  required
                  placeholder="com.example.app or https://example.com"
                />
              </label>

              <label>
                Account Email
                <input name="accountEmail" type="email" required placeholder="you@example.com" />
              </label>

              <label>
                Username or User ID (if any)
                <input name="accountIdentifier" type="text" placeholder="Optional" />
              </label>

              <label>
                Request Type
                <select name="requestType" defaultValue="Delete account and personal data" required>
                  <option>Delete account and personal data</option>
                  <option>Delete account only</option>
                  <option>Delete specific personal data</option>
                </select>
              </label>

              <label>
                Additional details
                <textarea
                  name="details"
                  rows="5"
                  placeholder="Share anything needed to identify your account and process this request."
                />
              </label>

              <label className="deletion-checkbox">
                <input name="declaration" type="checkbox" required />
                I confirm I am the account owner or authorized to request this deletion.
              </label>

              <button className="cta-dark" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Deletion Request'}{' '}
                <ArrowRight size={17} />
              </button>
            </form>

            {isSubmitted ? (
              <p className="deletion-success">
                Request submitted. Save this reference ID for follow-up:{' '}
                <strong>{lastSubmittedRequestId}</strong>
              </p>
            ) : null}

            {submitError ? <p className="deletion-error">{submitError}</p> : null}
          </article>

          <aside className="deletion-card deletion-side">
            <h2>How this works</h2>
            <ul>
              <li>All product deletion requests use this single endpoint and process.</li>
              <li>We validate ownership before deleting accounts or personal data.</li>
              <li>Typical response window: within 72 hours.</li>
              <li>Processing timeline depends on legal and security checks.</li>
            </ul>

            <h3>Direct support</h3>
            <p>
              If the form is unavailable, email{' '}
              <a href="mailto:hello@zeileet.com?subject=Account%20Deletion%20Request">
                hello@zeileet.com
              </a>{' '}
              with your product details and account email.
            </p>

            <Link className="pill-btn talk-home-btn" to="/">
              Back Home <ArrowRight size={16} />
            </Link>
          </aside>
        </section>
      </main>
    </div>
  )
}
