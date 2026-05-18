import type { MouseEvent } from 'react'
import type { CaseStudyBody, CaseStudyServiceLink } from '../../types/caseStudy'
import { CaseStudyProse } from './CaseStudyProse'

const MOBILE_PREVIEW_WIDTH = 430
const MOBILE_PREVIEW_HEIGHT = 850

export type ServiceExperienceSectionProps = {
  description: CaseStudyBody
  serviceLinks: readonly CaseStudyServiceLink[]
  verificationPoints: readonly string[]
  /** Shown in a callout above link grid when set. */
  mobileNotice?: string
  demoTestId?: string
  demoTestPassword?: string
  testAccountLead?: string
}

function ExternalLinkGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={14}
      height={14}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"
      />
    </svg>
  )
}

function isMobileDevice() {
  if (typeof window === 'undefined') {
    return false
  }

  const hasMobileViewport = window.matchMedia('(max-width: 768px)').matches
  const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches
  const hasMobileUserAgent = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)

  return hasMobileViewport || (hasCoarsePointer && hasMobileUserAgent)
}

function openMobilePreview(href: string) {
  const popup = window.open(
    href,
    'TONEPreview',
    [
      `width=${MOBILE_PREVIEW_WIDTH}`,
      `height=${MOBILE_PREVIEW_HEIGHT}`,
      'scrollbars=yes',
      'resizable=no',
      'toolbar=no',
    ].join(','),
  )

  if (popup) {
    popup.opener = null
    return
  }

  window.open(href, '_blank', 'noopener,noreferrer')
}

export function ServiceExperienceSection({
  description,
  mobileNotice,
  serviceLinks,
  verificationPoints,
  testAccountLead,
  demoTestId,
  demoTestPassword,
}: ServiceExperienceSectionProps) {
  const hasCreds = Boolean(demoTestId && demoTestPassword)
  const handleServiceLinkClick = (
    event: MouseEvent<HTMLAnchorElement>,
    link: CaseStudyServiceLink,
  ) => {
    if (link.type !== 'mobile-preview' || isMobileDevice()) {
      return
    }

    event.preventDefault()
    openMobilePreview(link.href)
  }

  return (
    <>
      <CaseStudyProse body={description} />
      <div className="case-study__service-experience-stack">
        {mobileNotice ? (
          <div
            className="case-study__service-mobile-notice case-study__service-mobile-notice--tone"
            aria-label="모바일에서의 확인 안내"
          >
            <p className="case-study__service-mobile-notice-text">{mobileNotice}</p>
          </div>
        ) : null}

        <ul className="case-study__service-links" role="list" aria-label="배포 서비스 주요 화면">
          {serviceLinks.map((link) => (
            <li key={`${link.href}-${link.label}`}>
              <a
                className={
                  link.featured
                    ? 'case-study__service-link case-study__service-link--featured'
                    : 'case-study__service-link'
                }
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                onClick={(event) => handleServiceLinkClick(event, link)}
              >
                <span className="case-study__service-link-head">
                  <span className="case-study__service-link-titles">
                    <span className="case-study__service-link-label">{link.label}</span>
                    {link.title ? (
                      <span className="case-study__service-link-kicker">{link.title}</span>
                    ) : null}
                  </span>
                  <ExternalLinkGlyph className="case-study__service-link-icon" />
                </span>
                <span className="case-study__service-link-desc">{link.description}</span>
              </a>
            </li>
          ))}
        </ul>

        {hasCreds ? (
          <div className="case-study__test-account" aria-label="테스트 계정">
            <h3 className="case-study__test-account-title">테스트 계정</h3>
            {testAccountLead ? (
              <p className="case-study__test-account-lead">{testAccountLead}</p>
            ) : null}
            <div className="case-study__test-account-rows">
              <div className="case-study__test-account-row">
                <span className="case-study__test-account-label">Email</span>
                <span className="case-study__test-account-value">{demoTestId}</span>
              </div>
              <div className="case-study__test-account-row">
                <span className="case-study__test-account-label">Password</span>
                <span className="case-study__test-account-value">{demoTestPassword}</span>
              </div>
            </div>
          </div>
        ) : null}

        <ul className="case-study__verification-pills" role="list" aria-label="검증 포인트">
          {verificationPoints.map((point) => (
            <li key={point} className="case-study__verification-pill">
              {point}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
