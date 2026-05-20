import type { CaseStudyServiceDemoVideos } from '../../types/caseStudy'

type ServiceExperienceDemoVideosProps = {
  demoVideos: CaseStudyServiceDemoVideos
}

function DemoVideo({
  src,
  label,
  ariaLabel,
}: {
  src: string
  label?: string
  ariaLabel: string
}) {
  return (
    <div className="demo-video-item">
      {label ? <p className="demo-label">{label}</p> : null}
      <video src={src} autoPlay muted loop playsInline aria-label={ariaLabel} />
    </div>
  )
}

export function ServiceExperienceDemoVideos({ demoVideos }: ServiceExperienceDemoVideosProps) {
  if (demoVideos.layout === 'dual') {
    return (
      <div className="demo-video-wrap" aria-label="서비스 데모 영상">
        <DemoVideo
          src={demoVideos.desktop.src}
          label={demoVideos.desktop.label ?? 'DESKTOP'}
          ariaLabel="데스크톱 서비스 데모 영상"
        />
        <DemoVideo
          src={demoVideos.mobile.src}
          label={demoVideos.mobile.label ?? 'MOBILE'}
          ariaLabel="모바일 서비스 데모 영상"
        />
      </div>
    )
  }

  return (
    <div className="tone-demo-video" aria-label="서비스 데모 영상">
      <video
        src={demoVideos.src}
        autoPlay
        muted
        loop
        playsInline
        aria-label="모바일 서비스 데모 영상"
      />
    </div>
  )
}
