import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoDefault from "../../assets/logo/logo-default.svg";
import { ROUTES } from "../../config/routes";
import "./Header.scss";

type HeaderProps = {
  siteTitle: string;
};

const SECTION_NAV = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "case-study", label: "Case Study" },
  { id: "archive", label: "Archive" },
  { id: "contact", label: "Contact" },
] as const;

export function Header({ siteTitle }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const headerRef = useRef<HTMLElement | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  const scrollToSection = (sectionId: string, smooth: boolean) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    const headerHeight = headerRef.current?.offsetHeight ?? 0;
    const top =
      target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

    window.scrollTo({
      top: Math.max(top, 0),
      behavior: smooth ? "smooth" : "auto",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerClassName = isScrolled
    ? "site-header site-header--scrolled"
    : "site-header";

  useEffect(() => {
    if (location.pathname !== ROUTES.home) return;

    const sections = SECTION_NAV.map(({ id }) =>
      document.getElementById(id),
    ).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    let frameId = 0;

    const updateActiveSection = () => {
      const headerHeight = headerRef.current?.offsetHeight ?? 0;
      const scrollPoint = window.scrollY + headerHeight + 80;
      const pageBottom = window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;

      if (pageBottom) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }

      const currentSection = sections.reduce((current, section) => {
        return section.offsetTop <= scrollPoint ? section : current;
      }, sections[0]);

      setActiveSection(currentSection.id);
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
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== ROUTES.home || !location.hash) return;
    const sectionId = location.hash.replace("#", "");

    window.requestAnimationFrame(() => {
      scrollToSection(sectionId, true);
      setActiveSection(sectionId);
    });
  }, [location.hash, location.pathname]);

  const onNavClick = (sectionId: string) => (event: MouseEvent) => {
    event.preventDefault();

    if (location.pathname !== ROUTES.home) {
      navigate(`${ROUTES.home}#${sectionId}`);
      return;
    }

    scrollToSection(sectionId, true);
    setActiveSection(sectionId);
  };

  return (
    <header className={headerClassName} ref={headerRef}>
      <div className="site-header__inner">
        <div className="site-header__brand">
          <Link to={ROUTES.home} className="site-header__title-link">
            <img
              src={logoDefault}
              alt={`${siteTitle || "SUMIN"} home`}
              className="site-header__logo"
            />
          </Link>
        </div>

        <nav className="site-nav" aria-label="Primary">
          <ul className="site-nav__list" role="list">
            {SECTION_NAV.map((item) => (
              <li key={item.id} className="site-nav__item">
                <a
                  href={`${ROUTES.home}#${item.id}`}
                  className={
                  (location.pathname.startsWith("/case-study/") &&
                    item.id === "case-study") ||
                  activeSection === item.id
                      ? "site-nav__link site-nav__link--active"
                      : "site-nav__link"
                  }
                  onClick={onNavClick(item.id)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="site-status">
          Available
          <span className="site-status__dot" aria-hidden="true" />
        </p>
      </div>
    </header>
  );
}
