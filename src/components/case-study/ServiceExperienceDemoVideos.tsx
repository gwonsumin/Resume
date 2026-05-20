import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import type { CaseStudyServiceDemoVideos } from '../../types/caseStudy'

type ServiceExperienceDemoVideosProps = {
  demoVideos: CaseStudyServiceDemoVideos
}

type DemoVideoSource = {
  src: string
  label?: string
  ariaLabel: string
}

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <polygon points="4,2 16,9 4,16" fill="white" />
    </svg>
  )
}

function VideoThumbnailCard({
  src,
  label,
  ariaLabel,
  onClick,
}: DemoVideoSource & { onClick: () => void }) {
  return (
    <div className="demo-video-thumb">
      {label ? <p className="demo-label">{label}</p> : null}
      <div
        className="demo-video-thumb__card"
        role="button"
        tabIndex={0}
        aria-label={ariaLabel}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onClick()
          }
        }}
      >
        <video src={src} preload="metadata" muted playsInline />
        <div className="demo-video-thumb__play" aria-hidden="true">
          <PlayIcon />
        </div>
      </div>
    </div>
  )
}

function VideoModal({ src, onClose }: { src: string; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return createPortal(
    <div className="video-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <button type="button" className="video-modal-close" onClick={onClose} aria-label="닫기">
        ×
      </button>
      <video
        src={src}
        autoPlay
        controls
        className="video-modal-player"
        onClick={(e) => e.stopPropagation()}
      />
    </div>,
    document.body,
  )
}

function DemoVideoThumbnails({
  className,
  ariaLabel,
  videos,
  onSelect,
}: {
  className: string
  ariaLabel: string
  videos: readonly DemoVideoSource[]
  onSelect: (src: string) => void
}) {
  return (
    <div className={className} aria-label={ariaLabel}>
      {videos.map((video) => (
        <VideoThumbnailCard key={video.src} {...video} onClick={() => onSelect(video.src)} />
      ))}
    </div>
  )
}

export function ServiceExperienceDemoVideos({ demoVideos }: ServiceExperienceDemoVideosProps) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const modal = activeVideo ? (
    <VideoModal src={activeVideo} onClose={() => setActiveVideo(null)} />
  ) : null

  if (demoVideos.layout === 'split') {
    return (
      <>
        <DemoVideoThumbnails
          className="demo-videos-stack"
          ariaLabel="서비스 데모"
          videos={demoVideos.videos}
          onSelect={setActiveVideo}
        />
        {modal}
      </>
    )
  }

  if (demoVideos.layout === 'dual') {
    return (
      <>
        <DemoVideoThumbnails
          className="demo-video-wrap"
          ariaLabel="서비스 데모 영상"
          videos={[
            {
              src: demoVideos.desktop.src,
              label: demoVideos.desktop.label ?? 'DESKTOP',
              ariaLabel: '데스크톱 서비스 데모 영상',
            },
            {
              src: demoVideos.mobile.src,
              label: demoVideos.mobile.label ?? 'MOBILE',
              ariaLabel: '모바일 서비스 데모 영상',
            },
          ]}
          onSelect={setActiveVideo}
        />
        {modal}
      </>
    )
  }

  return (
    <>
      <div className="tone-demo-video" aria-label="서비스 데모 영상">
        <VideoThumbnailCard
          src={demoVideos.src}
          ariaLabel="모바일 서비스 데모 영상"
          onClick={() => setActiveVideo(demoVideos.src)}
        />
      </div>
      {modal}
    </>
  )
}
