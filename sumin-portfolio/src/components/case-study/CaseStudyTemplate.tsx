import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../config/routes'
import type { ProjectPreview } from '../../types/project'
import type { CaseStudyBody, CaseStudyContent } from '../../types/caseStudy'
import './CaseStudyTemplate.css'

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
  { key: 'intro', domId: 'intro', title: 'Intro' },
  { key: 'problem', domId: 'problem', title: 'Problem' },
  { key: 'insight', domId: 'insight', title: 'Insight' },
  { key: 'iaUserFlow', domId: 'ia-user-flow', title: 'IA / User Flow' },
  { key: 'solution', domId: 'solution', title: 'Solution' },
  { key: 'uiDesign', domId: 'ui-design', title: 'UI Design' },
  { key: 'result', domId: 'result', title: 'Result' },
  { key: 'learnings', domId: 'learnings', title: 'Learnings' },
]

type CaseStudyTemplateProps = {
  project: ProjectPreview
  content: CaseStudyContent
}

function Prose({ text }: { text: CaseStudyBody }) {
  const parts: string[] =
    typeof text === 'string'
      ? text
          .split(/\n\n+/)
          .map((s) => s.trim())
          .filter(Boolean)
      : [...text]
  return (
    <div className="case-study__prose">
      {parts.map((paragraph: string, i: number) => (
        <p key={i} className="case-study__p">
          {paragraph}
        </p>
      ))}
    </div>
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
      {children}
    </section>
  )
}

export function CaseStudyTemplate({ project, content }: CaseStudyTemplateProps) {
  const baseId = project.id

  return (
    <article className="case-study" lang="en">
      <header className="case-study__header">
        <p className="case-study__back">
          <Link to={ROUTES.caseStudy} className="case-study__back-link">
            ← All case studies
          </Link>
        </p>
        <h1 className="case-study__title">{project.title}</h1>
        <p className="case-study__summary">{project.description}</p>
      </header>

      <div className="case-study__body">
        {SECTIONS.map(({ key, domId, title }) => (
          <CaseStudyBlock key={key} id={`${baseId}-${domId}`} title={title}>
            <Prose text={content[key]} />
          </CaseStudyBlock>
        ))}

        <section
          className="case-study__block"
          id={`${baseId}-external-links`}
          aria-labelledby={`${baseId}-external-heading`}
        >
          <h2
            className="case-study__block-title"
            id={`${baseId}-external-heading`}
          >
            External links
          </h2>
          {content.externalLinks.length > 0 ? (
            <ul className="case-study__link-list" role="list">
              {content.externalLinks.map((item) => (
                <li key={item.href} className="case-study__link-item">
                  <a
                    className="case-study__ext-link"
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="case-study__empty">
              Add links in your case study data when ready.
            </p>
          )}
        </section>
      </div>
    </article>
  )
}
