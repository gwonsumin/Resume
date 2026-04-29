export type ProjectPreview = {
  id: string
  title: string
  description: string
  /** Role and/or short labels, shown as tags. */
  tags: readonly string[]
  /** Internal route, e.g. `/case-study` or a future `/work/:slug` */
  to: string
  /** Label for the card CTA (default in `ProjectCard`). */
  linkLabel?: string
}

export type ProjectCardData = Omit<ProjectPreview, 'id'>
