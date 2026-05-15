import type { ProjectCardData } from '../../types/project'
import { Link } from 'react-router-dom'
import projectCardClip from '../../assets/project/project-cardClip.svg'
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
  demoTestId,
  demoTestPassword,
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
  const quickLinks = [
    { label: '배포', href: deployUrl },
    { label: 'GitHub', href: githubUrl },
    { label: '제안서', href: proposalUrl },
  ].filter((link): link is { label: string; href: string } => Boolean(link.href))

  const cardInner = (
    <>
      <img
        src={projectCardClip}
        alt=""
        className="project-card__clip"
        aria-hidden="true"
      />
      <div className="project-card__header">
        <span className="project-card__label">{visual.label}</span>
        <span className="project-card__status">{visual.meta}</span>
      </div>
      <div className="project-card__thumb" aria-label="썸네일 이미지 삽입 예정 구역">
        <div className="project-card__thumb-grid" aria-hidden="true">
          <span className="project-card__thumb-slot">DESKTOP SHOT</span>
          <span className="project-card__thumb-slot">MOBILE SHOT</span>
        </div>
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
      {quickLinks.length > 0 ? (
        <div className="project-card__actions" aria-label={`${title} 빠른 링크`}>
          {quickLinks.map((link) => (
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
