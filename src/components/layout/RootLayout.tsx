import { Outlet } from 'react-router-dom'
import { CustomCursor } from '../cursor/CustomCursor'
import { Footer } from '../footer/Footer'
import { Header } from '../header/Header'
import './RootLayout.scss'

type RootLayoutProps = {
  siteTitle: string
}

export function RootLayout({ siteTitle }: RootLayoutProps) {
  return (
    <div className="page">
      <CustomCursor />
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Header siteTitle={siteTitle} />
      <main id="main-content" className="site-main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer siteTitle={siteTitle} />
    </div>
  )
}
