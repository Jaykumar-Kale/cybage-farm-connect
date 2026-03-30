import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import toast from 'react-hot-toast'

const STATES = ['Maharashtra', 'Punjab', 'Haryana', 'Uttar Pradesh', 'Gujarat', 'Madhya Pradesh', 'Rajasthan', 'Karnataka', 'Andhra Pradesh', 'Tamil Nadu', 'West Bengal', 'Bihar', 'Odisha', 'Telangana', 'Jharkhand', 'Chhattisgarh', 'Assam', 'Himachal Pradesh', 'Uttarakhand', 'Kerala']

export default function AuthPage() {
  const [searchParams] = useSearchParams()
  const defaultRole = searchParams.get('role') || 'farmer'
  const [tab, setTab] = useState('login') // login | register
  const [role, setRole] = useState(defaultRole)
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', state: 'Maharashtra', district: '' })
  const [loading, setLoading] = useState(false)
  const { login, register, user } = useAuth()
  const { t, lang } = useLang()
  const navigate = useNavigate()

  useEffect(() => { if (user) navigate('/dashboard') }, [user])
  useEffect(() => { if (searchParams.get('role')) { setTab('register'); setRole(searchParams.get('role')) } }, [searchParams])

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const u = await login(form.email, form.password)
      toast.success(`${lang === 'mr' ? 'स्वागत' : 'Welcome'}, ${u.name}! 🌾`)
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally { setLoading(false) }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await register({ ...form, role })
      toast.success(res.message)
      if (role === 'farmer') {
        await login(form.email, form.password)
        navigate('/dashboard')
      } else {
        setTab('login')
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-700 rounded-2xl shadow-lg mb-3">
            <span className="text-3xl">🌾</span>
          </div>
          <h1 className="font-display font-bold text-2xl text-primary-800">FarmConnect</h1>
          <p className="text-gray-500 text-sm mt-1">शेतकरी-विक्रेता थेट बाजार</p>
        </div>

        <div className="card overflow-hidden">
          {/* Tab header */}
          <div className="flex border-b border-gray-200">
            {['login', 'register'].map(t2 => (
              <button
                key={t2}
                onClick={() => setTab(t2)}
                className={`flex-1 py-4 font-display font-semibold text-sm transition-colors ${
                  tab === t2 ? 'bg-primary-50 text-primary-700 border-b-2 border-primary-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {t2 === 'login' ? t('login') : t('register')}
              </button>
            ))}
          </div>

          <div className="p-6">
            {tab === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 font-display">{t('email')}</label>
                  <input type="email" required value={form.email} onChange={e => set('email', e.target.value)}
                    className="input-field" placeholder="yourname@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 font-display">{t('password')}</label>
                  <input type="password" required value={form.password} onChange={e => set('password', e.target.value)}
                    className="input-field" placeholder="••••••••" />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full py-3 mt-2 text-base disabled:opacity-50">
                  {loading ? '...' : t('login')}
                </button>
                <p className="text-center text-sm text-gray-500">
                  {lang === 'mr' ? 'खाते नाही?' : "Don't have an account?"}{' '}
                  <button type="button" onClick={() => setTab('register')} className="text-primary-600 font-semibold hover:underline">{t('register')}</button>
                </p>
                {/* Admin hint */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-600 text-center">
                  <strong>Admin:</strong> admin@farmconnect.in / Admin@1234
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                {/* Role selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 font-display">
                    {lang === 'mr' ? 'मी आहे' : 'I am a'}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[['farmer', '👨‍🌾', t('farmer')], ['vendor', '🏪', t('vendor')]].map(([r, icon, label]) => (
                      <button
                        type="button" key={r}
                        onClick={() => setRole(r)}
                        className={`flex items-center gap-2 justify-center py-3 rounded-lg border-2 font-display font-semibold text-sm transition-all ${
                          role === r ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-xl">{icon}</span> {label}
                      </button>
                    ))}
                  </div>
                  {role === 'vendor' && (
                    <div className="mt-2 bg-saffron-50 border border-saffron-200 rounded-lg p-2.5 text-xs text-saffron-700 font-medium">
                      ⚠️ {lang === 'mr' ? 'विक्रेता नोंदणीसाठी प्रशासक मंजुरी लागते' : 'Vendor registration requires admin approval before accessing the platform.'}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 font-display">{t('name')}</label>
                  <input type="text" required value={form.name} onChange={e => set('name', e.target.value)}
                    className="input-field" placeholder={lang === 'mr' ? 'पूर्ण नाव लिहा' : 'Your full name'} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 font-display">{t('email')}</label>
                  <input type="email" required value={form.email} onChange={e => set('email', e.target.value)}
                    className="input-field" placeholder="yourname@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 font-display">{t('phone')}</label>
                  <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
                    className="input-field" placeholder="9876543210" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 font-display">{t('state')}</label>
                    <select value={form.state} onChange={e => set('state', e.target.value)} className="input-field">
                      {STATES.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 font-display">{t('district')}</label>
                    <input type="text" value={form.district} onChange={e => set('district', e.target.value)}
                      className="input-field" placeholder={lang === 'mr' ? 'जिल्हा' : 'District'} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 font-display">{t('password')}</label>
                  <input type="password" required minLength={6} value={form.password} onChange={e => set('password', e.target.value)}
                    className="input-field" placeholder="Min 6 characters" />
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base disabled:opacity-50">
                  {loading ? '...' : (role === 'vendor' ? (lang === 'mr' ? 'विक्रेता म्हणून नोंदणी करा' : 'Register as Vendor') : (lang === 'mr' ? 'शेतकरी म्हणून नोंदणी करा' : 'Register as Farmer'))}
                </button>
                <p className="text-center text-sm text-gray-500">
                  {lang === 'mr' ? 'आधीच खाते आहे?' : 'Already have an account?'}{' '}
                  <button type="button" onClick={() => setTab('login')} className="text-primary-600 font-semibold hover:underline">{t('login')}</button>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
