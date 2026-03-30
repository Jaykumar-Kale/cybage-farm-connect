import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import { CropCard, LoadingPage } from '../components/common/UI'

const SCHEMES_PREVIEW = [
  { name: 'PM-KISAN', nameM: 'पीएम किसान', icon: '💰', benefit: '₹6,000/year', color: 'border-green-400', link: '/schemes' },
  { name: 'Kisan Credit Card', nameM: 'किसान क्रेडिट कार्ड', icon: '💳', benefit: '4% interest loan', color: 'border-blue-400', link: '/schemes' },
  { name: 'PMFBY Insurance', nameM: 'फसल बीमा', icon: '🛡️', benefit: '2% premium only', color: 'border-red-400', link: '/schemes' },
  { name: 'eNAM Market', nameM: 'eNAM बाजार', icon: '🏪', benefit: 'Online mandi', color: 'border-yellow-400', link: '/schemes' },
]

const STATS = [
  { icon: '👨‍🌾', value: '1.2 Cr+', label: 'Registered Farmers', labelM: 'नोंदणीकृत शेतकरी' },
  { icon: '🏪', value: '8,500+', label: 'Active Vendors', labelM: 'सक्रिय विक्रेते' },
  { icon: '🌾', value: '50+', label: 'Crops Listed', labelM: 'पिके सूचीबद्ध' },
  { icon: '💰', value: '₹0', label: 'Commission / Fee', labelM: 'कोणताही दलाली नाही' },
]

export default function Home() {
  const { t, lang } = useLang()
  const { user } = useAuth()
  const [crops, setCrops] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/crops?limit=6').then(r => setCrops(r.data.slice(0, 6))).catch(() => {}).finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white overflow-hidden">
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        {/* Decorative crops */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 flex items-center justify-center opacity-20 text-[180px] select-none hidden md:flex">
          🌾
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-saffron-500/20 border border-saffron-400/40 text-saffron-300 px-4 py-1.5 rounded-full text-sm font-semibold font-display mb-6 animate-fade-up">
              <span className="w-2 h-2 bg-saffron-400 rounded-full animate-pulse" />
              🇮🇳 Jai Jawan Jai Kisan
            </div>

            <h1 className="font-display font-extrabold text-3xl md:text-5xl leading-tight mb-4 animate-fade-up anim-delay-1 opacity-0" style={{ animationFillMode: 'forwards' }}>
              {lang === 'mr' ? (
                <>शेतकरी ते विक्रेता<br /><span className="text-saffron-400">थेट बाजारपेठ</span></>
              ) : (
                <>Direct Farmer to<br /><span className="text-saffron-400">Vendor Marketplace</span></>
              )}
            </h1>
            <p className="text-primary-200 text-lg mb-2 animate-fade-up anim-delay-2 opacity-0" style={{ animationFillMode: 'forwards' }}>
              {lang === 'mr' ? 'दलाल नको. योग्य भाव मिळवा. एकत्र वाढूया.' : 'Eliminate middlemen. Get fair prices. Grow together.'}
            </p>
            <p className="text-primary-300 text-sm mb-8 animate-fade-up anim-delay-2 opacity-0" style={{ animationFillMode: 'forwards' }}>
              महाराष्ट्र आणि संपूर्ण भारतातील शेतकऱ्यांसाठी
            </p>

            <div className="flex flex-wrap gap-3 animate-fade-up anim-delay-3 opacity-0" style={{ animationFillMode: 'forwards' }}>
              <Link to="/marketplace" className="btn-secondary text-base px-7 py-3 shadow-lg">
                {t('hero_btn')} →
              </Link>
              {!user && (
                <Link to="/register" className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-7 py-3 rounded-lg transition-all font-display">
                  नोंदणी करा — Register
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <svg className="w-full" viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" fill="#f9fafb" />
        </svg>
      </section>

      {/* Stats bar */}
      <section className="bg-gray-50 py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <div key={i} className="text-center animate-fade-up" style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'forwards', opacity: 0 }}>
              <div className="text-3xl mb-1">{s.icon}</div>
              <div className="font-display font-bold text-2xl text-primary-700">{s.value}</div>
              <div className="text-gray-500 text-xs">{lang === 'mr' ? s.labelM : s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-block bg-primary-100 text-primary-700 font-semibold text-sm px-4 py-1 rounded-full mb-3 font-display">
            {lang === 'mr' ? 'हे कसे काम करते' : 'How It Works'}
          </div>
          <h2 className="section-title">
            {lang === 'mr' ? '३ सोप्या पायऱ्यांमध्ये' : 'In 3 Simple Steps'}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '01', icon: '👨‍🌾', title: lang === 'mr' ? 'शेतकरी नोंदणी करतो' : 'Farmer Registers', desc: lang === 'mr' ? 'शेतकरी मोफत नोंदणी करतो आणि थेट भाव पाहतो' : 'Farmer registers for free and views live buying prices' },
            { step: '02', icon: '🏪', title: lang === 'mr' ? 'विक्रेता भाव टाकतो' : 'Vendor Posts Prices', desc: lang === 'mr' ? 'मंजूर विक्रेते पीक खरेदी भाव प्रकाशित करतात' : 'Approved vendors publish crop buying prices transparently' },
            { step: '03', icon: '🤝', title: lang === 'mr' ? 'थेट व्यवहार होतो' : 'Direct Deal Happens', desc: lang === 'mr' ? 'शेतकरी संपर्क करतो आणि थेट सौदा होतो — कोणताही दलाल नाही' : 'Farmer contacts vendor directly — no middlemen involved' },
          ].map((s, i) => (
            <div key={i} className="card p-7 text-center hover:border-primary-200 border border-transparent group">
              <div className="text-5xl mb-4">{s.icon}</div>
              <div className="text-5xl font-bold text-primary-100 font-display mb-2 group-hover:text-primary-200 transition-colors">{s.step}</div>
              <h3 className="font-display font-bold text-lg text-gray-800 mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live Crop Prices */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-600 text-sm font-semibold font-display uppercase tracking-wide">Live</span>
              </div>
              <h2 className="section-title">{t('live_prices')}</h2>
              <p className="text-gray-500 text-sm mt-1">थेट पीक खरेदी भाव — विक्रेत्यांनी प्रकाशित केलेले</p>
            </div>
            <Link to="/marketplace" className="btn-outline hidden md:block">
              सर्व पाहा →
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-12"><div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" style={{ borderWidth: '3px' }} /></div>
          ) : crops.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <div className="text-5xl mb-3">🌾</div>
              <p className="font-display">No crop listings yet. Vendors will publish soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {crops.map(crop => <CropCard key={crop._id} crop={crop} />)}
            </div>
          )}
          <div className="text-center mt-6">
            <Link to="/marketplace" className="btn-primary">
              {lang === 'mr' ? 'सर्व पिके पाहा' : 'View All Crops'} →
            </Link>
          </div>
        </div>
      </section>

      {/* Govt Schemes Preview */}
      <section className="py-14 max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-block bg-saffron-100 text-saffron-700 font-semibold text-sm px-4 py-1 rounded-full mb-3 font-display">
            🇮🇳 {lang === 'mr' ? 'सरकारी योजना' : 'Government Schemes'}
          </div>
          <h2 className="section-title">{t('govt_schemes')}</h2>
          <p className="text-gray-500 text-sm mt-2">शेतकऱ्यांसाठी महत्त्वाच्या सरकारी योजना</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {SCHEMES_PREVIEW.map((s, i) => (
            <Link key={i} to={s.link} className={`card p-5 border-l-4 ${s.color} hover:scale-[1.02] transition-transform`}>
              <div className="text-3xl mb-3">{s.icon}</div>
              <h3 className="font-display font-bold text-gray-800 text-sm">{lang === 'mr' ? s.nameM : s.name}</h3>
              <p className="text-primary-600 font-semibold text-sm mt-1">{s.benefit}</p>
            </Link>
          ))}
        </div>
        <div className="text-center">
          <Link to="/schemes" className="btn-secondary">
            {lang === 'mr' ? 'सर्व योजना पाहा' : 'View All Schemes'} →
          </Link>
        </div>
      </section>

      {/* MSP Banner */}
      <section className="bg-gradient-to-r from-saffron-600 to-saffron-500 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-display font-bold text-2xl md:text-3xl mb-2">
              {lang === 'mr' ? 'MSP दर २०२४-२५ पाहा' : 'Check MSP Rates 2024-25'}
            </h2>
            <p className="text-saffron-100 text-sm">
              {lang === 'mr' ? 'सरकारने घोषित केलेले किमान आधारभूत किंमत' : 'Minimum Support Price announced by Govt of India — CCEA'}
            </p>
          </div>
          <Link to="/msp" className="bg-white text-saffron-700 font-bold font-display px-8 py-3 rounded-lg hover:bg-saffron-50 transition-colors shadow-lg whitespace-nowrap">
            MSP दर पाहा →
          </Link>
        </div>
      </section>

      {/* CTA */}
      {!user && (
        <section className="py-16 text-center max-w-2xl mx-auto px-4">
          <div className="text-5xl mb-4">🌱</div>
          <h2 className="section-title mb-3">
            {lang === 'mr' ? 'आजच FarmConnect मध्ये सामील व्हा' : 'Join FarmConnect Today'}
          </h2>
          <p className="text-gray-500 mb-8">
            {lang === 'mr' ? 'शेतकऱ्यांना थेट विक्रेत्याशी जोडणारे व्यासपीठ — मोफत नोंदणी' : 'The platform connecting farmers directly to vendors — free registration'}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/register" className="btn-primary px-8 py-3 text-base">
              {lang === 'mr' ? 'शेतकरी म्हणून नोंदणी करा' : 'Register as Farmer'}
            </Link>
            <Link to="/register?role=vendor" className="btn-secondary px-8 py-3 text-base">
              {lang === 'mr' ? 'विक्रेता म्हणून नोंदणी करा' : 'Register as Vendor'}
            </Link>
          </div>
        </section>
      )}
    </div>
  )
}
