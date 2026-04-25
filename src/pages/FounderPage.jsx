import { useEffect, useState } from 'react'
import { ArrowRight, Menu, MessageCircle, Sparkles, X } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function FounderPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const onEsc = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    window.addEventListener('keydown', onEsc)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onEsc)
    }
  }, [isMenuOpen])

  return (
    <div className="page">
      <main className="hero-shell founder-shell">
        <header className="site-header">
          <Link className="logo" to="/">
            zeileet.
          </Link>

          <div className="header-actions">
            <Link className="pill-btn" to="/">
              Back Home <ArrowRight size={18} strokeWidth={2.2} />
            </Link>
            <button
              className="icon-btn"
              type="button"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="site-menu-founder"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </header>

        <div
          className={`menu-backdrop ${isMenuOpen ? 'is-open' : ''}`}
          aria-hidden="true"
          onClick={() => setIsMenuOpen(false)}
        />

        <aside
          id="site-menu-founder"
          className={`menu-panel ${isMenuOpen ? 'is-open' : ''}`}
          aria-hidden={!isMenuOpen}
        >
          <p className="menu-label">Navigation</p>
          <nav className="menu-links" aria-label="Primary">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/lets-talk" onClick={() => setIsMenuOpen(false)}>
              <MessageCircle size={16} /> Hey There
            </Link>
            <a href="/#services" onClick={() => setIsMenuOpen(false)}>
              Services
            </a>
            <a href="/#works" onClick={() => setIsMenuOpen(false)}>
              Selected Works
            </a>
            <Link to="/privacy-policy" onClick={() => setIsMenuOpen(false)}>
              Privacy Policy
            </Link>
          </nav>
        </aside>

        <section className="founder-hero">
          <p className="founder-eyebrow">
            <Sparkles size={16} /> Founder Story
          </p>
          <h1 className="founder-title">Built remote-first, led by product obsession.</h1>
          <p className="founder-copy">
            Founder and CEO, also Developer, is ZEESHAN TEELI. Zeileet is led with a
            hands-on product mindset focused on turning ideas into production-ready
            digital products for web and mobile.
          </p>
          <div className="founder-stats">
            <article>
              <h2>20+</h2>
              <p>Products launched</p>
            </article>
            <article>
              <h2>100%</h2>
              <p>Remote delivery model</p>
            </article>
            <article>
              <h2>Web + Mobile</h2>
              <p>Core specialization</p>
            </article>
          </div>
          <Link className="cta-dark founder-cta" to="/lets-talk">
            Hey There <MessageCircle size={17} />
          </Link>
        </section>
      </main>
    </div>
  )
}
