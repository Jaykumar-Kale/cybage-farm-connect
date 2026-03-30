import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useLang } from '../../context/LangContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { t, lang, toggleLang } = useLang()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => { logout(); navigate('/') }
  const isActive = (path) => location.pathname === path

  const navLinks = [
    { path: '/', label: t('home') },
    { path: '/marketplace', label: t('marketplace') },
    { path: '/schemes', label: t('schemes') },
    { path: '/msp', label: t('msp') },
    { path: '/forum', label: t('forum') },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      {/* Tricolor stripe */}
      <div className="gov-stripe" />

      {/* Top bar */}
      <div className="bg-primary-800 text-white text-xs py-1 px-4 flex items-center justify-between">
        <span className="font-display font-medium">🌾 FarmConnect — शेतकरी-विक्रेता थेट बाजार</span>
        <div className="flex items-center gap-3">
          <span>Helpline: 1800-180-1551</span>
          <button
            onClick={toggleLang}
            className="bg-saffron-500 hover:bg-saffron-400 text-white text-xs font-bold px-3 py-0.5 rounded-full transition-colors"
          >
            {lang === 'mr' ? 'EN' : 'मर'}
          </button>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center shadow-sm group-hover:shadow transition-shadow">
            <span className="text-xl">🌾</span>
          </div>
          <div>
            <div className="font-display font-bold text-xl text-primary-800 leading-none">FarmConnect</div>
            <div className="text-xs text-saffron-600 font-medium font-display">शेतकरी बाजारपेठ</div>
          </div>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 rounded-lg text-sm font-semibold font-display transition-all duration-150 ${
                isActive(link.path)
                  ? 'bg-primary-50 text-primary-700 border border-primary-200'
                  : 'text-gray-600 hover:text-primary-700 hover:bg-gray-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Auth section */}
        <div className="hidden lg:flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/dashboard" className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold font-display transition-all ${
                isActive('/dashboard') ? 'bg-primary-50 text-primary-700' : 'text-gray-600 hover:bg-gray-50'
              }`}>
                <div className="w-7 h-7 rounded-full bg-primary-100 border-2 border-primary-300 flex items-center justify-center text-xs font-bold text-primary-700">
                  {user.name?.[0]?.toUpperCase()}
                </div>
                <span>{user.name?.split(' ')[0]}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                  user.role === 'admin' ? 'bg-red-100 text-red-600' :
                  user.role === 'vendor' ? 'bg-saffron-100 text-saffron-700' :
                  'bg-primary-100 text-primary-700'
                }`}>
                  {user.role === 'admin' ? t('admin') : user.role === 'vendor' ? t('vendor') : t('farmer')}
                </span>
              </Link>
              <button onClick={handleLogout} className="btn-outline text-sm py-2 px-4">{t('logout')}</button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="btn-outline text-sm py-2">{t('login')}</Link>
              <Link to="/register" className="btn-primary text-sm py-2">{t('register')}</Link>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 pb-4 animate-fade-in">
          <nav className="flex flex-col gap-1 pt-2">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-semibold font-display ${
                  isActive(link.path) ? 'bg-primary-50 text-primary-700' : 'text-gray-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-2 border-gray-100" />
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="px-4 py-3 rounded-lg text-sm font-semibold text-gray-600 font-display">{t('dashboard')}</Link>
                <button onClick={() => { handleLogout(); setMenuOpen(false) }} className="btn-outline text-sm text-left px-4">{t('logout')}</button>
              </>
            ) : (
              <div className="flex gap-2 pt-1">
                <Link to="/login" onClick={() => setMenuOpen(false)} className="btn-outline text-sm flex-1 text-center">{t('login')}</Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="btn-primary text-sm flex-1 text-center">{t('register')}</Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
