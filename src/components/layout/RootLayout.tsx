import { useCallback, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { BackToTop } from '../back-to-top/BackToTop'
import { CustomCursor } from '../cursor/CustomCursor'
import { Footer } from '../footer/Footer'
import { Header } from '../header/Header'
import { RevealReadyProvider } from '../reveal/RevealReadyContext'
import { SplashIntro } from '../splash-intro/SplashIntro'
import './RootLayout.scss'

type RootLayoutProps = {
  siteTitle: string
}

export function RootLayout({ siteTitle }: RootLayoutProps) {
  const [splashOpen, setSplashOpen] = useState(true)
  const { pathname } = useLocation()

  const handleSplashComplete = useCallback(() => {
    setSplashOpen(false)
  }, [])

  useEffect(() => {
    const isHome = pathname === '/'
    document.documentElement.classList.toggle('scroll-snap-home', isHome)
    return () => {
      document.documentElement.classList.remove('scroll-snap-home')
    }
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
        <BackToTop />
      </div>
    </RevealReadyProvider>
  )
}
