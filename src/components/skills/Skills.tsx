import type { CSSProperties } from "react";
import { skills, type Skill } from "./skillsData";
import "./Skills.scss";

const TOOLKIT_ROWS = [
  {
    id: "design",
    label: "DESIGN",
    handLabel: "시각·UI",
    pinRotate: -7,
    categories: ["design"] as const,
  },
  {
    id: "build",
    label: "BUILD",
    handLabel: "구현",
    pinRotate: 5,
    categories: ["frontend", "styling"] as const,
  },
  {
    id: "workflow",
    label: "WORKFLOW",
    handLabel: "협업·도구",
    pinRotate: -4,
    categories: ["tool"] as const,
  },
] as const;

function filterRowSkills(
  categories: readonly Skill["category"][],
): Skill[] {
  return skills.filter((skill) =>
    (categories as readonly string[]).includes(skill.category),
  );
}

function ToolCapsule({ skill }: { skill: Skill }) {
  const capsuleStyle = {
    "--capsule-level": skill.level,
  } as CSSProperties;

  return (
    <li
      className="toolkit-capsule"
      data-level={skill.level}
      style={capsuleStyle}
    >
      <span className="toolkit-capsule__fill" aria-hidden="true" />
      <span className="toolkit-capsule__tab" aria-hidden="true" />
      <span className="toolkit-capsule__body">
        {skill.icon ? (
          <img
            className="toolkit-capsule__icon"
            src={skill.icon}
            alt=""
            aria-hidden="true"
          />
        ) : null}
        <span className="toolkit-capsule__name">{skill.name}</span>
        <span
          className="toolkit-capsule__tag"
          aria-label={`${skill.name} 사용 빈도 ${skill.freq}`}
        >
          {skill.freq}
        </span>
      </span>
    </li>
  );
}

function ToolkitRow({
  label,
  handLabel,
  pinRotate,
  items,
}: {
  label: string;
  handLabel: string;
  pinRotate: number;
  items: Skill[];
}) {
  return (
    <div className="toolkit-table__row">
      <div className="toolkit-table__row-head">
        <span
          className="toolkit-table__pin"
          style={{ "--pin-rotate": `${pinRotate}deg` } as CSSProperties}
          aria-hidden="true"
        />
        <div className="toolkit-table__row-labels">
          <p className="toolkit-table__row-mono">{label}</p>
          <p className="toolkit-table__row-hand">{handLabel}</p>
        </div>
      </div>
      <ul className="toolkit-table__capsules" role="list">
        {items.map((skill) => (
          <ToolCapsule key={skill.id} skill={skill} />
        ))}
      </ul>
    </div>
  );
}

export function Skills() {
  return (
    <div className="toolkit-table">
      <span className="toolkit-table__tape" aria-hidden="true" />
      <span className="toolkit-table__clip" aria-hidden="true" />

      <ul className="toolkit-table__screen-reader-list" role="list">
        {skills.map((skill) => (
          <li key={skill.id}>
            {skill.name} 사용 빈도 {skill.freq}
          </li>
        ))}
      </ul>

      <p className="toolkit-table__title">
        <span className="toolkit-table__title-mono">TOOLKIT TABLE</span>
        <span className="toolkit-table__title-hand">오늘 꺼낸 도구들</span>
      </p>

      <div className="toolkit-table__rows">
        {TOOLKIT_ROWS.map((row) => (
          <ToolkitRow
            key={row.id}
            label={row.label}
            handLabel={row.handLabel}
            pinRotate={row.pinRotate}
            items={filterRowSkills(row.categories)}
          />
        ))}
      </div>
    </div>
  );
}
