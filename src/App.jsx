import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { ToastProvider } from '@/contexts/ToastContext'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { ToastContainer } from '@/components/ui/toast'
import { Login } from '@/pages/Login'
import { Dashboard } from '@/pages/Dashboard'
import { TopUp } from '@/pages/TopUp'
import { Transfer } from '@/pages/Transfer'
import { History } from '@/pages/History'
import { Profile } from '@/pages/Profile'
import { Settings } from '@/pages/Settings'

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/topup" element={<TopUp />} />
                <Route path="/transfer" element={<Transfer />} />
                <Route path="/history" element={<History />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
            <ToastContainer />
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
