import { useCallback, useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { FloatingControls } from '../floating-controls/FloatingControls'
import { CustomCursor } from '../cursor/CustomCursor'
import { Footer } from '../footer/Footer'
import { Header } from '../header/Header'
import { RevealReadyProvider } from '../reveal/RevealReadyContext'
import { SplashIntro } from '../splash-intro/SplashIntro'
import { trackPageview } from '../../utils/analytics'
import './RootLayout.scss'

type RootLayoutProps = {
  siteTitle: string
}

export function RootLayout({ siteTitle }: RootLayoutProps) {
  const { pathname } = useLocation()
  const [splashOpen, setSplashOpen] = useState(() => {
    const alreadySeen = sessionStorage.getItem('splash-seen') === '1'
    if (alreadySeen || pathname !== '/') {
      return false
    }
    return true
  })

  const handleSplashComplete = useCallback(() => {
    sessionStorage.setItem('splash-seen', '1')
    setSplashOpen(false)
  }, [])

  useEffect(() => {
    const isHome = pathname === '/'
    document.documentElement.classList.toggle('scroll-snap-home', isHome)
    return () => {
      document.documentElement.classList.remove('scroll-snap-home')
    }
  }, [pathname])

  const isFirstPathnameRef = useRef(true)
  useEffect(() => {
    // Skip the initial mount: gtag.js already fires a page_view for the first load.
    if (isFirstPathnameRef.current) {
      isFirstPathnameRef.current = false
      return
    }
    trackPageview(pathname)
  }, [pathname])

  return (
    <RevealReadyProvider ready={!splashOpen}>
      <div className="page">
        {splashOpen ? <SplashIntro onComplete={handleSplashComplete} /> : null}
        <CustomCursor />
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <Header siteTitle={siteTitle} />
        <main id="main-content" className="site-main" tabIndex={-1}>
          <Outlet />
        </main>
        <Footer siteTitle={siteTitle} />
        <FloatingControls />
      </div>
    </RevealReadyProvider>
  )
}
