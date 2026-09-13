import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import AccountDeletionRequestPage from './pages/AccountDeletionRequestPage'
import TimelinePage from './pages/TimelinePage'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/roadmap" element={<Navigate to="/timeline" replace />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/account-deletion-request" element={<AccountDeletionRequestPage />} />
        <Route path="/delete-account" element={<Navigate to="/account-deletion-request" replace />} />
        <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
        <Route path="/founder" element={<Navigate to="/#founder" replace />} />
        <Route path="/lets-talk" element={<Navigate to="/#hey-there" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
