import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from 'react'
import './Footer.scss'
import footerLogo from '../../assets/footer/footer-logo.svg'
import tomato0 from '../../assets/footer/footer-tamatoicon00.svg'
import tomato1 from '../../assets/footer/footer-tamatoicon01.svg'
import tomato2 from '../../assets/footer/footer-tamatoicon02.svg'
import { mountFooterPhysics, type FooterPhysicsSpec } from './footerPhysics'

type FooterProps = {
  siteTitle: string
}

const RESUME_HREF = `${import.meta.env.BASE_URL}assets/files/KwonSumin-Resume.pdf`

const EMAIL = 'gsum212@gmail.com'
/** 카드·링크용 표기 */
const PHONE_DISPLAY = '82+ 10-8327-8238'
const PHONE_TEL = '+821083278238'
const GITHUB_HREF = 'https://github.com/gwonsumin'
const INSTAGRAM_GSUM = 'https://www.instagram.com/gsum_00/'
const INSTAGRAM_GCAT = 'https://www.instagram.com/gcat_oo/'

async function copyTextToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.setAttribute('readonly', '')
      ta.style.position = 'fixed'
      ta.style.left = '-9999px'
      ta.style.top = '0'
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(ta)
      return ok
    } catch {
      return false
    }
  }
}

function DottedRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="site-footer__pass-row">
      <span className="site-footer__pass-row-label">{label}</span>
      <span className="site-footer__pass-row-line" aria-hidden />
      <span className="site-footer__pass-row-value">{children}</span>
    </div>
  )
}

function FooterNamePass() {
  const [touchFlipped, setTouchFlipped] = useState(false)
  const [emailCopied, setEmailCopied] = useState(false)
  const copyEmailResetRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (copyEmailResetRef.current) clearTimeout(copyEmailResetRef.current)
    }
  }, [])

  const handleCopyEmail = useCallback(async () => {
    const ok = await copyTextToClipboard(EMAIL)
    if (!ok) return
    setEmailCopied(true)
    if (copyEmailResetRef.current) clearTimeout(copyEmailResetRef.current)
    copyEmailResetRef.current = setTimeout(() => {
      setEmailCopied(false)
      copyEmailResetRef.current = null
    }, 2200)
  }, [])

  const handlePassSceneClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('a, button')) return
    if (!window.matchMedia('(hover: none)').matches) return
    setTouchFlipped((v) => !v)
  }

  const handlePassSceneKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Enter' && e.key !== ' ') return
    if ((e.target as HTMLElement).closest('a')) return
    e.preventDefault()
    setTouchFlipped((v) => !v)
  }

  return (
    <div className="site-footer__pass-stack">
      <div
        className={`site-footer__pass-scene${touchFlipped ? ' site-footer__pass-scene--touch-flip' : ''}`}
        tabIndex={0}
        onClick={handlePassSceneClick}
        onKeyDown={handlePassSceneKeyDown}
      >
        <article className="site-footer__pass-card" aria-label="SUMIN PASS — 연락처">
          <div className="site-footer__pass-flip">
            <div className="site-footer__pass-face site-footer__pass-face--front">
            <span className="site-footer__pass-corner" aria-hidden>
              <img src={tomato0} alt="" width={22} height={20} draggable={false} />
            </span>
            <header className="site-footer__pass-header">
              <p className="site-footer__pass-series">
                <span className="site-footer__pass-series-label">STATE / FLOW / ARCHIVE</span>
                <span className="site-footer__pass-series-no">No. 2026-UX</span>
              </p>
              <h2 className="site-footer__pass-title">SUMIN PASS</h2>
            </header>

            <div className="site-footer__pass-body">
              <div className="site-footer__pass-photo" aria-label="프로필 이미지 영역 (준비 중)">
                <span className="site-footer__pass-photo-placeholder" />
                <span className="site-footer__pass-photo-caption">Photograph</span>
              </div>

              <div className="site-footer__pass-fields">
                <DottedRow label="NAME">
                  <span className="site-footer__pass-em">권수민</span>
                </DottedRow>
                <DottedRow label="ROLE">
                  <span>UX/UI Designer · Frontend</span>
                </DottedRow>
                <DottedRow label="STATUS">
                  <span>Available for new projects</span>
                </DottedRow>

                <div className="site-footer__pass-contact-block">
                  <p className="site-footer__pass-contact-heading">CONTACT</p>
                  <ul className="site-footer__pass-contact-list">
                    <li>
                      <a href={`mailto:${EMAIL}`}>
                        <span className="site-footer__pass-contact-key">email</span>
                        <span className="site-footer__pass-contact-val">{EMAIL}</span>
                      </a>
                    </li>
                    <li>
                      <a href={`tel:${PHONE_TEL}`}>
                        <span className="site-footer__pass-contact-key">phone</span>
                        <span className="site-footer__pass-contact-val">{PHONE_DISPLAY}</span>
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="site-footer__pass-optional">
                  <p className="site-footer__pass-optional-line">
                    <span className="site-footer__pass-optional-k">Current State</span>
                    <span className="site-footer__pass-optional-v">Exploring Better Flows</span>
                  </p>
                </div>
              </div>
            </div>

            <p className="site-footer__pass-hint" aria-hidden>
              카드에 올리면 뒷면 · GitHub·이력서·IG는 하단 버튼
            </p>
          </div>

          <div className="site-footer__pass-face site-footer__pass-face--back" aria-hidden>
            <p className="site-footer__pass-back-label">Portfolio lens</p>
            <ul className="site-footer__pass-back-grid">
              <li className="site-footer__pass-back-slot">
                <span className="site-footer__pass-back-slot-title">State</span>
                <span className="site-footer__pass-back-slot-area" aria-label="State 영역" />
              </li>
              <li className="site-footer__pass-back-slot">
                <span className="site-footer__pass-back-slot-title">Flow</span>
                <span className="site-footer__pass-back-slot-area" aria-label="Flow 영역" />
              </li>
              <li className="site-footer__pass-back-slot">
                <span className="site-footer__pass-back-slot-title">Archive</span>
                <span className="site-footer__pass-back-slot-area" aria-label="Archive 영역" />
              </li>
            </ul>
            <p className="site-footer__pass-back-note">추후 비주얼·프로젝트 스탬프를 넣을 수 있는 영역입니다.</p>
          </div>
        </div>
        </article>
      </div>

      <nav className="site-footer__pass-actions" aria-label="주요 연락처 바로가기">
        <button
          type="button"
          className={`site-footer__pass-action site-footer__pass-action--copy${emailCopied ? ' site-footer__pass-action--copied' : ''}`}
          onClick={handleCopyEmail}
          aria-label={emailCopied ? `Email copied: ${EMAIL}` : `Copy email to clipboard: ${EMAIL}`}
        >
          {emailCopied ? (
            'Copied'
          ) : (
            <>
              Email <span className="site-footer__pass-action-meta">copy</span>
            </>
          )}
        </button>
        <a
          className="site-footer__pass-action"
          href={GITHUB_HREF}
          target="_blank"
          rel="noreferrer noopener"
        >
          GitHub
        </a>
        <a
          className="site-footer__pass-action"
          href={RESUME_HREF}
          target="_blank"
          rel="noreferrer noopener"
        >
          Resume
        </a>
        <a
          className="site-footer__pass-action"
          href={INSTAGRAM_GSUM}
          target="_blank"
          rel="noreferrer noopener"
        >
          Instagram <span className="site-footer__pass-action-meta">@gsum_00</span>
        </a>
        <a
          className="site-footer__pass-action site-footer__pass-action--secondary"
          href={INSTAGRAM_GCAT}
          target="_blank"
          rel="noreferrer noopener"
        >
          Instagram <span className="site-footer__pass-action-meta">@gcat_oo</span>
        </a>
      </nav>
    </div>
  )
}

export function Footer({ siteTitle }: FooterProps) {
  const year = new Date().getFullYear()
  const physicsRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const tomato0Ref = useRef<HTMLDivElement>(null)
  const tomato1Ref = useRef<HTMLDivElement>(null)
  const tomato2Ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const container = physicsRef.current
    if (!container) return

    let teardown: (() => void) | undefined
    let cancelled = false
    const timer = window.setTimeout(() => {
      if (cancelled) return
      const narrow = window.matchMedia('(max-width: 47.99rem)').matches
      const specs: FooterPhysicsSpec[] = []

      if (!narrow && logoRef.current) {
        const el = logoRef.current
        const bw = el.offsetWidth
        const bh = el.offsetHeight
        if (bw > 4 && bh > 4) {
          specs.push({ kind: 'box', element: el, width: bw, height: bh })
        }
      }

      const addCircle = (el: HTMLDivElement | null) => {
        if (!el) return
        const bw = el.offsetWidth
        if (bw < 4) return
        specs.push({ kind: 'circle', element: el, radius: Math.min(bw * 0.46, bw * 0.5) })
      }

      addCircle(tomato0Ref.current)
      addCircle(tomato1Ref.current)
      if (!narrow) addCircle(tomato2Ref.current)

      if (specs.length === 0) return

      teardown = mountFooterPhysics(container, specs)
    }, 32)

    return () => {
      cancelled = true
      clearTimeout(timer)
      teardown?.()
    }
  }, [])

  return (
    <footer id="contact" className="site-footer" aria-labelledby="contact-footer-heading">
      <div className="site-footer__mega" aria-hidden>
        <span className="site-footer__mega-text">SUMIN</span>
      </div>

      <div className="site-footer__inner">
        <p className="site-footer__label" id="contact-footer-heading">
          CONTACT
        </p>

        <div className="site-footer__contact">
          <FooterNamePass />

          <div className="site-footer__contact-body">
            <div className="site-footer__intro">
              <p className="site-footer__lead">
                <span className="site-footer__lead-line site-footer__lead-line--soft">
                  따뜻하고, 또렷하고,
                </span>
                <span className="site-footer__lead-line">쓸모 있는 무언가를</span>
                <span className="site-footer__lead-line site-footer__lead-accent">함께 만들어가요.</span>
              </p>
            </div>

            <div className="site-footer__note-block">
              <p className="site-footer__note">© {year} {siteTitle}</p>
              <p className="site-footer__note site-footer__note--disclaimer">
                본 프로젝트는 포트폴리오용으로 제작된 사이트입니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={physicsRef}
        className="site-footer__physics"
        aria-hidden
        data-footer-playground
      >
        <div className="site-footer__physics-item site-footer__physics-item--logo" ref={logoRef}>
          <img src={footerLogo} alt="" width={220} height={74} draggable={false} />
        </div>
        <div className="site-footer__physics-item site-footer__physics-item--tomato" ref={tomato0Ref}>
          <img src={tomato0} alt="" width={160} height={144} draggable={false} />
        </div>
        <div className="site-footer__physics-item site-footer__physics-item--tomato" ref={tomato1Ref}>
          <img src={tomato1} alt="" width={160} height={144} draggable={false} />
        </div>
        <div className="site-footer__physics-item site-footer__physics-item--tomato site-footer__physics-item--tomato-narrow" ref={tomato2Ref}>
          <img src={tomato2} alt="" width={160} height={144} draggable={false} />
        </div>
      </div>
    </footer>
  )
}
