import type { CaseStudyContent } from '../types/caseStudy'

function p(...lines: string[]): readonly string[] {
  return lines
}

const placeholderIntro = (name: string) =>
  p(
    `This page documents the ${name} project using a shared case study structure. Replace each block with research, screens, and outcomes as you publish.`,
  )

const placeholderBlock = (label: string) =>
  p(
    `${label}: add research notes, diagrams, or metrics. This template keeps sections consistent across projects.`,
  )

function makeCaseStudy(
  name: string,
  overrides: Partial<CaseStudyContent>,
): CaseStudyContent {
  const base: CaseStudyContent = {
    intro: placeholderIntro(name),
    problem: placeholderBlock('Problem'),
    insight: placeholderBlock('Insight'),
    iaUserFlow: placeholderBlock('IA / User Flow'),
    solution: placeholderBlock('Solution'),
    uiDesign: placeholderBlock('UI design'),
    result: placeholderBlock('Result'),
    learnings: placeholderBlock('Learnings'),
    externalLinks: [],
  }
  return { ...base, ...overrides }
}

const caseStudies: Readonly<Record<string, CaseStudyContent>> = {
  goreon: makeCaseStudy('GOREON', {
    problem: p(
      'Shoppers could not see why recommendations matched their interests. The experience needed clearer mental models and safer paths to purchase.',
    ),
    externalLinks: [{ label: 'Example link', href: 'https://example.com' }],
  }),
  tone: makeCaseStudy('TONE', {
    intro: p(
      'Designed an emotion-based UX that connects feelings with music through color and interaction.',
    ),
    problem: p(
      'Users struggle to express emotions and find music that matches their mood.',
    ),
  }),
  sangsangmadang: makeCaseStudy('Sangsangmadang', {
    problem: p(
      'Content and program types were split across many entry points. The goal was a clearer map from curiosity to a booking or visit.',
    ),
  }),
  personal: makeCaseStudy('Personal project', {
    problem: p(
      'A self-directed scope to validate ideas quickly: from problem framing to a small, testable UI implementation.',
    ),
  }),
}

export function getCaseStudyContent(slug: string): CaseStudyContent | undefined {
  return caseStudies[slug]
}
