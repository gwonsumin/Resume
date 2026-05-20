import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { About } from "../../components/about/About";
import { ArchiveBoard } from "../../components/archive/ArchiveBoard";
import { Hero } from "../../components/hero/Hero";
import { ProjectCard } from "../../components/project-card/ProjectCard";
import { Reveal } from "../../components/reveal/Reveal";
import { Section } from "../../components/section/Section";
import { Skills } from "../../components/skills/Skills";
import { selectedProjects } from "../../data/projects";
import "./HomePage.scss";

const PROJECT_FILTERS = [
  "All",
  "React + Vue",
  "PHP + MySQL",
  "HTML + CSS",
  "Next.js + MongoDB",
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
 * Home: Hero → About → Skills → Case Study → Archive.
 * Contact: global `<Footer id="contact" />` in `RootLayout`.
 */
export function HomePage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return selectedProjects;
    }

    if (activeFilter === "React + Vue") {
      return selectedProjects.filter(
        (project) => project.techStack.includes("React") || project.techStack.includes("Vue"),
      );
    }

    if (activeFilter === "PHP + MySQL") {
      return selectedProjects.filter(
        (project) => project.techStack.includes("PHP") && project.techStack.includes("MySQL"),
      );
    }

    if (activeFilter === "Next.js + MongoDB") {
      return selectedProjects.filter(
        (project) =>
          project.techStack.includes("MongoDB") &&
          (project.techStack.includes("Next.js") || project.techStack.includes("Node.js")),
      );
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

      <Section
        id="about"
        label="ABOUT · PROFILE"
        handNote="소개 기록"
        meta="ISSUE 01 · SEOUL · STATE NOTES"
        title={
          <>
            권수민<span aria-hidden="true">/</span>Sumin Kweon
          </>
        }
        subtitle="사용자의 상태를 설계하는 디자이너"
        revealHeader
      >
        <About />
      </Section>

      <Section
        id="skills"
        label="SKILLS · TOOL DRAWER"
        handNote="도구 서랍"
        title="디자인과 구현을 연결하는 도구들"
        meta="DESIGN · BUILD · WORKFLOW"
        subtitle="기획부터 디자인, 구현까지 흐름을 이어가기 위해 사용하는 툴과 기술입니다."
        revealHeader
      >
        <Skills />
      </Section>

      <Section
        id="case-study"
        label="CASE STUDY · CATALOG"
        handNote="케이스 카탈로그"
        meta="04 CASES · SELECTED WORK"
        title="선택 가능한 경험으로 구조화한 프로젝트"
        subtitle="문제를 정의하고, 사용자의 흐름을 설계하며, 실제 인터페이스로 연결한 작업들입니다."
        revealHeader
      >
        <Reveal delay={110} staggerIndex={0} staggerMs={100} durationMs={760}>
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
        </Reveal>
        <ul className="project-grid" role="list">
          {projectGridItems.map((item, index) => (
            <Reveal
              key={item.id}
              as="li"
              className="project-grid__item"
              delay={150}
              staggerIndex={index}
              staggerMs={105}
              durationMs={780}
            >
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
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section
        id="archive"
        label="ARCHIVE · PIECES"
        handNote="아카이브 조각"
        meta="23 PIECES · OBSERVATION LOG"
        title="ARCHIVE"
        subtitle="작은 관찰과 기록이 쌓여 경험 설계로 이어집니다."
        revealHeader
      >
        <ArchiveBoard />
      </Section>
    </div>
  );
}
