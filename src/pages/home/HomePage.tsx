import { Link } from 'react-router-dom'
import { Hero } from '../../components/hero/Hero'
import { ProjectCard } from '../../components/project-card/ProjectCard'
import { Section } from '../../components/section/Section'
import { ROUTES } from '../../config/routes'
import { home } from '../../data/home'
import { selectedProjects } from '../../data/projects'
import './HomePage.scss'

/**
 * Home: Hero → About → Projects → Skills → Archive → Contact.
 * Site footer: global `<Footer />` in `RootLayout`.
 */
export function HomePage() {
  return (
    <div className="home">
      <Section id="hero" title="Hero" className="home__hero-section">
        <Hero />
      </Section>

      <Section id="about" title="About">
        <p className="section-lede">{home.about}</p>
      </Section>

      <Section id="projects" title="Projects">
        <ul className="project-grid" role="list">
          {selectedProjects.map(({ id, ...card }) => (
            <li key={id} className="project-grid__item">
              <ProjectCard {...card} />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="skills" title="Skills">
        <ul className="skill-list" role="list">
          {home.skills.map((skill, index) => (
            <li key={`${skill}-${index}`} className="skill-list__item">
              {skill}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="archive" title="Archive">
        <p className="section-lede">{home.archive}</p>
        <p className="section-lede home__link-row">
          <Link to={ROUTES.archive} className="home__text-link">
            Archive link
          </Link>
        </p>
      </Section>

      <Section id="contact" title="Contact">
        <p className="section-lede">{home.contact}</p>
      </Section>
    </div>
  )
}
