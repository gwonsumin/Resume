/** Block of body copy: one string (split on blank lines) or explicit paragraphs. */
export type CaseStudyBody = string | readonly string[]

export type CaseStudyExternalLink = {
  label: string
  href: string
}

/** Full case study narrative — one object per project slug. */
export type CaseStudyContent = {
  intro: CaseStudyBody
  problem: CaseStudyBody
  insight: CaseStudyBody
  iaUserFlow: CaseStudyBody
  solution: CaseStudyBody
  uiDesign: CaseStudyBody
  result: CaseStudyBody
  learnings: CaseStudyBody
  externalLinks: readonly CaseStudyExternalLink[]
}
