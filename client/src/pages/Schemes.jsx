import { useState, useEffect } from 'react'
import api from '../utils/api'
import { useLang } from '../context/LangContext'
import { PageHeader } from '../components/common/UI'

const CATS = [{k:'all',en:'All',mr:'सर्व'},{k:'income-support',en:'Income Support',mr:'उत्पन्न सहाय्य'},{k:'credit',en:'Credit & Loans',mr:'कर्ज'},{k:'insurance',en:'Insurance',mr:'विमा'},{k:'market',en:'Market Access',mr:'बाजार'},{k:'irrigation',en:'Irrigation',mr:'सिंचाई'},{k:'organic',en:'Organic Farming',mr:'जैविक'},{k:'state',en:'State Schemes',mr:'राज्य योजना'}]

function SchemeCard({ s, lang }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="card overflow-hidden">
      <div className="h-1.5 rounded-t-none" style={{background:s.color||'#16a34a'}}/>
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-11 h-11 rounded-xl shrink-0 flex items-center justify-center shadow-sm" style={{background:s.color||'#16a34a'}}>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-400 mb-0.5">{s.ministry}</p>
            <h3 className="font-heading font-bold text-gray-900 leading-tight">{lang==='mr'?s.fullNameMarathi:s.fullName}</h3>
            <p className="text-xs text-gray-500 mt-0.5 font-medium">{s.name}</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">{lang==='mr'?s.descriptionMarathi:s.description}</p>
        <div className="bg-gray-50 rounded-xl p-3.5 mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Key Benefits</p>
          <ul className="space-y-1.5">
            {s.benefits?.slice(0,3).map((b,i)=><li key={i} className="text-xs text-gray-700 flex items-start gap-2"><span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-white text-xs font-bold" style={{background:s.color||'#16a34a'}}>✓</span>{b}</li>)}
          </ul>
        </div>
        {open && (
          <div className="space-y-4 animate-fade-in mb-4">
            <div><p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{lang==='mr'?'पात्रता':'Eligibility'}</p><ul className="space-y-1">{s.eligibility?.map((e,i)=><li key={i} className="text-xs text-gray-600 flex items-start gap-2"><span className="text-gray-400 mt-0.5">—</span>{e}</li>)}</ul></div>
            <div><p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{lang==='mr'?'कागदपत्रे':'Documents'}</p><div className="flex flex-wrap gap-2">{s.documents?.map((d,i)=><span key={i} className="text-xs bg-gray-100 text-gray-600 border border-gray-200 px-2.5 py-1 rounded-full">{d}</span>)}</div></div>
            <div className="bg-saffron-50 border border-saffron-200 rounded-xl p-3.5"><p className="text-xs font-semibold text-saffron-700 uppercase tracking-wider mb-1">{lang==='mr'?'अर्ज कसा करावा':'How to Apply'}</p><p className="text-xs text-saffron-800">{s.howToApply}</p></div>
          </div>
        )}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <button onClick={()=>setOpen(!open)} className="text-xs font-semibold transition-colors" style={{color:s.color||'#16a34a'}}>{open?(lang==='mr'?'कमी दाखवा':'Show Less'):(lang==='mr'?'अधिक माहिती':'More Details')}</button>
          <a href={s.link} target="_blank" rel="noopener noreferrer" className="ml-auto btn-primary text-xs py-2 px-4" style={{background:s.color||''}}>{lang==='mr'?'अर्ज करा':'Apply Now'}<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg></a>
        </div>
      </div>
    </div>
  )
}

export default function Schemes() {
  const { lang } = useLang()
  const [schemes, setSchemes] = useState([])
  const [loading, setLoading] = useState(true)
  const [cat, setCat] = useState('all')
  useEffect(() => { api.get('/schemes').then(r=>setSchemes(r.data)).finally(()=>setLoading(false)) }, [])
  const filtered = cat==='all' ? schemes : schemes.filter(s=>s.category===cat)
  return (
    <div>
      <PageHeader title={lang==='mr'?'सरकारी योजना — शेतकऱ्यांसाठी':'Govt Schemes for Farmers'} subtitle={lang==='mr'?'केंद्र आणि राज्य सरकारच्या महत्त्वाच्या योजना':'Central & State government schemes — all in one place'} crumb={lang==='mr'?'मुखपृष्ठ / सरकारी योजना':'Home / Govt Schemes'}/>
      <div className="bg-amber-50 border-b border-amber-200"><div className="section py-3"><p className="text-xs text-amber-800 text-center"><strong>सूचना:</strong> {lang==='mr'?'थेट सरकारी पोर्टलवर अर्ज करा. कोणत्याही दलालाला पैसे देऊ नका.':'Apply directly on official portals. Do not pay any agent.'}</p></div></div>
      <div className="section py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {CATS.map(c=><button key={c.k} onClick={()=>setCat(c.k)} className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${cat===c.k?'bg-brand-600 text-white shadow-sm':'bg-white border border-gray-200 text-gray-600 hover:border-brand-300'}`}>{lang==='mr'?c.mr:c.en}</button>)}
        </div>
        {loading
          ? <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{[...Array(4)].map((_,i)=><div key={i} className="card p-6 space-y-3"><div className="shimmer h-6 rounded w-2/3"/><div className="shimmer h-4 rounded"/><div className="shimmer h-4 rounded w-3/4"/></div>)}</div>
          : <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{filtered.map(s=><SchemeCard key={s.id} s={s} lang={lang}/>)}</div>}
        <div className="mt-10 bg-brand-900 text-white rounded-2xl p-8 text-center">
          <div className="w-12 h-12 rounded-2xl bg-brand-700 mx-auto mb-4 flex items-center justify-center"><svg className="w-6 h-6 text-brand-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg></div>
          <h3 className="font-heading font-bold text-xl mb-2">{lang==='mr'?'किसान कॉल सेंटर':'Kisan Call Centre'}</h3>
          <div className="text-4xl font-bold text-saffron-400 font-heading my-3">1800-180-1551</div>
          <p className="text-brand-300 text-sm">{lang==='mr'?'सोमवार ते शनिवार, सकाळी 6 ते रात्री 10 — मोफत':'Mon–Sat, 6 AM to 10 PM — Toll Free'}</p>
        </div>
      </div>
    </div>
  )
}
