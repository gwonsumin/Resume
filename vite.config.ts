import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * GitHub Pages는 존재하지 않는 경로에 대해 404.html을 응답 본문으로 돌려줍니다.
 * React Router 등 SPA는 index.html과 동일한 404.html이 있어야 직접 URL/새로고침이 동작합니다.
 */
function spaFallback404(): Plugin {
  let outDir = 'dist'
  return {
    name: 'spa-fallback-404',
    configResolved(config) {
      outDir = config.build.outDir
    },
    closeBundle() {
      const indexHtml = resolve(process.cwd(), outDir, 'index.html')
      const notFoundHtml = resolve(process.cwd(), outDir, '404.html')
      copyFileSync(indexHtml, notFoundHtml)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/Resume/',
  plugins: [react(), spaFallback404()],
})
