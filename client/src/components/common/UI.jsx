import { useEffect, useRef, useState } from 'react'

export function Spinner({ size='md', white=false }) {
  const s = {sm:'w-4 h-4',md:'w-7 h-7',lg:'w-10 h-10'}[size]
  const c = white ? 'border-white/30 border-t-white' : 'border-brand-200 border-t-brand-600'
  return <div className={`${s} ${c} rounded-full animate-spin`} style={{borderWidth:2.5}}/>
}

export function PageLoader() {
  return <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3"><Spinner size="lg"/><p className="text-sm text-gray-400 animate-pulse">Loading...</p></div>
}

export function PageHeader({ title, subtitle, crumb }) {
  return (
    <div className="page-hero">
      <div className="section py-8 md:py-10">
        {crumb && <p className="text-brand-300 text-xs mb-1.5 font-medium tracking-wider uppercase">{crumb}</p>}
        <h1 className="font-heading font-bold text-2xl md:text-3xl text-white leading-tight">{title}</h1>
        {subtitle && <p className="text-brand-300 mt-1.5 text-sm">{subtitle}</p>}
      </div>
    </div>
  )
}

export function Empty({ title='No data found', sub, action }) {
  return (
    <div className="py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-gray-100 mx-auto mb-4 flex items-center justify-center">
        <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
      <h3 className="font-heading font-semibold text-gray-700 mb-1">{title}</h3>
      {sub && <p className="text-sm text-gray-400 mb-4">{sub}</p>}
      {action}
    </div>
  )
}

export function Counter({ value, prefix='', suffix='' }) {
  const ref = useRef(); const [count, setCount] = useState(0)
  const num = parseFloat(String(value).replace(/[^\d.]/g,'')) || 0
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let s=0; const step=num/(1200/16)
        const t = setInterval(() => { s+=step; if(s>=num){setCount(num);clearInterval(t)}else setCount(s) },16)
        obs.disconnect()
      }
    },{threshold:0.3})
    if(ref.current) obs.observe(ref.current)
    return()=>obs.disconnect()
  },[num])
  const fmt = num>=10000000?`${(count/10000000).toFixed(1)}Cr`:num>=100000?`${(count/100000).toFixed(1)}L`:num>=1000?`${(count/1000).toFixed(1)}K`:Math.round(count).toLocaleString('en-IN')
  return <span ref={ref}>{prefix}{fmt}{suffix}</span>
}

const CAT = {
  grains:{label:'Grains',labelM:'धान्य',color:'bg-yellow-50 text-yellow-700 border-yellow-200'},
  vegetables:{label:'Vegetables',labelM:'भाजीपाला',color:'bg-green-50 text-green-700 border-green-200'},
  fruits:{label:'Fruits',labelM:'फळे',color:'bg-orange-50 text-orange-700 border-orange-200'},
  pulses:{label:'Pulses',labelM:'कडधान्य',color:'bg-amber-50 text-amber-700 border-amber-200'},
  oilseeds:{label:'Oilseeds',labelM:'तेलबिया',color:'bg-lime-50 text-lime-700 border-lime-200'},
  spices:{label:'Spices',labelM:'मसाले',color:'bg-red-50 text-red-700 border-red-200'},
  cotton:{label:'Cotton',labelM:'कापूस',color:'bg-sky-50 text-sky-700 border-sky-200'},
  other:{label:'Other',labelM:'इतर',color:'bg-gray-100 text-gray-600 border-gray-200'},
}

export function CatBadge({ category, lang='en' }) {
  const c = CAT[category]||CAT.other
  return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${c.color}`}>{lang==='mr'?c.labelM:c.label}</span>
}

export function CropCard({ crop, lang='en', showContact=true }) {
  const ago = Math.floor((Date.now()-new Date(crop.updatedAt||crop.createdAt))/86400000)
  return (
    <div className="card p-5 flex flex-col hover:-translate-y-1 transition-transform duration-200">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-bold text-gray-900 truncate">{crop.nameMarathi||crop.name}</h3>
          {crop.nameMarathi && <p className="text-xs text-gray-400 truncate">{crop.name}</p>}
        </div>
        <CatBadge category={crop.category} lang={lang}/>
      </div>
      <div className="bg-gradient-to-br from-brand-50 to-brand-100/50 border border-brand-200/60 rounded-xl p-3 text-center mb-3">
        <div className="text-2xl font-bold font-heading text-brand-700">₹{crop.pricePerQuintal?.toLocaleString('en-IN')}</div>
        <div className="text-xs text-brand-600 font-medium">{lang==='mr'?'प्रति क्विंटल':'per quintal'}</div>
      </div>
      <div className="space-y-1.5 text-xs text-gray-500 flex-1 mb-3">
        <div className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          <span className="truncate">{crop.location}{crop.district?`, ${crop.district}`:''}</span>
        </div>
        {crop.minQuantity && <div className="flex items-center gap-1.5"><svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg><span>Min: {crop.minQuantity} qtl</span></div>}
        {crop.vendor?.name && <div className="flex items-center gap-1.5"><svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg><span className="font-medium text-gray-700 truncate">{crop.vendor.name}</span></div>}
      </div>
      <div className="flex items-center justify-between">
        {showContact && crop.vendor?.phone
          ? <a href={`tel:${crop.vendor.phone}`} className="btn-primary text-xs py-2 px-3 flex-1 mr-2">{lang==='mr'?'संपर्क करा':'Contact Vendor'}</a>
          : <div/>}
        <span className="text-xs text-gray-400 shrink-0">{ago===0?'Today':`${ago}d ago`}</span>
      </div>
    </div>
  )
}

export function Confirm({ open, msg, onOk, onCancel, danger=true }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 animate-slide-up">
        <div className="w-12 h-12 rounded-2xl bg-red-50 mx-auto mb-4 flex items-center justify-center">
          <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
        </div>
        <p className="text-center text-gray-700 font-medium mb-6 leading-relaxed">{msg}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 btn-outline text-sm py-2.5">Cancel</button>
          <button onClick={onOk} className={`flex-1 text-sm font-semibold px-4 py-2.5 rounded-xl transition-all ${danger?'bg-red-600 hover:bg-red-700 text-white':'btn-primary'}`}>Confirm</button>
        </div>
      </div>
    </div>
  )
}
