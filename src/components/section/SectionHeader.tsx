import type { ReactNode } from "react";

type SectionHeaderProps = {
  id: string;
  label: string;
  title: ReactNode;
  subtitle?: string;
};

export function SectionHeader({ id, label, title, subtitle }: SectionHeaderProps) {
  return (
    <header className="section-header">
      <p className="section-header__label">{label}</p>
      <h2 id={id} className="section-header__title">
        {title}
      </h2>
      {subtitle ? <p className="section-header__subtitle">{subtitle}</p> : null}
    </header>
  );
}
