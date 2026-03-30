import { useState, useEffect } from 'react'
import api from '../utils/api'
import { useLang } from '../context/LangContext'
import { PageHeader, LoadingPage } from '../components/common/UI'

const CATS = [
  { key: 'all', label: 'All Schemes', labelM: 'सर्व योजना' },
  { key: 'income-support', label: 'Income Support', labelM: 'उत्पन्न सहाय्य' },
  { key: 'credit', label: 'Credit & Loans', labelM: 'कर्ज' },
  { key: 'insurance', label: 'Insurance', labelM: 'विमा' },
  { key: 'market', label: 'Market Access', labelM: 'बाजार' },
  { key: 'irrigation', label: 'Irrigation', labelM: 'सिंचाई' },
  { key: 'organic', label: 'Organic Farming', labelM: 'जैविक शेती' },
  { key: 'state', label: 'State Schemes', labelM: 'राज्य योजना' },
]

function SchemeCard({ scheme, lang }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="card overflow-hidden border border-gray-100 hover:border-primary-200 transition-all">
      <div className="h-1.5" style={{ backgroundColor: scheme.color }} />
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="text-4xl">{scheme.icon}</div>
          <div className="flex-1">
            <div className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">{scheme.ministry}</div>
            <h3 className="font-display font-bold text-lg text-gray-800">
              {lang === 'mr' ? scheme.fullNameMarathi : scheme.fullName}
            </h3>
            <div className="text-sm text-gray-500 mt-0.5">{scheme.name}</div>
          </div>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {lang === 'mr' ? scheme.descriptionMarathi : scheme.description}
        </p>

        {/* Key benefits */}
        <div className="bg-primary-50 rounded-lg p-3 mb-4">
          <div className="text-xs font-semibold text-primary-700 font-display uppercase mb-2">✨ Key Benefits</div>
          <ul className="space-y-1">
            {scheme.benefits?.slice(0, 3).map((b, i) => (
              <li key={i} className="text-sm text-primary-800 flex items-start gap-1.5">
                <span className="text-primary-500 mt-0.5">✓</span> {b}
              </li>
            ))}
          </ul>
        </div>

        {expanded && (
          <div className="space-y-4 animate-fade-in">
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 font-display">📋 Eligibility</div>
              <ul className="space-y-1">
                {scheme.eligibility?.map((e, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-start gap-1.5">
                    <span className="text-gray-400">•</span> {e}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 font-display">📄 Documents Required</div>
              <div className="flex flex-wrap gap-2">
                {scheme.documents?.map((d, i) => (
                  <span key={i} className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full">{d}</span>
                ))}
              </div>
            </div>
            <div className="bg-saffron-50 border border-saffron-200 rounded-lg p-3">
              <div className="text-xs font-semibold text-saffron-700 uppercase tracking-wider mb-1 font-display">🏛️ How to Apply</div>
              <p className="text-sm text-saffron-800">{scheme.howToApply}</p>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-primary-600 font-semibold hover:text-primary-800 transition-colors font-display"
          >
            {expanded ? (lang === 'mr' ? 'कमी दाखवा ↑' : 'Show Less ↑') : (lang === 'mr' ? 'अधिक माहिती ↓' : 'More Details ↓')}
          </button>
          <a
            href={scheme.link} target="_blank" rel="noopener noreferrer"
            className="sm:ml-auto btn-primary text-xs py-2 px-4 text-center"
          >
            {lang === 'mr' ? 'अर्ज करा ↗' : 'Apply Now ↗'}
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Schemes() {
  const { lang, t } = useLang()
  const [schemes, setSchemes] = useState([])
  const [loading, setLoading] = useState(true)
  const [catFilter, setCatFilter] = useState('all')

  useEffect(() => {
    api.get('/schemes').then(r => setSchemes(r.data)).finally(() => setLoading(false))
  }, [])

  const filtered = catFilter === 'all' ? schemes : schemes.filter(s => s.category === catFilter)

  return (
    <div>
      <PageHeader
        title={lang === 'mr' ? 'सरकारी योजना — शेतकऱ्यांसाठी' : 'Government Schemes for Farmers'}
        subtitle={lang === 'mr' ? 'केंद्र आणि राज्य सरकारच्या महत्त्वाच्या योजना' : 'Important Central & State Government schemes for farmers'}
        icon="🏛️"
      />

      {/* Important notice */}
      <div className="bg-saffron-50 border-b border-saffron-200 py-3 px-4">
        <div className="max-w-7xl mx-auto text-center text-sm text-saffron-800">
          <strong>🇮🇳 Jai Kisan:</strong> {lang === 'mr' ? 'या योजनांसाठी थेट सरकारी पोर्टलवर अर्ज करा. कोणत्याही दलालाचे/एजंटचे पैसे देऊ नका.' : 'Apply directly on official government portals. Do not pay any agent or middleman.'}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATS.map(cat => (
            <button
              key={cat.key}
              onClick={() => setCatFilter(cat.key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold font-display transition-all ${
                catFilter === cat.key ? 'bg-primary-600 text-white shadow-sm' : 'bg-white border border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-600'
              }`}
            >
              {lang === 'mr' ? cat.labelM : cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="card p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-4 w-2/3" />
                <div className="h-4 bg-gray-100 rounded mb-2" />
                <div className="h-4 bg-gray-100 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map(scheme => <SchemeCard key={scheme.id} scheme={scheme} lang={lang} />)}
          </div>
        )}

        {/* Helpline banner */}
        <div className="mt-10 bg-primary-800 text-white rounded-2xl p-6 sm:p-8 text-center">
          <div className="text-4xl mb-3">📞</div>
          <h3 className="font-display font-bold text-xl mb-2">
            {lang === 'mr' ? 'किसान कॉल सेंटर' : 'Kisan Call Centre'}
          </h3>
          <div className="text-4xl font-bold text-saffron-400 font-display my-3">1800-180-1551</div>
          <p className="text-primary-200 text-sm">
            {lang === 'mr' ? 'सोमवार ते शनिवार सकाळी 6 ते रात्री 10 — मोफत' : 'Mon-Sat 6 AM to 10 PM — Toll Free'}
          </p>
        </div>
      </div>
    </div>
  )
}
