import { Navigate, Route, Routes } from 'react-router-dom'
import { RootLayout } from './components/layout/RootLayout'
import { CaseStudyPage } from './pages/case-study/CaseStudyPage'
import { HomePage } from './pages/home/HomePage'

const site = {
  title: 'SUMIN',
} as const

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout siteTitle={site.title} />}>
        <Route index element={<HomePage />} />
        <Route path="case-study/:slug" element={<CaseStudyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
