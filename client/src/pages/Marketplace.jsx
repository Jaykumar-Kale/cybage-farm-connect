import { useState, useEffect } from 'react'
import api from '../utils/api'
import { useLang } from '../context/LangContext'
import { CropCard, PageHeader, Empty } from '../components/common/UI'

const CATS = ['all','grains','vegetables','fruits','pulses','oilseeds','spices','cotton','other']
const STATES = ['all','Maharashtra','Punjab','Gujarat','Uttar Pradesh','Madhya Pradesh','Rajasthan','Karnataka','Andhra Pradesh','Tamil Nadu','Haryana']
const CAT_MR = {all:'सर्व',grains:'धान्य',vegetables:'भाजीपाला',fruits:'फळे',pulses:'कडधान्य',oilseeds:'तेलबिया',spices:'मसाले',cotton:'कापूस',other:'इतर'}
const CAT_EN = {all:'All',grains:'Grains',vegetables:'Vegetables',fruits:'Fruits',pulses:'Pulses',oilseeds:'Oilseeds',spices:'Spices',cotton:'Cotton',other:'Other'}

export default function Marketplace() {
  const { lang } = useLang()
  const [crops, setCrops] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('all')
  const [state, setState] = useState('all')

  const load = async () => {
    setLoading(true)
    try {
      const p = new URLSearchParams()
      if (cat !== 'all') p.set('category', cat)
      if (state !== 'all') p.set('state', state)
      if (search) p.set('search', search)
      const { data } = await api.get(`/crops?${p}`)
      setCrops(data)
    } catch { setCrops([]) } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [cat, state])

  return (
    <div>
      <PageHeader title={lang==='mr'?'बाजारपेठ — थेट पीक खरेदी भाव':'Marketplace — Live Crop Buying Prices'} subtitle={lang==='mr'?'विक्रेत्यांनी प्रकाशित केलेले पारदर्शक भाव':'Transparent prices published by verified vendors'} crumb={lang==='mr'?'मुखपृष्ठ / बाजारपेठ':'Home / Marketplace'}/>
      <div className="section py-8">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            <input type="text" value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>e.key==='Enter'&&load()} placeholder={lang==='mr'?'पिके शोधा...':'Search crops...'} className="input pl-10"/>
          </div>
          <button onClick={load} className="btn-primary px-5 w-full sm:w-auto">{lang==='mr'?'शोधा':'Search'}</button>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="w-full lg:w-52 shrink-0">
            <div className="card p-4 lg:sticky lg:top-24">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{lang==='mr'?'श्रेणी':'Category'}</p>
              <div className="space-y-0.5">
                {CATS.map(c=><button key={c} onClick={()=>setCat(c)} className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${cat===c?'bg-brand-600 text-white font-semibold':'text-gray-600 hover:bg-gray-50'}`}>{lang==='mr'?CAT_MR[c]:CAT_EN[c]}</button>)}
              </div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-5 mb-3">{lang==='mr'?'राज्य':'State'}</p>
              <div className="space-y-0.5">
                {STATES.map(s=><button key={s} onClick={()=>setState(s)} className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${state===s?'bg-saffron-500 text-white font-semibold':'text-gray-600 hover:bg-gray-50'}`}>{s==='all'?(lang==='mr'?'सर्व राज्ये':'All States'):s}</button>)}
              </div>
            </div>
          </aside>
          <main className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">{loading?'...':`${crops.length} ${lang==='mr'?'याद्या':'listings'}`}</p>
              {(cat!=='all'||state!=='all'||search) && <button onClick={()=>{setCat('all');setState('all');setSearch('')}} className="text-xs text-red-500 hover:text-red-700 font-medium">{lang==='mr'?'फिल्टर साफ करा':'Clear filters'}</button>}
            </div>
            {loading
              ? <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">{[...Array(6)].map((_,i)=><div key={i} className="card p-5 space-y-3"><div className="shimmer h-5 rounded w-3/4"/><div className="shimmer h-16 rounded"/><div className="shimmer h-4 rounded w-1/2"/><div className="shimmer h-4 rounded w-2/3"/></div>)}</div>
              : crops.length===0
                ? <Empty title={lang==='mr'?'कोणते पीक आढळले नाही':'No crops found'} sub={lang==='mr'?'फिल्टर बदला':'Try different filters'}/>
                : <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">{crops.map(c=><CropCard key={c._id} crop={c} lang={lang}/>)}</div>}
          </main>
        </div>
      </div>
    </div>
  )
}
