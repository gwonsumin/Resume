import type { ReactNode } from "react";

type SectionHeaderProps = {
  id: string;
  label: string;
  title: ReactNode;
  meta?: string;
  subtitle?: string;
  action?: ReactNode;
};

export function SectionHeader({ id, label, title, meta, subtitle, action }: SectionHeaderProps) {
  return (
    <header className="section-header">
      <p className="section-header__label">{label}</p>
      <div className="section-header__title-row">
        <h2 id={id} className="section-header__title">
          {title}
        </h2>
        {action ? <div className="section-header__action">{action}</div> : null}
      </div>
      {meta ? <p className="section-header__meta">{meta}</p> : null}
      {subtitle ? <p className="section-header__subtitle">{subtitle}</p> : null}
    </header>
  );
}
