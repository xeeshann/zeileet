import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Calendar,
  CodeXml,
  Github,
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

// Asset imports
import mobileUiImg from '../assets/mobile_ui_screens.png'
import isometricImg from '../assets/isometric_workspace.jpg'
import dashboardImg from '../assets/dashboard_mockup.png'

const serviceCards = [
  {
    id: '01',
    icon: Globe,
    title: 'Web Platforms',
    description:
      'Business websites and custom web apps focused on speed, conversion, and clean user experience.',
    tags: ['React', 'Vite', 'Next.js', 'Tailwind'],
  },
  {
    id: '02',
    icon: Smartphone,
    title: 'Expo Mobile Apps',
    description:
      'Cross-platform Expo apps shipped to both Android and iOS with native-feeling UX and robust architecture.',
    tags: ['Expo', 'React Native', 'iOS', 'Android'],
  },
  {
    id: '03',
    icon: CodeXml,
    title: 'Product Engineering',
    description:
      'End-to-end product delivery from UX implementation to deployment pipelines and long-term maintenance.',
    tags: ['UX/UI', 'Node.js', 'CI/CD', 'API Design'],
  },
]

const projects = [
  {
    name: 'JkssbPrep',
    type: 'Exam preparation platform website',
    url: 'https://www.jkssbprep.in/',
    icon: Globe,
    tags: ['React', 'Vite', 'Tailwind', 'Vercel'],
  },
  {
    name: 'Getusefeed',
    type: 'Feature voting and product roadmap',
    url: 'https://getusefeed.com/',
    icon: CodeXml,
    tags: ['Next.js', 'GraphQL', 'Stripe', 'Tailwind'],
  },
  {
    name: 'Jkssbprep App',
    type: 'Expo app for Android',
    url: 'https://play.google.com/store/apps/details?id=com.jkssbprep.app',
    icon: Smartphone,
    tags: ['React Native', 'Expo', 'Redux', 'EAS'],
  },
]

export default function HomePage() {
  const pageRef = useRef(null)
  const navRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [copied, setCopied] = useState(false)
  const [hoveredSection, setHoveredSection] = useState(null)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 })
  const [formStatus, setFormStatus] = useState(null)
  const [formMessage, setFormMessage] = useState('')


  // Calculate sliding pill coordinates
  useLayoutEffect(() => {
    const container = navRef.current
    if (!container) return

    const updatePosition = () => {
      const targetSection = hoveredSection || activeSection
      const targetLink = container.querySelector(`[data-section="${targetSection}"]`)

      if (targetLink) {
        setIndicatorStyle({
          left: targetLink.offsetLeft,
          width: targetLink.offsetWidth,
          opacity: 1,
        })
      } else {
        setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }))
      }
    }

    updatePosition()

    window.addEventListener('resize', updatePosition)
    return () => window.removeEventListener('resize', updatePosition)
  }, [activeSection, hoveredSection])

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('zeileet3@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleContactSubmit = async (event) => {
    event.preventDefault()
    setFormStatus('submitting')
    setFormMessage('')

    try {
      const formData = new FormData(event.currentTarget)
      
      const web3FormsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'YOUR_ACCESS_KEY_HERE'
      formData.append('access_key', web3FormsKey)
      formData.append('subject', 'New Project Brief from Zeileet Portfolio')
      formData.append('from_name', 'Zeileet Contact Form')

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        setFormStatus('success')
        setFormMessage('Thank you! Your inquiry has been sent successfully. We will get back to you soon.')
        event.target.reset()
      } else {
        setFormStatus('error')
        setFormMessage(result.message || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setFormStatus('error')
      setFormMessage('Failed to connect to the server. Please check your network and try again.')
    }
  }

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const smoothHandlers = []

    const root = pageRef.current
    const ctx = gsap.context(() => {
      // Sync navigation active class on scroll
      const sections = ['home', 'services', 'works', 'founder']
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
          ScrollTrigger.create({
            trigger: element,
            start: 'top 40%',
            end: 'bottom 40%',
            onEnter: () => setActiveSection(sectionId),
            onEnterBack: () => setActiveSection(sectionId),
          })
        }
      })



      // Ambient Orbs & Light scroll animations
      if (!prefersReducedMotion) {
        gsap.to('.motion-orb-a', {
          x: 30,
          y: -20,
          scale: 1.05,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })

        gsap.to('.motion-orb-b', {
          x: -30,
          y: 15,
          scale: 1.08,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })

        gsap.to('.motion-light', {
          xPercent: 30,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }

      // Smooth scroll anchor link handler
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
            setIsMenuOpen(false)

            // Set active state immediately on click
            const sectionName = href.replace('#', '')
            setActiveSection(sectionName)

            gsap.to(window, {
              duration: 0.9,
              ease: 'power3.inOut',
              scrollTo: {
                y: target,
                offsetY: 20,
              },
            })
          }

          smoothHandlers.push({ link, handler })
          link.addEventListener('click', handler)
        })
      }

      // Robust ScrollTrigger refresh to prevent layout shifts from breaking scroll triggers
      const refreshAll = () => {
        ScrollTrigger.refresh()
      }
      window.addEventListener('load', refreshAll)
      const timer = setTimeout(refreshAll, 1200)

      return () => {
        window.removeEventListener('load', refreshAll)
        clearTimeout(timer)
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
    <div className="page home-page" ref={pageRef}>
      <div className="motion-canvas" aria-hidden="true">
        <span className="motion-orb motion-orb-a" />
        <span className="motion-orb motion-orb-b" />
        <span className="motion-light" />
      </div>


      <header className="site-header">
        <a className="logo" href="#home">
          zeileet<span className="logo-dot">.</span>
        </a>

        <nav
          ref={navRef}
          className="header-nav"
          aria-label="Primary"
          onMouseLeave={() => setHoveredSection(null)}
        >
          <div
            className="nav-indicator-pill"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity,
            }}
          />
          <a
            data-section="home"
            className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
            href="#home"
            onMouseEnter={() => setHoveredSection('home')}
          >
            Home
          </a>
          <a
            data-section="works"
            className={`nav-link ${activeSection === 'works' ? 'active' : ''}`}
            href="#works"
            onMouseEnter={() => setHoveredSection('works')}
          >
            Works
          </a>
          <a
            data-section="services"
            className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}
            href="#services"
            onMouseEnter={() => setHoveredSection('services')}
          >
            Services
          </a>
          <a
            data-section="founder"
            className={`nav-link ${activeSection === 'founder' ? 'active' : ''}`}
            href="#founder"
            onMouseEnter={() => setHoveredSection('founder')}
          >
            About me
          </a>
        </nav>

        <div className="header-actions">
          <button
            className="icon-btn"
            type="button"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="site-menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            style={{ display: window.innerWidth <= 860 ? 'inline-flex' : 'none' }}
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
        <nav className="menu-links" aria-label="Primary Mobile">
          <a href="#home" onClick={() => { setIsMenuOpen(false); setActiveSection('home'); }}>
            Home
          </a>
          <a href="#founder" onClick={() => { setIsMenuOpen(false); setActiveSection('founder'); }}>
            About me
          </a>
          <a href="#hey-there" onClick={() => { setIsMenuOpen(false); }}>
            <MessageCircle size={16} /> Let&apos;s Talk
          </a>
          <a href="#services" onClick={() => { setIsMenuOpen(false); setActiveSection('services'); }}>
            Services
          </a>
          <a href="#works" onClick={() => { setIsMenuOpen(false); setActiveSection('works'); }}>
            Selected Works
          </a>
          <Link to="/privacy-policy" onClick={() => setIsMenuOpen(false)}>
            Privacy Policy
          </Link>
          <Link to="/account-deletion-request" onClick={() => setIsMenuOpen(false)}>
            Account Deletion
          </Link>
        </nav>
        <div className="menu-card">
          <p>Let&apos;s build your next website or Expo app together.</p>
          <a className="cta-dark" href="#hey-there" onClick={() => setIsMenuOpen(false)}>
            Book a Call <ArrowRight size={17} />
          </a>
        </div>
      </aside>

      <main className="hero-shell">
        <div className="hero-shell-clip-bg" aria-hidden="true" />

        {/* Hero Section */}
        <section className="hero" id="home">
          <div className="hero-grid">

            {/* Left Column */}
            <div className="hero-left">
              <p className="hero-intro">Hello, We are</p>
              <h1 className="hero-title">ZEILEET.</h1>
              <p className="hero-copy">
                We design and build software products for web and mobile with sharp focus.
                We turn ideas into production-ready digital products that connect people and drive growth.
              </p>

              <div className="email-pill-container">
                <span className="email-text">zeileet3@gmail.com</span>
                <button className="email-copy-btn" onClick={handleCopyEmail}>
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>

              <div className="hero-contacts">
                <a className="contact-btn contact-btn-blue" href="mailto:zeileet3@gmail.com" title="Email Us">
                  <Mail size={20} />
                </a>
              </div>
            </div>


            {/* Right Column */}
            <div className="hero-right">
              <div className="collage-container">

                {/* Card 1: UI/UX Design */}
                <div className="collage-card card-uiux">
                  <img src={mobileUiImg} alt="UI/UX Design" />
                  <div className="card-label-tab">
                    <span className="logo-dot">●</span> UI/UX Design
                  </div>
                </div>

                {/* Card 2: Web Platforms */}
                <div className="collage-card card-web">
                  <img src={dashboardImg} alt="Web Platforms" />
                  <div className="card-label-tab">
                    <span className="logo-dot">●</span> Web Platforms
                  </div>
                </div>

                {/* Card 3: Expo Mobile Apps */}
                <div className="collage-card card-mobile">
                  <img src={isometricImg} alt="Expo Mobile Apps" />
                  <div className="card-label-tab">
                    <span className="logo-dot">●</span> Expo Mobile Apps
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* Services Section */}
        <section className="section-block" id="services">
          <div className="section-title-row">
            <h2>What we do</h2>
            <Rocket className="section-rocket" size={24} />
          </div>

          <div className="services-grid">
            {serviceCards.map((item) => {
              const Icon = item.icon
              return (
                <article className="service-card" key={item.title}>
                  <span className="service-number">{item.id}</span>
                  <div className="service-icon-wrap">
                    <Icon size={22} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>

                  <div className="service-tags">
                    {item.tags.map((tag) => (
                      <span key={tag} className="service-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {/* Selected Works Section */}
        <section className="section-block projects-block" id="works">
          <div className="section-title-row">
            <h2>Selected works</h2>
          </div>

          <div className="projects-grid">
            {projects.map((project) => {
              const Icon = project.icon
              return (
                <article className="project-card" key={project.name}>
                  <span className="project-monogram">{project.name[0]}</span>

                  <header className="project-card-header">
                    <div className="project-icon-wrap">
                      <Icon size={20} />
                    </div>
                    {project.url ? (
                      <span className="project-status-badge">Live Project</span>
                    ) : (
                      <span className="project-status-badge status-internal">Internal Tool</span>
                    )}
                  </header>

                  <div className="project-card-content">
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
                    <p className="project-desc">{project.type}</p>
                  </div>

                  <footer className="project-card-footer">
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="project-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {project.url ? (
                      <a
                        className="project-action-btn"
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Visit ${project.name}`}
                      >
                        Visit <ArrowRight size={14} />
                      </a>
                    ) : (
                      <span className="project-action-btn action-inactive">
                        Active <ArrowRight size={14} />
                      </span>
                    )}
                  </footer>
                </article>
              )
            })}
          </div>
        </section>

        {/* Founder Section */}
        <section className="section-block" id="founder">
          <div className="founder-hero">
            <p className="founder-eyebrow">
              Founder Story
            </p>
            <h2 className="founder-title">Built remote-first, led by product obsession.</h2>
            <p className="founder-copy">
              Founder & Developer, is ZEESHAN. Zeileet is led with a
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

        {/* Contact Section */}
        <section className="section-block" id="hey-there">
          <div className="talk-hero">
            <p className="talk-eyebrow">
              <MessageCircle size={14} /> Hey There
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
              <form className="talk-form" onSubmit={handleContactSubmit}>
                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
                <label>
                  Full Name
                  <input type="text" name="name" required placeholder="Your name" />
                </label>
                <label>
                  Email
                  <input type="email" name="email" required placeholder="you@company.com" />
                </label>
                <label>
                  Project Type
                  <select name="project_type" defaultValue="Website">
                    <option>Website</option>
                    <option>Expo App (Android + iOS)</option>
                    <option>Website + Mobile App</option>
                  </select>
                </label>
                <label>
                  Message
                  <textarea
                    name="message"
                    required
                    rows="5"
                    placeholder="Tell us about your product, features, and expected deadline."
                  />
                </label>
                <button className="cta-dark" type="submit" disabled={formStatus === 'submitting'}>
                  {formStatus === 'submitting' ? 'Sending...' : 'Send'} <ArrowRight size={17} />
                </button>

                {formStatus === 'success' && (
                  <div className="form-success">{formMessage}</div>
                )}
                {formStatus === 'error' && (
                  <div className="form-error">{formMessage}</div>
                )}
              </form>
            </div>

            <aside className="talk-card talk-side">
              <h2>Contact</h2>
              <div className="talk-line">
                <Mail size={18} />
                <span>zeileet3@gmail.com</span>
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
              <Link className="pill-btn" to="/account-deletion-request">
                Account Deletion <ArrowRight size={16} />
              </Link>
            </aside>
          </div>
        </section>
      </main>
    </div>
  )
}
