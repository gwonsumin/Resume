import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FLOATING_CONTROLS_SCROLL_THRESHOLD_PX } from "../../constants/floatingUi";
import { ROUTES } from "../../config/routes";
import "./FloatingToc.scss";

const TOC_SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "case-study", label: "Case Study" },
  { id: "archive", label: "Archive" },
  { id: "contact", label: "Contact" },
] as const;

function getHeaderHeight() {
  const header = document.querySelector(".site-header");
  return header instanceof HTMLElement ? header.offsetHeight : 0;
}

export function FloatingToc() {
  const location = useLocation();
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);
  const activeSectionRef = useRef("hero");
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const isHome = location.pathname === ROUTES.home;

  const scrollToSection = useCallback(
    (sectionId: string) => {
      if (!isHome) {
        navigate(`${ROUTES.home}#${sectionId}`);
        setOpen(false);
        return;
      }

      const target = document.getElementById(sectionId);
      if (!target) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const top =
        target.getBoundingClientRect().top +
        window.scrollY -
        getHeaderHeight() -
        16;

      window.scrollTo({
        top: Math.max(top, 0),
        behavior: reduce ? "auto" : "smooth",
      });

      activeSectionRef.current = sectionId;
      setActiveSection(sectionId);
      setOpen(false);
    },
    [isHome, navigate],
  );

  useEffect(() => {
    if (!isHome) return;

    const onScroll = () => {
      setVisible(window.scrollY > FLOATING_CONTROLS_SCROLL_THRESHOLD_PX);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    if (!isHome) return;

    const sections = TOC_SECTIONS.map(({ id }) =>
      document.getElementById(id),
    ).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    let frameId = 0;

    const updateActiveSection = () => {
      const scrollPoint = window.scrollY + getHeaderHeight() + 80;
      const pageBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;

      const nextId = pageBottom
        ? sections[sections.length - 1]!.id
        : sections.reduce(
            (current, section) =>
              section.offsetTop <= scrollPoint ? section : current,
            sections[0]!,
          ).id;

      if (activeSectionRef.current !== nextId) {
        activeSectionRef.current = nextId;
        setActiveSection(nextId);
      }
    };

    const requestUpdate = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [isHome, location.pathname]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!isHome) {
    return null;
  }

  return (
    <div
      ref={rootRef}
      className={[
        "floating-toc",
        visible ? "floating-toc--visible" : "",
        open ? "floating-toc--open" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <nav
        id="floating-toc-panel"
        className="floating-toc__panel"
        aria-label="페이지 목차"
        aria-hidden={!open}
      >
        <ul className="floating-toc__list" role="list">
          {TOC_SECTIONS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id} className="floating-toc__item">
                <button
                  type="button"
                  className={
                    isActive
                      ? "floating-toc__link floating-toc__link--active"
                      : "floating-toc__link"
                  }
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <button
        type="button"
        className="floating-toc__toggle"
        aria-label={open ? "목차 닫기" : "목차 열기"}
        aria-expanded={open}
        aria-controls="floating-toc-panel"
        tabIndex={visible ? 0 : -1}
        onClick={() => setOpen((prev) => !prev)}
      >
        <svg
          className="floating-toc__icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M8 6h12M8 12h12M8 18h12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="4" cy="6" r="1" fill="currentColor" />
          <circle cx="4" cy="12" r="1" fill="currentColor" />
          <circle cx="4" cy="18" r="1" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
}
