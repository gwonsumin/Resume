import type { ReactNode } from "react";
import { SectionHeader } from "./SectionHeader";
import "./Section.scss";

type SectionProps = {
  id: string;
  title?: ReactNode;
  label?: string;
  meta?: string;
  subtitle?: string;
  handNote?: string;
  catalogStamp?: string;
  headerAction?: ReactNode;
  children: ReactNode;
  className?: string;
  revealHeader?: boolean;
};

export function Section({
  id,
  title,
  label,
  meta,
  subtitle,
  handNote,
  catalogStamp,
  headerAction,
  children,
  className,
  revealHeader = false,
}: SectionProps) {
  const sectionClass = ["content-section", className].filter(Boolean).join(" ");
  const headingId = `${id}-heading`;
  const fullHeader = label && title ? (
    <SectionHeader
      id={headingId}
      label={label}
      title={title}
      meta={meta}
      subtitle={subtitle}
      handNote={handNote}
      catalogStamp={catalogStamp}
      action={headerAction}
      enableReveal={revealHeader}
    />
  ) : null;

  return (
    <section id={id} className={sectionClass} aria-labelledby={headingId}>
      {fullHeader ? (
        fullHeader
      ) : title ? (
        <h2 className="section-title" id={headingId}>
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  );
}
