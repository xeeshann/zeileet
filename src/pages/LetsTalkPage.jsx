import { ArrowRight, Calendar, Mail, MessageCircle, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function LetsTalkPage() {
  return (
    <div className="page">
      <main className="hero-shell talk-shell">
        <header className="site-header">
          <Link className="logo" to="/">
            rozeedio.
          </Link>

          <div className="header-actions">
            <Link className="pill-btn" to="/founder">
              Founder <ArrowRight size={18} strokeWidth={2.2} />
            </Link>
          </div>
        </header>

        <section className="talk-hero">
          <p className="talk-eyebrow">
            <MessageCircle size={15} /> Hey There
          </p>
          <h1 className="talk-title">Tell us what you want to build.</h1>
          <p className="talk-copy">
            We build modern websites and Expo apps for Android and iOS. Share your idea,
            timeline, and goals, and we will reply with a clear execution plan.
          </p>
        </section>

        <section className="talk-grid">
          <div className="talk-card">
            <h2>Project Brief</h2>
            <form className="talk-form" onSubmit={(event) => event.preventDefault()}>
              <label>
                Full Name
                <input type="text" placeholder="Your name" />
              </label>
              <label>
                Email
                <input type="email" placeholder="you@company.com" />
              </label>
              <label>
                Project Type
                <select defaultValue="Website">
                  <option>Website</option>
                  <option>Expo App (Android + iOS)</option>
                  <option>Website + Mobile App</option>
                </select>
              </label>
              <label>
                Message
                <textarea
                  rows="5"
                  placeholder="Tell us about your product, features, and expected deadline."
                />
              </label>
              <button className="cta-dark" type="submit">
                Send Inquiry <ArrowRight size={17} />
              </button>
            </form>
          </div>

          <aside className="talk-card talk-side">
            <h2>Contact</h2>
            <div className="talk-line">
              <Mail size={18} />
              <span>hello@rozeedio.com</span>
            </div>
            <div className="talk-line">
              <Phone size={18} />
              <span>Remote worldwide collaboration</span>
            </div>
            <div className="talk-line">
              <Calendar size={18} />
              <span>Typical first response in 24 hours</span>
            </div>
            <div className="talk-line">
              <MessageCircle size={18} />
              <span>Discovery call + project roadmap</span>
            </div>

            <Link className="pill-btn talk-home-btn" to="/">
              Back Home <ArrowRight size={16} />
            </Link>
          </aside>
        </section>
      </main>
    </div>
  )
}
