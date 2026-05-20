import type { ProjectCardData } from '../../types/project'
import { Link } from 'react-router-dom'
import type { MouseEvent } from 'react'
import { useCallback } from 'react'
import { HeroEmotionFlow } from '../case-study/HeroEmotionFlow'
import projectCardClip from '../../assets/project/project-cardClip.svg'
import { handleProjectDeployClick } from '../../utils/handleProjectDeployClick'
import './ProjectCard.scss'

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
  heroStaggeredScreens,
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
      if (!deployUrl) {
        return
      }
      handleProjectDeployClick(event, deployUrl, deployWindow)
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
      {heroStaggeredScreens ? (
        <div className="project-card__visual project-card__visual--emotion-flow">
          <HeroEmotionFlow variant="project-card" screens={heroStaggeredScreens} loading="lazy" />
        </div>
      ) : thumbnailSrc ? (
        <div className="project-card__visual project-card__visual--thumb">
          <img
            src={thumbnailSrc}
            alt=""
            className="project-card__visual-img"
            aria-hidden="true"
          />
        </div>
      ) : (
        <div
          className="project-card__visual project-card__visual--empty"
          aria-hidden="true"
        />
      )}
      <h3 className="project-card__title">{title}</h3>
      <div className="project-card__header">
        <span className="project-card__label case-badge">{visual.label}</span>
        <span className="project-card__status">{visual.meta}</span>
      </div>
      <div className="project-card__content">
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
              className="project-card__action-button project-card__action-button--deploy"
              href={deployUrl}
              target="_blank"
              rel="noreferrer noopener"
              {...(deployWindow ? { onClick: handleDeployClick } : {})}
              aria-label={`${title} 실제 서비스·배포 페이지 열기`}
            >
              <span className="project-card__deploy-label project-card__deploy-label--narrow" aria-hidden="true">
                실제 서비스 체험
              </span>
              <span className="project-card__deploy-label project-card__deploy-label--wide" aria-hidden="true">
                배포
              </span>
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
