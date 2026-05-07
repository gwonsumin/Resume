export type ProjectPreview = {
  id: string
  title: string
  description: string
  /** Optional secondary card copy (max two lines). */
  subDescription?: string
  /** Technology/tool categories used for project filtering. */
  techStack: readonly string[]
  /** Role and/or short labels, shown as tags. */
  tags: readonly string[]
  /** Optional project period shown in card meta. */
  period?: string
  /** Optional role summary shown in card meta. */
  role?: string
  /** Memo-card treatment for the project showcase card. */
  visual: {
    label: string
    meta: string
    variant: 'coral' | 'teal' | 'ink'
  }
  /** Internal route, e.g. `/case-study` or a future `/work/:slug` */
  to: string
  /** Optional external repository link. */
  githubUrl?: string
  /** Optional prototype link (e.g. Figma prototype). */
  prototypeUrl?: string
  /** Optional planning/spec document link. */
  planningUrl?: string
  /** Optional deployed site link. */
  deployUrl?: string
  /** Label for the card CTA (default in `ProjectCard`). */
  linkLabel?: string
}

export type ProjectCardData = Omit<ProjectPreview, 'id'>
