import type { ProjectCardData } from '../../types/project'
import { Link } from 'react-router-dom'
import type { MouseEvent } from 'react'
import { useCallback } from 'react'
import projectCardClip from '../../assets/project/project-cardClip.svg'
import './ProjectCard.scss'

const DEPLOY_TOGGLE_MAX_WIDTH_PX = 767

type ProjectCardProps = ProjectCardData & {
  onOpenCaseStudy?: () => void
}

export function ProjectCard({
  title,
  description,
  subDescription,
  period,
  role,
  visual,
  to,
  githubUrl,
  proposalUrl,
  deployUrl,
  deployWindow,
  demoTestId,
  demoTestPassword,
  thumbnailSrc,
  onOpenCaseStudy,
  linkLabel = 'Open case study',
}: ProjectCardProps) {
  const shortDescription = (subDescription ?? description).trim()
  const roleTags = role
    ? role
        .split('·')
        .map((item) => item.trim())
        .filter(Boolean)
        .slice(0, 4)
    : []

  const handleDeployClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (!deployUrl || !deployWindow) {
        return
      }

      const openDeployInNewTab = () => {
        window.open(deployUrl, '_blank', 'noopener,noreferrer')
      }

      const isTonePreview = deployWindow.name === 'TONEPreview'

      if (isTonePreview) {
        if (typeof window !== 'undefined' && window.innerWidth <= 768) {
          return
        }
        event.preventDefault()
        const popup = window.open(
          deployUrl,
          deployWindow.name,
          [
            `width=${deployWindow.width}`,
            `height=${deployWindow.height}`,
            'scrollbars=yes',
            'resizable=no',
            'toolbar=no',
          ].join(','),
        )
        if (!popup) {
          openDeployInNewTab()
        }
        return
      }

      const prefersDefaultTab =
        typeof window !== 'undefined' &&
        window.matchMedia(`(max-width: ${DEPLOY_TOGGLE_MAX_WIDTH_PX}px)`).matches
      if (prefersDefaultTab) {
        return
      }
      event.preventDefault()
      const featureStr = [
        `width=${deployWindow.width}`,
        `height=${deployWindow.height}`,
        'resizable=yes',
        'scrollbars=yes',
      ].join(',')
      const opened = window.open(deployUrl, deployWindow.name, featureStr)
      if (!opened) {
        openDeployInNewTab()
      }
    },
    [deployUrl, deployWindow],
  )

  const otherQuickLinks = [
    { label: 'GitHub', href: githubUrl },
    { label: '제안서', href: proposalUrl },
  ].filter((link): link is { label: string; href: string } => Boolean(link.href))

  const hasQuickLinks = Boolean(deployUrl) || otherQuickLinks.length > 0

  const cardInner = (
    <>
      <img
        src={projectCardClip}
        alt=""
        className="project-card__clip"
        aria-hidden="true"
      />
      {thumbnailSrc ? (
        <div className="project-card__visual" aria-hidden="true">
          <img
            src={thumbnailSrc}
            alt=""
            className="project-card__visual-img"
          />
        </div>
      ) : null}
      <div className="project-card__header">
        <span className="project-card__label">{visual.label}</span>
        <span className="project-card__status">{visual.meta}</span>
      </div>
      <div className="project-card__content">
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__description">{shortDescription}</p>
        {period ? <p className="project-card__period">작업 기간 {period}</p> : null}
        {roleTags.length > 0 ? (
          <ul className="project-card__roles" role="list" aria-label="Role tags">
            {roleTags.map((tag) => (
              <li key={tag} className="project-card__tag">
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
        <div className="project-card__demo-creds" aria-label="데모 접속 정보">
          <div className="project-card__demo-row">
            <span className="project-card__demo-label">테스트 ID</span>
            <span
              className={
                demoTestId
                  ? 'project-card__demo-value'
                  : 'project-card__demo-value project-card__demo-value--placeholder'
              }
            >
              {demoTestId ?? '—'}
            </span>
          </div>
          <div className="project-card__demo-row">
            <span className="project-card__demo-label">비밀번호</span>
            <span
              className={
                demoTestPassword
                  ? 'project-card__demo-value'
                  : 'project-card__demo-value project-card__demo-value--placeholder'
              }
            >
              {demoTestPassword ?? '—'}
            </span>
          </div>
        </div>
      </div>
      <span className="project-card__reveal" aria-hidden="true">
        View case study
      </span>
    </>
  )

  return (
    <article className={`project-card project-card--${visual.variant}`}>
      {onOpenCaseStudy ? (
        <button
          type="button"
          className="project-card__link project-card__link--button"
          aria-label={`${title} ${linkLabel}`}
          onClick={onOpenCaseStudy}
        >
          {cardInner}
        </button>
      ) : (
        <Link
          to={to}
          className="project-card__link"
          aria-label={`${title} ${linkLabel}`}
        >
          {cardInner}
        </Link>
      )}
      {hasQuickLinks ? (
        <div className="project-card__actions" aria-label={`${title} 빠른 링크`}>
          {deployUrl ? (
            <a
              className="project-card__action-button"
              href={deployUrl}
              target="_blank"
              rel="noreferrer noopener"
              {...(deployWindow ? { onClick: handleDeployClick } : {})}
              aria-label={`${title} 배포 열기`}
            >
              배포
            </a>
          ) : null}
          {otherQuickLinks.map((link) => (
            <a
              key={link.label}
              className="project-card__action-button"
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${title} ${link.label} 열기`}
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </article>
  )
}
