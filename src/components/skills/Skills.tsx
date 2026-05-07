import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { useRef } from "react";
import { skills, type Skill } from "./skillsData";
import "./Skills.scss";

type RowDirection = "left" | "right";
type ScrollDirection = "up" | "down";

type SkillPillProps = {
  skill: Skill;
};

type MarqueeRowProps = {
  direction: RowDirection;
  speed: number;
  items: Skill[];
  scrollDirection: ScrollDirection;
};

const MARQUEE_ROWS = [
  { direction: "left", speed: 30, offset: 0 },
  { direction: "right", speed: 34, offset: 5 },
  { direction: "left", speed: 32, offset: 11 },
] as const;

function getShiftedSkills(offset: number) {
  return [...skills.slice(offset), ...skills.slice(0, offset)];
}

function SkillPill({ skill }: SkillPillProps) {
  const pillStyle = {
    "--skill-percent": `${skill.percent}%`,
    "--skill-fill-color": skill.category === "design" ? "#FF785D" : "#0AA5A5",
  } as CSSProperties;

  return (
    <li className="skill-pill" style={pillStyle}>
      <span className="skill-pill__fill" aria-hidden="true" />
      <span className="skill-pill__main">
        {skill.icon ? (
          <img className="skill-pill__icon" src={skill.icon} alt="" aria-hidden="true" />
        ) : null}
        <span className="skill-pill__name" data-percent={`${skill.percent}%`}>
          {skill.name}
        </span>
      </span>
    </li>
  );
}

function MarqueeRow({ direction, speed, items, scrollDirection }: MarqueeRowProps) {
  const repeatedItems = useMemo(() => [...items, ...items], [items]);
  const trackRef = useRef<HTMLUListElement | null>(null);
  const positionRef = useRef(0);
  const velocityRef = useRef(0);
  const previousTimeRef = useRef(0);
  const targetVelocityRef = useRef(0);

  useEffect(() => {
    const baseDirection = direction === "left" ? -1 : 1;
    const scrollFactor = scrollDirection === "down" ? 1 : -1;
    targetVelocityRef.current = baseDirection * scrollFactor * speed;
  }, [direction, scrollDirection, speed]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frameId = 0;
    previousTimeRef.current = performance.now();

    const animate = (time: number) => {
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
  }, []);

  return (
    <div className={`skills-marquee__row skills-marquee__row--${direction}`}>
      <ul className="skills-marquee__track" role="list" ref={trackRef}>
        {repeatedItems.map((skill, index) => (
          <SkillPill key={`${skill.id}-${index}`} skill={skill} />
        ))}
      </ul>
    </div>
  );
}

export function Skills() {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>("down");

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
            items={getShiftedSkills(row.offset)}
            scrollDirection={scrollDirection}
          />
        ))}
      </div>
    </div>
  );
}
