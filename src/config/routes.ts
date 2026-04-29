/** App route paths and primary navigation. */

export const ROUTES = {
  home: '/',
  caseStudy: '/case-study',
  /** TONE — emotion-based music UX */
  caseStudyTone: '/case-study/tone',
  archive: '/archive',
} as const

export type NavItem = {
  path: (typeof ROUTES)[keyof typeof ROUTES]
  label: string
}

export const mainNav: readonly NavItem[] = [
  { path: ROUTES.home, label: 'Home' },
  { path: ROUTES.caseStudy, label: 'Case study' },
  { path: ROUTES.archive, label: 'Archive' },
] as const
