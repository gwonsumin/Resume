import type { ReactNode } from 'react'
import type { ProjectPreview } from '../../types/project'
import type { CaseStudyBody, CaseStudyContent } from '../../types/caseStudy'
import './CaseStudyTemplate.scss'

const SECTIONS: ReadonlyArray<{
  key: keyof Pick<
    CaseStudyContent,
    | 'intro'
    | 'problem'
    | 'insight'
    | 'iaUserFlow'
    | 'solution'
    | 'uiDesign'
    | 'result'
    | 'learnings'
  >
  domId: string
  title: string
}> = [
  { key: 'intro', domId: 'intro', title: '소개' },
  { key: 'problem', domId: 'problem', title: '문제 정의' },
  { key: 'insight', domId: 'insight', title: '인사이트' },
  { key: 'iaUserFlow', domId: 'ia-user-flow', title: 'IA / 사용자 흐름' },
  { key: 'solution', domId: 'solution', title: '해결 전략' },
  { key: 'uiDesign', domId: 'ui-design', title: 'UI 디자인' },
  { key: 'result', domId: 'result', title: '결과' },
  { key: 'learnings', domId: 'learnings', title: '회고' },
]

type CaseStudyTemplateProps = {
  project: ProjectPreview
  content: CaseStudyContent
  titleId?: string
}

function CaseStudyFigure({
  src,
  alt,
  variant = 'section',
  loading = 'lazy',
}: {
  src: string
  alt: string
  variant?: 'hero' | 'heroCompact' | 'section' | 'heroPosterMain' | 'heroPosterInset' | 'protoThumb' | 'heroLead'
  loading?: 'lazy' | 'eager'
}) {
  return (
    <figure className={`case-study__figure case-study__figure--${variant}`}>
      <img src={src} alt={alt} loading={loading} decoding="async" />
    </figure>
  )
}

function Prose({ body }: { body: CaseStudyBody }) {
  return (
    <div className="case-study__prose">
      {renderBody(body).map((line) => (
        <p key={line} className="case-study__paragraph">
          {line}
        </p>
      ))}
    </div>
  )
}

function renderBody(body: CaseStudyBody): readonly string[] {
  return typeof body === 'string' ? [body] : body
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

function CaseStudyBlock({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: ReactNode
}) {
  return (
    <section
      className="case-study__block"
      id={id}
      aria-labelledby={`${id}-heading`}
    >
      <h2 className="case-study__block-title" id={`${id}-heading`}>
        {title}
      </h2>
      <div className="case-study__block-main">{children}</div>
    </section>
  )
}

export function CaseStudyTemplate({
  project,
  content,
  titleId,
}: CaseStudyTemplateProps) {
  const baseId = project.id
  const normalizedTagSet = new Set(project.tags.map((tag) => tag.trim().toLowerCase()))
  const toolTags = project.techStack.filter((tool) => !normalizedTagSet.has(tool.trim().toLowerCase()))
  const prototypeLinks = content.prototype
    ? [
        {
          href: content.prototype.href,
          buttonLabel: content.prototype.buttonLabel ?? '프로토타입 보기',
        },
        ...(content.prototype.extraLinks ?? []),
      ]
    : []

  const prototypeDesktopHref = content.prototype?.href
  const prototypeMobileHref = content.prototype?.extraLinks?.[0]?.href

  const heroDesktop = content.media?.hero?.desktopSrc
  const heroMobile = content.media?.hero?.mobileSrc
  const hasHero = Boolean(heroDesktop || heroMobile)
  const heroSingleColumn = Boolean(heroDesktop && !heroMobile) || Boolean(!heroDesktop && heroMobile)

  const prototypeDesktop = content.media?.prototype?.desktopSrc
  const prototypeMobile = content.media?.prototype?.mobileSrc
  const hasPrototypeMedia = Boolean(prototypeDesktop && prototypeMobile)
  const livePreviewFigure = content.media?.livePreview?.src

  return (
    <article className="case-study" lang="en">
      <header className="case-study__header">
        {hasHero ? (
          heroDesktop && heroMobile ? (
            <div className="case-study__hero-poster" aria-label="대표 화면">
              <div className="case-study__hero-poster-canvas">
                <CaseStudyFigure
                  src={heroDesktop}
                  alt={content.media?.hero?.desktopAlt ?? ''}
                  variant="heroPosterMain"
                  loading="eager"
                />
                <CaseStudyFigure
                  src={heroMobile}
                  alt={content.media?.hero?.mobileAlt ?? ''}
                  variant="heroPosterInset"
                  loading="lazy"
                />
              </div>
            </div>
          ) : (
            <div
              className={
                heroSingleColumn
                  ? 'case-study__hero-visuals case-study__hero-visuals--single'
                  : 'case-study__hero-visuals'
              }
            >
              {heroDesktop ? (
                <CaseStudyFigure
                  src={heroDesktop}
                  alt={content.media?.hero?.desktopAlt ?? ''}
                  variant={heroMobile ? 'hero' : 'heroLead'}
                  loading="eager"
                />
              ) : null}
              {heroMobile ? (
                <CaseStudyFigure
                  src={heroMobile}
                  alt={content.media?.hero?.mobileAlt ?? ''}
                  variant="heroCompact"
                  loading={heroDesktop ? 'lazy' : 'eager'}
                />
              ) : null}
            </div>
          )
        ) : null}
        <div className="case-study__meta-row">
          <span>{project.visual.label}</span>
          <span>{project.visual.meta}</span>
        </div>
        <h1 className="case-study__title" id={titleId}>
          {project.title}
        </h1>
        <p className="case-study__summary">{project.description}</p>
        <ul className="case-study__tags" role="list" aria-label="Project tags">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
          {toolTags.map((tool) => (
            <li key={tool} className="case-study__tags-tool">
              {tool}
            </li>
          ))}
        </ul>
      </header>

      <div className="case-study__body">
        {content.myRole ? (
          <CaseStudyBlock id={`${baseId}-my-role`} title="내 역할">
            <div className="case-study__my-role">
              <div className="case-study__my-role-summary">
                {renderBody(content.myRole.summary).map((line) => (
                  <p key={line} className="case-study__paragraph">
                    {line}
                  </p>
                ))}
              </div>

              <ul className="case-study__role-list" role="list" aria-label="My role details">
                {content.myRole.roles.map((role) => (
                  <li key={role.title} className="case-study__role-item">
                    <h3 className="case-study__role-title">{role.title}</h3>
                    <p className="case-study__role-detail">{role.detail}</p>
                  </li>
                ))}
              </ul>

              <div className="case-study__contribution" aria-label="Contribution summary">
                {content.myRole.contributions.map((item) => (
                  <div key={item.label} className="case-study__contribution-item">
                    <div className="case-study__contribution-label-row">
                      <span>{item.label}</span>
                      <strong>{item.percentage}%</strong>
                    </div>
                    <progress
                      className="case-study__contribution-track"
                      value={item.percentage}
                      max={100}
                      aria-label={`${item.label} 참여도 ${item.percentage}%`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </CaseStudyBlock>
        ) : null}

        <CaseStudyBlock
          id={
            content.serviceExperience
              ? `${baseId}-service-experience`
              : `${baseId}-live-preview`
          }
          title={
            content.serviceExperience?.title ??
            '실서비스 검증'
          }
        >
          {content.serviceExperience ? (
            <>
              <Prose body={content.serviceExperience.description} />
              <div className="case-study__service-experience-stack">
                <ul
                  className="case-study__service-links"
                  role="list"
                  aria-label="배포 서비스 주요 화면"
                >
                  {content.serviceExperience.serviceLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        className={
                          link.featured
                            ? 'case-study__service-link case-study__service-link--featured'
                            : 'case-study__service-link'
                        }
                        href={link.href}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <span className="case-study__service-link-head">
                          <span className="case-study__service-link-label">
                            {link.label}
                          </span>
                          <ExternalLinkGlyph className="case-study__service-link-icon" />
                        </span>
                        <span className="case-study__service-link-desc">
                          {link.description}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                {project.demoTestId && project.demoTestPassword ? (
                  <div
                    className="case-study__test-account"
                    aria-label="테스트 계정"
                  >
                    <h3 className="case-study__test-account-title">
                      테스트 계정
                    </h3>
                    <p className="case-study__test-account-lead">
                      {content.serviceExperience.testAccountLead}
                    </p>
                    <div className="case-study__test-account-rows">
                      <div className="case-study__test-account-row">
                        <span className="case-study__test-account-label">
                          Email
                        </span>
                        <span className="case-study__test-account-value">
                          {project.demoTestId}
                        </span>
                      </div>
                      <div className="case-study__test-account-row">
                        <span className="case-study__test-account-label">
                          Password
                        </span>
                        <span className="case-study__test-account-value">
                          {project.demoTestPassword}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : null}

                <ul
                  className="case-study__verification-pills"
                  role="list"
                  aria-label="검증 포인트"
                >
                  {content.serviceExperience.verificationPoints.map((point) => (
                    <li key={point} className="case-study__verification-pill">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <>
              <Prose
                body={
                  content.livePreview?.description ??
                  'Open the current build or project note when a public preview is available.'
                }
              />
              {livePreviewFigure ? (
                <CaseStudyFigure
                  src={livePreviewFigure}
                  alt={content.media?.livePreview?.alt ?? ''}
                  variant="section"
                />
              ) : null}
              {content.livePreview ? (
                <p className="case-study__live-action">
                  <a
                    className="case-study__button"
                    href={content.livePreview.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {content.livePreview.buttonLabel ?? '실서비스 보기'}
                  </a>
                </p>
              ) : null}
            </>
          )}
        </CaseStudyBlock>

        {SECTIONS.map(({ key, domId, title }) => {
          const sectionFigure = content.media?.sectionFigures?.[key]

          return (
            <div key={key} className="case-study__section-stack">
              <CaseStudyBlock id={`${baseId}-${domId}`} title={title}>
                <Prose body={content[key]} />
                {sectionFigure ? (
                  <CaseStudyFigure
                    src={sectionFigure.src}
                    alt={sectionFigure.alt ?? ''}
                    variant="section"
                  />
                ) : null}
              </CaseStudyBlock>
              {key === 'iaUserFlow' && content.prototype ? (
                <CaseStudyBlock id={`${baseId}-prototype`} title="프로토타입 검증">
                  <Prose
                    body={
                      content.prototype.description ??
                      'Prototype links and interaction notes are collected here.'
                    }
                  />
                  {hasPrototypeMedia &&
                  prototypeDesktop &&
                  prototypeMobile &&
                  prototypeDesktopHref &&
                  prototypeMobileHref ? (
                    <div className="case-study__proto-entries">
                      <a
                        className="case-study__proto-entry"
                        href={prototypeDesktopHref}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <figure className="case-study__figure case-study__figure--protoThumb">
                          <img
                            src={prototypeDesktop}
                            alt={content.media?.prototype?.desktopAlt ?? ''}
                            loading="lazy"
                            decoding="async"
                          />
                        </figure>
                        <span className="case-study__proto-entry-title">Desktop prototype</span>
                        <span className="case-study__proto-entry-note">Figma · 주요 데스크톱 흐름</span>
                      </a>
                      <a
                        className="case-study__proto-entry"
                        href={prototypeMobileHref}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <figure className="case-study__figure case-study__figure--protoThumb">
                          <img
                            src={prototypeMobile}
                            alt={content.media?.prototype?.mobileAlt ?? ''}
                            loading="lazy"
                            decoding="async"
                          />
                        </figure>
                        <span className="case-study__proto-entry-title">Mobile prototype</span>
                        <span className="case-study__proto-entry-note">Figma · 모바일 스케일 흐름</span>
                      </a>
                    </div>
                  ) : null}
                  {prototypeLinks.length > 0 &&
                  !(
                    hasPrototypeMedia &&
                    prototypeDesktop &&
                    prototypeMobile &&
                    prototypeDesktopHref &&
                    prototypeMobileHref
                  ) ? (
                    <ul className="case-study__proto-text-links" role="list">
                      {prototypeLinks.map((link) => (
                        <li key={`${link.buttonLabel}-${link.href}`}>
                          <a
                            className="case-study__text-link"
                            href={link.href}
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            {link.buttonLabel}
                            <span className="case-study__text-link-arrow" aria-hidden="true">
                              →
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </CaseStudyBlock>
              ) : null}
            </div>
          )
        })}
      </div>
    </article>
  )
}
