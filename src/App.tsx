import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { About } from './pages/About'
import { Analyzing } from './pages/Analyzing'
import { Home } from './pages/Home'
import { Result } from './pages/Result'
import { Test } from './pages/Test'

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/analyzing" element={<Analyzing />} />
        <Route path="/result/:id" element={<Result />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  )
}
