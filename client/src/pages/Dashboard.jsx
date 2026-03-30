import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import api from '../utils/api'
import toast from 'react-hot-toast'
import { StatCard, EmptyState, CategoryBadge, ConfirmModal } from '../components/common/UI'

// ─── Crop Form Modal ─────────────────────────────────────────────
const CATEGORIES = ['grains', 'vegetables', 'fruits', 'pulses', 'oilseeds', 'spices', 'cotton', 'other']
const STATES = ['Maharashtra', 'Punjab', 'Gujarat', 'Uttar Pradesh', 'Madhya Pradesh', 'Rajasthan', 'Karnataka', 'Andhra Pradesh', 'Tamil Nadu', 'Haryana', 'West Bengal', 'Bihar']
const CAT_MARATHI = { grains: 'धान्य', vegetables: 'भाजीपाला', fruits: 'फळे', pulses: 'कडधान्य', oilseeds: 'तेलबिया', spices: 'मसाले', cotton: 'कापूस', other: 'इतर' }

function CropModal({ crop, onClose, onSave, lang }) {
  const [form, setForm] = useState({
    name: crop?.name || '',
    nameMarathi: crop?.nameMarathi || '',
    category: crop?.category || 'grains',
    pricePerQuintal: crop?.pricePerQuintal || '',
    minQuantity: crop?.minQuantity || 1,
    maxQuantity: crop?.maxQuantity || '',
    location: crop?.location || '',
    district: crop?.district || '',
    state: crop?.state || 'Maharashtra',
    description: crop?.description || '',
  })
  const [saving, setSaving] = useState(false)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.pricePerQuintal || !form.location) {
      toast.error('Please fill all required fields')
      return
    }
    setSaving(true)
    try {
      await onSave(form)
      onClose()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save')
    } finally { setSaving(false) }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-fade-up">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="font-display font-bold text-lg text-gray-800">
            {crop ? (lang === 'mr' ? 'पीक संपादित करा' : 'Edit Crop Listing') : (lang === 'mr' ? 'नवीन पीक जोडा' : 'Add New Crop Listing')}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 font-display uppercase tracking-wide">Crop Name *</label>
              <input type="text" required value={form.name} onChange={e => set('name', e.target.value)} className="input-field" placeholder="e.g. Soyabean" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 font-display uppercase tracking-wide">मराठी नाव</label>
              <input type="text" value={form.nameMarathi} onChange={e => set('nameMarathi', e.target.value)} className="input-field" placeholder="उदा. सोयाबीन" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 font-display uppercase tracking-wide">Category *</label>
            <select value={form.category} onChange={e => set('category', e.target.value)} className="input-field">
              {CATEGORIES.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)} / {CAT_MARATHI[c]}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="col-span-1">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 font-display uppercase tracking-wide">Price ₹/Quintal *</label>
              <input type="number" required min="1" value={form.pricePerQuintal} onChange={e => set('pricePerQuintal', e.target.value)} className="input-field" placeholder="2500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 font-display uppercase tracking-wide">Min Qty (Qtl)</label>
              <input type="number" min="1" value={form.minQuantity} onChange={e => set('minQuantity', e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 font-display uppercase tracking-wide">Max Qty (Qtl)</label>
              <input type="number" min="1" value={form.maxQuantity} onChange={e => set('maxQuantity', e.target.value)} className="input-field" placeholder="Optional" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 font-display uppercase tracking-wide">Buying Location *</label>
            <input type="text" required value={form.location} onChange={e => set('location', e.target.value)} className="input-field" placeholder="e.g. APMC Pune, Near Railway Station" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 font-display uppercase tracking-wide">District</label>
              <input type="text" value={form.district} onChange={e => set('district', e.target.value)} className="input-field" placeholder="e.g. Nashik" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 font-display uppercase tracking-wide">State</label>
              <select value={form.state} onChange={e => set('state', e.target.value)} className="input-field">
                {STATES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 font-display uppercase tracking-wide">Additional Info</label>
            <textarea rows={2} value={form.description} onChange={e => set('description', e.target.value)} className="input-field resize-none" placeholder="Quality requirements, payment terms, etc." />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 btn-outline">{lang === 'mr' ? 'रद्द करा' : 'Cancel'}</button>
            <button type="submit" disabled={saving} className="flex-1 btn-primary disabled:opacity-50">
              {saving ? '...' : (crop ? (lang === 'mr' ? 'बदल जतन करा' : 'Save Changes') : (lang === 'mr' ? 'पीक जोडा' : 'Add Listing'))}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── Farmer Dashboard ─────────────────────────────────────────────
function FarmerDashboard({ user, lang }) {
  const [crops, setCrops] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/crops').then(r => setCrops(r.data.slice(0, 9))).finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-6">
      {/* Welcome card */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-600 text-white rounded-2xl p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-primary-200 text-sm mb-1">{lang === 'mr' ? 'स्वागत आहे 🙏' : 'Welcome 🙏'}</p>
            <h2 className="font-display font-bold text-2xl">{user.name}</h2>
            <p className="text-primary-200 text-sm mt-1">
              {lang === 'mr' ? `${user.state || 'महाराष्ट्र'} • शेतकरी` : `${user.state || 'Maharashtra'} • Farmer`}
            </p>
          </div>
          <div className="text-5xl">👨‍🌾</div>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: '🏪', label: lang === 'mr' ? 'बाजारपेठ' : 'Marketplace', href: '/marketplace' },
          { icon: '🏛️', label: lang === 'mr' ? 'सरकारी योजना' : 'Govt Schemes', href: '/schemes' },
          { icon: '💰', label: lang === 'mr' ? 'MSP दर' : 'MSP Rates', href: '/msp' },
          { icon: '💬', label: lang === 'mr' ? 'मंच' : 'Forum', href: '/forum' },
        ].map((item, i) => (
          <a key={i} href={item.href} className="card p-4 text-center hover:border-primary-300 border border-transparent transition-all group">
            <div className="text-3xl mb-2">{item.icon}</div>
            <div className="text-xs font-semibold text-gray-600 font-display group-hover:text-primary-600">{item.label}</div>
          </a>
        ))}
      </div>

      {/* Today's prices */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
          <h3 className="font-display font-bold text-lg text-gray-800">
            {lang === 'mr' ? 'आजचे खरेदी भाव' : "Today's Buying Prices"}
          </h3>
        </div>
        {loading ? (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />)}
          </div>
        ) : crops.length === 0 ? (
          <EmptyState icon="🌾" message={lang === 'mr' ? 'अजून भाव उपलब्ध नाही' : 'No prices available yet'} />
        ) : (
          <div className="space-y-3">
            {crops.map(crop => (
              <div key={crop._id} className="card p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <div className="font-display font-bold text-gray-800">{crop.nameMarathi || crop.name}</div>
                  <div className="text-xs text-gray-500">{crop.name} • {crop.location}, {crop.district || crop.state}</div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    🏪 {crop.vendor?.name} {crop.vendor?.phone && `• ${crop.vendor.phone}`}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-display font-bold text-xl text-primary-700">₹{crop.pricePerQuintal?.toLocaleString()}</div>
                  <div className="text-xs text-gray-400">/क्विंटल</div>
                  {crop.vendor?.phone && (
                    <a href={`tel:${crop.vendor.phone}`} className="text-xs text-saffron-600 font-semibold hover:underline">📞 Call</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="text-center mt-4">
          <a href="/marketplace" className="btn-primary text-sm">
            {lang === 'mr' ? 'सर्व भाव पाहा →' : 'View All Prices →'}
          </a>
        </div>
      </div>
    </div>
  )
}

// ─── Vendor Dashboard ─────────────────────────────────────────────
function VendorDashboard({ user, lang }) {
  const [crops, setCrops] = useState([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null) // null | 'add' | crop_object
  const [confirmDelete, setConfirmDelete] = useState(null)

  const loadCrops = () => {
    api.get('/crops/my').then(r => setCrops(r.data)).catch(() => setCrops([])).finally(() => setLoading(false))
  }

  useEffect(() => { loadCrops() }, [])

  const handleSave = async (form) => {
    if (modal === 'add') {
      await api.post('/crops', form)
      toast.success(lang === 'mr' ? 'पीक यादी जोडली!' : 'Crop listing added!')
    } else {
      await api.put(`/crops/${modal._id}`, form)
      toast.success(lang === 'mr' ? 'यादी अपडेट झाली!' : 'Listing updated!')
    }
    loadCrops()
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/crops/${id}`)
      toast.success(lang === 'mr' ? 'यादी हटवली' : 'Listing deleted')
      setConfirmDelete(null)
      loadCrops()
    } catch { toast.error('Failed to delete') }
  }

  if (!user.isApproved) {
    return (
      <div className="card p-10 text-center">
        <div className="text-6xl mb-4">⏳</div>
        <h2 className="font-display font-bold text-xl text-gray-800 mb-2">
          {lang === 'mr' ? 'मंजुरी प्रतीक्षेत' : 'Pending Admin Approval'}
        </h2>
        <p className="text-gray-500 text-sm max-w-sm mx-auto">
          {lang === 'mr'
            ? 'तुमचा विक्रेता खाता प्रशासकाने तपासण्याच्या प्रतीक्षेत आहे. मंजुरीनंतर तुम्ही पीक भाव टाकू शकता.'
            : 'Your vendor account is being reviewed by the admin. Once approved, you can start posting crop buying prices.'}
        </p>
        <div className="mt-6 bg-saffron-50 border border-saffron-200 rounded-xl p-4 inline-block">
          <p className="text-saffron-700 text-sm font-medium">📞 Contact: admin@farmconnect.in</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-saffron-600 to-saffron-500 text-white rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-saffron-100 text-sm mb-1">{lang === 'mr' ? 'विक्रेता डॅशबोर्ड' : 'Vendor Dashboard'}</p>
          <h2 className="font-display font-bold text-2xl">{user.name}</h2>
          <p className="text-saffron-100 text-sm mt-1">✅ {lang === 'mr' ? 'मंजूर विक्रेता' : 'Verified Vendor'} • {user.state}</p>
        </div>
        <div className="text-5xl">🏪</div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h3 className="font-display font-bold text-lg text-gray-800">
          {lang === 'mr' ? 'माझ्या पीक याद्या' : 'My Crop Listings'} ({crops.length})
        </h3>
          <button onClick={() => setModal('add')} className="btn-primary text-sm w-full sm:w-auto">
          + {lang === 'mr' ? 'नवीन पीक जोडा' : 'Add Crop Listing'}
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />)}</div>
      ) : crops.length === 0 ? (
        <EmptyState icon="📋" message={lang === 'mr' ? 'अजून कोणतीही यादी नाही' : 'No listings yet'} sub={lang === 'mr' ? 'पहिले पीक जोडा' : 'Add your first crop listing'} />
      ) : (
        <div className="space-y-3">
          {crops.map(crop => (
            <div key={crop._id} className={`card p-4 border ${crop.isActive ? 'border-transparent' : 'border-red-200 opacity-60'}`}>
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-display font-bold text-gray-800">{crop.name}</span>
                    {crop.nameMarathi && <span className="text-gray-500 text-sm">/ {crop.nameMarathi}</span>}
                    <CategoryBadge category={crop.category} />
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${crop.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                      {crop.isActive ? (lang === 'mr' ? '● सक्रिय' : '● Active') : (lang === 'mr' ? 'निष्क्रिय' : 'Inactive')}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">📍 {crop.location}{crop.district ? `, ${crop.district}` : ''}</div>
                  <div className="text-xs text-gray-400 mt-0.5">Min: {crop.minQuantity} qtl {crop.maxQuantity ? `• Max: ${crop.maxQuantity} qtl` : ''}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-display font-bold text-xl text-primary-700">₹{crop.pricePerQuintal?.toLocaleString()}</div>
                  <div className="text-xs text-gray-400 mb-3">/क्विंटल</div>
                  <div className="flex gap-2 justify-end flex-wrap">
                    <button onClick={() => setModal(crop)} className="text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-lg font-semibold transition-colors">
                      ✏️ {lang === 'mr' ? 'संपादित' : 'Edit'}
                    </button>
                    <button onClick={() => setConfirmDelete(crop._id)} className="text-xs bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg font-semibold transition-colors">
                      🗑️ {lang === 'mr' ? 'हटवा' : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <CropModal
          crop={modal === 'add' ? null : modal}
          onClose={() => setModal(null)}
          onSave={handleSave}
          lang={lang}
        />
      )}
      <ConfirmModal
        isOpen={!!confirmDelete}
        message={lang === 'mr' ? 'ही यादी हटवायची आहे का?' : 'Delete this crop listing?'}
        confirmText={lang === 'mr' ? 'हटवा' : 'Delete'}
        onConfirm={() => handleDelete(confirmDelete)}
        onCancel={() => setConfirmDelete(null)}
      />
    </div>
  )
}

// ─── Admin Dashboard ─────────────────────────────────────────────
function AdminDashboard({ lang }) {
  const [tab, setTab] = useState('pending')
  const [stats, setStats] = useState({})
  const [vendors, setVendors] = useState([])
  const [farmers, setFarmers] = useState([])
  const [crops, setCrops] = useState([])
  const [loading, setLoading] = useState(true)
  const [confirmAction, setConfirmAction] = useState(null)

  const loadData = async () => {
    setLoading(true)
    try {
      const [statsRes, vendorsRes, farmersRes, cropsRes] = await Promise.all([
        api.get('/admin/stats'),
        api.get('/admin/vendors'),
        api.get('/admin/farmers'),
        api.get('/admin/crops'),
      ])
      setStats(statsRes.data)
      setVendors(vendorsRes.data)
      setFarmers(farmersRes.data)
      setCrops(cropsRes.data)
    } catch (err) {
      toast.error('Failed to load admin data')
    } finally { setLoading(false) }
  }

  useEffect(() => { loadData() }, [])

  const approve = async (id) => {
    try {
      await api.patch(`/admin/vendors/${id}/approve`)
      toast.success('Vendor approved!')
      loadData()
    } catch { toast.error('Failed to approve') }
  }

  const reject = async (id) => {
    try {
      await api.patch(`/admin/vendors/${id}/reject`)
      toast.success('Vendor rejected')
      setConfirmAction(null)
      loadData()
    } catch { toast.error('Failed to reject') }
  }

  const deleteVendor = async (id) => {
    try {
      await api.delete(`/admin/vendors/${id}`)
      toast.success('Vendor and all crops deleted')
      setConfirmAction(null)
      loadData()
    } catch { toast.error('Failed to delete') }
  }

  const pendingVendors = vendors.filter(v => !v.isApproved)
  const approvedVendors = vendors.filter(v => v.isApproved)

  return (
    <div className="space-y-6">
      {/* Admin header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white rounded-2xl p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm mb-1">Admin Panel</p>
            <h2 className="font-display font-bold text-2xl">FarmConnect Admin</h2>
            <p className="text-gray-400 text-sm mt-1">प्रशासक नियंत्रण केंद्र</p>
          </div>
          <div className="text-5xl">🔐</div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label={lang === 'mr' ? 'एकूण शेतकरी' : 'Total Farmers'} value={stats.totalFarmers || 0} icon="👨‍🌾" color="green" />
        <StatCard label={lang === 'mr' ? 'सक्रिय विक्रेते' : 'Active Vendors'} value={stats.totalVendors || 0} icon="🏪" color="saffron" />
        <StatCard label={lang === 'mr' ? 'प्रतीक्षेत' : 'Pending Approval'} value={stats.pendingVendors || 0} icon="⏳" color="red" />
        <StatCard label={lang === 'mr' ? 'सक्रिय याद्या' : 'Active Listings'} value={stats.activeListings || 0} icon="📋" color="blue" />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 overflow-x-auto">
        {[
          { key: 'pending', label: `Pending (${pendingVendors.length})` },
          { key: 'vendors', label: `All Vendors (${approvedVendors.length})` },
          { key: 'farmers', label: `Farmers (${farmers.length})` },
          { key: 'crops', label: `Listings (${crops.length})` },
        ].map(t2 => (
          <button key={t2.key} onClick={() => setTab(t2.key)}
            className={`py-2.5 px-3 rounded-lg text-xs font-semibold font-display transition-all whitespace-nowrap ${tab === t2.key ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
            {t2.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />)}</div>
      ) : (
        <>
          {/* Pending vendors */}
          {tab === 'pending' && (
            <div className="space-y-3">
              {pendingVendors.length === 0 ? (
                <EmptyState icon="✅" message="No pending approvals" />
              ) : pendingVendors.map(v => (
                <div key={v._id} className="card p-4 border-l-4 border-saffron-400 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-saffron-100 flex items-center justify-center font-bold text-saffron-700">{v.name?.[0]}</div>
                  <div className="flex-1">
                    <div className="font-display font-bold text-gray-800">{v.name}</div>
                    <div className="text-xs text-gray-500">{v.email} • {v.phone}</div>
                    <div className="text-xs text-gray-400">{v.district}, {v.state} • Registered: {new Date(v.createdAt).toLocaleDateString('en-IN')}</div>
                  </div>
                  <div className="flex gap-2 shrink-0 w-full sm:w-auto">
                    <button onClick={() => approve(v._id)} className="btn-primary text-xs py-2 px-3">✅ Approve</button>
                    <button onClick={() => setConfirmAction({ type: 'reject', id: v._id, name: v.name })} className="btn-outline text-xs py-2 px-3 text-red-500 border-red-300 hover:bg-red-50">❌ Reject</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Approved vendors */}
          {tab === 'vendors' && (
            <div className="space-y-3">
              {approvedVendors.length === 0 ? <EmptyState icon="🏪" message="No approved vendors yet" /> :
                approvedVendors.map(v => (
                  <div key={v._id} className="card p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-700">{v.name?.[0]}</div>
                    <div className="flex-1">
                      <div className="font-display font-bold text-gray-800">{v.name}</div>
                      <div className="text-xs text-gray-500">{v.email} • {v.phone}</div>
                      <div className="text-xs text-gray-400">{v.district}, {v.state}</div>
                    </div>
                    <button onClick={() => setConfirmAction({ type: 'delete', id: v._id, name: v.name })}
                      className="text-xs bg-red-50 text-red-500 hover:bg-red-100 px-3 py-1.5 rounded-lg font-semibold w-full sm:w-auto">🗑️ Delete</button>
                  </div>
                ))
              }
            </div>
          )}

          {/* Farmers list */}
          {tab === 'farmers' && (
            <div className="space-y-2">
              {farmers.length === 0 ? <EmptyState icon="👨‍🌾" message="No farmers registered yet" /> :
                farmers.map(f => (
                  <div key={f._id} className="card p-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-sm font-bold text-green-700">{f.name?.[0]}</div>
                    <div>
                      <div className="font-semibold text-sm text-gray-800 font-display">{f.name}</div>
                      <div className="text-xs text-gray-500">{f.email} • {f.district}, {f.state}</div>
                    </div>
                    <div className="ml-auto text-xs text-gray-400">{new Date(f.createdAt).toLocaleDateString('en-IN')}</div>
                  </div>
                ))
              }
            </div>
          )}

          {/* All crop listings */}
          {tab === 'crops' && (
            <div className="space-y-2">
              {crops.length === 0 ? <EmptyState icon="🌾" message="No crop listings yet" /> :
                crops.map(crop => (
                  <div key={crop._id} className="card p-3 flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-gray-800 font-display">{crop.name} {crop.nameMarathi && `/ ${crop.nameMarathi}`}</div>
                      <div className="text-xs text-gray-500">By: {crop.vendor?.name} ({crop.vendor?.email}) • {crop.location}</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-bold text-primary-700 font-display">₹{crop.pricePerQuintal?.toLocaleString()}</div>
                      <div className={`text-xs ${crop.isActive ? 'text-green-600' : 'text-red-500'}`}>{crop.isActive ? 'Active' : 'Inactive'}</div>
                    </div>
                  </div>
                ))
              }
            </div>
          )}
        </>
      )}

      <ConfirmModal
        isOpen={!!confirmAction}
        message={confirmAction?.type === 'delete'
          ? `Delete vendor "${confirmAction?.name}" and ALL their crop listings?`
          : `Reject vendor "${confirmAction?.name}"?`}
        confirmText={confirmAction?.type === 'delete' ? 'Delete All' : 'Reject'}
        onConfirm={() => confirmAction?.type === 'delete' ? deleteVendor(confirmAction.id) : reject(confirmAction.id)}
        onCancel={() => setConfirmAction(null)}
      />
    </div>
  )
}

// ─── Main Dashboard ────────────────────────────────────────────────
export default function Dashboard() {
  const { user } = useAuth()
  const { lang } = useLang()

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-5xl mb-3">🔒</div>
        <p className="font-display font-bold text-lg text-gray-700">Please login to access dashboard</p>
        <a href="/login" className="btn-primary mt-4 inline-block">Login</a>
      </div>
    </div>
  )

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8">
      {user.role === 'admin' && <AdminDashboard lang={lang} />}
      {user.role === 'vendor' && <VendorDashboard user={user} lang={lang} />}
      {user.role === 'farmer' && <FarmerDashboard user={user} lang={lang} />}
    </div>
  )
}
