import type { ProjectCardData } from '../../types/project'
import './ProjectCard.scss'

type ProjectCardProps = ProjectCardData

export function ProjectCard({ title, description, tags }: ProjectCardProps) {
  return (
    <article className="project-card">
      <h3 className="project-card__title">{title}</h3>
      <p className="project-card__description">{description}</p>
      {tags.length > 0 ? (
        <ul className="project-card__tags" role="list" aria-label="Role and tags">
          {tags.map((tag) => (
            <li key={tag} className="project-card__tag">
              {tag}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  )
}
