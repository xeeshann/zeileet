import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowUp01Icon,
  ArrowUpRight01Icon,
  Calendar03Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  CodeIcon,
  FlashIcon,
  Globe02Icon,
  Mail01Icon,
  SmartPhone01Icon,
  Tick02Icon,
} from '@hugeicons/core-free-icons'

const timelineItems = [
  {
    step: '01',
    id: 'genesis-founding',
    date: 'Jan 02, 2026',
    fullDate: 'January 2, 2026',
    year: '2026',
    title: 'Studio Genesis',
    subtitle: 'Founded by Zeeshan',
    category: 'genesis',
    categoryLabel: 'Genesis Point',
    status: 'Genesis',
    statusType: 'genesis',
    gradient: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
    accentColor: '#f59e0b',
    description:
      'Official founding of Zeileet as a remote-first digital product studio dedicated to engineering high-performance web platforms, mobile apps, and scalable SaaS solutions.',
    metrics: 'Day 1 Inception',
    tags: ['Founding', 'Remote-First', 'Product Craft'],
    highlights: [
      'Founded by Zeeshan on January 2, 2026',
      'Established remote-first delivery model worldwide',
      'Adopted modern stack: React 19, Next.js, React Native/Expo, Vite',
    ],
  },
  {
    step: '02',
    id: 'design-foundation',
    date: 'Jan 2026',
    fullDate: 'January 2026',
    year: '2026',
    title: 'Design System & CI/CD',
    subtitle: 'Aeonik Editorial Architecture',
    category: 'genesis',
    categoryLabel: 'Foundation',
    status: 'Completed',
    statusType: 'completed',
    gradient: 'linear-gradient(135deg, #f87171, #fb923c)',
    accentColor: '#f87171',
    description:
      'Engineered Zeileet’s minimalist Aeonik design tokens, precision Bibata cursors, fluid GSAP interactions, and automated edge deployment pipelines.',
    metrics: 'Unified UI Engine',
    tags: ['Design System', 'GSAP', 'Vite', 'CI/CD'],
    highlights: [
      'Minimalist typography & clean 1px border system',
      'Bibata custom vector pointer precision',
      'Edge deployments with sub-second page loads',
    ],
  },
  {
    step: '03',
    id: 'jkssbprep-web',
    date: 'Jan 2026',
    fullDate: 'January 2026',
    year: '2026',
    title: 'JkssbPrep Web Platform',
    subtitle: 'Exam Preparation & Analytics Suite',
    category: 'launched',
    categoryLabel: 'Web Platform',
    status: 'Live & Shipped',
    statusType: 'live',
    gradient: 'linear-gradient(135deg, #10b981, #34d399)',
    accentColor: '#10b981',
    description:
      'Online competitive exam suite featuring timed test simulations, instant scorecard percentile computation, and topic-wise analytics for 50,000+ candidates.',
    url: 'https://www.jkssbprep.in/',
    metrics: '50,000+ Aspirants',
    tags: ['React', 'Vite', 'Tailwind CSS', 'Vercel'],
    highlights: [
      'Timed test series with negative marking calculation',
      'Real-time percentile ranking & speed analytics',
      'Zero-lag serverless exam traffic resilience',
    ],
  },
  {
    step: '04',
    id: 'jkssbprep-app',
    date: 'Feb 2026',
    fullDate: 'February 2026',
    year: '2026',
    title: 'Jkssbprep Mobile App',
    subtitle: 'Google Play Store Mobile App',
    category: 'launched',
    categoryLabel: 'Expo Mobile App',
    status: 'Live & Shipped',
    statusType: 'live',
    gradient: 'linear-gradient(135deg, #06b6d4, #38bdf8)',
    accentColor: '#06b6d4',
    description:
      'Cross-platform learning app built on Expo & React Native with offline test caching, daily quiz streaks, and push notifications for exam announcements.',
    url: 'https://play.google.com/store/apps/details?id=com.jkssbprep.app',
    metrics: '4.8 ★ Play Store',
    tags: ['React Native', 'Expo', 'Redux', 'EAS Build'],
    highlights: [
      'Offline test caching for remote area study',
      'Sub-second push notifications for exam dates',
      '60fps fluid UI built with Expo EAS pipelines',
    ],
  },
  {
    step: '05',
    id: 'getusefeed',
    date: 'Mar 2026',
    fullDate: 'March 2026',
    year: '2026',
    title: 'Getusefeed SaaS',
    subtitle: 'Customer Feedback & Roadmaps',
    category: 'launched',
    categoryLabel: 'SaaS Platform',
    status: 'Live & Shipped',
    statusType: 'live',
    gradient: 'linear-gradient(135deg, #6366f1, #818cf8)',
    accentColor: '#6366f1',
    description:
      'Customer feedback engine with real-time upvote boards, status workflow columns, public product roadmaps, and Stripe billing subscriptions.',
    url: 'https://getusefeed.com/',
    metrics: 'Live SaaS Engine',
    tags: ['Next.js', 'GraphQL', 'Stripe', 'Tailwind CSS'],
    highlights: [
      'Real-time feature upvotes with fraud protection',
      'Public & private kanban product roadmaps',
      'Stripe customer portal & subscription tiers',
    ],
  },
  {
    step: '06',
    id: 'kraftsuite',
    date: 'Apr 2026',
    fullDate: 'April 2026',
    year: '2026',
    title: 'Kraftsuite Generative Suite',
    subtitle: 'Visual CSS & SVG Sandbox',
    category: 'launched',
    categoryLabel: 'Developer Tools',
    status: 'Live & Shipped',
    statusType: 'live',
    gradient: 'linear-gradient(135deg, #8b5cf6, #a855f7)',
    accentColor: '#8b5cf6',
    description:
      'Interactive sandbox of 5+ generative utilities including ClipKraft polygon editor, GlassKraft glassmorphism generator, and ShadowKraft realistic multi-tier shadows.',
    url: 'https://kraftsuite.netlify.app/',
    metrics: '5+ Visual Generators',
    tags: ['React', 'Vite', 'CSS3 Engine', 'SVG Export'],
    highlights: [
      'ClipKraft: Live draggable polygon clip-path canvas',
      'GlassKraft & ShadowKraft: Realistic CSS lighting depth',
      '1-click clean React JSX & pure CSS code export',
    ],
  },
  {
    step: '07',
    id: 'pulsedesk-ai',
    date: 'Q3 2026',
    fullDate: 'Q3 2026 (Upcoming)',
    year: '2026',
    title: 'PulseDesk AI',
    subtitle: 'AI Support & Omnichannel Triage',
    category: 'upcoming',
    categoryLabel: 'AI & Automation',
    status: 'In Active Dev',
    statusType: 'in-progress',
    gradient: 'linear-gradient(135deg, #f43f5e, #fb7185)',
    accentColor: '#f43f5e',
    description:
      'Next-generation support platform integrating conversational AI agents with human workflows, vector knowledge base search, and intelligent ticket routing.',
    metrics: '70% Built • Alpha Q3',
    tags: ['AI Agents', 'Vector Search', 'WebSockets', 'Next.js 15'],
    highlights: [
      'Autonomous multi-modal triage by sentiment & urgency',
      'Real-time AI copilot drafting instant accurate replies',
      'Omnichannel sync across Slack, Email, and Discord',
    ],
  },
  {
    step: '08',
    id: 'devforge-cloud',
    date: 'Q4 2026',
    fullDate: 'Q4 2026 (Upcoming)',
    year: '2026',
    title: 'DevForge Cloud IDE',
    subtitle: 'Browser Dev & Preview Sandboxes',
    category: 'upcoming',
    categoryLabel: 'Cloud Dev Tool',
    status: 'Prototyping',
    statusType: 'in-progress',
    gradient: 'linear-gradient(135deg, #0ea5e9, #14b8a6)',
    accentColor: '#0ea5e9',
    description:
      'WebContainer-powered cloud development workspace providing zero-setup live previews, branch sandboxes, and collaborative cloud pair-programming.',
    metrics: '45% Prototype • Beta Q4',
    tags: ['WebContainers', 'WebAssembly', 'Monaco', 'Cloud'],
    highlights: [
      'Sub-2-second container boot times in browser runtime',
      'Instant shareable preview URLs for client staging',
      'Live terminal & Git tree synchronization',
    ],
  },
  {
    step: '09',
    id: 'zeileet-ecosystem',
    date: '2027+',
    fullDate: '2027 Horizon (Upcoming)',
    year: '2027',
    title: 'Unified Studio Suite',
    subtitle: 'Developer & Mobile Ecosystem',
    category: 'upcoming',
    categoryLabel: 'Ecosystem Vision',
    status: 'Horizon Vision',
    statusType: 'planned',
    gradient: 'linear-gradient(135deg, #1e293b, #475569)',
    accentColor: '#334155',
    description:
      'A unified ecosystem of cross-platform developer tools, telemetry dashboards, and mobile companion apps powering independent digital products.',
    metrics: 'Long-term Roadmap',
    tags: ['Local-First', 'Ecosystem', 'Telemetry', 'Cross-Platform'],
    highlights: [
      'Unified identity and analytics across all Zeileet apps',
      'Local-first encrypted sync for rapid cross-device work',
      'Open developer APIs & modular plugin marketplace',
    ],
  },
]

export default function TimelinePage() {
  const [filter, setFilter] = useState('all')
  const [direction, setDirection] = useState('bottom-to-top') // 'bottom-to-top' or 'top-to-bottom'
  const [selectedMilestone, setSelectedMilestone] = useState(null)

  const filteredItems = useMemo(() => {
    let list = timelineItems
    if (filter !== 'all') {
      list = timelineItems.filter((item) => item.category === filter)
    }
    // bottom-to-top: 01 (genesis) at bottom, 09 (future) at top
    // top-to-bottom: 01 (genesis) at top, 09 (future) at bottom
    if (direction === 'bottom-to-top') {
      return [...list].reverse()
    }
    return list
  }, [filter, direction])

  return (
    <div className="page">
      {/* Top Header */}
      <header className="site-header">
        <Link className="logo" to="/">
          zeileet<span className="logo-dot">.</span><span className="logo-tld">in</span>
        </Link>

        <nav className="header-nav" aria-label="Timeline Navigation">
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link active" to="/timeline">
            Timeline
          </Link>
          <Link className="nav-link" to="/#works">
            Portfolio
          </Link>
          <Link className="nav-link" to="/#founder">
            About Us
          </Link>
        </nav>

        <div className="header-actions">
          <Link className="btn-editorial-light" to="/#contact">
            Get in Touch <HugeiconsIcon icon={ArrowRight01Icon} size={15} color="currentColor" strokeWidth={1.5} />
          </Link>
          <Link className="btn-editorial-dark" to="/">
            <HugeiconsIcon icon={ArrowLeft01Icon} size={16} color="currentColor" strokeWidth={1.5} /> Home
          </Link>
        </div>
      </header>

      <div className="site-container">
        <main className="subpage-container" style={{ paddingBottom: '6rem' }}>
          {/* Header Title Section matching the minimalist reference */}
          <div className="minimal-timeline-header">
            <h1 className="minimal-timeline-title">
              COMPANY TIMELINE
            </h1>
            <div className="minimal-timeline-underline" />
            <p className="minimal-timeline-subtitle">
              From our founding on <strong>January 2, 2026</strong> to live products and upcoming innovations.
            </p>

            {/* View Direction & Category Controls */}
            <div className="minimal-controls-bar">
              <div className="minimal-filter-tabs">
                <button
                  type="button"
                  className={`minimal-tab ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  All ({timelineItems.length})
                </button>
                <button
                  type="button"
                  className={`minimal-tab ${filter === 'launched' ? 'active' : ''}`}
                  onClick={() => setFilter('launched')}
                >
                  Live Products ({timelineItems.filter((i) => i.category === 'launched').length})
                </button>
                <button
                  type="button"
                  className={`minimal-tab ${filter === 'upcoming' ? 'active' : ''}`}
                  onClick={() => setFilter('upcoming')}
                >
                  Upcoming Roadmap ({timelineItems.filter((i) => i.category === 'upcoming').length})
                </button>
                <button
                  type="button"
                  className={`minimal-tab ${filter === 'genesis' ? 'active' : ''}`}
                  onClick={() => setFilter('genesis')}
                >
                  Genesis (2)
                </button>
              </div>

              {/* Direction Switcher */}
              <button
                type="button"
                className="minimal-direction-btn"
                onClick={() =>
                  setDirection((prev) =>
                    prev === 'bottom-to-top' ? 'top-to-bottom' : 'bottom-to-top'
                  )
                }
                title="Toggle timeline order"
              >
                {direction === 'bottom-to-top' ? (
                  <>
                    <HugeiconsIcon icon={ArrowUp01Icon} size={16} color="currentColor" strokeWidth={1.5} />
                    <span>Order: Bottom-to-Top (Inception ➔ Future)</span>
                  </>
                ) : (
                  <>
                    <HugeiconsIcon icon={ArrowDown01Icon} size={16} color="currentColor" strokeWidth={1.5} />
                    <span>Order: Top-to-Bottom (Inception ➔ Future)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Minimalist Alternating Timeline Container */}
          <div className="minimal-timeline-container">
            {/* Top Indicator */}
            <div className="minimal-spine-cap top">
              <span>{direction === 'bottom-to-top' ? 'Future Horizon & Roadmap' : 'Genesis • Jan 2, 2026'}</span>
            </div>

            <div className="minimal-timeline-spine">
              {filteredItems.map((item, index) => {
                // Alternate sides: even index on left, odd index on right (or top/bottom)
                const isLeft = index % 2 === 0
                const isUpcoming = item.category === 'upcoming'
                const isGenesis = item.category === 'genesis'

                return (
                  <div
                    key={item.id}
                    className={`minimal-item-row ${isLeft ? 'align-left' : 'align-right'}`}
                  >
                    {/* Content Card Side */}
                    <div className="minimal-content-block">
                      <div className="minimal-card">
                        <div className="minimal-card-header">
                          <div className="minimal-title-group">
                            <h3 className="minimal-item-title">{item.title}</h3>
                            <p className="minimal-item-subtitle">{item.subtitle}</p>
                          </div>
                          <span className="minimal-step-num">{item.step}</span>
                        </div>

                        <div className="minimal-date-badge">
                          <HugeiconsIcon icon={Calendar03Icon} size={13} color="currentColor" strokeWidth={1.5} />
                          <span>{item.date}</span>
                        </div>

                        <p className="minimal-item-desc">{item.description}</p>

                        {/* Highlights Snippet */}
                        <ul className="minimal-highlights">
                          {item.highlights.map((h, hIdx) => (
                            <li key={hIdx}>
                              <HugeiconsIcon icon={CheckmarkCircle02Icon} size={14} color="var(--text-primary)" strokeWidth={1.5} />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Card Bottom Meta */}
                        <div className="minimal-card-footer">
                          <div className="minimal-tags-wrap">
                            {item.tags.map((tag) => (
                              <span key={tag} className="minimal-tag">
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="minimal-actions-group">
                            <button
                              type="button"
                              className="minimal-spec-btn"
                              onClick={() => setSelectedMilestone(item)}
                            >
                              Details
                            </button>
                            {item.url && (
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                                className="minimal-visit-btn"
                              >
                                Live <HugeiconsIcon icon={ArrowUpRight01Icon} size={13} color="currentColor" strokeWidth={1.5} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Central Node on the Spine */}
                    <div className="minimal-center-node">
                      <div
                        className="minimal-node-circle"
                        style={{ background: item.gradient }}
                        title={`${item.step} - ${item.title}`}
                      >
                        <span className="minimal-node-step">{item.step}</span>
                        {isUpcoming && <span className="minimal-node-halo" style={{ borderColor: item.accentColor }} />}
                      </div>
                    </div>

                    {/* Opposite Side Visual Preview Pill / Date Anchor */}
                    <div className="minimal-opposite-block">
                      <div className="minimal-opposite-pill">
                        <span className="minimal-opp-year">{item.year}</span>
                        <span className="minimal-opp-status" style={{ color: item.accentColor }}>
                          {item.status}
                        </span>
                        {item.metrics && (
                          <span className="minimal-opp-metric">
                            <HugeiconsIcon icon={FlashIcon} size={12} color="currentColor" strokeWidth={1.5} /> {item.metrics}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Bottom Indicator */}
            <div className="minimal-spine-cap bottom">
              <span>{direction === 'bottom-to-top' ? 'Genesis Point • January 2, 2026' : 'Future Horizon & Roadmap'}</span>
            </div>
          </div>

          {/* Quick View Modal */}
          {selectedMilestone && (
            <div
              className="modal-backdrop"
              onClick={() => setSelectedMilestone(null)}
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
                  onClick={() => setSelectedMilestone(null)}
                >
                  <HugeiconsIcon icon={Cancel01Icon} size={18} color="currentColor" strokeWidth={1.5} />
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.5rem' }}>
                  <span
                    className="minimal-node-circle"
                    style={{
                      background: selectedMilestone.gradient,
                      width: '28px',
                      height: '28px',
                      fontSize: '0.75rem',
                      display: 'inline-flex',
                    }}
                  >
                    {selectedMilestone.step}
                  </span>
                  <span className="work-category-label">{selectedMilestone.categoryLabel}</span>
                  <span className="work-badge-pill" style={{ marginLeft: 'auto' }}>
                    {selectedMilestone.status}
                  </span>
                </div>

                <h3 className="modal-title">{selectedMilestone.title}</h3>
                <p className="work-card-type" style={{ marginBottom: '0.75rem' }}>{selectedMilestone.subtitle}</p>
                <p className="modal-desc">{selectedMilestone.description}</p>

                {selectedMilestone.metrics && (
                  <div className="work-metrics-tag" style={{ marginBottom: '1rem' }}>
                    <HugeiconsIcon icon={FlashIcon} size={14} color="currentColor" strokeWidth={1.5} /> Benchmark: <strong>{selectedMilestone.metrics}</strong>
                  </div>
                )}

                <div className="modal-highlights-box">
                  <h4>Key Architectural Deliverables</h4>
                  <ul>
                    {selectedMilestone.highlights.map((item, idx) => (
                      <li key={idx}>
                        <HugeiconsIcon icon={CheckmarkCircle02Icon} size={15} color="var(--text-primary)" strokeWidth={1.5} style={{ flexShrink: 0 }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', margin: '0 0 0.35rem' }}>
                    Technology & Domains
                  </p>
                  <div className="work-card-tags" style={{ margin: 0 }}>
                    {selectedMilestone.tags.map((tag) => (
                      <span key={tag} className="work-card-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedMilestone.url && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0.5rem' }}>
                    <a
                      className="btn-editorial-dark"
                      href={selectedMilestone.url}
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
        </main>

        {/* Footer */}
        <footer className="site-footer">
          <div className="footer-copy">
            © {new Date().getFullYear()} <strong>Zeileet</strong>. Founded January 2, 2026. All rights reserved.
          </div>
          <div className="footer-links">
            <Link className="footer-link" to="/">Home</Link>
            <Link className="footer-link" to="/timeline">Timeline</Link>
            <Link className="footer-link" to="/#works">Portfolio</Link>
            <Link className="footer-link" to="/privacy-policy">Privacy Policy</Link>
            <Link className="footer-link" to="/account-deletion-request">Account Deletion</Link>
          </div>
        </footer>
      </div>
    </div>
  )
}
