import type { MouseEvent } from 'react'
import type {
  CaseStudyBody,
  CaseStudyServiceDemoVideos,
  CaseStudyServiceLink,
} from '../../types/caseStudy'
import { CaseStudyProse } from './CaseStudyProse'
import { ServiceExperienceDemoVideos } from './ServiceExperienceDemoVideos'

const MOBILE_PREVIEW_WIDTH = 430
const MOBILE_PREVIEW_HEIGHT = 850

export type ServiceExperienceSectionProps = {
  description: CaseStudyBody
  demoVideos?: CaseStudyServiceDemoVideos
  serviceLinks: readonly CaseStudyServiceLink[]
  verificationPoints: readonly string[]
  /** Shown in a callout above link grid when set. */
  mobileNotice?: string
  /** Kicker above the secondary tier row when `tier: 'secondary'` links exist. */
  secondaryBandLabel?: string
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

function ServiceExperienceLinkCard({
  link,
  tier,
  onLinkClick,
}: {
  link: CaseStudyServiceLink
  tier: 'primary' | 'secondary'
  onLinkClick: (event: MouseEvent<HTMLAnchorElement>, link: CaseStudyServiceLink) => void
}) {
  const tierClass =
    tier === 'secondary'
      ? 'case-study__service-link case-study__service-link--tier-secondary'
      : 'case-study__service-link case-study__service-link--tier-primary'

  return (
    <a
      className={
        link.featured ? `${tierClass} case-study__service-link--featured` : tierClass
      }
      href={link.href}
      target="_blank"
      rel="noreferrer noopener"
      onClick={(event) => onLinkClick(event, link)}
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
  )
}

function ServiceExperienceLinkList({
  links,
  tier,
  className,
  ariaLabel,
  onLinkClick,
}: {
  links: readonly CaseStudyServiceLink[]
  tier: 'primary' | 'secondary'
  className: string
  ariaLabel?: string
  onLinkClick: (event: MouseEvent<HTMLAnchorElement>, link: CaseStudyServiceLink) => void
}) {
  return (
    <ul
      className={className}
      role="list"
      {...(ariaLabel ? { 'aria-label': ariaLabel } : {})}
    >
      {links.map((link) => (
        <li key={`${link.href}-${link.label}`}>
          <ServiceExperienceLinkCard link={link} tier={tier} onLinkClick={onLinkClick} />
        </li>
      ))}
    </ul>
  )
}

export function ServiceExperienceSection({
  description,
  demoVideos,
  mobileNotice,
  secondaryBandLabel,
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

  const primaryLinks = serviceLinks.filter((l) => l.tier !== 'secondary')
  const secondaryLinks = serviceLinks.filter((l) => l.tier === 'secondary')
  const hasTieredLayout = secondaryLinks.length > 0
  const isSideBySideDemo = demoVideos?.layout === 'side-by-side'

  return (
    <>
      {isSideBySideDemo && demoVideos ? (
        <div className="tone-demo-wrap">
          <div className="tone-demo-text">
            <CaseStudyProse body={description} />
          </div>
          <ServiceExperienceDemoVideos demoVideos={demoVideos} />
        </div>
      ) : (
        <>
          <CaseStudyProse body={description} />
          {demoVideos ? <ServiceExperienceDemoVideos demoVideos={demoVideos} /> : null}
        </>
      )}
      <div className="case-study__service-experience-stack">
        {mobileNotice ? (
          <div
            className="case-study__service-mobile-notice case-study__service-mobile-notice--tone"
            aria-label="모바일에서의 확인 안내"
          >
            <p className="case-study__service-mobile-notice-text">{mobileNotice}</p>
          </div>
        ) : null}

        {hasTieredLayout ? (
          <div
            className="case-study__service-link-tiers"
            aria-label="배포된 플랫폼 탐색 경로"
          >
            <ServiceExperienceLinkList
              links={primaryLinks}
              tier="primary"
              className="case-study__service-links case-study__service-links--primary-tier"
              onLinkClick={handleServiceLinkClick}
            />
            {secondaryBandLabel ? (
              <p className="case-study__service-secondary-band-label">{secondaryBandLabel}</p>
            ) : null}
            <ServiceExperienceLinkList
              links={secondaryLinks}
              tier="secondary"
              className="case-study__service-links case-study__service-links--secondary-tier"
              ariaLabel="아카이브 및 운영 레이어"
              onLinkClick={handleServiceLinkClick}
            />
          </div>
        ) : (
          <ServiceExperienceLinkList
            links={serviceLinks}
            tier="primary"
            className="case-study__service-links"
            ariaLabel="배포 서비스 주요 화면"
            onLinkClick={handleServiceLinkClick}
          />
        )}

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
