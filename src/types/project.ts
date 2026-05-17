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
  /** Optional proposal PDF link. */
  proposalUrl?: string
  /** Optional deployed site link. */
  deployUrl?: string
  /**
   * When set with `deployUrl`, wide viewports open the deploy link in this sized browser window instead of default new tab.
   * Narrow viewports use normal `target="_blank"` behaviour.
   */
  deployWindow?: {
    width: number
    height: number
    name: string
  }
  /** Demo / preview login ID shown on the project card (optional). */
  demoTestId?: string
  /** Demo / preview password shown on the project card (optional). */
  demoTestPassword?: string
  /** Label for the card CTA (default in `ProjectCard`). */
  linkLabel?: string
  /** Optional card thumbnail (`public/` path including `import.meta.env.BASE_URL` prefix when needed). */
  thumbnailSrc?: string
  /**
   * Optional three-screen streak for cards / «Next» tiles (matches case study `hero-emotion-flow`).
   * When set, takes precedence over a single `thumbnailSrc` when both exist.
   */
  heroStaggeredScreens?: {
    left: { src: string; alt?: string }
    center: { src: string; alt?: string }
    right: { src: string; alt?: string }
  }
}

export type ProjectCardData = Omit<ProjectPreview, 'id'>
