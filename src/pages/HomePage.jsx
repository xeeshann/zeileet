import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Calendar,
  CodeXml,
  Globe,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Rocket,
  Sparkles,
  Smartphone,
  X,
} from 'lucide-react'
import logoPng from '../assets/zeileet logo.png'

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
    name: 'JkssbPrep',
    type: 'Exam preparation platform website',
    url: 'https://www.jkssbprep.in/',
  },
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
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const smoothHandlers = []

    const root = pageRef.current
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from('.hero-shell', {
        y: 34,
        opacity: 0,
        duration: 1,
      })
        .from(
          '.cinematic-wipe',
          {
            yPercent: 0,
            duration: 1.05,
            ease: 'power4.inOut',
          },
          '<',
        )
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
            filter: 'blur(5px)',
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

      gsap.utils.toArray('.section-block').forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top 84%',
          },
          y: 52,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
        })
      })

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
        gsap.to('.hero-mobile', {
          y: -40,
          scrollTrigger: {
            trigger: '.hero-shell',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        })

        gsap.to('.motion-orb-a', {
          x: 40,
          y: -26,
          scale: 1.06,
          duration: 4.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })

        gsap.to('.motion-orb-b', {
          x: -44,
          y: 22,
          scale: 1.12,
          duration: 5.3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })

        gsap.to('.motion-light', {
          xPercent: 42,
          duration: 7,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }

      const anchorLinks = gsap.utils.toArray('a[href^="#"]')

      if (!prefersReducedMotion) {
        anchorLinks.forEach((link) => {
          const href = link.getAttribute('href')
          if (!href || href.length <= 1) {
            return
          }

          const target = document.querySelector(href)
          if (!target) {
            return
          }

          const handler = (event) => {
            event.preventDefault()
            gsap.to(window, {
              duration: 1.1,
              ease: 'power3.inOut',
              scrollTo: {
                y: target,
                offsetY: 18,
              },
            })
          }

          smoothHandlers.push({ link, handler })
          link.addEventListener('click', handler)
        })
      }

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

    return () => {
      smoothHandlers.forEach(({ link, handler }) => {
        link.removeEventListener('click', handler)
      })
      ctx.revert()
    }
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
      <div className="motion-canvas" aria-hidden="true">
        <span className="motion-orb motion-orb-a" />
        <span className="motion-orb motion-orb-b" />
        <span className="motion-light" />
      </div>
      <div className="cinematic-wipe" aria-hidden="true" />

      <main className="hero-shell">
        <header className="site-header">
          <a className="logo" href="#home">
            <img className="brand-logo" src={logoPng} alt="Zeileet logo" />
            zeileet.
          </a>

          <div className="header-actions">
            <a className="pill-btn" href="#hey-there">
              Hey There <MessageCircle size={17} strokeWidth={2.2} />
            </a>
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
            <a href="#founder" onClick={() => setIsMenuOpen(false)}>
              Founder
            </a>
            <a href="#hey-there" onClick={() => setIsMenuOpen(false)}>
              <MessageCircle size={16} /> Hey There
            </a>
            <a href="#services" onClick={() => setIsMenuOpen(false)}>
              Services
            </a>
            <a href="#works" onClick={() => setIsMenuOpen(false)}>
              Selected Works
            </a>
            <Link to="/privacy-policy" onClick={() => setIsMenuOpen(false)}>
              Privacy Policy
            </Link>
          </nav>
          <div className="menu-card">
            <p>Let&apos;s build your next website or Expo app together.</p>
            <a className="cta-dark" href="#hey-there" onClick={() => setIsMenuOpen(false)}>
              Book a Call <ArrowRight size={17} />
            </a>
          </div>
        </aside>

        <section className="hero" id="home">
          <p className="hero-intro">Hello! We are Zeileet.</p>

          <h1 className="hero-title">
            <span className="hero-line">Designing and building software products</span>
            <span className="hero-line">for web and mobile with</span>
            <span className="hero-line hero-line-muted">sharp focus.</span>
          </h1>

          <div className="hero-meta">
            <a className="cta-dark hero-cta" href="#hey-there">
              Start a Project <ArrowRight size={18} />
            </a>
          </div>

          <aside className="hero-mobile" aria-hidden="true">
            <div className="phone-notch" />
            <p className="phone-eyebrow">zeileet.</p>
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
                <h3>
                  {project.url ? (
                    <a
                      className="project-link"
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {project.name}
                    </a>
                  ) : (
                    project.name
                  )}
                </h3>
                <p>{project.type}</p>
                {project.url ? (
                  <a href={project.url} target="_blank" rel="noreferrer" aria-label={`Open ${project.name}`}>
                    <ArrowRight size={16} />
                  </a>
                ) : (
                  <ArrowRight size={16} />
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="section-block" id="founder">
          <div className="founder-hero">
            <p className="founder-eyebrow">
              <Sparkles size={16} /> Founder Story
            </p>
            <h2 className="founder-title">Built remote-first, led by product obsession.</h2>
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
          </div>
        </section>

        <section className="section-block" id="hey-there">
          <div className="talk-hero">
            <p className="talk-eyebrow">
              <MessageCircle size={15} /> Hey There
            </p>
            <h2 className="talk-title">Tell us what you want to build.</h2>
            <p className="talk-copy">
              We build modern websites and Expo apps for Android and iOS. Share your
              idea, timeline, and goals, and we will reply with a clear execution plan.
            </p>
          </div>

          <div className="talk-grid">
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
                <span>hello@zeileet.com</span>
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

              <Link className="pill-btn talk-home-btn" to="/privacy-policy">
                Privacy Policy <ArrowRight size={16} />
              </Link>
            </aside>
          </div>
        </section>
      </main>
    </div>
  )
}
