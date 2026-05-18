import {
  Fragment,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import type { ProjectPreview } from '../../types/project'
import type {
  CaseStudyBrowserScrollPreview,
  CaseStudyContent,
  CaseStudySectionFigure,
} from '../../types/caseStudy'
import { handleProjectDeployClick } from '../../utils/handleProjectDeployClick'
import { CaseStudyProse, renderCaseStudyBody } from './CaseStudyProse'
import { HeroEmotionFlow } from './HeroEmotionFlow'
import { ServiceExperienceSection } from './ServiceExperienceSection'
import { BrowserScrollPreview } from './BrowserScrollPreview'
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
  tonePresentation,
}: {
  src: string
  alt: string
  variant?: 'hero' | 'heroCompact' | 'section' | 'heroPosterMain' | 'heroPosterInset' | 'protoThumb' | 'heroLead'
  loading?: 'lazy' | 'eager'
  tonePresentation?: CaseStudySectionFigure['presentation']
}) {
  const toneClass =
    variant === 'section' &&
    tonePresentation &&
    tonePresentation !== 'default'
      ? ` case-study__figure--tone-${tonePresentation}`
      : ''

  return (
    <figure className={`case-study__figure case-study__figure--${variant}${toneClass}`}>
      <img src={src} alt={alt} loading={loading} decoding="async" />
    </figure>
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

function CaseStudyBrowserPreviewList({
  previews,
}: {
  previews?: readonly CaseStudyBrowserScrollPreview[]
}) {
  if (!previews?.length) return null

  return (
    <div className="case-study__browser-preview-list">
      {previews.map((preview, index) => (
        <div
          key={`${preview.title ?? 'browser-preview'}-${index}`}
          className="case-study__browser-preview"
        >
          {preview.title ? (
            <p className="case-study__browser-preview-title">{preview.title}</p>
          ) : null}
          <BrowserScrollPreview pages={preview.pages} />
        </div>
      ))}
    </div>
  )
}

function clampCaseStudy(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max)
}

const LIGHTBOX_LIST_ANCHOR_MARGIN_PX = 56

/** Viewport-clamped center of the thumbnail row for the image lightbox panel. */
function lightboxAnchorForListEl(el: HTMLDivElement | null): { left: number; top: number } {
  if (typeof window === 'undefined') {
    return { left: 0, top: 0 }
  }
  const w = window.innerWidth
  const h = window.innerHeight
  const m = LIGHTBOX_LIST_ANCHOR_MARGIN_PX
  const fallback = { left: w / 2, top: h / 2 }
  if (!el) {
    return fallback
  }
  const r = el.getBoundingClientRect()
  const cx = r.left + r.width / 2
  const cy = r.top + r.height / 2
  return {
    left: clampCaseStudy(cx, m, w - m),
    top: clampCaseStudy(cy, m, h - m),
  }
}

function CaseStudyHeroExternalGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={12}
      height={12}
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

function CaseStudySectionImageList({
  images,
  layout = 'stack',
}: {
  images?: readonly CaseStudySectionFigure[]
  layout?: 'stack' | 'row'
}) {
  const listRef = useRef<HTMLDivElement>(null)
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)
  const [panelPos, setPanelPos] = useState<{ left: number; top: number } | null>(null)

  const updatePanelAnchor = useCallback(() => {
    setPanelPos(lightboxAnchorForListEl(listRef.current))
  }, [])

  const closeLightbox = useCallback(() => {
    setLightbox(null)
    setPanelPos(null)
  }, [])

  useLayoutEffect(() => {
    if (!lightbox) return
    updatePanelAnchor()
    window.addEventListener('resize', updatePanelAnchor)
    window.addEventListener('scroll', updatePanelAnchor, true)
    return () => {
      window.removeEventListener('resize', updatePanelAnchor)
      window.removeEventListener('scroll', updatePanelAnchor, true)
    }
  }, [lightbox, updatePanelAnchor])

  useEffect(() => {
    if (!lightbox) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, closeLightbox])

  if (!images?.length) return null

  const listClass =
    layout === 'row'
      ? 'case-study__section-image-list case-study__section-image-list--row'
      : 'case-study__section-image-list'

  const openLightbox = (src: string, alt: string) => {
    setPanelPos(lightboxAnchorForListEl(listRef.current))
    setLightbox({ src, alt })
  }

  const lightboxPortal =
    lightbox && panelPos && typeof document !== 'undefined'
      ? createPortal(
          <div
            className="case-study__image-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="확대 이미지"
          >
            <button
              type="button"
              className="case-study__image-lightbox__backdrop"
              aria-label="닫기"
              onClick={closeLightbox}
            />
            <div
              className="case-study__image-lightbox__panel"
              style={{
                left: panelPos.left,
                top: panelPos.top,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <button
                type="button"
                className="case-study__image-lightbox__close"
                onClick={closeLightbox}
                aria-label="닫기"
              >
                ×
              </button>
              <img
                src={lightbox.src}
                alt={lightbox.alt}
                className="case-study__image-lightbox__img"
                decoding="async"
              />
            </div>
          </div>,
          document.body,
        )
      : null

  return (
    <>
      <div ref={listRef} className={listClass}>
        {images.map((image) => {
          const figure = (
            <CaseStudyFigure
              src={image.src}
              alt={image.alt ?? ''}
              variant="section"
              tonePresentation={image.presentation}
            />
          )
          if (layout === 'row') {
            return (
              <button
                key={image.src}
                type="button"
                className="case-study__section-image-trigger"
                onClick={() => openLightbox(image.src, image.alt ?? '')}
                aria-label={
                  image.alt ? `${image.alt} — 확대 보기` : '스크린샷 확대 보기'
                }
              >
                {figure}
              </button>
            )
          }
          return <Fragment key={image.src}>{figure}</Fragment>
        })}
      </div>
      {lightboxPortal}
    </>
  )
}

export function CaseStudyTemplate({
  project,
  content,
  titleId,
}: CaseStudyTemplateProps) {
  const baseId = project.id
  const isToneCase = baseId === 'tone'
  const projectTags = project.tags.slice(0, 4)
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
  const staggeredScreens = content.media?.hero?.staggeredScreens
  const hasStaggeredHero = Boolean(
    staggeredScreens?.left?.src &&
      staggeredScreens?.center?.src &&
      staggeredScreens?.right?.src,
  )
  const hasHero = Boolean(heroDesktop || heroMobile)
  const heroSingleColumn = Boolean(heroDesktop && !heroMobile) || Boolean(!heroDesktop && heroMobile)

  const prototypeDesktop = content.media?.prototype?.desktopSrc
  const prototypeMobile = content.media?.prototype?.mobileSrc
  const hasPrototypeMedia = Boolean(prototypeDesktop && prototypeMobile)
  const prototypeMobileThumbSlot = Boolean(
    content.prototype?.prototypeMobileThumbSlot &&
      content.prototype.href &&
      content.media?.prototype?.mobileSrc,
  )
  const prototypeHasVisualSplit = Boolean(
    (prototypeMobileThumbSlot &&
      content.prototype?.href &&
      content.media?.prototype?.mobileSrc) ||
      (hasPrototypeMedia &&
        prototypeDesktop &&
        prototypeMobile &&
        prototypeDesktopHref &&
        prototypeMobileHref),
  )
  const livePreviewFigure = content.media?.livePreview?.src
  const uxFlowEditorial = content.uxFlowEditorial
  const prototypeAnchorKey: (typeof SECTIONS)[number]['key'] = isToneCase ? 'result' : 'iaUserFlow'
  const usedProgramsBlock = (
    <div className="case-study__programs" aria-label="프로젝트 사용 프로그램">
      <span className="case-study__programs-label">Used Programs</span>
      <ul className="case-study__tags case-study__tags--programs" role="list">
        {project.techStack.map((tool) => (
          <li key={tool} className="case-study__tags-tool">
            {tool}
          </li>
        ))}
      </ul>
    </div>
  )
  const serviceExperienceBlock = (
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
        <ServiceExperienceSection
          description={content.serviceExperience.description}
          mobileNotice={content.serviceExperience.mobileNotice}
          secondaryBandLabel={content.serviceExperience.secondaryBandLabel}
          serviceLinks={content.serviceExperience.serviceLinks}
          verificationPoints={content.serviceExperience.verificationPoints}
          testAccountLead={content.serviceExperience.testAccountLead}
          demoTestId={project.demoTestId}
          demoTestPassword={project.demoTestPassword}
        />
      ) : (
        <>
          <CaseStudyProse
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
  )

  const heroDeployUrl = project.deployUrl
  const onHeroDeployClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (!heroDeployUrl) return
      handleProjectDeployClick(event, heroDeployUrl, project.deployWindow)
    },
    [heroDeployUrl, project.deployWindow],
  )

  const heroDeployControl =
    heroDeployUrl ? (
      <a
        className="case-study__hero-deploy-link"
        href={heroDeployUrl}
        target="_blank"
        rel="noreferrer noopener"
        onClick={onHeroDeployClick}
        aria-label={`${project.title} 배포 사이트 새 탭에서 열기`}
      >
        <span className="case-study__hero-deploy-link-text">Live site</span>
        <CaseStudyHeroExternalGlyph className="case-study__hero-deploy-link-icon" />
      </a>
    ) : null

  const wrapCaseStudyHero = (inner: ReactNode) =>
    heroDeployControl ? (
      <div className="case-study__hero-with-deploy">
        {inner}
        {heroDeployControl}
      </div>
    ) : (
      inner
    )

  return (
    <article className={`case-study${isToneCase ? ' case-study--tone' : ''}`} lang="en">
      <header className="case-study__header">
        {hasStaggeredHero && staggeredScreens ? (
          wrapCaseStudyHero(
            <HeroEmotionFlow variant="header" screens={staggeredScreens} loading="eager" />,
          )
        ) : hasHero ? (
          heroDesktop && heroMobile ? (
            wrapCaseStudyHero(
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
              </div>,
            )
          ) : (
            wrapCaseStudyHero(
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
              </div>,
            )
          )
        ) : null}
        <>
          <div className="case-study__meta-row">
            <span>{project.visual.label}</span>
            <span>{project.visual.meta}</span>
          </div>
          <h1 className="case-study__title" id={titleId}>
            {project.title}
          </h1>
          <p className="case-study__summary">{project.description}</p>
          <ul className="case-study__tags" role="list" aria-label="Project tags">
            {projectTags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          {usedProgramsBlock}
        </>
      </header>

      <div className="case-study__body">
        {content.myRole ? (
          <CaseStudyBlock id={`${baseId}-my-role`} title="내 역할">
            <div className="case-study__my-role">
              <div className="case-study__my-role-summary">
                {renderCaseStudyBody(content.myRole.summary).map((line) => (
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
        {!isToneCase ? serviceExperienceBlock : null}

        {SECTIONS.map(({ key, domId, title }) => {
          const sectionFigure = content.media?.sectionFigures?.[key]
          const sectionTitle = content.sectionTitles?.[key] ?? title
          const toneFigurePresentation =
            sectionFigure?.presentation === 'palette' ||
            sectionFigure?.presentation === 'player' ||
            sectionFigure?.presentation === 'calendar'
          const toneFigureSplit = Boolean(sectionFigure && toneFigurePresentation)
          const browserPreviews =
            content.browserScrollPreviews?.[key] ??
            (key === 'uiDesign' && content.browserScrollPreview
              ? [content.browserScrollPreview]
              : undefined)
          const sectionImages = content.sectionImages?.[key]
          const sectionImageLayout = content.sectionImageLayout?.[key] ?? 'stack'

          return (
            <div key={key} className="case-study__section-stack">
              <CaseStudyBlock id={`${baseId}-${domId}`} title={sectionTitle}>
                {toneFigureSplit && sectionFigure ? (
                  <div className="case-study__split-body case-study__split-body--tone">
                    <div className="case-study__split-body-copy">
                      <CaseStudyProse body={content[key]} />
                    </div>
                    <div className="case-study__split-body-media">
                      <CaseStudyFigure
                        src={sectionFigure.src}
                        alt={sectionFigure.alt ?? ''}
                        variant="section"
                        tonePresentation={sectionFigure.presentation}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <CaseStudyProse body={content[key]} />
                    {sectionFigure ? (
                      <CaseStudyFigure
                        src={sectionFigure.src}
                        alt={sectionFigure.alt ?? ''}
                        variant="section"
                        tonePresentation={sectionFigure.presentation}
                      />
                    ) : null}
                  </>
                )}
                <CaseStudyBrowserPreviewList previews={browserPreviews} />
                <CaseStudySectionImageList images={sectionImages} layout={sectionImageLayout} />
              </CaseStudyBlock>
              {key === 'iaUserFlow' && uxFlowEditorial ? (
                <CaseStudyBlock id={`${baseId}-ux-flow-editorial`} title={uxFlowEditorial.title}>
                  <ol className="case-study__ux-flow-editorial" role="list" aria-label="핵심 사용자 경험 흐름">
                    {uxFlowEditorial.steps.map((step, index) => (
                      <li key={step} className="case-study__ux-flow-step">
                        <span className="case-study__ux-flow-step-label">{step}</span>
                        {index < uxFlowEditorial.steps.length - 1 ? (
                          <span className="case-study__ux-flow-step-arrow" aria-hidden="true">
                            →
                          </span>
                        ) : null}
                      </li>
                    ))}
                  </ol>
                </CaseStudyBlock>
              ) : null}
              {key === prototypeAnchorKey && content.prototype ? (
                <CaseStudyBlock id={`${baseId}-prototype`} title="프로토타입 검증">
                  {prototypeHasVisualSplit ? (
                    <div
                      className={
                        prototypeMobileThumbSlot
                          ? 'case-study__split-body case-study__split-body--tone case-study__split-body--proto case-study__split-body--proto-slot-only'
                          : 'case-study__split-body case-study__split-body--tone case-study__split-body--proto'
                      }
                    >
                      <div className="case-study__split-body-copy">
                        <CaseStudyProse
                          body={
                            content.prototype.description ??
                            'Prototype links and interaction notes are collected here.'
                          }
                        />
                      </div>
                      <div className="case-study__split-body-media">
                        {prototypeMobileThumbSlot &&
                        content.prototype.href &&
                        content.media?.prototype?.mobileSrc ? (
                          <div className="case-study__proto-entries case-study__proto-entries--mobile-slot">
                            <a
                              className="case-study__proto-entry"
                              href={content.prototype.href}
                              target="_blank"
                              rel="noreferrer noopener"
                            >
                              <figure className="case-study__figure case-study__figure--protoThumb">
                                <img
                                  src={content.media.prototype.mobileSrc}
                                  alt={
                                    content.media.prototype.mobileAlt ?? '모바일 프로토타입 미리보기'
                                  }
                                  loading="lazy"
                                  decoding="async"
                                />
                              </figure>
                              <span className="case-study__proto-entry-title">
                                Mobile prototype
                              </span>
                              <span className="case-study__proto-entry-note">
                                Figma · 모바일 스케일 흐름
                              </span>
                            </a>
                          </div>
                        ) : null}
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
                              <span className="case-study__proto-entry-title">
                                Desktop prototype
                              </span>
                              <span className="case-study__proto-entry-note">
                                Figma · 주요 데스크톱 흐름
                              </span>
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
                              <span className="case-study__proto-entry-title">
                                Mobile prototype
                              </span>
                              <span className="case-study__proto-entry-note">
                                Figma · 모바일 스케일 흐름
                              </span>
                            </a>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : (
                    <>
                      <CaseStudyProse
                        body={
                          content.prototype.description ??
                          'Prototype links and interaction notes are collected here.'
                        }
                      />
                      {prototypeLinks.length > 0 &&
                      !(
                        hasPrototypeMedia &&
                        prototypeDesktop &&
                        prototypeMobile &&
                        prototypeDesktopHref &&
                        prototypeMobileHref
                      ) &&
                      !prototypeMobileThumbSlot ? (
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
                                <span
                                  className="case-study__text-link-arrow"
                                  aria-hidden="true"
                                >
                                  →
                                </span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </>
                  )}
                </CaseStudyBlock>
              ) : null}
            </div>
          )
        })}
        {isToneCase ? serviceExperienceBlock : null}
      </div>
    </article>
  )
}
