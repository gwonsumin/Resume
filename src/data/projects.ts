import { ROUTES } from '../config/routes'
import type { ProjectPreview } from '../types/project'

export const selectedProjects: readonly ProjectPreview[] = [
  {
    id: 'goreon',
    title: 'Project placeholder',
    description: 'Project summary placeholder.',
    tags: ['Tag placeholder'],
    to: '/case-study/goreon',
  },
  {
    id: 'tone',
    title: 'Project placeholder',
    description: 'Project summary placeholder.',
    tags: ['Tag placeholder'],
    to: ROUTES.caseStudyTone,
  },
  {
    id: 'sangsangmadang',
    title: 'Project placeholder',
    description: 'Project summary placeholder.',
    tags: ['Tag placeholder'],
    to: '/case-study/sangsangmadang',
  },
  {
    id: 'personal',
    title: 'Project placeholder',
    description: 'Project summary placeholder.',
    tags: ['Tag placeholder'],
    to: '/case-study/personal',
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
