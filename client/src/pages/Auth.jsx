import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import toast from 'react-hot-toast'

const STATES = ['Maharashtra','Punjab','Haryana','Uttar Pradesh','Gujarat','Madhya Pradesh','Rajasthan','Karnataka','Andhra Pradesh','Tamil Nadu','West Bengal','Bihar','Odisha','Telangana']

export default function Auth() {
  const [sp] = useSearchParams()
  const [tab, setTab] = useState(sp.get('tab') || 'login')
  const [role, setRole] = useState(sp.get('role') || 'farmer')
  const [form, setForm] = useState({ name:'', email:'', password:'', phone:'', state:'Maharashtra', district:'' })
  const [loading, setLoading] = useState(false)
  const { login, register, user } = useAuth()
  const { lang } = useLang()
  const nav = useNavigate()
  const set = (k,v) => setForm(f => ({...f,[k]:v}))

  useEffect(() => { if (user) nav('/dashboard') }, [user])
  useEffect(() => { if (sp.get('role')) { setTab('register'); setRole(sp.get('role')) } }, [sp])

  const handleLogin = async e => {
    e.preventDefault(); setLoading(true)
    try { await login(form.email, form.password); toast.success('Welcome back!'); nav('/dashboard') }
    catch(err) { toast.error(err.response?.data?.message || 'Invalid credentials') }
    finally { setLoading(false) }
  }

  const handleRegister = async e => {
    e.preventDefault(); setLoading(true)
    try {
      const res = await register({...form, role})
      toast.success(res.message)
      if (role === 'farmer') { await login(form.email, form.password); nav('/dashboard') }
      else setTab('login')
    } catch(err) { toast.error(err.response?.data?.message || 'Registration failed') }
    finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 flex items-center justify-center py-12 px-4 relative">
      <div className="absolute inset-0 opacity-[0.05]" style={{backgroundImage:'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',backgroundSize:'40px 40px'}}/>
      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="w-14 h-14 rounded-2xl bg-brand-600 flex items-center justify-center shadow-lg mx-auto mb-3">
              <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-white" stroke="currentColor" strokeWidth={1.8}><path d="M7 10s1-4 5-4 5 4 5 4" strokeLinecap="round"/><path d="M5 17s2-3 7-3 7 3 7 3" strokeLinecap="round"/></svg>
            </div>
          </Link>
          <h1 className="font-heading font-bold text-2xl text-white">FarmConnect</h1>
          <p className="text-brand-300 text-sm mt-1">शेतकरी-विक्रेता थेट बाजार</p>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex border-b border-gray-100">
            {['login','register'].map(t2 => (
              <button key={t2} onClick={()=>setTab(t2)} className={`flex-1 py-4 text-sm font-semibold font-heading transition-colors ${tab===t2?'text-brand-700 border-b-2 border-brand-600 bg-brand-50/50':'text-gray-400 hover:text-gray-600'}`}>
                {t2==='login'?(lang==='mr'?'लॉगिन':'Sign In'):(lang==='mr'?'नोंदणी':'Register')}
              </button>
            ))}
          </div>
          <div className="p-6 md:p-8">
            {tab==='login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div><label className="label">{lang==='mr'?'ईमेल':'Email'}</label><input type="email" required value={form.email} onChange={e=>set('email',e.target.value)} className="input" placeholder="your@email.com"/></div>
                <div><label className="label">{lang==='mr'?'पासवर्ड':'Password'}</label><input type="password" required value={form.password} onChange={e=>set('password',e.target.value)} className="input" placeholder="••••••••"/></div>
                <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 justify-center mt-2 disabled:opacity-50">{loading?'Signing in...':(lang==='mr'?'लॉगिन करा':'Sign In')}</button>
                <p className="text-center text-xs text-gray-400">{lang==='mr'?'खाते नाही?':"Don't have an account?"} <button type="button" onClick={()=>setTab('register')} className="text-brand-600 font-semibold hover:underline">{lang==='mr'?'नोंदणी करा':'Register'}</button></p>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-center"><p className="text-xs text-blue-600 font-medium">Admin: admin@farmconnect.in</p><p className="text-xs text-blue-400">Password: Admin@1234</p></div>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="label">{lang==='mr'?'मी आहे':'I am a'}</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[['farmer',lang==='mr'?'शेतकरी':'Farmer'],['vendor',lang==='mr'?'विक्रेता':'Vendor']].map(([r,l])=>(
                      <button type="button" key={r} onClick={()=>setRole(r)} className={`py-3 rounded-xl border-2 text-sm font-semibold font-heading transition-all ${role===r?'border-brand-600 bg-brand-50 text-brand-700':'border-gray-200 text-gray-500 hover:border-gray-300'}`}>{l}</button>
                    ))}
                  </div>
                  {role==='vendor' && <p className="mt-2 text-xs text-saffron-700 bg-saffron-50 border border-saffron-200 rounded-xl p-3">{lang==='mr'?'विक्रेता नोंदणीसाठी प्रशासक मंजुरी लागते.':'Vendor accounts require admin approval.'}</p>}
                </div>
                <div><label className="label">{lang==='mr'?'पूर्ण नाव':'Full Name'}</label><input type="text" required value={form.name} onChange={e=>set('name',e.target.value)} className="input" placeholder={lang==='mr'?'तुमचे पूर्ण नाव':'Your full name'}/></div>
                <div><label className="label">{lang==='mr'?'ईमेल':'Email'}</label><input type="email" required value={form.email} onChange={e=>set('email',e.target.value)} className="input" placeholder="your@email.com"/></div>
                <div><label className="label">{lang==='mr'?'फोन':'Phone'}</label><input type="tel" value={form.phone} onChange={e=>set('phone',e.target.value)} className="input" placeholder="9876543210"/></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div><label className="label">{lang==='mr'?'राज्य':'State'}</label><select value={form.state} onChange={e=>set('state',e.target.value)} className="input">{STATES.map(s=><option key={s}>{s}</option>)}</select></div>
                  <div><label className="label">{lang==='mr'?'जिल्हा':'District'}</label><input type="text" value={form.district} onChange={e=>set('district',e.target.value)} className="input" placeholder={lang==='mr'?'जिल्हा':'District'}/></div>
                </div>
                <div><label className="label">{lang==='mr'?'पासवर्ड':'Password'}</label><input type="password" required minLength={6} value={form.password} onChange={e=>set('password',e.target.value)} className="input" placeholder="Min. 6 characters"/></div>
                <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 justify-center mt-1 disabled:opacity-50">{loading?'Creating...':(lang==='mr'?'नोंदणी करा':'Create Account')}</button>
                <p className="text-center text-xs text-gray-400">{lang==='mr'?'आधीच खाते आहे?':'Already have an account?'} <button type="button" onClick={()=>setTab('login')} className="text-brand-600 font-semibold hover:underline">{lang==='mr'?'लॉगिन करा':'Sign In'}</button></p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
