import { Outlet } from 'react-router-dom'
import { Footer } from '../footer/Footer'
import { Header } from '../header/Header'
import './RootLayout.scss'

type RootLayoutProps = {
  siteTitle: string
  siteTagline?: string
}

export function RootLayout({ siteTitle, siteTagline }: RootLayoutProps) {
  return (
    <div className="page">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Header siteTitle={siteTitle} siteTagline={siteTagline} />
      <main id="main-content" className="site-main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer siteTitle={siteTitle} />
    </div>
  )
}
