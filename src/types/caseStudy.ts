/** Block of body copy: one string (split on blank lines) or explicit paragraphs. */
export type CaseStudyBody = string | readonly string[]

/** Section keys aligned with `CaseStudyTemplate` body blocks. */
export type CaseStudySectionKey =
  | 'intro'
  | 'problem'
  | 'insight'
  | 'iaUserFlow'
  | 'solution'
  | 'uiDesign'
  | 'result'
  | 'learnings'

export type CaseStudySectionFigure = {
  src: string
  alt?: string
}

/** Optional real screenshots for case study blocks. */
export type CaseStudyMedia = {
  hero?: {
    desktopSrc?: string
    mobileSrc?: string
    desktopAlt?: string
    mobileAlt?: string
  }
  prototype?: {
    desktopSrc?: string
    mobileSrc?: string
    desktopAlt?: string
    mobileAlt?: string
  }
  livePreview?: {
    src: string
    alt?: string
  }
  sectionFigures?: Partial<Record<CaseStudySectionKey, CaseStudySectionFigure>>
}

/** Optional block linking to a deployed build (shown when set). */
type CaseStudyLivePreview = {
  href: string
  description: string
  buttonLabel?: string
}

/** Figma (or other) prototype link — optional per case study. */
type CaseStudyPrototype = {
  href: string
  /** Defaults to a standard description when omitted. */
  description?: string
  buttonLabel?: string
  extraLinks?: readonly {
    href: string
    buttonLabel: string
  }[]
}

type CaseStudyRoleItem = {
  title: string
  detail: string
}

type CaseStudyContribution = {
  label: string
  percentage: number
}

type CaseStudyMyRole = {
  summary: CaseStudyBody
  roles: readonly CaseStudyRoleItem[]
  contributions: readonly CaseStudyContribution[]
}

/** Full case study narrative — one object per project slug. */
export type CaseStudyContent = {
  intro: CaseStudyBody
  myRole?: CaseStudyMyRole
  problem: CaseStudyBody
  insight: CaseStudyBody
  iaUserFlow: CaseStudyBody
  solution: CaseStudyBody
  uiDesign: CaseStudyBody
  result: CaseStudyBody
  learnings: CaseStudyBody
  livePreview?: CaseStudyLivePreview
  prototype?: CaseStudyPrototype
  media?: CaseStudyMedia
}
