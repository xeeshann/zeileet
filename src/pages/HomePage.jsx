import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight,
  CodeXml,
  Globe,
  Menu,
  MessageCircle,
  Rocket,
  Smartphone,
  X,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const serviceCards = [
  {
    icon: Globe,
    title: 'Web Platforms',
    description:
      'Business websites and custom web apps focused on speed, conversion, and clean user experience.',
  },
  {
    icon: Smartphone,
    title: 'Expo Mobile Apps',
    description:
      'Cross-platform Expo apps shipped to both Android and iOS with native-feeling UX and robust architecture.',
  },
  {
    icon: CodeXml,
    title: 'Product Engineering',
    description:
      'End-to-end product delivery from UX implementation to deployment pipelines and long-term maintenance.',
  },
]

const projects = [
  {
    name: 'Nexa Commerce',
    type: 'Headless commerce website',
  },
  {
    name: 'Stride Health',
    type: 'Expo app for Android & iOS',
  },
  {
    name: 'Orbit Desk',
    type: 'Internal SaaS operations tool',
  },
]

export default function HomePage() {
  const pageRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const root = pageRef.current
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.hero-shell', {
        y: 42,
        opacity: 0,
        duration: 0.9,
      })
        .from(
          '.site-header, .hero-intro',
          {
            y: 24,
            opacity: 0,
            duration: 0.6,
            stagger: 0.12,
          },
          '-=0.45',
        )
        .from(
          '.hero-line',
          {
            yPercent: 100,
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
          },
          '-=0.35',
        )
        .from(
          '.hero-copy, .hero-cta, .hero-mobile',
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
          },
          '-=0.4',
        )

      gsap.from('.service-card', {
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 78%',
        },
        y: 32,
        opacity: 0,
        duration: 0.7,
        stagger: 0.14,
        ease: 'power2.out',
      })

      gsap.from('.project-item', {
        scrollTrigger: {
          trigger: '.projects-list',
          start: 'top 84%',
        },
        x: -20,
        opacity: 0,
        duration: 0.55,
        stagger: 0.12,
      })

      if (!prefersReducedMotion) {
        gsap.to('.section-rocket', {
          y: -5,
          rotate: 10,
          scale: 1.08,
          duration: 1.9,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          transformOrigin: '50% 65%',
        })
      }
    }, root)

    return () => ctx.revert()
  }, [])

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
    <div className="page" ref={pageRef}>
      <main className="hero-shell">
        <header className="site-header">
          <a className="logo" href="#home">
            rozeedio.
          </a>

          <div className="header-actions">
            <Link className="pill-btn" to="/lets-talk">
              Hey There <MessageCircle size={17} strokeWidth={2.2} />
            </Link>
            <button
              className="icon-btn"
              type="button"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="site-menu"
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
          id="site-menu"
          className={`menu-panel ${isMenuOpen ? 'is-open' : ''}`}
          aria-hidden={!isMenuOpen}
        >
          <p className="menu-label">Navigation</p>
          <nav className="menu-links" aria-label="Primary">
            <a href="#home" onClick={() => setIsMenuOpen(false)}>
              Home
            </a>
            <Link to="/founder" onClick={() => setIsMenuOpen(false)}>
              Founder
            </Link>
            <Link to="/lets-talk" onClick={() => setIsMenuOpen(false)}>
              <MessageCircle size={16} /> Hey There
            </Link>
            <a href="#services" onClick={() => setIsMenuOpen(false)}>
              Services
            </a>
            <a href="#works" onClick={() => setIsMenuOpen(false)}>
              Selected Works
            </a>
          </nav>
          <div className="menu-card">
            <p>Let&apos;s build your next website or Expo app together.</p>
            <Link className="cta-dark" to="/lets-talk" onClick={() => setIsMenuOpen(false)}>
              Book a Call <ArrowRight size={17} />
            </Link>
          </div>
        </aside>

        <section className="hero" id="home">
          <p className="hero-intro">Hello! We are Rozeedio.</p>

          <h1 className="hero-title">
            <span className="hero-line">Designing and building software products</span>
            <span className="hero-line">for web and mobile with</span>
            <span className="hero-line hero-line-muted">sharp focus.</span>
          </h1>

          <div className="hero-meta">
            <Link className="cta-dark hero-cta" to="/lets-talk">
              Start a Project <ArrowRight size={18} />
            </Link>
            <p className="hero-copy">
              A fully remote software development company crafting modern websites and
              Expo apps for Android and iOS.
            </p>
          </div>

          <aside className="hero-mobile" aria-hidden="true">
            <div className="phone-notch" />
            <p className="phone-eyebrow">rozeedio.</p>
            <p className="phone-heading">Web + Mobile</p>
            <p className="phone-highlight">Expo apps</p>
            <p className="phone-small">Android and iOS ready</p>
          </aside>
        </section>

        <section className="section-block" id="services">
          <div className="section-title-row">
            <h2>What we do</h2>
            <Rocket className="section-rocket" size={20} />
          </div>

          <div className="services-grid">
            {serviceCards.map((item) => {
              const Icon = item.icon
              return (
                <article className="service-card" key={item.title}>
                  <div className="service-icon-wrap">
                    <Icon size={20} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              )
            })}
          </div>
        </section>

        <section className="section-block projects-block" id="works">
          <h2>Selected works</h2>
          <div className="projects-list">
            {projects.map((project) => (
              <article className="project-item" key={project.name}>
                <h3>{project.name}</h3>
                <p>{project.type}</p>
                <ArrowRight size={16} />
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
