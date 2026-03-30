import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'
import { LangProvider } from './context/LangContext'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

import Home from './pages/Home'
import Auth from './pages/Auth'
import Marketplace from './pages/Marketplace'
import Schemes from './pages/Schemes'
import MSP from './pages/MSP'
import Forum from './pages/Forum'
import Dashboard from './pages/Dashboard'

function ProtectedRoute({ children, roles }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />
  if (roles && !roles.includes(user.role)) return <Navigate to="/dashboard" replace />
  return children
}

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/schemes" element={<Schemes />} />
          <Route path="/msp" element={<MSP />} />
          <Route path="/forum" element={<Forum />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
              <div className="text-6xl mb-4">🌾</div>
              <h1 className="font-display font-bold text-3xl text-gray-700 mb-2">404 — Page Not Found</h1>
              <p className="text-gray-400 mb-6">हे पान अस्तित्वात नाही</p>
              <a href="/" className="btn-primary">← Go Home</a>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <LangProvider>
        <AuthProvider>
          <AppLayout />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                fontFamily: "'Hind', sans-serif",
                fontSize: '14px',
                borderRadius: '10px',
                border: '1px solid #e5e7eb',
              },
              success: { iconTheme: { primary: '#16a34a', secondary: '#fff' } },
              error: { iconTheme: { primary: '#dc2626', secondary: '#fff' } },
            }}
          />
        </AuthProvider>
      </LangProvider>
    </BrowserRouter>
  )
}
