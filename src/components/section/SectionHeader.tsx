import type { ReactNode } from "react";
import { Reveal } from "../reveal/Reveal";

type SectionHeaderProps = {
  id: string;
  label: string;
  title: ReactNode;
  meta?: string;
  subtitle?: string;
  handNote?: string;
  catalogStamp?: string;
  action?: ReactNode;
  enableReveal?: boolean;
};

const DEFAULT_CATALOG_STAMP = "BY SUMIN · ✿ OPEN TODAY";

export function SectionHeader({
  id,
  label,
  title,
  meta,
  subtitle,
  handNote,
  catalogStamp = DEFAULT_CATALOG_STAMP,
  action,
  enableReveal = false,
}: SectionHeaderProps) {
  const issue = (
    <p className="section-header__issue">
      <span className="section-header__vol">Vol. 04</span>
      {handNote ? <span className="section-header__hand">{handNote}</span> : null}
    </p>
  );

  const primary = (
    <>
      {issue}
      <p className="section-header__label">{label}</p>
      <div className="section-header__title-row">
        <h2 id={id} className="section-header__title">
          {title}
        </h2>
        {action ? <div className="section-header__action">{action}</div> : null}
      </div>
    </>
  );

  const secondary =
    meta || subtitle || catalogStamp ? (
      <>
        {meta ? <p className="section-header__meta">{meta}</p> : null}
        {subtitle ? <p className="section-header__subtitle">{subtitle}</p> : null}
        <p className="section-header__catalog">{catalogStamp}</p>
      </>
    ) : null;

  if (!enableReveal) {
    return (
      <header className="section-header">
        {primary}
        {secondary}
      </header>
    );
  }

  return (
    <header className="section-header">
      <Reveal delay={0} staggerIndex={0} staggerMs={95}>
        <div className="section-header__reveal-group">{primary}</div>
      </Reveal>
      {secondary ? (
        <Reveal delay={100} staggerIndex={0} staggerMs={95}>
          <div className="section-header__reveal-group">{secondary}</div>
        </Reveal>
      ) : null}
    </header>
  );
}
