import { Navigate } from 'react-router-dom'
import { CaseStudyTemplate } from '../../components/case-study/CaseStudyTemplate'
import { ROUTES } from '../../config/routes'
import { getCaseStudyContent } from '../../data/caseStudyContent'
import { getSelectedProjectBySlug } from '../../data/projects'

const TONE_SLUG = 'tone' as const

/**
 * Dedicated case study page for TONE.
 * Data: `data/caseStudyContent.ts` + `data/projects.ts` (summary on the card).
 */
export function ToneCaseStudyPage() {
  const project = getSelectedProjectBySlug(TONE_SLUG)
  const content = getCaseStudyContent(TONE_SLUG)
  if (!project || !content) {
    return <Navigate to={ROUTES.caseStudy} replace />
  }
  return <CaseStudyTemplate project={project} content={content} />
}
