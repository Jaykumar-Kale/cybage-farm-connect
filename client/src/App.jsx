import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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

function Protected({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace/>
}

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <main className="flex-1">{children}</main>
      <Footer/>
    </div>
  )
}

function AuthLayout({ children }) {
  return <>{children}</>
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LangProvider>
          <Toaster position="top-right" toastOptions={{ style: { fontFamily: 'DM Sans, sans-serif', borderRadius: '12px', fontSize: '14px' }, success: { iconTheme: { primary: '#16a34a', secondary: '#fff' } } }}/>
          <Routes>
            <Route path="/" element={<Layout><Home/></Layout>}/>
            <Route path="/marketplace" element={<Layout><Marketplace/></Layout>}/>
            <Route path="/schemes" element={<Layout><Schemes/></Layout>}/>
            <Route path="/msp" element={<Layout><MSP/></Layout>}/>
            <Route path="/forum" element={<Layout><Forum/></Layout>}/>
            <Route path="/login" element={<AuthLayout><Auth/></AuthLayout>}/>
            <Route path="/register" element={<AuthLayout><Auth/></AuthLayout>}/>
            <Route path="/dashboard" element={<Protected><Layout><Dashboard/></Layout></Protected>}/>
            <Route path="*" element={<Navigate to="/" replace/>}/>
          </Routes>
        </LangProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
