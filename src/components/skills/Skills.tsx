import { useMemo } from "react";
import type { CSSProperties } from "react";
import { skills, type Skill } from "./skillsData";
import "./Skills.scss";

type RowDirection = "left" | "right";

type SkillPillProps = {
  skill: Skill;
};

type MarqueeRowProps = {
  direction: RowDirection;
  duration: number;
  items: Skill[];
};

const MARQUEE_ROWS = [
  { direction: "left", duration: 92, offset: 0 },
  { direction: "right", duration: 100, offset: 4 },
  { direction: "left", duration: 96, offset: 7 },
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

function MarqueeRow({ direction, duration, items }: MarqueeRowProps) {
  const repeatedItems = useMemo(() => [...items, ...items], [items]);
  const rowStyle = {
    "--marquee-duration": `${duration}s`,
  } as CSSProperties;

  return (
    <div className={`skills-marquee__row skills-marquee__row--${direction}`} style={rowStyle}>
      <ul className="skills-marquee__track" role="list">
        {repeatedItems.map((skill, index) => (
          <SkillPill key={`${skill.id}-${index}`} skill={skill} />
        ))}
      </ul>
    </div>
  );
}

export function Skills() {
  return (
    <div className="skills-layout">
      <div className="skills-layout__header">
        <p>디자인과 구현을 연결하는 도구들</p>
      </div>

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
            key={`${row.direction}-${row.offset}`}
            direction={row.direction}
            duration={row.duration}
            items={getShiftedSkills(row.offset)}
          />
        ))}
      </div>
    </div>
  );
}
