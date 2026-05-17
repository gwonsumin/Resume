import type { CaseStudyBody } from '../../types/caseStudy'

export function renderCaseStudyBody(body: CaseStudyBody): readonly string[] {
  return typeof body === 'string' ? [body] : body
}

export function CaseStudyProse({ body }: { body: CaseStudyBody }) {
  return (
    <div className="case-study__prose">
      {renderCaseStudyBody(body).map((line) => (
        <p key={line} className="case-study__paragraph">
          {line}
        </p>
      ))}
    </div>
  )
}
