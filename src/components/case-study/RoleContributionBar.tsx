import { useEffect, useRef, useState } from 'react'
import {
  CASE_STUDY_ROLE_TAG_DEFAULT_LEVEL,
  type CaseStudyRoleTag,
} from '../../types/caseStudy'

type RoleContributionBarProps = {
  tag: CaseStudyRoleTag
  level?: number
}

function prefersReducedMotion() {
  if (typeof window === 'undefined') return true
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function RoleContributionBar({ tag, level }: RoleContributionBarProps) {
  const barRef = useRef<HTMLDivElement>(null)
  const [filled, setFilled] = useState(prefersReducedMotion)
  const targetLevel = level ?? CASE_STUDY_ROLE_TAG_DEFAULT_LEVEL[tag]

  useEffect(() => {
    if (prefersReducedMotion()) {
      setFilled(true)
      return
    }

    const node = barRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setFilled(true)
          observer.unobserve(node)
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={barRef} className="role-contribution-bar" data-level={targetLevel} aria-hidden="true">
      <div
        className="role-contribution-bar__fill"
        data-level={targetLevel}
        style={{ width: filled ? `${targetLevel}%` : '0%' }}
      />
    </div>
  )
}
