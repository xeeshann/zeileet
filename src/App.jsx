import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import FounderPage from './pages/FounderPage'
import LetsTalkPage from './pages/LetsTalkPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/founder" element={<FounderPage />} />
      <Route path="/lets-talk" element={<LetsTalkPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
