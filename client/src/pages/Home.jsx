import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import { CropCard, Counter } from '../components/common/UI'

const STATS = [
  { val:'12000000', pre:'1.2', suf:'Cr+', en:'Registered Farmers', mr:'नोंदणीकृत शेतकरी' },
  { val:'8500',     pre:'8,500', suf:'+',  en:'Active Vendors',     mr:'सक्रिय विक्रेते' },
  { val:'50',       pre:'50',   suf:'+',  en:'Crops Listed',        mr:'पिके सूचीबद्ध' },
  { val:'0',        pre:'0',    suf:'%',  en:'Commission Charged',  mr:'कोणती दलाली नाही' },
]

const SCHEMES = [
  { name:'PM-KISAN', benefit:'₹6,000/year', en:'Direct income support', mr:'थेट उत्पन्न सहाय्य', c:'from-green-500 to-green-700' },
  { name:'KCC', benefit:'4% interest', en:'Subsidised crop loan', mr:'अनुदानित पीक कर्ज', c:'from-blue-500 to-blue-700' },
  { name:'PMFBY', benefit:'2% premium', en:'Crop insurance cover', mr:'पीक विमा', c:'from-red-500 to-red-700' },
  { name:'eNAM', benefit:'Online mandi', en:'Pan-India market', mr:'राष्ट्रीय बाजारपेठ', c:'from-amber-500 to-amber-600' },
]

export default function Home() {
  const { lang } = useLang()
  const { user } = useAuth()
  const [crops, setCrops] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/crops').then(r => setCrops(r.data.slice(0,6))).catch(()=>{}).finally(()=>setLoading(false))
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="relative page-hero overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{backgroundImage:'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',backgroundSize:'60px 60px'}}/>
        <div className="absolute -right-32 -top-32 w-[500px] h-[500px] rounded-full bg-brand-700/20 blur-3xl"/>
        <div className="absolute -left-20 bottom-0 w-72 h-72 rounded-full bg-saffron-500/10 blur-3xl"/>
        <div className="relative section py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 animate-slide-up">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"/>
              {lang==='mr'?'जय जवान जय किसान — शेतकरी शक्ती':'Jai Jawan Jai Kisan — Empowering Indian Farmers'}
            </div>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-5 opacity-0 animate-slide-up anim-d1" style={{animationFillMode:'forwards'}}>
              {lang==='mr'?<>शेतकरी ते विक्रेता<br/><span style={{background:'linear-gradient(135deg,#fdba74,#f97316)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>थेट बाजारपेठ</span></>:<>Direct Farmer to<br/><span style={{background:'linear-gradient(135deg,#fdba74,#f97316)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>Vendor Marketplace</span></>}
            </h1>
            <p className="text-brand-200 text-lg md:text-xl mb-2 leading-relaxed opacity-0 animate-slide-up anim-d2" style={{animationFillMode:'forwards'}}>{lang==='mr'?'दलाल नको. पारदर्शक भाव. थेट व्यवहार.':'No middlemen. Transparent pricing. Direct deals.'}</p>
            <p className="text-brand-400 text-sm mb-10 opacity-0 animate-slide-up anim-d2" style={{animationFillMode:'forwards'}}>{lang==='mr'?'महाराष्ट्र आणि संपूर्ण भारतातील शेतकऱ्यांसाठी':'For farmers across Maharashtra and India'}</p>
            <div className="flex flex-wrap gap-3 opacity-0 animate-slide-up anim-d3" style={{animationFillMode:'forwards'}}>
              <Link to="/marketplace" className="btn-secondary px-7 py-3.5 text-sm shadow-lg">
                {lang==='mr'?'थेट भाव पाहा':'View Live Prices'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </Link>
              {!user && <Link to="/register?tab=register" className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-7 py-3.5 rounded-xl transition-all text-sm">{lang==='mr'?'मोफत नोंदणी करा':'Register Free'}</Link>}
            </div>
          </div>
        </div>
        <svg className="w-full block -mb-1" viewBox="0 0 1440 64" fill="none"><path d="M0,48 C240,0 480,80 720,48 C960,16 1200,64 1440,32 L1440,64 L0,64 Z" fill="#f8fafc"/></svg>
      </section>

      {/* Stats */}
      <section className="bg-gray-50 border-b border-gray-200">
        <div className="section py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s,i) => (
              <div key={i} className="text-center opacity-0 animate-slide-up" style={{animationDelay:`${i*0.08}s`,animationFillMode:'forwards'}}>
                <div className="text-3xl md:text-4xl font-heading font-extrabold text-brand-700 mb-1">
                  <Counter value={s.pre} suffix={s.suf}/>
                </div>
                <div className="text-xs text-gray-500 font-medium">{lang==='mr'?s.mr:s.en}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section py-16 md:py-20">
        <div className="text-center mb-12">
          <div className="inline-block text-xs font-semibold text-brand-600 bg-brand-50 border border-brand-200 px-4 py-1.5 rounded-full mb-3 tracking-wider uppercase">{lang==='mr'?'हे कसे काम करते':'How It Works'}</div>
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-gray-900">{lang==='mr'?'तीन सोप्या पायऱ्यांमध्ये':'Three Simple Steps'}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {n:'01',en:'Farmer Registers',mr:'शेतकरी नोंदणी करतो',den:'Register free and browse live crop buying prices from verified vendors.',dmr:'मोफत नोंदणी करा आणि विक्रेत्यांचे थेट भाव पाहा.'},
            {n:'02',en:'Vendor Posts Prices',mr:'विक्रेता भाव टाकतो',den:'Approved vendors publish transparent crop buying prices with location.',dmr:'मंजूर विक्रेते पारदर्शक पीक खरेदी भाव प्रकाशित करतात.'},
            {n:'03',en:'Direct Deal Happens',mr:'थेट व्यवहार होतो',den:'Farmer contacts vendor directly — no middleman, fair price guaranteed.',dmr:'शेतकरी थेट विक्रेत्याशी संपर्क करतो — कोणताही दलाल नाही.'},
          ].map((s,i) => (
            <div key={i} className="card p-7 text-center hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 mx-auto mb-5 flex items-center justify-center shadow-md">
                <span className="font-heading font-bold text-white text-lg">{s.n}</span>
              </div>
              <h3 className="font-heading font-bold text-gray-900 text-lg mb-2">{lang==='mr'?s.mr:s.en}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{lang==='mr'?s.dmr:s.den}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Live Prices */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="section">
          <div className="flex items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/><span className="text-xs font-semibold text-green-600 uppercase tracking-wider">Live</span></div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-gray-900">{lang==='mr'?'थेट पीक खरेदी भाव':'Live Crop Buying Prices'}</h2>
              <p className="text-sm text-gray-500 mt-1">{lang==='mr'?'विक्रेत्यांनी प्रकाशित केलेले':'Published directly by verified vendors'}</p>
            </div>
            <Link to="/marketplace" className="btn-outline text-sm shrink-0 hidden md:flex">{lang==='mr'?'सर्व पाहा':'View All'}<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg></Link>
          </div>
          {loading
            ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">{[...Array(6)].map((_,i)=><div key={i} className="card p-5 space-y-3"><div className="shimmer h-5 rounded w-3/4"/><div className="shimmer h-16 rounded"/><div className="shimmer h-4 rounded w-1/2"/></div>)}</div>
            : crops.length===0
              ? <div className="text-center py-16 text-gray-400"><div className="w-16 h-16 rounded-2xl bg-gray-100 mx-auto mb-4"/><p className="font-semibold text-gray-600">{lang==='mr'?'अजून कोणते भाव उपलब्ध नाही':'No prices available yet'}</p></div>
              : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">{crops.map(c=><CropCard key={c._id} crop={c} lang={lang}/>)}</div>}
          <div className="text-center mt-8"><Link to="/marketplace" className="btn-primary">{lang==='mr'?'सर्व पिके पाहा':'View All Crops'}</Link></div>
        </div>
      </section>

      {/* Schemes preview */}
      <section className="section py-16 md:py-20">
        <div className="text-center mb-10">
          <div className="inline-block text-xs font-semibold text-saffron-600 bg-saffron-50 border border-saffron-200 px-4 py-1.5 rounded-full mb-3 tracking-wider uppercase">{lang==='mr'?'सरकारी योजना':'Government Schemes'}</div>
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-gray-900">{lang==='mr'?'शेतकऱ्यांसाठी महत्त्वाच्या योजना':'Important Schemes for Farmers'}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {SCHEMES.map((s,i)=>(
            <Link key={i} to="/schemes" className="card p-5 hover:-translate-y-1 transition-transform">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.c} mb-4 shadow-sm`}/>
              <h3 className="font-heading font-bold text-gray-900 text-sm mb-1">{s.name}</h3>
              <div className="font-bold text-lg text-brand-700 font-heading mb-1">{s.benefit}</div>
              <p className="text-xs text-gray-500">{lang==='mr'?s.mr:s.en}</p>
            </Link>
          ))}
        </div>
        <div className="text-center"><Link to="/schemes" className="btn-secondary">{lang==='mr'?'सर्व योजना पाहा':'View All Schemes'}</Link></div>
      </section>

      {/* MSP banner */}
      <section className="mx-4 sm:mx-6 md:mx-auto max-w-7xl mb-16 rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-saffron-600 to-saffron-500 text-white px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-saffron-100 text-xs font-semibold uppercase tracking-wider mb-2">CCEA Announced 2024-25</div>
            <h3 className="font-heading font-bold text-2xl md:text-3xl mb-2">{lang==='mr'?'MSP दर २०२४-२५ पाहा':'Check MSP Rates 2024-25'}</h3>
            <p className="text-saffron-100 text-sm">{lang==='mr'?'सरकारने घोषित केलेले खरीप व रब्बी पिकांचे MSP दर':'Government declared MSP for Kharif & Rabi crops — CCEA'}</p>
          </div>
          <Link to="/msp" className="bg-white text-saffron-700 hover:bg-saffron-50 font-bold font-heading px-6 sm:px-8 py-3.5 rounded-xl transition-colors shadow-lg whitespace-nowrap shrink-0 text-sm w-full sm:w-auto text-center">{lang==='mr'?'MSP दर पाहा':'View MSP Rates'}</Link>
        </div>
      </section>

      {/* CTA */}
      {!user && (
        <section className="page-hero py-16 md:py-20">
          <div className="section text-center">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">{lang==='mr'?'आजच FarmConnect मध्ये सामील व्हा':'Join FarmConnect Today'}</h2>
            <p className="text-brand-300 mb-8 text-sm max-w-lg mx-auto">{lang==='mr'?'मोफत नोंदणी करा आणि थेट विक्रेत्यांकडून पीक खरेदी भाव मिळवा.':'Register free and get direct access to crop buying prices from verified vendors.'}</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/register?tab=register&role=farmer" className="btn-secondary px-8 py-3.5 text-sm shadow-lg">{lang==='mr'?'शेतकरी म्हणून नोंदणी':'Register as Farmer'}</Link>
              <Link to="/register?tab=register&role=vendor" className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-8 py-3.5 rounded-xl transition-all text-sm">{lang==='mr'?'विक्रेता म्हणून नोंदणी':'Register as Vendor'}</Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
