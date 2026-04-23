import { Link, NavLink } from 'react-router-dom'
import { mainNav, ROUTES } from '../../config/routes'
import './Header.css'

type HeaderProps = {
  siteTitle: string
  siteTagline?: string
}

function navClassName({ isActive }: { isActive: boolean }) {
  return isActive ? 'site-nav__link site-nav__link--active' : 'site-nav__link'
}

export function Header({ siteTitle, siteTagline }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="site-header__brand">
        <Link to={ROUTES.home} className="site-header__title-link">
          <p className="site-title">{siteTitle}</p>
        </Link>
        {siteTagline ? <p className="site-tagline">{siteTagline}</p> : null}
      </div>
      <nav className="site-nav" aria-label="Primary">
        <ul className="site-nav__list" role="list">
          {mainNav.map((item) => (
            <li key={item.path} className="site-nav__item">
              <NavLink
                to={item.path}
                className={navClassName}
                end={item.path === ROUTES.home}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
