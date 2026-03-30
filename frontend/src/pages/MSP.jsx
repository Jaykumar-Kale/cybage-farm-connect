import { useState, useEffect } from 'react'
import api from '../utils/api'
import { useLang } from '../context/LangContext'
import { PageHeader, LoadingPage } from '../components/common/UI'

export default function MSP() {
  const { lang } = useLang()
  const [data, setData] = useState(null)
  const [tab, setTab] = useState('kharif')
  const [search, setSearch] = useState('')

  useEffect(() => {
    api.get('/msp').then(r => setData(r.data)).catch(() => {})
  }, [])

  const crops = data?.[tab] || []
  const filtered = crops.filter(c => c.crop.toLowerCase().includes(search.toLowerCase()) || (c.cropMarathi && c.cropMarathi.includes(search)))

  return (
    <div>
      <PageHeader
        title={lang === 'mr' ? 'किमान आधारभूत किंमत (MSP) — २०२४-२५' : 'Minimum Support Price (MSP) — 2024-25'}
        subtitle={lang === 'mr' ? 'केंद्रीय मंत्रिमंडळ आर्थिक समितीने (CCEA) जाहीर केलेले दर' : 'Rates declared by Cabinet Committee on Economic Affairs (CCEA), Govt. of India'}
        icon="💰"
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Info banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <span className="text-2xl">ℹ️</span>
          <div>
            <p className="text-sm text-blue-800 font-medium">
              {lang === 'mr'
                ? 'MSP म्हणजे किमान आधारभूत किंमत — सरकार या किमतीने पीक खरेदी करण्याची हमी देते. तुमचे पीक कोणत्याही बाजारात या किमतीपेक्षा कमी विकले जाऊ नये.'
                : 'MSP (Minimum Support Price) is the price at which the government guarantees to purchase your crop. Your produce should not be sold below this price in any market.'}
            </p>
            {data && <p className="text-xs text-blue-600 mt-1">Source: {data.source} | Updated: {data.announcedDate}</p>}
          </div>
        </div>

        {/* Season tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 max-w-xs">
          {['kharif', 'rabi'].map(s => (
            <button
              key={s}
              onClick={() => setTab(s)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold font-display transition-all ${
                tab === s ? 'bg-white text-primary-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {s === 'kharif' ? (lang === 'mr' ? '🌧️ खरीप' : '🌧️ Kharif') : (lang === 'mr' ? '☀️ रब्बी' : '☀️ Rabi')}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <input
            type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder={lang === 'mr' ? 'पीक शोधा...' : 'Search crop...'}
            className="input-field pl-10"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Table */}
        {!data ? (
          <div className="flex justify-center py-16"><div className="w-10 h-10 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" style={{ borderWidth: '3px' }} /></div>
        ) : (
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary-700 text-white">
                  <th className="text-left px-4 py-4 font-display font-semibold">
                    {lang === 'mr' ? 'पिकाचे नाव' : 'Crop Name'}
                  </th>
                  <th className="text-left px-4 py-4 font-display font-semibold">मराठी</th>
                  <th className="text-right px-4 py-4 font-display font-semibold">
                    {lang === 'mr' ? 'MSP (₹/क्विं.)' : 'MSP (₹/qtl)'}
                  </th>
                  <th className="text-right px-4 py-4 font-display font-semibold">
                    {lang === 'mr' ? 'वाढ' : 'Increase'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((crop, i) => (
                  <tr key={i} className={`border-b border-gray-100 hover:bg-primary-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    <td className="px-4 py-3.5 font-semibold text-gray-800 font-display">{crop.crop}</td>
                    <td className="px-4 py-3.5 text-gray-600 marathi-text">{crop.cropMarathi}</td>
                    <td className="px-4 py-3.5 text-right">
                      <span className="font-bold text-primary-700 text-base font-display">₹{crop.msp?.toLocaleString()}</span>
                      <span className="text-gray-400 text-xs">/qtl</span>
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      <span className="inline-flex items-center gap-1 text-green-600 font-semibold">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        ₹{crop.increase}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <p>No crops matching "{search}"</p>
              </div>
            )}
          </div>
        )}

        {/* Procurement helpline */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-saffron-50 border border-saffron-200 rounded-xl p-5">
            <h4 className="font-display font-bold text-saffron-800 mb-2">📞 MSP Procurement Helpline</h4>
            <div className="text-2xl font-bold text-saffron-700 font-display">14422</div>
            <p className="text-xs text-saffron-600 mt-1">For wheat & paddy procurement | FCI/NAFED</p>
          </div>
          <div className="bg-primary-50 border border-primary-200 rounded-xl p-5">
            <h4 className="font-display font-bold text-primary-800 mb-2">🌐 Online MSP Registration</h4>
            <a href="https://enam.gov.in" target="_blank" rel="noopener noreferrer"
              className="text-primary-600 font-semibold hover:underline text-sm">enam.gov.in ↗</a>
            <p className="text-xs text-primary-600 mt-1">Register on eNAM for online mandi access</p>
          </div>
        </div>
      </div>
    </div>
  )
}
