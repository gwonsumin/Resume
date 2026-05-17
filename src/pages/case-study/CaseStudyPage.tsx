import { useCallback, useEffect, useRef } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { CaseStudyTemplate } from '../../components/case-study/CaseStudyTemplate'
import { HeroEmotionFlow } from '../../components/case-study/HeroEmotionFlow'
import { ROUTES } from '../../config/routes'
import { getCaseStudyContent } from '../../data/caseStudyContent'
import { getSelectedProjectBySlug, selectedProjects } from '../../data/projects'
import './CaseStudyPage.scss'

export function CaseStudyPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const project = getSelectedProjectBySlug(slug)
  const content = slug ? getCaseStudyContent(slug) : undefined

  const navigateWithPageTransition = useCallback(
    (update: () => void) => {
      const transitionDocument = document as Document & {
        startViewTransition?: (callback: () => void) => void
      }

      if (!transitionDocument.startViewTransition) {
        update()
        return
      }

      transitionDocument.startViewTransition(() => {
        update()
      })
    },
    [],
  )

  const navigateBackToWorks = useCallback(() => {
    navigateWithPageTransition(() => {
      navigate(`${ROUTES.home}#case-study`)
    })
  }, [navigate, navigateWithPageTransition])

  const navigateToProject = useCallback(
    (to: string) => {
      navigateWithPageTransition(() => {
        navigate(to)
      })
    },
    [navigate, navigateWithPageTransition],
  )

  useEffect(() => {
    if (!project || !content) return
    window.scrollTo({ top: 0, behavior: 'auto' })
    closeButtonRef.current?.focus()
  }, [content, project])

  useEffect(() => {
    if (!project || !content) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        navigateBackToWorks()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [content, navigateBackToWorks, project])

  if (!slug || !project || !content) {
    return <Navigate to={ROUTES.home} replace />
  }

  const nextProjects = selectedProjects.filter((item) => item.id !== project.id)

  return (
    <section className="case-study-page" aria-labelledby="case-study-page-title">
      <div className="case-study-page__paper">
        <div className="case-study-page__topbar">
          <span className="case-study-page__status">Portfolio Case Study</span>
          <button
            ref={closeButtonRef}
            className="case-study-page__back"
            type="button"
            onClick={navigateBackToWorks}
          >
            Back to Works
          </button>
        </div>
        <CaseStudyTemplate
          project={project}
          content={content}
          titleId="case-study-page-title"
        />
        <section className="case-study-page__next" aria-labelledby="case-study-next-title">
          <div className="case-study-page__next-head">
            <p className="case-study-page__next-eyebrow">Continue reading</p>
            <h2 className="case-study-page__next-title" id="case-study-next-title">
              Next Projects
            </h2>
          </div>
          <ul className="case-study-page__next-grid" role="list" aria-label="다른 프로젝트 목록">
            {nextProjects.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={`case-study-page__next-card case-study-page__next-card--${item.visual.variant}`}
                  onClick={() => navigateToProject(item.to)}
                  aria-label={`${item.title} 케이스 스터디 열기`}
                >
                  <div
                    className={
                      item.heroStaggeredScreens
                        ? 'case-study-page__next-thumb case-study-page__next-thumb--stagger'
                        : 'case-study-page__next-thumb'
                    }
                    aria-label={
                      item.heroStaggeredScreens
                        ? `${item.title} 대표 화면 흐름`
                        : `${item.title} 프로젝트 분류`
                    }
                  >
                    {item.heroStaggeredScreens ? (
                      <HeroEmotionFlow
                        variant="next"
                        screens={item.heroStaggeredScreens}
                        loading="lazy"
                      />
                    ) : item.thumbnailSrc ? (
                      <img
                        src={item.thumbnailSrc}
                        alt=""
                        className="case-study-page__next-thumb-image"
                        loading="lazy"
                        decoding="async"
                        aria-hidden="true"
                      />
                    ) : (
                      <span>{item.visual.label}</span>
                    )}
                  </div>
                  <p className="case-study-page__next-meta">
                    <span>{item.visual.label}</span>
                    <span>{item.visual.meta}</span>
                  </p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  )
}
