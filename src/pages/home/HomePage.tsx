import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { About } from "../../components/about/About";
import { Hero } from "../../components/hero/Hero";
import { ProjectCard } from "../../components/project-card/ProjectCard";
import { Section } from "../../components/section/Section";
import { Skills } from "../../components/skills/Skills";
import { home } from "../../data/home";
import { selectedProjects } from "../../data/projects";
import "./HomePage.scss";

const PROJECT_FILTERS = [
  "All",
  "React",
  "Vue",
  "PHP",
  "HTML + CSS",
  "Next.js + MongoDB",
  "Figma",
  "Photoshop",
  "Illustrator",
] as const;

type ProjectFilter = (typeof PROJECT_FILTERS)[number];
type ProjectGridItem =
  | {
      type: "project";
      id: string;
      project: (typeof selectedProjects)[number];
    }
  | {
      type: "placeholder";
      id: string;
      title: string;
      description: string;
    };

/**
 * Home: Hero → About → Skills → Case Study → Archive → Contact.
 * Site footer: global `<Footer />` in `RootLayout`.
 */
export function HomePage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return selectedProjects;
    }

    return selectedProjects.filter((project) => project.techStack.includes(activeFilter));
  }, [activeFilter]);

  const projectGridItems = useMemo<ProjectGridItem[]>(() => {
    const mapped = filteredProjects.map((project) => ({
      type: "project" as const,
      id: project.id,
      project,
    }));

    if (mapped.length === 0) {
      return [
        {
          type: "placeholder",
          id: `placeholder-empty-${activeFilter}`,
          title: "UPDATING",
          description: `${activeFilter} 카테고리 프로젝트는 준비 중입니다.`,
        },
      ];
    }

    if (mapped.length === 1) {
      return [
        ...mapped,
        {
          type: "placeholder",
          id: `placeholder-single-${activeFilter}`,
          title: "NEXT CASE",
          description: "다음 프로젝트를 곧 추가할 예정입니다.",
        },
      ];
    }

    return mapped;
  }, [activeFilter, filteredProjects]);

  const navigateWithPageTransition = (to: string) => {
    const transitionDocument = document as Document & {
      startViewTransition?: (update: () => void) => void;
    };

    if (!transitionDocument.startViewTransition) {
      navigate(to);
      return;
    }

    transitionDocument.startViewTransition(() => {
      navigate(to);
    });
  };

  const openCaseStudyPage = (projectId: string) => {
    const project = selectedProjects.find((item) => item.id === projectId);
    if (!project) return;
    navigateWithPageTransition(project.to);
  };

  return (
    <div className="home">
      <Section id="hero" title="Hero" className="home__hero-section">
        <Hero />
      </Section>

      <Section id="about" title="About">
        <About />
      </Section>

      <Section id="skills" title="Skills">
        <Skills />
      </Section>

      <Section id="case-study" title="Projects">
        <div className="project-filters" aria-label="Project categories">
          {PROJECT_FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                className={`project-filters__pill${isActive ? " project-filters__pill--active" : ""}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            );
          })}
        </div>
        <ul className="project-grid" role="list">
          {projectGridItems.map((item) => (
            <li key={item.id} className="project-grid__item">
              {item.type === "project" ? (
                <ProjectCard
                  {...item.project}
                  onOpenCaseStudy={() => openCaseStudyPage(item.project.id)}
                />
              ) : (
                <article className="project-grid__coming" aria-label="프로젝트 준비중 안내">
                  <p className="project-grid__coming-label">Case log</p>
                  <h3 className="project-grid__coming-title">{item.title}</h3>
                  <p className="project-grid__coming-description">{item.description}</p>
                </article>
              )}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="archive" title="Archive">
        <p className="section-lede">{home.archive}</p>
      </Section>

      <Section id="contact" title="Contact">
        <p className="section-lede">{home.contact}</p>
      </Section>
    </div>
  );
}
