import { useCallback, useEffect, useState } from 'react'
import './BackToTop.scss'
import cardClip from '../../assets/icons/BackToTop-cardClip.svg'

const SCROLL_THRESHOLD_PX = 360

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD_PX)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleScrollTop = useCallback(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }, [])

  return (
    <button
      type="button"
      className={`back-to-top${visible ? ' back-to-top--visible' : ''}`}
      onClick={handleScrollTop}
      aria-label="페이지 상단으로 이동"
      tabIndex={visible ? 0 : -1}
    >
      <img className="back-to-top__clip" src={cardClip} alt="" width={14} height={30} draggable={false} />
    </button>
  )
}
