import type { ReactNode } from 'react'
import './Section.css'

type SectionProps = {
  id: string
  title: string
  children: ReactNode
  className?: string
}

export function Section({ id, title, children, className }: SectionProps) {
  const sectionClass = ['content-section', className].filter(Boolean).join(' ')

  return (
    <section
      id={id}
      className={sectionClass}
      aria-labelledby={`${id}-heading`}
    >
      <h2 className="section-title" id={`${id}-heading`}>
        {title}
      </h2>
      {children}
    </section>
  )
}
