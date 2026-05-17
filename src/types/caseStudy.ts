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
  /** Image block treatment inside case study body (tone palette / player / archive). */
  presentation?: 'default' | 'palette' | 'player' | 'calendar'
}

/** Optional real screenshots for case study blocks. */
export type CaseStudyMedia = {
  hero?: {
    desktopSrc?: string
    mobileSrc?: string
    desktopAlt?: string
    mobileAlt?: string
    /** Three mobile screenshots in a staggered “emotion sequence” row (center dominant). */
    staggeredScreens?: {
      left: CaseStudySectionFigure
      center: CaseStudySectionFigure
      right: CaseStudySectionFigure
    }
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

export type CaseStudyServiceLink = {
  label: string
  href: string
  description: string
  /** When true, uses featured border/background treatment. */
  featured?: boolean
  /** Optional secondary line (e.g. Korean screen title). */
  title?: string
}

export type CaseStudyServiceExperience = {
  title: string
  description: CaseStudyBody
  serviceLinks: readonly CaseStudyServiceLink[]
  verificationPoints: readonly string[]
  /** Shown above demo credentials when credentials exist. */
  testAccountLead?: string
  /** Optional callout (e.g. mobile viewport recommendation). */
  mobileNotice?: string
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
  /** Single mobile thumbnail in the same `proto-entry`/`protoThumb` layout as GOREON (right column). */
  prototypeMobileThumbSlot?: boolean
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
  /** Deployed app: grouped deep links, verification notes, optional test account (from project). */
  serviceExperience?: CaseStudyServiceExperience
  prototype?: CaseStudyPrototype
  media?: CaseStudyMedia
  /** Optional per-section headings (defaults to CaseStudyTemplate copy). */
  sectionTitles?: Partial<Record<CaseStudySectionKey, string>>
}
