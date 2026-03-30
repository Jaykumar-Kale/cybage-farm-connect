import { useState, useEffect } from 'react'
import api from '../utils/api'
import { useLang } from '../context/LangContext'
import { CropCard, PageHeader, EmptyState, LoadingPage } from '../components/common/UI'

const CATEGORIES = ['all', 'grains', 'vegetables', 'fruits', 'pulses', 'oilseeds', 'spices', 'cotton', 'other']
const STATES = ['all', 'Maharashtra', 'Punjab', 'Gujarat', 'Uttar Pradesh', 'Madhya Pradesh', 'Rajasthan', 'Karnataka', 'Andhra Pradesh', 'Tamil Nadu', 'Haryana']

const CAT_ICONS = { all: '🌾', grains: '🌾', vegetables: '🥦', fruits: '🍎', pulses: '🫘', oilseeds: '🌻', spices: '🌶️', cotton: '🌸', other: '📦' }

export default function Marketplace() {
  const { t, lang } = useLang()
  const [crops, setCrops] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [state, setState] = useState('all')

  const fetch = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (category !== 'all') params.set('category', category)
      if (state !== 'all') params.set('state', state)
      if (search) params.set('search', search)
      const { data } = await api.get(`/crops?${params}`)
      setCrops(data)
    } catch { setCrops([]) } finally { setLoading(false) }
  }

  useEffect(() => { fetch() }, [category, state])

  const handleSearch = (e) => {
    e.preventDefault()
    fetch()
  }

  return (
    <div>
      <PageHeader
        title={lang === 'mr' ? 'बाजारपेठ — थेट पीक खरेदी भाव' : 'Marketplace — Live Crop Buying Prices'}
        subtitle={lang === 'mr' ? 'विक्रेत्यांनी प्रकाशित केलेले थेट भाव' : 'Prices published directly by verified vendors'}
        icon="🏪"
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder={t('search')}
              className="input-field pl-10"
            />
          </div>
          <button type="submit" className="btn-primary px-6 sm:w-auto w-full">{lang === 'mr' ? 'शोधा' : 'Search'}</button>
        </form>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters sidebar */}
          <aside className="w-full lg:w-60 shrink-0">
            <div className="card p-4 lg:sticky lg:top-24">
              <h3 className="font-display font-bold text-gray-700 text-sm uppercase tracking-wider mb-3">{t('category')}</h3>
              <div className="space-y-1">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium font-display transition-colors flex items-center gap-2 ${
                      category === cat ? 'bg-primary-100 text-primary-700 font-bold' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>{CAT_ICONS[cat]}</span>
                    <span>{cat === 'all' ? (lang === 'mr' ? 'सर्व' : 'All') : t(cat)}</span>
                  </button>
                ))}
              </div>

              <h3 className="font-display font-bold text-gray-700 text-sm uppercase tracking-wider mb-3 mt-5">{t('state')}</h3>
              <div className="space-y-1">
                {STATES.map(s => (
                  <button
                    key={s}
                    onClick={() => setState(s)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      state === s ? 'bg-saffron-100 text-saffron-700 font-bold' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {s === 'all' ? (lang === 'mr' ? 'सर्व राज्ये' : 'All States') : s}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Results */}
          <main className="flex-1">
            <div className="flex items-center justify-between gap-3 mb-4">
              <p className="text-gray-500 text-sm font-display">
                {loading ? '...' : `${crops.length} ${lang === 'mr' ? 'याद्या आढळल्या' : 'listings found'}`}
              </p>
              {(category !== 'all' || state !== 'all' || search) && (
                <button onClick={() => { setCategory('all'); setState('all'); setSearch('') }} className="text-sm text-red-500 hover:underline">
                  {lang === 'mr' ? 'फिल्टर साफ करा' : 'Clear filters'}
                </button>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="card p-5 animate-pulse">
                    <div className="h-5 bg-gray-200 rounded mb-3 w-3/4" />
                    <div className="h-16 bg-gray-100 rounded mb-3" />
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                  </div>
                ))}
              </div>
            ) : crops.length === 0 ? (
              <EmptyState icon="🔍" message={lang === 'mr' ? 'कोणते पीक आढळले नाही' : 'No crops found'} sub={lang === 'mr' ? 'फिल्टर बदला किंवा नंतर पुन्हा पहा' : 'Try different filters or check back later'} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {crops.map(crop => <CropCard key={crop._id} crop={crop} />)}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
