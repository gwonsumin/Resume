import type { MouseEvent } from 'react'
import type { ProjectPreview } from '../types/project'

const DEPLOY_TOGGLE_MAX_WIDTH_PX = 767

/**
 * Matches `ProjectCard` deploy behaviour: optional sized window on desktop,
 * TONE mobile preview popup rules, graceful fallback to a normal new tab.
 */
export function handleProjectDeployClick(
  event: MouseEvent<HTMLAnchorElement>,
  deployUrl: string,
  deployWindow: ProjectPreview['deployWindow'],
): void {
  if (!deployWindow) {
    return
  }

  const openDeployInNewTab = () => {
    window.open(deployUrl, '_blank', 'noopener,noreferrer')
  }

  const isTonePreview = deployWindow.name === 'TONEPreview'

  if (isTonePreview) {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      return
    }
    event.preventDefault()
    const popup = window.open(
      deployUrl,
      deployWindow.name,
      [
        `width=${deployWindow.width}`,
        `height=${deployWindow.height}`,
        'scrollbars=yes',
        'resizable=no',
        'toolbar=no',
      ].join(','),
    )
    if (!popup) {
      openDeployInNewTab()
    }
    return
  }

  const prefersDefaultTab =
    typeof window !== 'undefined' &&
    window.matchMedia(`(max-width: ${DEPLOY_TOGGLE_MAX_WIDTH_PX}px)`).matches
  if (prefersDefaultTab) {
    return
  }
  event.preventDefault()
  const featureStr = [
    `width=${deployWindow.width}`,
    `height=${deployWindow.height}`,
    'resizable=yes',
    'scrollbars=yes',
  ].join(',')
  const opened = window.open(deployUrl, deployWindow.name, featureStr)
  if (!opened) {
    openDeployInNewTab()
  }
}
