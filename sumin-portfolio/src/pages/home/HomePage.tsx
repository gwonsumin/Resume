import { Link } from 'react-router-dom'
import { ProjectCard } from '../../components/project-card/ProjectCard'
import { Section } from '../../components/section/Section'
import { ROUTES } from '../../config/routes'
import { home } from '../../data/home'
import { selectedProjects } from '../../data/projects'
import './HomePage.css'

/**
 * Home: Hero → About → Selected Projects → Archive preview → Contact.
 * Site footer: global `<Footer />` in `RootLayout`.
 */
export function HomePage() {
  return (
    <div className="home">
      <Section id="hero" title="Hero">
        <p className="section-lede">{home.hero}</p>
      </Section>

      <Section id="about" title="About">
        <p className="section-lede">{home.about}</p>
      </Section>

      <Section id="selected-projects" title="Selected Projects">
        <ul className="project-grid" role="list">
          {selectedProjects.map(({ id, ...card }) => (
            <li key={id} className="project-grid__item">
              <ProjectCard {...card} />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="archive-preview" title="Archive Preview">
        <p className="section-lede">{home.archivePreview}</p>
        <p className="section-lede home__link-row">
          <Link to={ROUTES.archive} className="home__text-link">
            View archive
          </Link>
        </p>
      </Section>

      <Section id="contact" title="Contact">
        <p className="section-lede">{home.contact}</p>
      </Section>
    </div>
  )
}
