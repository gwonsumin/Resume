import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import logoDefault from '../../assets/logo/dafult-logo.svg'
import { ROUTES } from '../../config/routes'
import './Header.scss'

type HeaderProps = {
  siteTitle: string
  siteTagline?: string
}

const SECTION_NAV = [
  { id: 'hero', label: 'Home' },
  { id: 'projects', label: 'Case Study' },
  { id: 'archive', label: 'Archive' },
  { id: 'contact', label: 'Contact' },
] as const

export function Header({ siteTitle }: HeaderProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const headerRef = useRef<HTMLElement | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('hero')
  const [isStatusHovered, setIsStatusHovered] = useState(false)

  const scrollToSection = (sectionId: string, smooth: boolean) => {
    const target = document.getElementById(sectionId)
    if (!target) return

    const headerHeight = headerRef.current?.offsetHeight ?? 0
    const top =
      target.getBoundingClientRect().top + window.scrollY - headerHeight - 16

    window.scrollTo({
      top: Math.max(top, 0),
      behavior: smooth ? 'smooth' : 'auto',
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const headerClassName = isScrolled
    ? 'site-header site-header--scrolled'
    : 'site-header'

  useEffect(() => {
    if (location.pathname !== ROUTES.home) return

    const sections = SECTION_NAV.map(({ id }) => document.getElementById(id)).filter(
      Boolean,
    ) as HTMLElement[]
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (!visible.length) return
        setActiveSection(visible[0].target.id)
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: [0.15, 0.35, 0.6],
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [location.pathname])

  useEffect(() => {
    if (location.pathname !== ROUTES.home || !location.hash) return
    const sectionId = location.hash.replace('#', '')

    window.requestAnimationFrame(() => {
      scrollToSection(sectionId, true)
      setActiveSection(sectionId)
    })
  }, [location.hash, location.pathname])

  const onNavClick = (sectionId: string) => (event: MouseEvent) => {
    event.preventDefault()

    if (location.pathname !== ROUTES.home) {
      navigate(`${ROUTES.home}#${sectionId}`)
      return
    }

    scrollToSection(sectionId, true)
    setActiveSection(sectionId)
  }

  return (
    <header className={headerClassName} ref={headerRef}>
      <div className="site-header__brand">
        <Link to={ROUTES.home} className="site-header__title-link">
          <img
            src={logoDefault}
            alt={`${siteTitle || 'SUMIN'} home`}
            className="site-header__logo"
          />
        </Link>
      </div>

      <nav className="site-nav" aria-label="Primary">
        <ul className="site-nav__list" role="list">
          {SECTION_NAV.map((item) => (
            <li key={item.id} className="site-nav__item">
              <a
                href={`${ROUTES.home}#${item.id}`}
                className={
                  activeSection === item.id
                    ? 'site-nav__link site-nav__link--active'
                    : 'site-nav__link'
                }
                onClick={onNavClick(item.id)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <p
        className={
          isStatusHovered ? 'site-status site-status--hovered' : 'site-status'
        }
        onMouseEnter={() => setIsStatusHovered(true)}
        onMouseLeave={() => setIsStatusHovered(false)}
        onFocus={() => setIsStatusHovered(true)}
        onBlur={() => setIsStatusHovered(false)}
      >
        {isStatusHovered ? 'Open to work' : 'Available'}
        <span className="site-status__dot" aria-hidden="true" />
      </p>
    </header>
  )
}
