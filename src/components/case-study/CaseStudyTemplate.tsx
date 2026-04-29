import type { ReactNode } from 'react'
import type { ProjectPreview } from '../../types/project'
import type { CaseStudyContent } from '../../types/caseStudy'
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

function Placeholder({ className }: { className: string }) {
  return <span className={className} aria-hidden="true" />
}

function Prose() {
  return (
    <div className="case-study__prose">
      <Placeholder className="case-study__placeholder case-study__placeholder--line" />
      <Placeholder className="case-study__placeholder case-study__placeholder--line" />
      <Placeholder className="case-study__placeholder case-study__placeholder--line case-study__placeholder--short" />
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
  void content

  return (
    <article className="case-study" lang="en">
      <header className="case-study__header">
        <p className="case-study__back">
          <Placeholder className="case-study__placeholder case-study__placeholder--back" />
        </p>
        <h1 className="case-study__title">
          <Placeholder className="case-study__placeholder case-study__placeholder--title" />
        </h1>
        <p className="case-study__summary">
          <Placeholder className="case-study__placeholder case-study__placeholder--line" />
          <Placeholder className="case-study__placeholder case-study__placeholder--line case-study__placeholder--short" />
        </p>
      </header>

      <div className="case-study__body">
        <CaseStudyBlock id={`${baseId}-live-preview`} title="Live Preview">
          <Prose />
          <p className="case-study__live-action">
            <Placeholder className="case-study__placeholder case-study__placeholder--button" />
          </p>
        </CaseStudyBlock>

        {SECTIONS.map(({ key, domId, title }) => (
          <div key={key}>
            <CaseStudyBlock id={`${baseId}-${domId}`} title={title}>
              <Prose />
            </CaseStudyBlock>
            {key === 'iaUserFlow' ? (
              <CaseStudyBlock id={`${baseId}-prototype`} title="Prototype">
                <Prose />
                <p className="case-study__live-action">
                  <Placeholder className="case-study__placeholder case-study__placeholder--button" />
                </p>
              </CaseStudyBlock>
            ) : null}
          </div>
        ))}
      </div>
    </article>
  )
}
