import { useEffect, useMemo, useState } from "react";
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

type ArchiveItem = {
  id: "things-i-liked" | "seasonal-notes" | "screen-mood" | "emotional-objects";
  type: "exhibition" | "drawing" | "wallpaper" | "objects";
  title: string;
  label: string;
  description: string;
  noteType: string;
  year: string;
  keywords: string[];
  objectNotes: string[];
  frames: Array<{
    id: string;
    name: string;
    caption: string;
    tone: "coral" | "mint" | "ink" | "paper";
  }>;
};

const archiveItems: ArchiveItem[] = [
  {
    id: "things-i-liked",
    type: "exhibition",
    title: "Things I Liked",
    label: "ARCHIVE NOTE",
    description: "전시에서 발견한 재료감과 동선의 리듬을 UX 언어로 옮기는 기록 보드",
    noteType: "Exhibition Log",
    year: "2026",
    keywords: ["material", "route", "attention"],
    objectNotes: ["포스터 타이포 대비", "동선 중 멈춤 지점", "소품-텍스트 정보 밀도"],
    frames: [
      { id: "liked-coral", name: "Coral Poster", caption: "입구 포스터 조합", tone: "coral" },
      { id: "liked-mint", name: "Mint Poster", caption: "안내 면과 메모 레이어", tone: "mint" },
      { id: "liked-space", name: "Exhibition Space", caption: "공간 흐름 기록", tone: "ink" },
      { id: "liked-goods", name: "Postcard Goods", caption: "굿즈와 캡션 배열", tone: "paper" },
    ],
  },
  {
    id: "seasonal-notes",
    type: "drawing",
    title: "Seasonal Notes",
    label: "SEASON MEMO",
    description: "계절에 따라 달라지는 감정의 밀도를 손선과 종이 레이어로 저장한 상태 기록",
    noteType: "State Drawing",
    year: "2026",
    keywords: ["season", "line", "memory"],
    objectNotes: ["계절별 선의 압력 변화", "여백과 문장 길이", "기분 전환 타이밍"],
    frames: [
      { id: "season-spring", name: "Spring Draft", caption: "짧고 밝은 선", tone: "paper" },
      { id: "season-summer", name: "Summer Note", caption: "온도감 있는 메모", tone: "coral" },
      { id: "season-autumn", name: "Autumn Layer", caption: "겹쳐진 종이 질감", tone: "ink" },
      { id: "season-winter", name: "Winter Sketch", caption: "조용한 점 메모", tone: "mint" },
    ],
  },
  {
    id: "screen-mood",
    type: "wallpaper",
    title: "Screen Mood",
    label: "SCREEN ARCHIVE",
    description: "잠금화면처럼 조용히 바뀌는 배경 톤을 수집해 인터페이스 온도를 맞추는 아카이브",
    noteType: "Wallpaper Study",
    year: "2026",
    keywords: ["wallpaper", "surface", "tone"],
    objectNotes: ["텍스트 대비 안정 구간", "배경 전환 속도", "장시간 노출 피로도"],
    frames: [
      { id: "screen-dawn", name: "Dawn Surface", caption: "아침 톤 테스트", tone: "paper" },
      { id: "screen-noon", name: "Noon Surface", caption: "중간 채도 영역", tone: "mint" },
      { id: "screen-evening", name: "Evening Surface", caption: "저녁 대비 실험", tone: "ink" },
      { id: "screen-night", name: "Night Surface", caption: "야간 컬러 밸런스", tone: "coral" },
    ],
  },
  {
    id: "emotional-objects",
    type: "objects",
    title: "Emotional Objects",
    label: "OBJECT MEMO",
    description: "감정 상태를 tomato, cursor, can 오브젝트 관계로 번역하는 visual language study",
    noteType: "Visual Language",
    year: "2026",
    keywords: ["object", "state", "system"],
    objectNotes: ["tomato fill 인디케이터", "cursor 이동 방향성", "shape family naming"],
    frames: [
      { id: "obj-tomato", name: "Tomato Object", caption: "상태 토큰 오브젝트", tone: "coral" },
      { id: "obj-cursor", name: "Cursor Marker", caption: "포커스 이동 메모", tone: "ink" },
      { id: "obj-can", name: "Can Object", caption: "브랜드 실루엣 연구", tone: "mint" },
      { id: "obj-shape", name: "Shape Studies", caption: "감정-형태 매핑", tone: "paper" },
    ],
  },
];

const ARCHIVE_ROTATE_MS = 4200;

const ARCHIVE_CARD_OFFSET: Record<ArchiveItem["id"], number> = {
  "things-i-liked": 0,
  "seasonal-notes": 1,
  "screen-mood": 2,
  "emotional-objects": 3,
};

function ArchiveScene({
  type,
  title,
  frames,
  activeIndex,
}: Pick<ArchiveItem, "type" | "title" | "frames"> & { activeIndex: number }) {
  if (type === "objects") {
    return (
      <div className="archive-scene archive-scene--objects" aria-label={`${title} archive scene`}>
        {frames.map((frame, index) => (
          <div
            key={frame.id}
            className={`archive-frame archive-frame--${frame.tone}${index === activeIndex ? " is-active" : ""}`}
          >
            <span className="archive-frame__name">{frame.name}</span>
            <span className="archive-frame__caption">{frame.caption}</span>
          </div>
        ))}
        <span className="archive-object archive-object--tomato">tomato</span>
        <span className="archive-object archive-object--cursor">cursor</span>
        <span className="archive-object archive-object--note">can</span>
        <span className="archive-object archive-object--seed">shape</span>
        <span className="archive-object-line archive-object-line--1" />
        <span className="archive-object-line archive-object-line--2" />
      </div>
    );
  }

  if (type === "wallpaper") {
    return (
      <div className="archive-scene archive-scene--wallpaper" aria-label={`${title} archive scene`}>
        {frames.map((frame, index) => (
          <div
            key={frame.id}
            className={`archive-frame archive-frame--${frame.tone}${index === activeIndex ? " is-active" : ""}`}
          >
            <span className="archive-frame__name">{frame.name}</span>
            <span className="archive-frame__caption">{frame.caption}</span>
          </div>
        ))}
        <span className="archive-wallpaper archive-wallpaper--1">quiet</span>
        <span className="archive-wallpaper archive-wallpaper--2">surface</span>
        <span className="archive-wallpaper archive-wallpaper--3">tone</span>
      </div>
    );
  }

  if (type === "drawing") {
    return (
      <div className="archive-scene archive-scene--drawing" aria-label={`${title} archive scene`}>
        {frames.map((frame, index) => (
          <div
            key={frame.id}
            className={`archive-frame archive-frame--${frame.tone}${index === activeIndex ? " is-active" : ""}`}
          >
            <span className="archive-frame__name">{frame.name}</span>
            <span className="archive-frame__caption">{frame.caption}</span>
          </div>
        ))}
        <span className="archive-paper archive-paper--back" />
        <span className="archive-paper archive-paper--mid" />
        <span className="archive-paper archive-paper--front" />
        <span className="archive-mini-block archive-mini-block--1" />
        <span className="archive-mini-block archive-mini-block--2" />
        <span className="archive-mini-block archive-mini-block--3" />
      </div>
    );
  }

  return (
    <div className="archive-scene archive-scene--exhibition" aria-label={`${title} archive scene`}>
      {frames.map((frame, index) => (
        <div
          key={frame.id}
          className={`archive-frame archive-frame--${frame.tone}${index === activeIndex ? " is-active" : ""}`}
        >
          <span className="archive-frame__name">{frame.name}</span>
          <span className="archive-frame__caption">{frame.caption}</span>
        </div>
      ))}
      <span className="archive-sheet archive-sheet--main">route memo</span>
      <span className="archive-sheet archive-sheet--sub">material</span>
      <span className="archive-sheet archive-sheet--sub">attention</span>
      <span className="archive-preview archive-preview--a" />
      <span className="archive-preview archive-preview--b" />
    </div>
  );
}

function ArchiveCard({
  item,
  activeFrameIndex,
  onOpen,
}: {
  item: ArchiveItem;
  activeFrameIndex: number;
  onOpen: (id: ArchiveItem["id"]) => void;
}) {
  return (
    <article className={`archive-card archive-card--${item.type}`}>
      <button type="button" className="archive-card__button" onClick={() => onOpen(item.id)}>
        <ArchiveScene
          type={item.type}
          title={item.title}
          frames={item.frames}
          activeIndex={activeFrameIndex}
        />
        <div className="archive-card__content">
          <div className="archive-card__topline">
            <span>{item.label}</span>
            <span>{item.year}</span>
          </div>
          <h3 className="archive-card__title">{item.title}</h3>
          <p className="archive-card__description">{item.description}</p>
          <p className="archive-card__type">{item.noteType}</p>
        </div>
      </button>
    </article>
  );
}

function ArchivePanel({
  item,
  activeFrameIndex,
  onClose,
}: {
  item: ArchiveItem;
  activeFrameIndex: number;
  onClose: () => void;
}) {
  const currentFrame = item.frames[activeFrameIndex];

  return (
    <div className="archive-panel" role="dialog" aria-modal="true" aria-label={`${item.title} archive viewer`}>
      <button type="button" className="archive-panel__overlay" aria-label="Close archive viewer" onClick={onClose} />
      <div className="archive-panel__surface">
        <div className="archive-panel__left">
          <ArchiveScene type={item.type} title={item.title} frames={item.frames} activeIndex={activeFrameIndex} />
          <div className="archive-panel__flow">
            {item.frames.map((frame) => (
              <span key={frame.id}>{frame.name}</span>
            ))}
          </div>
        </div>
        <aside className="archive-panel__right">
          <p className="archive-panel__label">{item.label}</p>
          <h3 className="archive-panel__title">{item.title}</h3>
          <p className="archive-panel__description">{item.description}</p>
          <dl className="archive-panel__meta">
            <div>
              <dt>Year</dt>
              <dd>{item.year}</dd>
            </div>
            <div>
              <dt>Type</dt>
              <dd>{item.noteType}</dd>
            </div>
            <div>
              <dt>Current</dt>
              <dd>{currentFrame.name}</dd>
            </div>
          </dl>
          <div className="archive-panel__keywords">
            {item.keywords.map((keyword) => (
              <span key={keyword}>{keyword}</span>
            ))}
          </div>
          <ul className="archive-panel__notes">
            {item.objectNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
          <p className="archive-panel__caption">{currentFrame.caption}</p>
          <button type="button" className="archive-panel__close" onClick={onClose}>
            Close viewer
          </button>
        </aside>
      </div>
    </div>
  );
}

/**
 * Home: Hero → About → Skills → Case Study → Archive → Contact.
 * Site footer: global `<Footer />` in `RootLayout`.
 */
export function HomePage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");
  const [archiveTick, setArchiveTick] = useState(0);
  const [activeArchiveId, setActiveArchiveId] = useState<ArchiveItem["id"] | null>(null);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setArchiveTick((prev) => prev + 1);
    }, ARCHIVE_ROTATE_MS);
    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!activeArchiveId) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveArchiveId(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeArchiveId]);

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

      <Section
        id="about"
        label="ABOUT"
        title={
          <>
            권수민<span aria-hidden="true">/</span>Sumin Kweon
          </>
        }
        subtitle="사용자의 상태를 설계하는 디자이너"
      >
        <About />
      </Section>

      <Section
        id="skills"
        label="SKILLS"
        title="디자인과 구현을 연결하는 도구들"
        subtitle="기획부터 디자인, 구현까지 흐름을 이어가기 위해 사용하는 툴과 기술입니다."
      >
        <Skills />
      </Section>

      <Section
        id="case-study"
        label="CASE STUDY"
        title="선택 가능한 경험으로 구조화한 프로젝트"
        subtitle="문제를 정의하고, 사용자의 흐름을 설계하며, 실제 인터페이스로 연결한 작업들입니다."
      >
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

      <Section
        id="archive"
        label="ARCHIVE"
        title="ARCHIVE"
        subtitle="작은 관찰과 기록이 쌓여 경험 설계로 이어집니다."
      >
        <div className="archive-grid" role="list">
          {archiveItems.map((item) => (
            <div key={item.id} className="archive-grid__item" role="listitem">
              <ArchiveCard
                item={item}
                activeFrameIndex={(archiveTick + ARCHIVE_CARD_OFFSET[item.id]) % item.frames.length}
                onOpen={setActiveArchiveId}
              />
            </div>
          ))}
        </div>
      </Section>

      {activeArchiveId ? (
        <ArchivePanel
          item={archiveItems.find((item) => item.id === activeArchiveId) ?? archiveItems[0]}
          activeFrameIndex={
            (archiveTick + ARCHIVE_CARD_OFFSET[activeArchiveId]) %
            (archiveItems.find((item) => item.id === activeArchiveId)?.frames.length ?? 1)
          }
          onClose={() => setActiveArchiveId(null)}
        />
      ) : null}

      <Section
        id="contact"
        label="CONTACT"
        title="함께 만들 흐름을 이야기해요"
        subtitle="사용자 경험을 더 명확하게 만드는 프로젝트와 협업에 열려 있습니다."
      >
        <p className="section-lede">{home.contact}</p>
      </Section>
    </div>
  );
}
