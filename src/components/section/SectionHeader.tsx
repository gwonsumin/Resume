import type { ReactNode } from "react";

type SectionHeaderProps = {
  id: string;
  label: string;
  title: ReactNode;
  meta?: string;
  subtitle?: string;
};

export function SectionHeader({ id, label, title, meta, subtitle }: SectionHeaderProps) {
  return (
    <header className="section-header">
      <p className="section-header__label">{label}</p>
      <h2 id={id} className="section-header__title">
        {title}
      </h2>
      {meta ? <p className="section-header__meta">{meta}</p> : null}
      {subtitle ? <p className="section-header__subtitle">{subtitle}</p> : null}
    </header>
  );
}
