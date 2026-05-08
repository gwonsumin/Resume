import type { ReactNode } from 'react'
import type { ProjectPreview } from '../../types/project'
import type { CaseStudyBody, CaseStudyContent } from '../../types/caseStudy'
import './CaseStudyTemplate.scss'

const SECTIONS: ReadonlyArray<{
  key: keyof Pick<
    CaseStudyContent,
    | 'intro'
    | 'problem'
    | 'insight'
    | 'iaUserFlow'
    | 'solution'
    | 'uiDesign'
    | 'result'
    | 'learnings'
  >
  domId: string
  title: string
}> = [
  { key: 'intro', domId: 'intro', title: '소개' },
  { key: 'problem', domId: 'problem', title: '문제 정의' },
  { key: 'insight', domId: 'insight', title: '인사이트' },
  { key: 'iaUserFlow', domId: 'ia-user-flow', title: 'IA / 사용자 흐름' },
  { key: 'solution', domId: 'solution', title: '해결 전략' },
  { key: 'uiDesign', domId: 'ui-design', title: 'UI 디자인' },
  { key: 'result', domId: 'result', title: '결과' },
  { key: 'learnings', domId: 'learnings', title: '회고' },
]

type CaseStudyTemplateProps = {
  project: ProjectPreview
  content: CaseStudyContent
  titleId?: string
}

type SectionKey = (typeof SECTIONS)[number]['key']
type MockupTone = 'coral' | 'teal' | 'ink'
type MockupCopy = { label: string; caption: string; tone: MockupTone }

const SECTION_VISUALS: Partial<
  Record<
    SectionKey,
    MockupCopy
  >
> = {
  intro: {
    label: '핵심 첫 화면',
    caption: '첫 진입 시 사용자에게 보이는 핵심 화면 영역',
    tone: 'coral',
  },
  iaUserFlow: {
    label: 'IA / 사용자 흐름',
    caption: '정보 구조와 주요 이동 동선을 보여줄 영역',
    tone: 'teal',
  },
  uiDesign: {
    label: 'UI 설계 화면',
    caption: '컴포넌트와 화면 시안을 보여줄 영역',
    tone: 'coral',
  },
  result: {
    label: '결과 요약',
    caption: '성과 지표와 개선 결과를 보여줄 영역',
    tone: 'teal',
  },
  learnings: {
    label: '회고 노트',
    caption: '다음 프로젝트에 반영할 인사이트 정리 영역',
    tone: 'ink',
  },
}

type VisualSlot =
  | 'heroDesktop'
  | 'heroMobile'
  | 'livePreview'
  | 'prototype'
  | `section:${SectionKey}`

const DEFAULT_VISUALS: Partial<Record<VisualSlot, MockupCopy>> = {
  heroDesktop: {
    label: '데스크탑 핵심 화면',
    caption: '메인 사용자 시나리오를 보여줄 대표 화면 영역',
    tone: 'coral',
  },
  heroMobile: {
    label: '모바일 핵심 화면',
    caption: '핵심 인터랙션을 보여줄 모바일 화면 영역',
    tone: 'teal',
  },
  livePreview: {
    label: '실서비스 화면',
    caption: '배포 환경에서 동작하는 실제 화면 캡처 영역',
    tone: 'teal',
  },
  prototype: {
    label: '프로토타입 흐름',
    caption: '핵심 사용자 플로우를 검증한 화면 영역',
    tone: 'ink',
  },
  'section:intro': SECTION_VISUALS.intro!,
  'section:iaUserFlow': SECTION_VISUALS.iaUserFlow!,
  'section:uiDesign': SECTION_VISUALS.uiDesign!,
  'section:result': SECTION_VISUALS.result!,
}

const PROJECT_VISUAL_OVERRIDES: Partial<Record<string, Partial<Record<VisualSlot, MockupCopy>>>> = {
  goreon: {
    heroDesktop: {
      label: 'AI 추천 메인',
      caption: '추천 대화와 상품 비교가 만나는 핵심 화면 영역',
      tone: 'coral',
    },
    heroMobile: {
      label: '모바일 선택 플로우',
      caption: '추천-비교-선택 흐름을 확인할 모바일 화면 영역',
      tone: 'teal',
    },
    livePreview: {
      label: 'GOREON 실서비스',
      caption: '배포 화면 기준으로 완성도를 보여줄 영역',
      tone: 'teal',
    },
    'section:iaUserFlow': {
      label: '의사결정 흐름',
      caption: '탐색부터 구매 판단까지 이어지는 흐름 영역',
      tone: 'teal',
    },
  },
  tone: {
    heroDesktop: {
      label: '감정 기반 메인',
      caption: '감정-음악 매칭 경험을 보여줄 메인 화면 영역',
      tone: 'teal',
    },
    heroMobile: {
      label: '모바일 감정 기록',
      caption: '일일 감정 기록과 톤 선택 흐름 화면 영역',
      tone: 'coral',
    },
    prototype: {
      label: 'TONE 검증 플로우',
      caption: '톤 선택과 음악 탐색 검증 화면 영역',
      tone: 'ink',
    },
  },
  sangsangmadang: {
    heroDesktop: {
      label: '플랫폼 리디자인 메인',
      caption: '공간/전시 탐색 구조를 보여줄 랜딩 화면 영역',
      tone: 'ink',
    },
    heroMobile: {
      label: '모바일 탐색 화면',
      caption: '동선 탐색과 콘텐츠 접근 흐름을 보여줄 영역',
      tone: 'teal',
    },
    livePreview: {
      label: '리디자인 적용 화면',
      caption: '개선 전후 차이를 보여줄 실서비스 화면 영역',
      tone: 'coral',
    },
    'section:uiDesign': {
      label: '브랜드/UI 정합성',
      caption: '브랜드 톤과 UI 시스템 정합성 시안 영역',
      tone: 'ink',
    },
    'section:result': {
      label: '탐색 개선 성과',
      caption: '탐색 효율과 가독성 개선 근거를 보여줄 영역',
      tone: 'teal',
    },
  },
}

function getVisualCopy(projectId: string, slot: VisualSlot): MockupCopy {
  const override = PROJECT_VISUAL_OVERRIDES[projectId]?.[slot]
  return (
    override ??
    DEFAULT_VISUALS[slot] ?? {
      label: '시각 자료 영역',
      caption: '추후 실제 화면 이미지를 배치할 영역',
      tone: 'ink',
    }
  )
}

function MockupPlaceholder({
  label,
  caption,
  tone,
  compact = false,
}: {
  label: string
  caption: string
  tone: 'coral' | 'teal' | 'ink'
  compact?: boolean
}) {
  return (
    <figure
      className={`case-study__mockup case-study__mockup--${tone}${compact ? ' case-study__mockup--compact' : ''}`}
      aria-label={`${label} mockup placeholder`}
    >
      <div className="case-study__mockup-topbar" aria-hidden="true">
        <span />
        <span />
        <span />
        <i />
      </div>
      <div className="case-study__mockup-canvas" aria-hidden="true">
        <div className="case-study__mockup-main" />
        <div className="case-study__mockup-side">
          <span />
          <span />
        </div>
      </div>
      <figcaption>
        <strong>{label}</strong>
        <span>{caption}</span>
      </figcaption>
    </figure>
  )
}

function Prose({ body }: { body: CaseStudyBody }) {
  return (
    <div className="case-study__prose">
      {renderBody(body).map((line) => (
        <p key={line} className="case-study__paragraph">
          {line}
        </p>
      ))}
    </div>
  )
}

function renderBody(body: CaseStudyBody): readonly string[] {
  return typeof body === 'string' ? [body] : body
}

function CaseStudyBlock({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: ReactNode
}) {
  return (
    <section
      className="case-study__block"
      id={id}
      aria-labelledby={`${id}-heading`}
    >
      <h2 className="case-study__block-title" id={`${id}-heading`}>
        {title}
      </h2>
      {children}
    </section>
  )
}

export function CaseStudyTemplate({
  project,
  content,
  titleId,
}: CaseStudyTemplateProps) {
  const baseId = project.id
  const normalizedTagSet = new Set(project.tags.map((tag) => tag.trim().toLowerCase()))
  const toolTags = project.techStack.filter((tool) => !normalizedTagSet.has(tool.trim().toLowerCase()))
  const heroDesktopVisual = getVisualCopy(project.id, 'heroDesktop')
  const heroMobileVisual = getVisualCopy(project.id, 'heroMobile')
  const livePreviewVisual = getVisualCopy(project.id, 'livePreview')
  const prototypeVisual = getVisualCopy(project.id, 'prototype')
  const prototypeLinks = content.prototype
    ? [
        {
          href: content.prototype.href,
          buttonLabel: content.prototype.buttonLabel ?? '프로토타입 보기',
        },
        ...(content.prototype.extraLinks ?? []),
      ]
    : []

  return (
    <article className="case-study" lang="en">
      <header className="case-study__header">
        <div className="case-study__meta-row">
          <span>{project.visual.label}</span>
          <span>{project.visual.meta}</span>
        </div>
        <h1 className="case-study__title" id={titleId}>
          {project.title}
        </h1>
        <p className="case-study__summary">{project.description}</p>
        <ul className="case-study__tags" role="list" aria-label="Project tags">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
          {toolTags.map((tool) => (
            <li key={tool} className="case-study__tags-tool">
              {tool}
            </li>
          ))}
        </ul>
        <div className="case-study__hero-visuals">
          <MockupPlaceholder
            label={heroDesktopVisual.label}
            caption={heroDesktopVisual.caption}
            tone={heroDesktopVisual.tone}
          />
          <MockupPlaceholder
            label={heroMobileVisual.label}
            caption={heroMobileVisual.caption}
            tone={heroMobileVisual.tone}
            compact
          />
        </div>
      </header>

      <div className="case-study__body">
        {content.myRole ? (
          <CaseStudyBlock id={`${baseId}-my-role`} title="내 역할">
            <div className="case-study__my-role">
              <div className="case-study__my-role-summary">
                {renderBody(content.myRole.summary).map((line) => (
                  <p key={line} className="case-study__paragraph">
                    {line}
                  </p>
                ))}
              </div>

              <ul className="case-study__role-list" role="list" aria-label="My role details">
                {content.myRole.roles.map((role) => (
                  <li key={role.title} className="case-study__role-item">
                    <h3 className="case-study__role-title">{role.title}</h3>
                    <p className="case-study__role-detail">{role.detail}</p>
                  </li>
                ))}
              </ul>

              <div className="case-study__contribution" aria-label="Contribution summary">
                {content.myRole.contributions.map((item) => (
                  <div key={item.label} className="case-study__contribution-item">
                    <div className="case-study__contribution-label-row">
                      <span>{item.label}</span>
                      <strong>{item.percentage}%</strong>
                    </div>
                    <progress
                      className="case-study__contribution-track"
                      value={item.percentage}
                      max={100}
                      aria-label={`${item.label} 참여도 ${item.percentage}%`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </CaseStudyBlock>
        ) : null}

        <CaseStudyBlock id={`${baseId}-live-preview`} title="실서비스 검증">
          <Prose
            body={
              content.livePreview?.description ??
              'Open the current build or project note when a public preview is available.'
            }
          />
          <MockupPlaceholder
            label={livePreviewVisual.label}
            caption={livePreviewVisual.caption}
            tone={livePreviewVisual.tone}
          />
          {content.livePreview ? (
            <p className="case-study__live-action">
              <a
                className="case-study__button"
                href={content.livePreview.href}
                target="_blank"
                rel="noreferrer noopener"
              >
                {content.livePreview.buttonLabel ?? '실서비스 보기'}
              </a>
            </p>
          ) : null}
        </CaseStudyBlock>

        {SECTIONS.map(({ key, domId, title }) => {
          const sectionVisual = SECTION_VISUALS[key] ? getVisualCopy(project.id, `section:${key}`) : null

          return (
            <div key={key} className="case-study__section-stack">
              <CaseStudyBlock id={`${baseId}-${domId}`} title={title}>
                <Prose body={content[key]} />
                {sectionVisual ? (
                  <MockupPlaceholder
                    label={sectionVisual.label}
                    caption={sectionVisual.caption}
                    tone={sectionVisual.tone}
                    compact
                  />
                ) : null}
              </CaseStudyBlock>
              {key === 'iaUserFlow' && content.prototype ? (
                <CaseStudyBlock id={`${baseId}-prototype`} title="프로토타입 검증">
                  <Prose
                    body={
                      content.prototype.description ??
                      'Prototype links and interaction notes are collected here.'
                    }
                  />
                  <MockupPlaceholder
                    label={prototypeVisual.label}
                    caption={prototypeVisual.caption}
                    tone={prototypeVisual.tone}
                  />
                  {prototypeLinks.length > 0 ? (
                    <div className="case-study__live-action case-study__live-action--group">
                      {prototypeLinks.map((link) => (
                        <a
                          key={`${link.buttonLabel}-${link.href}`}
                          className="case-study__button"
                          href={link.href}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          {link.buttonLabel}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </CaseStudyBlock>
              ) : null}
            </div>
          )
        })}
      </div>
    </article>
  )
}
