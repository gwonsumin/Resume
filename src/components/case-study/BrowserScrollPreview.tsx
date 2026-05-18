import { useRef, useEffect, useState, type CSSProperties } from 'react'
import './BrowserScrollPreview.scss'

export type BrowserScrollPage = {
  src: string
  alt?: string
}

type Props = {
  /** One or more full-height screenshots stacked top-to-bottom; the column scrolls on hover. */
  pages: readonly BrowserScrollPage[]
}

type BrowserScrollStyle = CSSProperties & {
  '--bsp-scroll-y'?: string
}

export function BrowserScrollPreview({ pages }: Props) {
  const vpRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const viewport = vpRef.current
    const scroll = scrollRef.current
    if (!viewport || !scroll) return

    const update = () => {
      setScrollY(Math.max(0, scroll.scrollHeight - viewport.offsetHeight))
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(viewport)
    ro.observe(scroll)
    return () => ro.disconnect()
  }, [])

  const style: BrowserScrollStyle = {
    '--bsp-scroll-y': `${scrollY}px`,
  }

  if (pages.length === 0) return null

  return (
    <div
      className="bsp"
      style={style}
      aria-label="롱 스크롤 페이지 미리보기"
    >
      <div className="bsp__chrome" aria-hidden="true">
        <span className="bsp__dot bsp__dot--coral" />
        <span className="bsp__dot bsp__dot--sand" />
        <span className="bsp__dot bsp__dot--teal" />
      </div>
      <div className="bsp__viewport" ref={vpRef}>
        <div className="bsp__scroll" ref={scrollRef}>
          {pages.map((pg) => (
            <img
              key={pg.src}
              src={pg.src}
              alt={pg.alt ?? ''}
              className="bsp__page"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          ))}
        </div>
        <div className="bsp__fade" aria-hidden="true" />
      </div>
    </div>
  )
}
