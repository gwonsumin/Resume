import type { ProjectPreview } from '../types/project'
import { ROUTES } from '../config/routes'

/** Portfolio projects (home + case study detail use the same list). */
export const selectedProjects: readonly ProjectPreview[] = [
  {
    id: 'goreon',
    title: 'GOREON',
    description:
      'Shoppers could not see why recommended products fit their needs—opaque AI and dense catalogs undermined trust and next steps.',
    tags: ['UX/UI', 'AI'],
    to: '/case-study/goreon',
    linkLabel: 'View case study',
  },
  {
    id: 'tone',
    title: 'TONE',
    description:
      'Users struggle to express emotions and find music that matches their mood. Designed an emotion-based UX that connects feelings with music through color and interaction.',
    tags: ['UX/UI', 'Emotion UX', 'Front-end'],
    to: ROUTES.caseStudyTone,
    linkLabel: 'View case study',
  },
  {
    id: 'sangsangmadang',
    title: 'Sangsangmadang redesign',
    description:
      'A fragmented information architecture made cultural programs hard to find; visitors could not go from interest to a confident action.',
    tags: ['UX/UI'],
    to: '/case-study/sangsangmadang',
    linkLabel: 'View case study',
  },
  {
    id: 'personal',
    title: 'Personal project',
    description:
      'An independent build to test research and interaction decisions end to end, including a small front-end layer you can try.',
    tags: ['UX/UI', 'Front-end'],
    to: '/case-study/personal',
    linkLabel: 'View case study',
  },
]

export function getSelectedProjectBySlug(
  slug: string | undefined,
): ProjectPreview | undefined {
  if (!slug) {
    return undefined
  }
  return selectedProjects.find((p) => p.id === slug)
}
