import type { ReactNode } from "react";
import { SectionHeader } from "./SectionHeader";
import "./Section.scss";

type SectionProps = {
  id: string;
  title?: ReactNode;
  label?: string;
  meta?: string;
  subtitle?: string;
  headerAction?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Section({ id, title, label, meta, subtitle, headerAction, children, className }: SectionProps) {
  const sectionClass = ["content-section", className].filter(Boolean).join(" ");
  const headingId = `${id}-heading`;

  return (
    <section id={id} className={sectionClass} aria-labelledby={headingId}>
      {label && title ? (
        <SectionHeader
          id={headingId}
          label={label}
          title={title}
          meta={meta}
          subtitle={subtitle}
          action={headerAction}
        />
      ) : title ? (
        <h2 className="section-title" id={headingId}>
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  );
}
