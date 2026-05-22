import type { CaseStudyBody } from '../../types/caseStudy'

export type CaseStudyProseVariant =
  | 'default'
  | 'problem'
  | 'insight'
  | 'decision'
  | 'result'

export function renderCaseStudyBody(body: CaseStudyBody): readonly string[] {
  return typeof body === 'string' ? [body] : body
}

function paragraphClass(line: string, index: number): string {
  const trimmed = line.trim()

  if (index === 0) {
    return 'case-study__paragraph case-study__paragraph--lead'
  }

  if (trimmed.startsWith('→') || trimmed.startsWith('그래서')) {
    return 'case-study__paragraph case-study__paragraph--decision'
  }

  return 'case-study__paragraph case-study__paragraph--body'
}

export function CaseStudyProse({
  body,
  variant = 'default',
}: {
  body: CaseStudyBody
  variant?: CaseStudyProseVariant
}) {
  const lines = renderCaseStudyBody(body)

  return (
    <div className={`case-study__prose case-study__prose--${variant}`}>
      {lines.map((line, index) => (
        <p key={`${index}-${line.slice(0, 32)}`} className={paragraphClass(line, index)}>
          {line}
        </p>
      ))}
    </div>
  )
}
