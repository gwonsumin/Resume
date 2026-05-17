import './HeroEmotionFlow.scss'

/** Three-panel “emotion flow” streak (reuse in case study header, project cards, next-project tiles). */
export type HeroEmotionScreens = {
  left: { src: string; alt?: string }
  center: { src: string; alt?: string }
  right: { src: string; alt?: string }
}

type HeroEmotionFlowProps = {
  screens: HeroEmotionScreens
  /** Smaller layouts for grids / next-project cards; keeps grid stable on narrow viewports. */
  variant?: 'header' | 'project-card' | 'next'
  loading?: 'eager' | 'lazy'
  ariaLabel?: string
}

const variantClass: Record<NonNullable<HeroEmotionFlowProps['variant']>, string | undefined> = {
  header: undefined,
  'project-card': 'case-study__hero-emotion-flow--compact case-study__hero-emotion-flow--compact-project',
  next: 'case-study__hero-emotion-flow--compact case-study__hero-emotion-flow--compact-next',
}

export function HeroEmotionFlow({
  screens,
  variant = 'header',
  loading = 'eager',
  ariaLabel = '기록부터 재생까지 이어지는 감정 흐름',
}: HeroEmotionFlowProps) {
  const extra = variantClass[variant]
  const cls = [`case-study__hero-emotion-flow`, extra].filter(Boolean).join(' ')
  const { left, center, right } = screens

  return (
    <div className={cls} role="group" aria-label={ariaLabel}>
      <figure className="case-study__hero-emotion-screen case-study__hero-emotion-screen--side case-study__hero-emotion-screen--left">
        <img src={left.src} alt={left.alt ?? ''} loading={loading} decoding="async" />
      </figure>
      <figure className="case-study__hero-emotion-screen case-study__hero-emotion-screen--center">
        <img src={center.src} alt={center.alt ?? ''} loading={loading} decoding="async" />
      </figure>
      <figure className="case-study__hero-emotion-screen case-study__hero-emotion-screen--side case-study__hero-emotion-screen--right">
        <img src={right.src} alt={right.alt ?? ''} loading={loading} decoding="async" />
      </figure>
    </div>
  )
}
