import { useState, useEffect } from 'react'
import api from '../utils/api'
import { useLang } from '../context/LangContext'
import { PageHeader } from '../components/common/UI'

export default function MSP() {
  const { lang } = useLang()
  const [data, setData] = useState(null)
  const [tab, setTab] = useState('kharif')
  const [search, setSearch] = useState('')
  useEffect(() => { api.get('/msp').then(r=>setData(r.data)).catch(()=>{}) }, [])
  const crops = data?.[tab] || []
  const filtered = crops.filter(c => c.crop.toLowerCase().includes(search.toLowerCase()) || (c.cropMarathi||'').includes(search))

  return (
    <div>
      <PageHeader title={lang==='mr'?'किमान आधारभूत किंमत (MSP) — २०२४-२५':'Minimum Support Price (MSP) — 2024-25'} subtitle={lang==='mr'?'CCEA द्वारे घोषित — भारत सरकार':'Declared by CCEA — Government of India'} crumb="Home / MSP Rates"/>
      <div className="section py-8">
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-6 flex items-start gap-4">
          <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center shrink-0"><svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>
          <div>
            <p className="text-sm text-blue-800 font-medium leading-relaxed">{lang==='mr'?'MSP म्हणजे किमान आधारभूत किंमत — सरकार या किमतीने पीक खरेदीची हमी देते. तुमचे पीक कोणत्याही बाजारात या किमतीपेक्षा कमी विकले जाऊ नये.':'MSP is the minimum price guaranteed by the government. Your produce should not be sold below this rate in any market.'}</p>
            {data && <p className="text-xs text-blue-400 mt-1">Source: {data.source} | {data.announcedDate}</p>}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-1 bg-gray-100 rounded-2xl p-1 w-full sm:w-fit mb-6">
          {['kharif','rabi'].map(s=><button key={s} onClick={()=>setTab(s)} className={`px-6 py-2.5 rounded-xl text-sm font-semibold font-heading transition-all w-full sm:w-auto ${tab===s?'bg-white text-brand-700 shadow-sm':'text-gray-500 hover:text-gray-700'}`}>{lang==='mr'?(s==='kharif'?'खरीप हंगाम':'रब्बी हंगाम'):(s==='kharif'?'Kharif Season':'Rabi Season')}</button>)}
        </div>
        <div className="relative mb-5">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder={lang==='mr'?'पीक शोधा...':'Search crop...'} className="input pl-10"/>
        </div>
        {!data
          ? <div className="flex justify-center py-16"><div className="w-10 h-10 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" style={{borderWidth:3}}/></div>
            : <div className="card overflow-hidden">
              <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-sm">
                <thead>
                  <tr className="bg-brand-800 text-white">
                    <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider font-heading rounded-tl-2xl">{lang==='mr'?'पिकाचे नाव':'Crop'}</th>
                    <th className="text-left px-5 py-3.5 text-xs font-semibold uppercase tracking-wider">मराठी</th>
                    <th className="text-right px-5 py-3.5 text-xs font-semibold uppercase tracking-wider">MSP ₹/qtl</th>
                    <th className="text-right px-5 py-3.5 text-xs font-semibold uppercase tracking-wider rounded-tr-2xl">{lang==='mr'?'वाढ':'Increase'}</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c,i)=>(
                    <tr key={i} className={`hover:bg-brand-50/40 transition-colors ${i%2===0?'bg-white':'bg-gray-50/50'}`}>
                      <td className="px-5 py-4 font-heading font-bold text-gray-900 border-b border-gray-50">{c.crop}</td>
                      <td className="px-5 py-4 text-gray-500 border-b border-gray-50 font-mr text-xs">{c.cropMarathi}</td>
                      <td className="px-5 py-4 text-right border-b border-gray-50"><span className="font-bold text-brand-700 text-base font-heading">₹{c.msp?.toLocaleString('en-IN')}</span></td>
                      <td className="px-5 py-4 text-right border-b border-gray-50"><span className="inline-flex items-center gap-1 text-green-600 font-semibold text-xs"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>₹{c.increase}</span></td>
                    </tr>
                  ))}
                  {filtered.length===0 && <tr><td colSpan={4} className="text-center py-10 text-gray-400 text-sm">{lang==='mr'?`"${search}" साठी कोणते पीक आढळले नाही`:`No crops matching "${search}"`}</td></tr>}
                </tbody>
              </table>
              </div>
            </div>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="bg-saffron-50 border border-saffron-200 rounded-2xl p-5"><h4 className="font-heading font-bold text-saffron-800 mb-1 text-sm">MSP Helpline</h4><div className="text-3xl font-bold text-saffron-700 font-heading">14422</div><p className="text-xs text-saffron-600 mt-1">Wheat & Paddy procurement — FCI / NAFED</p></div>
          <div className="bg-brand-50 border border-brand-200 rounded-2xl p-5"><h4 className="font-heading font-bold text-brand-800 mb-1 text-sm">Online MSP Registration</h4><a href="https://enam.gov.in" target="_blank" rel="noopener noreferrer" className="text-brand-600 font-bold hover:underline font-heading">enam.gov.in</a><p className="text-xs text-brand-600 mt-1">Register on eNAM for online mandi access</p></div>
        </div>
      </div>
    </div>
  )
}
