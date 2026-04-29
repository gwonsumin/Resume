import { Link, Navigate, useParams } from 'react-router-dom'
import { CaseStudyTemplate } from '../../components/case-study/CaseStudyTemplate'
import { Section } from '../../components/section/Section'
import { ROUTES } from '../../config/routes'
import { getCaseStudyContent } from '../../data/caseStudyContent'
import { getSelectedProjectBySlug, selectedProjects } from '../../data/projects'
import './CaseStudyPage.scss'

export function CaseStudyPage() {
  const { slug } = useParams()

  if (!slug) {
    return (
      <Section id="case-studies" title="Case studies">
        <p className="section-lede">
          Problem-led write-ups for selected work. Choose a project below.
        </p>
        <ul className="case-study-index" role="list">
          {selectedProjects.map((p) => (
            <li key={p.id} className="case-study-index__item">
              <Link to={p.to} className="case-study-index__link">
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    )
  }

  const project = getSelectedProjectBySlug(slug)
  const content = getCaseStudyContent(slug)
  if (!project || !content) {
    return <Navigate to={ROUTES.caseStudy} replace />
  }

  return <CaseStudyTemplate project={project} content={content} />
}
