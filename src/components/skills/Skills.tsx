import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { CSSProperties } from "react";
import { skills, type Skill } from "./skillsData";
import "./Skills.scss";

type RowDirection = "left" | "right";
type ScrollDirection = "up" | "down";

const MOBILE_SKILL_TAP_QUERIES = [
  "(max-width: 767px)",
  "(hover: none) and (pointer: coarse)",
] as const;

function subscribeMobileSkillTap(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const mqs = MOBILE_SKILL_TAP_QUERIES.map((q) => window.matchMedia(q));
  mqs.forEach((mq) => mq.addEventListener("change", cb));
  return () => mqs.forEach((mq) => mq.removeEventListener("change", cb));
}

function getMobileSkillTapSnapshot() {
  if (typeof window === "undefined") return false;
  return MOBILE_SKILL_TAP_QUERIES.some((q) => window.matchMedia(q).matches);
}

type SkillPillProps = {
  skill: Skill;
  tapMode: boolean;
  isActive: boolean;
  onActivate: (id: string) => void;
};

type MarqueeRowProps = {
  direction: RowDirection;
  speed: number;
  speedScale: number;
  items: Skill[];
  scrollDirection: ScrollDirection;
  motionPaused: boolean;
  tapMode: boolean;
  activeSkillId: string | null;
  onActivateSkill: (id: string) => void;
};

const MARQUEE_ROWS = [
  { direction: "left", speed: 30, offset: 0 },
  { direction: "right", speed: 34, offset: 5 },
  { direction: "left", speed: 32, offset: 11 },
] as const;

function getShiftedSkills(offset: number) {
  return [...skills.slice(offset), ...skills.slice(0, offset)];
}

function SkillPill({
  skill,
  tapMode,
  isActive,
  onActivate,
}: SkillPillProps) {
  const pillStyle = {
    "--skill-percent": `${skill.percent}%`,
    "--skill-fill-color": skill.category === "design" ? "#FF785D" : "#0AA5A5",
  } as CSSProperties;

  const activeClass = tapMode && isActive ? " skill-pill--active" : "";

  const body = (
    <>
      <span className="skill-pill__fill" aria-hidden="true" />
      <span className="skill-pill__main">
        {skill.icon ? (
          <img className="skill-pill__icon" src={skill.icon} alt="" aria-hidden="true" />
        ) : null}
        <span className="skill-pill__name" data-percent={`${skill.percent}%`}>
          {skill.name}
        </span>
      </span>
    </>
  );

  if (tapMode) {
    return (
      <li className="skill-pill__item">
        <button
          type="button"
          className={`skill-pill${activeClass}`}
          style={pillStyle}
          aria-pressed={isActive}
          onClick={() => onActivate(skill.id)}
        >
          {body}
        </button>
      </li>
    );
  }

  return (
    <li className={`skill-pill${activeClass}`} style={pillStyle}>
      {body}
    </li>
  );
}

function MarqueeRow({
  direction,
  speed,
  speedScale,
  items,
  scrollDirection,
  motionPaused,
  tapMode,
  activeSkillId,
  onActivateSkill,
}: MarqueeRowProps) {
  const repeatedItems = useMemo(() => [...items, ...items], [items]);
  const trackRef = useRef<HTMLUListElement | null>(null);
  const positionRef = useRef(0);
  const velocityRef = useRef(0);
  const previousTimeRef = useRef(0);
  const targetVelocityRef = useRef(0);
  const motionPausedRef = useRef(motionPaused);

  useEffect(() => {
    motionPausedRef.current = motionPaused;
  }, [motionPaused]);

  useEffect(() => {
    const baseDirection = direction === "left" ? -1 : 1;
    const scrollFactor = scrollDirection === "down" ? 1 : -1;
    targetVelocityRef.current = motionPaused ? 0 : baseDirection * scrollFactor * speed * speedScale;
  }, [direction, scrollDirection, speed, speedScale, motionPaused]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || motionPaused) {
      return undefined;
    }

    let frameId = 0;
    previousTimeRef.current = performance.now();

    const animate = (time: number) => {
      if (motionPausedRef.current) {
        return;
      }

      const dt = Math.min((time - previousTimeRef.current) / 1000, 0.05);
      previousTimeRef.current = time;

      velocityRef.current += (targetVelocityRef.current - velocityRef.current) * 0.08;
      positionRef.current += velocityRef.current * dt;

      const singleTrackWidth = track.scrollWidth / 2;
      if (singleTrackWidth > 0) {
        if (positionRef.current <= -singleTrackWidth) positionRef.current += singleTrackWidth;
        if (positionRef.current >= 0) positionRef.current -= singleTrackWidth;
      }

      track.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frameId);
  }, [motionPaused, direction, scrollDirection, speed, speedScale]);

  return (
    <div className={`skills-marquee__row skills-marquee__row--${direction}`}>
      <ul className="skills-marquee__track" role="list" ref={trackRef}>
        {repeatedItems.map((skill, index) => (
          <SkillPill
            key={`${skill.id}-${index}`}
            skill={skill}
            tapMode={tapMode}
            isActive={activeSkillId === skill.id}
            onActivate={onActivateSkill}
          />
        ))}
      </ul>
    </div>
  );
}

export function Skills() {
  const tapMode = useSyncExternalStore(
    subscribeMobileSkillTap,
    getMobileSkillTapSnapshot,
    () => false,
  );
  const [activeSkillId, setActiveSkillId] = useState<string | null>(null);
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>("down");
  const [marqueeNarrow, setMarqueeNarrow] = useState(false);
  const [marqueeReducedMotion, setMarqueeReducedMotion] = useState(false);

  useEffect(() => {
    if (!tapMode) setActiveSkillId(null);
  }, [tapMode]);

  const onActivateSkill = useCallback(
    (id: string) => {
      setActiveSkillId((prev) => (prev === id ? null : id));
    },
    [],
  );

  useEffect(() => {
    const mqNarrow = window.matchMedia("(max-width: 47.99rem)");
    const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setMarqueeNarrow(mqNarrow.matches);
      setMarqueeReducedMotion(mqReduce.matches);
    };
    sync();
    mqNarrow.addEventListener("change", sync);
    mqReduce.addEventListener("change", sync);
    return () => {
      mqNarrow.removeEventListener("change", sync);
      mqReduce.removeEventListener("change", sync);
    };
  }, []);

  const marqueeSpeedScale = marqueeNarrow ? 0.52 : 1;

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateDirection = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      if (Math.abs(delta) >= 12) {
        const nextDirection: ScrollDirection = delta > 0 ? "down" : "up";
        setScrollDirection((prev) => (prev === nextDirection ? prev : nextDirection));
      }
      lastScrollY = currentScrollY;

      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateDirection);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="skills-layout">
      <ul className="skills-layout__screen-reader-list" role="list">
        {skills.map((skill) => (
          <li key={skill.id}>
            {skill.name} 숙련도 {skill.percent}%
          </li>
        ))}
      </ul>

      <div className="skills-marquee" aria-hidden="true">
        {MARQUEE_ROWS.map((row) => (
          <MarqueeRow
            key={`row-${row.offset}`}
            direction={row.direction}
            speed={row.speed}
            speedScale={marqueeSpeedScale}
            items={getShiftedSkills(row.offset)}
            scrollDirection={scrollDirection}
            motionPaused={marqueeReducedMotion}
            tapMode={tapMode}
            activeSkillId={activeSkillId}
            onActivateSkill={onActivateSkill}
          />
        ))}
      </div>
    </div>
  );
}
