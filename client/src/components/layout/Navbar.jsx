import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useLang } from '../../context/LangContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { t, lang, toggleLang } = useLang()
  const loc = useLocation()
  const nav = useNavigate()
  const [open, setOpen] = useState(false)
  const active = p => loc.pathname === p

  const links = [
    { to:'/', label:t('home') },
    { to:'/marketplace', label:t('marketplace') },
    { to:'/schemes', label:t('schemes') },
    { to:'/msp', label:t('msp') },
    { to:'/forum', label:t('forum') },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="gov-stripe"/>
      {/* top bar */}
      <div className="bg-brand-950 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <span className="opacity-70 hidden sm:block tracking-wide">FarmConnect — शेतकरी-विक्रेता थेट बाजार | Jai Jawan Jai Kisan</span>
          <div className="flex items-center gap-3">
            <span className="opacity-50 hidden md:block">Helpline: 1800-180-1551</span>
            <button onClick={toggleLang} className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs px-3 py-1 rounded-full transition-colors tracking-wider">{lang==='mr'?'EN':'मर'}</button>
          </div>
        </div>
      </div>
      {/* main nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 flex items-center justify-center shadow-sm">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth={1.8}>
              <path d="M7 10s1-4 5-4 5 4 5 4" strokeLinecap="round"/>
              <path d="M5 17s2-3 7-3 7 3 7 3" strokeLinecap="round"/>
              <circle cx="12" cy="12" r="1" fill="currentColor"/>
            </svg>
          </div>
          <div>
            <div className="font-heading font-bold text-lg text-brand-900 leading-none">FarmConnect</div>
            <div className="text-xs text-saffron-600 font-medium">शेतकरी बाजारपेठ</div>
          </div>
        </Link>

        {/* desktop links */}
        <div className="hidden lg:flex items-center gap-0.5">
          {links.map(l => (
            <Link key={l.to} to={l.to} className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors font-heading ${active(l.to)?'bg-brand-50 text-brand-700 font-semibold':'text-gray-600 hover:text-brand-700 hover:bg-gray-50'}`}>{l.label}</Link>
          ))}
        </div>

        {/* auth */}
        <div className="hidden lg:flex items-center gap-2">
          {user ? (
            <>
              <Link to="/dashboard" className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-colors ${active('/dashboard')?'bg-brand-50 text-brand-700':'text-gray-600 hover:bg-gray-50'}`}>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-sm shadow-sm">{user.name?.[0]?.toUpperCase()}</div>
                <div>
                  <div className="text-xs font-semibold text-gray-800 leading-none">{user.name?.split(' ')[0]}</div>
                  <div className={`text-xs font-medium mt-0.5 ${user.role==='admin'?'text-red-500':user.role==='vendor'?'text-saffron-600':'text-brand-600'}`}>{t(user.role)}</div>
                </div>
              </Link>
              <button onClick={()=>{logout();nav('/')}} className="btn-ghost text-red-500 hover:bg-red-50 hover:text-red-600 text-sm">{t('logout')}</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost">{t('login')}</Link>
              <Link to="/register?tab=register" className="btn-primary">{t('register')}</Link>
            </>
          )}
        </div>

        {/* hamburger */}
        <button onClick={()=>setOpen(!open)} className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl text-gray-600 hover:bg-gray-100">
          {open
            ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>}
        </button>
      </nav>

      {/* mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-4 pb-4 animate-fade-in">
          <div className="py-2 space-y-0.5">
            {links.map(l => <Link key={l.to} to={l.to} onClick={()=>setOpen(false)} className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${active(l.to)?'bg-brand-50 text-brand-700 font-semibold':'text-gray-600'}`}>{l.label}</Link>)}
          </div>
          <div className="pt-3 border-t border-gray-100 flex gap-2">
            {user
              ? <><Link to="/dashboard" onClick={()=>setOpen(false)} className="btn-outline flex-1 text-center text-sm py-2.5">{t('dashboard')}</Link>
                  <button onClick={()=>{logout();nav('/');setOpen(false)}} className="flex-1 text-sm text-red-500 border border-red-200 rounded-xl py-2.5 font-medium hover:bg-red-50">{t('logout')}</button></>
              : <><Link to="/login" onClick={()=>setOpen(false)} className="btn-outline flex-1 text-center text-sm py-2.5">{t('login')}</Link>
                  <Link to="/register?tab=register" onClick={()=>setOpen(false)} className="btn-primary flex-1 text-center text-sm py-2.5">{t('register')}</Link></>}
          </div>
        </div>
      )}
    </header>
  )
}
