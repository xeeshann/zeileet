import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { Link } from 'react-router-dom'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  ArrowDown01Icon,
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  Calendar03Icon,
  Call02Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  CodeIcon,
  Comment01Icon,
  Copy01Icon,
  FlashIcon,
  Globe02Icon,
  Mail01Icon,
  Menu01Icon,
  SmartPhone01Icon,
  Tick02Icon,
} from '@hugeicons/core-free-icons'

const serviceCards = [
  {
    id: '01',
    title: 'Web Platforms',
    description:
      'High-conversion business websites, interactive web applications, and custom SaaS tools built with Next.js, React, and Tailwind CSS with sub-second page loads and strong SEO.',
    tags: ['Next.js', 'React', 'Vite', 'Tailwind CSS', 'TypeScript'],
  },
  {
    id: '02',
    title: 'Expo Mobile Apps',
    description:
      'Cross-platform iOS and Android mobile apps engineered with Expo and React Native featuring fluid 60fps animations, offline data caching, and automated EAS builds.',
    tags: ['React Native', 'Expo', 'iOS', 'Android', 'Redux'],
  },
  {
    id: '03',
    title: 'Product Engineering',
    description:
      'End-to-end full-stack development, GraphQL/REST API design, WebSockets, real-time database architecture, cloud deployments, and long-term codebase maintenance.',
    tags: ['Node.js', 'PostgreSQL', 'Redis', 'WebSockets', 'CI/CD'],
  },
]

const projectCategories = [
  { key: 'all', label: 'All Works' },
  { key: 'web', label: 'Web Platforms' },
  { key: 'mobile', label: 'Mobile Apps' },
  { key: 'saas', label: 'SaaS & Tools' },
]

const projects = [
  {
    id: 'jkssbprep',
    name: 'JkssbPrep',
    category: 'web',
    categoryLabel: 'Web Platform',
    type: 'Exam Preparation Suite',
    description:
      'Online examination platform featuring timed test series, instant scorecard percentile analytics, and personalized topic tracking for over 50,000 active students.',
    url: 'https://www.jkssbprep.in/',
    badge: 'Live Platform',
    metrics: '50k+ Active Aspirants',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Vercel'],
    highlights: [
      'Interactive mock tests with timer & automated negative marking',
      'Real-time percentile ranking & speed analytics across state exams',
      'Instant subject and difficulty breakdown for students',
    ],
  },
  {
    id: 'getusefeed',
    name: 'Getusefeed',
    category: 'saas',
    categoryLabel: 'SaaS & Product',
    type: 'Feature Voting & Roadmaps',
    description:
      'Customer feedback engine with real-time upvote boards, status workflow columns, and interactive public product roadmaps with integrated Stripe billing.',
    url: 'https://getusefeed.com/',
    badge: 'SaaS Tool',
    metrics: 'Real-time Upvoting',
    tags: ['Next.js', 'GraphQL', 'Stripe', 'Tailwind CSS'],
    highlights: [
      'Instant feature upvoting with SSO authentication',
      'Customizable status workflows & release changelogs',
      'Stripe customer portal & subscription tiers',
    ],
  },
  {
    id: 'jkssbprep-app',
    name: 'Jkssbprep App',
    category: 'mobile',
    categoryLabel: 'Expo Mobile App',
    type: 'Android & iOS Learning App',
    description:
      'Mobile learning application empowering candidates with offline test downloads, daily quiz streaks, push notification alerts, and sub-second exam updates.',
    url: 'https://play.google.com/store/apps/details?id=com.jkssbprep.app',
    badge: 'Mobile App',
    metrics: '4.8 ★ Play Store',
    tags: ['React Native', 'Expo', 'Redux', 'EAS Build'],
    highlights: [
      'Offline test caching for remote area study without internet',
      'Sub-second push notifications for exam date announcements',
      'Cross-platform codebase deployed with Expo EAS pipelines',
    ],
  },
  {
    id: 'kraftsuite',
    name: 'Kraftsuite',
    category: 'web',
    categoryLabel: 'Web Platform & Tools',
    type: 'Visual CSS & SVG Generators',
    description:
      'High-tech visual utility sandbox featuring interactive generators for complex clip-paths, layered shadows, glassmorphism, fluid gradients, and CSS grids with zero-bloat code export.',
    url: 'https://kraftsuite.netlify.app/',
    badge: 'Live Suite',
    metrics: '5+ Visual Tools • Code Export',
    tags: ['React', 'Vite', 'CSS3 Engine', 'SVG', 'Web Audio API'],
    highlights: [
      'ClipKraft: Multi-node polygon clip-path editor with live draggable node visualizer',
      'GlassKraft & ShadowKraft: Layered glassmorphism and realistic multi-tier shadows',
      'GridKraft & GradientKraft: Visual grid layout engine and fluid gradient stops',
      'Instant 1-click clean CSS, SVG, and React code snippet copy',
    ],
  },
]

export default function HomePage() {
  const pageRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [copied, setCopied] = useState(false)
  const [formStatus, setFormStatus] = useState(null)
  const [formMessage, setFormMessage] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedProjectModal, setSelectedProjectModal] = useState(null)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('contact@zeileet.in')
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
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
        setFormMessage('Thank you! Your project brief has been sent successfully. We will reply within 24 hours.')
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
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const smoothHandlers = []
    const root = pageRef.current

    const ctx = gsap.context(() => {
      // Sync navigation active state on scroll
      const sections = ['home', 'services', 'works', 'founder', 'contact']
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

      // Smooth scroll anchor link handler
      const anchorLinks = gsap.utils.toArray('a[href^="#"]')
      if (!prefersReducedMotion) {
        anchorLinks.forEach((link) => {
          const href = link.getAttribute('href')
          if (!href || href.length <= 1) return

          const target = document.querySelector(href)
          if (!target) return

          const handler = (event) => {
            event.preventDefault()
            setIsMenuOpen(false)

            const sectionName = href.replace('#', '')
            setActiveSection(sectionName)

            gsap.to(window, {
              duration: 0.8,
              ease: 'power3.inOut',
              scrollTo: {
                y: target,
                offsetY: 40,
              },
            })
          }

          smoothHandlers.push({ link, handler })
          link.addEventListener('click', handler)
        })
      }

      const timer = setTimeout(() => {
        ScrollTrigger.refresh()
      }, 400)

      return () => clearTimeout(timer)
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
        setSelectedProjectModal(null)
      }
    }

    document.body.style.overflow = isMenuOpen || selectedProjectModal ? 'hidden' : ''
    window.addEventListener('keydown', onEsc)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onEsc)
    }
  }, [isMenuOpen, selectedProjectModal])

  const filteredProjects = projects.filter(
    (project) => activeCategory === 'all' || project.category === activeCategory
  )

  return (
    <div className="page" ref={pageRef}>
      {/* Top Header */}
      <header className="site-header">
        <a className="logo" href="#home">
          zeileet<span className="logo-dot">.</span><span className="logo-tld">in</span>
        </a>

        <nav className="header-nav" aria-label="Primary">
          <a
            className={`nav-link ${activeSection === 'founder' ? 'active' : ''}`}
            href="#founder"
          >
            About Us
          </a>
          <a
            className={`nav-link ${activeSection === 'works' ? 'active' : ''}`}
            href="#works"
          >
            Portfolio
          </a>
          <Link className="nav-link" to="/timeline">
            Timeline
          </Link>
          <a
            className={`nav-link ${activeSection === 'services' ? 'active' : ''}`}
            href="#services"
          >
            Services
          </a>
          <a
            className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
            href="#contact"
          >
            Contact
          </a>
        </nav>

        <div className="header-actions">
          <a className="btn-editorial" href="#contact">
            Message <HugeiconsIcon icon={ArrowUpRight01Icon} size={15} color="currentColor" strokeWidth={1.5} />
          </a>
          <button
            className="icon-btn"
            type="button"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="site-menu"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            style={{ display: window.innerWidth <= 860 ? 'grid' : 'none' }}
          >
            {isMenuOpen ? (
              <HugeiconsIcon icon={Cancel01Icon} size={18} color="currentColor" strokeWidth={1.5} />
            ) : (
              <HugeiconsIcon icon={Menu01Icon} size={18} color="currentColor" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
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
        <p className="menu-label">Menu</p>
        <nav className="menu-links" aria-label="Primary Mobile">
          <a href="#home" onClick={() => { setIsMenuOpen(false); setActiveSection('home'); }}>
            Home
          </a>
          <a href="#founder" onClick={() => { setIsMenuOpen(false); setActiveSection('founder'); }}>
            About Us
          </a>
          <a href="#works" onClick={() => { setIsMenuOpen(false); setActiveSection('works'); }}>
            Portfolio
          </a>
          <Link to="/timeline" onClick={() => setIsMenuOpen(false)}>
            Timeline & Roadmap
          </Link>
          <a href="#services" onClick={() => { setIsMenuOpen(false); setActiveSection('services'); }}>
            Services
          </a>
          <a href="#contact" onClick={() => { setIsMenuOpen(false); setActiveSection('contact'); }}>
            <HugeiconsIcon icon={Comment01Icon} size={16} color="currentColor" strokeWidth={1.5} /> Message
          </a>
          <Link to="/privacy-policy" onClick={() => setIsMenuOpen(false)}>
            Privacy Policy
          </Link>
          <Link to="/account-deletion-request" onClick={() => setIsMenuOpen(false)}>
            Account Deletion
          </Link>
        </nav>
      </aside>

      <div className="site-container">

        <main>
          {/* =================================================================
              HERO SECTION — AEONIK EDITORIAL MINIMALISM
              ================================================================= */}
          <section className="hero-editorial" id="home">
            {/* Left Vertical Meta */}
            <div className="hero-vertical-meta" aria-hidden="true">
              <span className="vertical-text">Product Studio</span>
              <span className="vertical-text">2026</span>
            </div>

            {/* Center Content */}
            <div className="hero-editorial-center">
              {/* Top Numbers */}
              <div className="hero-editorial-stats">
                <div className="hero-stat-item">
                  <h3>+20</h3>
                  <p>Projects completed</p>
                </div>
                
              </div>

              {/* Giant Display Headline */}
              <h1 className="hero-giant-title">
                Hello<span>.</span>
              </h1>

              <p className="hero-editorial-subtitle">
                — It's <strong>Zeileet</strong> a remote digital software studio building high-performance web platforms and Expo mobile apps.
              </p>

              {/* Email Pill Box */}
              <div className="email-pill-container">
                <span className="email-text">contact@zeileet.in</span>
                <button
                  className={`email-copy-btn ${copied ? 'is-copied' : ''}`}
                  onClick={handleCopyEmail}
                  type="button"
                >
                  {copied ? (
                    <>
                      <HugeiconsIcon icon={Tick02Icon} size={14} color="currentColor" strokeWidth={2} /> Copied!
                    </>
                  ) : (
                    <>
                      <HugeiconsIcon icon={Copy01Icon} size={14} color="currentColor" strokeWidth={1.5} /> Copy
                    </>
                  )}
                </button>
              </div>

              {/* Bottom Scroll Prompt */}
              <a className="hero-scroll-prompt" href="#services">
                Scroll down <HugeiconsIcon icon={ArrowDown01Icon} size={15} color="currentColor" strokeWidth={1.5} />
              </a>
            </div>

            {/* Right Side: Simple Empty Laptop, Tablet, & Mobile Wireframe Mockups */}
            <div className="hero-mockup-showcase" aria-label="Device Preview Showcase">
              <div className="mockup-stage">
                {/* 1. Empty Laptop Mockup (Background / Center) */}
                <div className="device-mockup device-laptop">
                  <div className="laptop-display">
                    <div className="device-camera-notch" />
                    <div className="mockup-wireframe-screen">
                      <div className="wireframe-browser-header">
                        <div className="wireframe-dots">
                          <span className="w-dot" />
                          <span className="w-dot" />
                          <span className="w-dot" />
                        </div>
                        <div className="wireframe-url-bar" />
                      </div>
                      <div className="wireframe-canvas">
                        <div className="wireframe-sidebar">
                          <span className="w-bar-sm" />
                          <span className="w-bar-sm" />
                          <span className="w-bar-sm" />
                        </div>
                        <div className="wireframe-content">
                          <div className="wireframe-banner" />
                          <div className="wireframe-grid-2">
                            <div className="wireframe-card" />
                            <div className="wireframe-card" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="laptop-base-chassis">
                    <div className="laptop-notch-lip" />
                  </div>
                </div>

                {/* 2. Empty Tablet Mockup (Mid-ground / Left overlap) */}
                <div className="device-mockup device-tablet">
                  <div className="tablet-frame">
                    <div className="tablet-sensor" />
                    <div className="mockup-wireframe-screen">
                      <div className="tablet-wireframe-head">
                        <span className="w-bar-xs" />
                        <span className="w-pill-xs" />
                      </div>
                      <div className="tablet-wireframe-body">
                        <div className="tablet-metric-row">
                          <div className="tablet-metric-card" />
                          <div className="tablet-metric-card" />
                        </div>
                        <div className="tablet-chart-wireframe" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Empty Mobile Mockup (Foreground / Right overlap) */}
                <div className="device-mockup device-mobile">
                  <div className="mobile-chassis">
                    <div className="mobile-dynamic-island" />
                    <div className="mockup-wireframe-screen">
                      <div className="mobile-wireframe-top">
                        <span className="w-time">09:41</span>
                        <div className="w-icons" />
                      </div>
                      <div className="mobile-wireframe-body">
                        <div className="mobile-hero-box" />
                        <div className="mobile-list-stripe" />
                        <div className="mobile-list-stripe" />
                      </div>
                      <div className="mobile-home-bar" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================================
              SERVICES SECTION
              ================================================================= */}
          <section className="section-editorial" id="services">
            <div className="section-head-row">
              <div>
                <p className="section-label">Services</p>
                <h2 className="section-title">
                  Specialized engineering for <strong>digital products.</strong>
                </h2>
                <p className="section-subtitle">
                  We build and scale production-ready applications with clean code, robust architecture, and speed.
                </p>
              </div>
            </div>

            <div className="services-editorial-grid">
              {serviceCards.map((service) => (
                <article className="service-editorial-card" key={service.id}>
                  <div className="service-editorial-num">{service.id}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="service-editorial-tags">
                    {service.tags.map((tag) => (
                      <span className="service-editorial-tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* =================================================================
              SELECTED WORKS SECTION
              ================================================================= */}
          <section className="section-editorial" id="works">
            <div className="section-head-row">
              <div>
                <p className="section-label">Portfolio</p>
                <h2 className="section-title">
                  Selected works shipped to <strong>production.</strong>
                </h2>
                <p className="section-subtitle">
                  A curated record of platforms, applications, and tools engineered for real-world reliability.
                </p>
              </div>

              {/* Filter Pills */}
              <div className="works-filter-pills" role="tablist" aria-label="Project Categories">
                {projectCategories.map((cat) => (
                  <button
                    key={cat.key}
                    type="button"
                    role="tab"
                    aria-selected={activeCategory === cat.key}
                    className={`works-filter-pill ${activeCategory === cat.key ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat.key)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="works-editorial-grid">
              {filteredProjects.map((project) => (
                <article className="work-editorial-card" key={project.id}>
                  <div className="work-card-top-meta">
                    <span className="work-category-label">{project.categoryLabel}</span>
                    <span className="work-badge-pill">
                      <span className="work-badge-dot" />
                      {project.badge}
                    </span>
                  </div>

                  <h3 className="work-card-title">
                    {project.url ? (
                      <a
                        className="work-link"
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {project.name}
                        <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} color="currentColor" strokeWidth={1.5} />
                      </a>
                    ) : (
                      project.name
                    )}
                  </h3>

                  <p className="work-card-type">{project.type}</p>
                  <p className="work-card-desc">{project.description}</p>

                  {project.metrics && (
                    <div className="work-metrics-tag">
                      <HugeiconsIcon icon={FlashIcon} size={14} color="currentColor" strokeWidth={1.5} /> {project.metrics}
                    </div>
                  )}

                  <div className="work-card-tags">
                    {project.tags.map((tag) => (
                      <span className="work-card-tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="work-card-footer">
                    <button
                      className="work-detail-btn"
                      type="button"
                      onClick={() => setSelectedProjectModal(project)}
                    >
                      Inspect Details
                    </button>

                    {project.url ? (
                      <a
                        className="work-visit-link"
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Visit ${project.name}`}
                      >
                        Visit Live <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} color="currentColor" strokeWidth={1.5} />
                      </a>
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                        Internal Suite
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>

            {/* Project Quick View Modal */}
            {selectedProjectModal && (
              <div
                className="modal-backdrop"
                onClick={() => setSelectedProjectModal(null)}
                role="dialog"
                aria-modal="true"
              >
                <div
                  className="modal-box"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="modal-close-btn"
                    type="button"
                    aria-label="Close modal"
                    onClick={() => setSelectedProjectModal(null)}
                  >
                    <HugeiconsIcon icon={Cancel01Icon} size={18} color="currentColor" strokeWidth={1.5} />
                  </button>

                  <span className="work-category-label">
                    {selectedProjectModal.categoryLabel}
                  </span>
                  <h3 className="modal-title">{selectedProjectModal.name}</h3>
                  <p className="work-card-type">{selectedProjectModal.type}</p>

                  <p className="modal-desc">{selectedProjectModal.description}</p>

                  {selectedProjectModal.metrics && (
                    <div className="work-metrics-tag" style={{ marginBottom: '0.85rem' }}>
                      <HugeiconsIcon icon={FlashIcon} size={14} color="currentColor" strokeWidth={1.5} /> Key Metric: <strong>{selectedProjectModal.metrics}</strong>
                    </div>
                  )}

                  <div className="modal-highlights-box">
                    <h4>Key Specifications & Deliverables</h4>
                    <ul>
                      {selectedProjectModal.highlights.map((item, idx) => (
                        <li key={idx}>
                          <HugeiconsIcon icon={CheckmarkCircle02Icon} size={15} color="var(--text-primary)" strokeWidth={1.5} style={{ flexShrink: 0 }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ marginBottom: '1.25rem' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', margin: '0 0 0.35rem' }}>
                      Technology Stack
                    </p>
                    <div className="work-card-tags" style={{ margin: 0 }}>
                      {selectedProjectModal.tags.map((tag) => (
                        <span key={tag} className="work-card-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedProjectModal.url && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0.5rem' }}>
                      <a
                        className="btn-editorial-dark"
                        href={selectedProjectModal.url}
                        target="_blank"
                        rel="noreferrer"
                        style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
                      >
                        Visit Live Platform <HugeiconsIcon icon={ArrowUpRight01Icon} size={15} color="currentColor" strokeWidth={1.5} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>

          {/* =================================================================
              FOUNDER SECTION
              ================================================================= */}
          <section className="section-editorial" id="founder">
            <div className="founder-editorial-box">
              <p className="section-label">About Founder</p>
              <h2 className="founder-quote-headline">
                Built remote-first, driven by <strong>hands-on product craft.</strong>
              </h2>
              <p className="founder-editorial-copy">
                Founded by <strong>ZEESHAN</strong>, Zeileet is dedicated to converting ambitious ideas into refined, production-grade web platforms and mobile apps without bureaucracy.
              </p>

              <div className="founder-editorial-stats">
                <div className="founder-stat-unit">
                  <h4>+20</h4>
                  <p>Products Launched</p>
                </div>
                <div className="founder-stat-unit">
                  <h4>100%</h4>
                  <p>Remote Delivery Model</p>
                </div>
                <div className="founder-stat-unit">
                  <h4>Web + Mobile</h4>
                  <p>Core Specialization</p>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================================
              CONTACT SECTION ("BOOK A CALL")
              ================================================================= */}
          <section className="section-editorial" id="contact">
            <div className="section-head-row">
              <div>
                <p className="section-label">Contact</p>
                <h2 className="section-title">
                  Tell us what you want to <strong>build.</strong>
                </h2>
                <p className="section-subtitle">
                  Share your scope and timeline. We will reply within 24 hours with an execution plan.
                </p>
              </div>
            </div>

            <div className="contact-editorial-grid">
              <div className="contact-form-box">
                <form className="editorial-form" onSubmit={handleContactSubmit}>
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
                  <label>
                    Your Name
                    <input type="text" name="name" required placeholder="John Doe" />
                  </label>
                  <label>
                    Email Address
                    <input type="email" name="email" required placeholder="john@company.com" />
                  </label>
                  <label>
                    Product Type
                    <select name="project_type" defaultValue="Website">
                      <option value="Website">Web Platform / Website</option>
                      <option value="Expo App">Expo Mobile App (iOS & Android)</option>
                      <option value="Full Suite">Full Suite (Web + Mobile App)</option>
                      <option value="Custom SaaS">Custom SaaS / Engineering</option>
                    </select>
                  </label>
                  <label>
                    Project Details
                    <textarea
                      name="message"
                      required
                      rows="4"
                      placeholder="Describe your product requirements, deadline, and expectations."
                    />
                  </label>
                  <button className="btn-editorial-dark" type="submit" disabled={formStatus === 'submitting'}>
                    {formStatus === 'submitting' ? 'Sending Brief...' : 'Send Project Brief'} <HugeiconsIcon icon={ArrowUpRight01Icon} size={16} color="currentColor" strokeWidth={1.5} />
                  </button>

                  {formStatus === 'success' && (
                    <div className="form-success-alert">{formMessage}</div>
                  )}
                  {formStatus === 'error' && (
                    <div className="form-error-alert">{formMessage}</div>
                  )}
                </form>
              </div>

              <div className="contact-channels-box">
                <div className="channel-item">
                  <HugeiconsIcon icon={Mail01Icon} size={22} color="currentColor" strokeWidth={1.5} />
                  <div>
                    <div className="channel-label">Email</div>
                    <div className="channel-val">contact@zeileet.in</div>
                  </div>
                </div>
                <div className="channel-item">
                  <HugeiconsIcon icon={Call02Icon} size={22} color="currentColor" strokeWidth={1.5} />
                  <div>
                    <div className="channel-label">Delivery</div>
                    <div className="channel-val">Remote Worldwide</div>
                  </div>
                </div>
                <div className="channel-item">
                  <HugeiconsIcon icon={Calendar03Icon} size={22} color="currentColor" strokeWidth={1.5} />
                  <div>
                    <div className="channel-label">Response Time</div>
                    <div className="channel-val">Within 24 Hours</div>
                  </div>
                </div>

                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <Link className="btn-editorial-light" to="/timeline" style={{ width: '100%', justifyContent: 'space-between' }}>
                    Company Timeline <HugeiconsIcon icon={ArrowRight01Icon} size={16} color="currentColor" strokeWidth={1.5} />
                  </Link>
                  <Link className="btn-editorial-light" to="/privacy-policy" style={{ width: '100%', justifyContent: 'space-between' }}>
                    Privacy Policy <HugeiconsIcon icon={ArrowRight01Icon} size={16} color="currentColor" strokeWidth={1.5} />
                  </Link>
                  <Link className="btn-editorial-light" to="/account-deletion-request" style={{ width: '100%', justifyContent: 'space-between' }}>
                    Account Deletion <HugeiconsIcon icon={ArrowRight01Icon} size={16} color="currentColor" strokeWidth={1.5} />
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="site-footer">
            <div className="footer-copy">
              © {new Date().getFullYear()} <strong>Zeileet</strong>. Remote software studio.
            </div>
            <div className="footer-links">
              <a className="footer-link" href="#home">Home</a>
              <a className="footer-link" href="#founder">About</a>
              <Link className="footer-link" to="/timeline">Timeline</Link>
              <a className="footer-link" href="#services">Services</a>
              <a className="footer-link" href="#works">Portfolio</a>
              <Link className="footer-link" to="/privacy-policy">Privacy Policy</Link>
              <Link className="footer-link" to="/account-deletion-request">Account Deletion</Link>
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}
