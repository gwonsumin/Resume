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
  titleId?: string
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

export function CaseStudyTemplate({
  project,
  content,
  titleId,
}: CaseStudyTemplateProps) {
  const baseId = project.id

  return (
    <article className="case-study" lang="en">
      <header className="case-study__header">
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
        </ul>
      </header>

      <div className="case-study__body">
        {content.myRole ? (
          <CaseStudyBlock id={`${baseId}-my-role`} title="My Role">
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

        <CaseStudyBlock id={`${baseId}-live-preview`} title="Live Preview">
          <Prose
            body={
              content.livePreview?.description ??
              'Open the current build or project note when a public preview is available.'
            }
          />
          {content.livePreview ? (
            <p className="case-study__live-action">
              <a
                className="case-study__button"
                href={content.livePreview.href}
                target="_blank"
                rel="noreferrer noopener"
              >
                {content.livePreview.buttonLabel ?? 'Open live preview'}
              </a>
            </p>
          ) : null}
        </CaseStudyBlock>

        {SECTIONS.map(({ key, domId, title }) => (
          <div key={key}>
            <CaseStudyBlock id={`${baseId}-${domId}`} title={title}>
              <Prose body={content[key]} />
            </CaseStudyBlock>
            {key === 'iaUserFlow' ? (
              <CaseStudyBlock id={`${baseId}-prototype`} title="Prototype">
                <Prose
                  body={
                    content.prototype?.description ??
                    'Prototype links and interaction notes are collected here.'
                  }
                />
                {content.prototype ? (
                  <p className="case-study__live-action">
                    <a
                      className="case-study__button"
                      href={content.prototype.href}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {content.prototype.buttonLabel ?? 'Open prototype'}
                    </a>
                  </p>
                ) : null}
              </CaseStudyBlock>
            ) : null}
          </div>
        ))}
      </div>
    </article>
  )
}
