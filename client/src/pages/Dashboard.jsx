import { useState, useEffect } from 'react'
import api from '../utils/api'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { Confirm, Counter } from '../components/common/UI'
import toast from 'react-hot-toast'

const CATS = ['grains','vegetables','fruits','pulses','oilseeds','spices','cotton','other']
const STATES = ['Maharashtra','Punjab','Gujarat','Uttar Pradesh','Madhya Pradesh','Rajasthan','Karnataka','Andhra Pradesh','Tamil Nadu','Haryana']

function Modal({ open, onClose, onSave, initial, lang }) {
  const blank = { name:'', nameMarathi:'', category:'grains', pricePerQuintal:'', minQuantity:1, location:'', district:'', state:'Maharashtra', description:'' }
  const [form, setForm] = useState(initial || blank)
  const [saving, setSaving] = useState(false)
  useEffect(() => setForm(initial || blank), [initial])
  const set = (k,v) => setForm(f=>({...f,[k]:v}))
  const handleSave = async () => {
    if (!form.name || !form.pricePerQuintal || !form.location) { toast.error('Fill required fields'); return }
    setSaving(true); try { await onSave(form) } finally { setSaving(false) }
  }
  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="font-heading font-bold text-gray-900">{initial?._id?(lang==='mr'?'पीक संपादित करा':'Edit Crop'):(lang==='mr'?'नवीन पीक जोडा':'Add New Crop')}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg></button>
        </div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="label">{lang==='mr'?'पिकाचे नाव *':'Crop Name *'}</label><input value={form.name} onChange={e=>set('name',e.target.value)} className="input" placeholder="e.g. Wheat"/></div>
            <div><label className="label">मराठी नाव</label><input value={form.nameMarathi} onChange={e=>set('nameMarathi',e.target.value)} className="input" placeholder="e.g. गहू"/></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="label">{lang==='mr'?'श्रेणी *':'Category *'}</label><select value={form.category} onChange={e=>set('category',e.target.value)} className="input">{CATS.map(c=><option key={c} value={c}>{c}</option>)}</select></div>
            <div><label className="label">{lang==='mr'?'किंमत (₹/क्विं.) *':'Price ₹/qtl *'}</label><input type="number" value={form.pricePerQuintal} onChange={e=>set('pricePerQuintal',e.target.value)} className="input" placeholder="e.g. 2200"/></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="label">{lang==='mr'?'किमान प्रमाण (क्विं.)':'Min Qty (qtl)'}</label><input type="number" value={form.minQuantity} onChange={e=>set('minQuantity',e.target.value)} className="input"/></div>
            <div><label className="label">{lang==='mr'?'राज्य':'State'}</label><select value={form.state} onChange={e=>set('state',e.target.value)} className="input">{STATES.map(s=><option key={s}>{s}</option>)}</select></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="label">{lang==='mr'?'ठिकाण *':'Location *'}</label><input value={form.location} onChange={e=>set('location',e.target.value)} className="input" placeholder="City/Village"/></div>
            <div><label className="label">{lang==='mr'?'जिल्हा':'District'}</label><input value={form.district} onChange={e=>set('district',e.target.value)} className="input" placeholder="District"/></div>
          </div>
          <div><label className="label">{lang==='mr'?'वर्णन':'Description'}</label><textarea rows={2} value={form.description} onChange={e=>set('description',e.target.value)} className="input resize-none" placeholder="Optional details..."/></div>
        </div>
        <div className="flex gap-3 p-5 border-t border-gray-100">
          <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 justify-center disabled:opacity-50">{saving?'Saving...':(lang==='mr'?'जतन करा':'Save')}</button>
          <button onClick={onClose} className="btn-outline flex-1 justify-center">{lang==='mr'?'रद्द करा':'Cancel'}</button>
        </div>
      </div>
    </div>
  )
}

function FarmerDash({ user, lang }) {
  const [crops, setCrops] = useState([])
  useEffect(() => { api.get('/crops').then(r=>setCrops(r.data.slice(0,8))).catch(()=>{}) }, [])
  return (
    <div>
      <div className="bg-gradient-to-r from-brand-50 to-brand-100/50 border border-brand-200 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-xl shadow-md">{user.name?.[0]?.toUpperCase()}</div>
          <div>
            <h2 className="font-heading font-bold text-xl text-gray-900">{lang==='mr'?'नमस्कार':'Welcome'}, {user.name}!</h2>
            <p className="text-sm text-brand-700 font-medium">{lang==='mr'?'शेतकरी — सदस्य':'Farmer — Member'} {user.district?`| ${user.district}`:''}</p>
          </div>
        </div>
      </div>
      <h3 className="font-heading font-bold text-gray-900 text-lg mb-4">{lang==='mr'?'थेट पीक खरेदी भाव':'Latest Crop Buying Prices'}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {crops.map(c=>(
          <div key={c._id} className="card p-4">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-heading font-bold text-gray-900 text-sm">{c.nameMarathi||c.name}</h4>
              <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-semibold">{c.category}</span>
            </div>
            <div className="text-2xl font-bold text-brand-700 font-heading mb-1">₹{c.pricePerQuintal?.toLocaleString('en-IN')}</div>
            <div className="text-xs text-gray-500">{c.location}{c.district?`, ${c.district}`:''}</div>
            {c.vendor?.phone && <a href={`tel:${c.vendor.phone}`} className="btn-primary w-full justify-center text-xs py-2 mt-3">{lang==='mr'?'संपर्क करा':'Contact Vendor'}</a>}
          </div>
        ))}
      </div>
    </div>
  )
}

function VendorDash({ user, lang }) {
  const [crops, setCrops] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editCrop, setEditCrop] = useState(null)
  const [delId, setDelId] = useState(null)

  const load = () => { setLoading(true); api.get('/crops/my').then(r=>setCrops(r.data)).catch(()=>{}).finally(()=>setLoading(false)) }
  useEffect(load, [])

  const handleSave = async (form) => {
    try {
      if (editCrop?._id) await api.put(`/crops/${editCrop._id}`, form)
      else await api.post('/crops', form)
      toast.success(editCrop?._id ? 'Updated!' : 'Crop added!')
      setModalOpen(false); setEditCrop(null); load()
    } catch(e) { toast.error(e.response?.data?.message || 'Error') }
  }
  const handleDelete = async () => {
    try { await api.delete(`/crops/${delId}`); toast.success('Deleted'); setDelId(null); load() }
    catch { toast.error('Delete failed') }
  }

  if (!user.isApproved) return (
    <div className="card p-8 text-center border-2 border-amber-200 bg-amber-50">
      <div className="w-14 h-14 rounded-2xl bg-amber-100 mx-auto mb-4 flex items-center justify-center"><svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>
      <h3 className="font-heading font-bold text-amber-800 text-xl mb-2">{lang==='mr'?'मंजुरी प्रतीक्षेत':'Pending Admin Approval'}</h3>
      <p className="text-amber-700 text-sm">{lang==='mr'?'तुमचे खाते प्रशासकाच्या मंजुरीची प्रतीक्षा करत आहे.':'Your account is awaiting admin approval. You will be able to post prices once approved.'}</p>
    </div>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="font-heading font-bold text-xl text-gray-900">{lang==='mr'?'माझ्या पीक याद्या':'My Crop Listings'}</h2>
          <p className="text-sm text-gray-500 mt-0.5">{crops.length} {lang==='mr'?'याद्या':'active listings'}</p>
        </div>
        <button onClick={()=>{setEditCrop(null);setModalOpen(true)}} className="btn-primary">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
          {lang==='mr'?'पीक जोडा':'Add Crop'}
        </button>
      </div>
      {loading
        ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{[...Array(3)].map((_,i)=><div key={i} className="card p-5 space-y-3"><div className="shimmer h-5 rounded w-3/4"/><div className="shimmer h-12 rounded"/><div className="shimmer h-4 rounded w-1/2"/></div>)}</div>
        : crops.length===0
          ? <div className="card p-12 text-center"><div className="w-16 h-16 rounded-2xl bg-gray-100 mx-auto mb-4 flex items-center justify-center"><svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4"/></svg></div><h3 className="font-heading font-semibold text-gray-700 mb-2">{lang==='mr'?'अजून कोणती पीक यादी नाही':'No listings yet'}</h3><button onClick={()=>setModalOpen(true)} className="btn-primary mx-auto">{lang==='mr'?'पहिले पीक जोडा':'Add First Crop'}</button></div>
          : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {crops.map(c=>(
                <div key={c._id} className="card p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div><h4 className="font-heading font-bold text-gray-900">{c.nameMarathi||c.name}</h4><p className="text-xs text-gray-400">{c.category}</p></div>
                    <div className="flex gap-1">
                      <button onClick={()=>{setEditCrop(c);setModalOpen(true)}} className="w-8 h-8 rounded-lg hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center text-gray-400 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg></button>
                      <button onClick={()=>setDelId(c._id)} className="w-8 h-8 rounded-lg hover:bg-red-50 hover:text-red-500 flex items-center justify-center text-gray-400 transition-colors"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
                    </div>
                  </div>
                  <div className="bg-brand-50 border border-brand-200 rounded-xl p-3 text-center mb-3">
                    <div className="text-2xl font-bold text-brand-700 font-heading">₹{c.pricePerQuintal?.toLocaleString('en-IN')}</div>
                    <div className="text-xs text-brand-600">{lang==='mr'?'प्रति क्विंटल':'per quintal'}</div>
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>{c.location}{c.district?`, ${c.district}`:''}</div>
                </div>
              ))}
            </div>}
      <Modal open={modalOpen} onClose={()=>{setModalOpen(false);setEditCrop(null)}} onSave={handleSave} initial={editCrop} lang={lang}/>
      <Confirm open={!!delId} msg={lang==='mr'?'हे पीक हटवायचे आहे का?':'Delete this crop listing?'} onOk={handleDelete} onCancel={()=>setDelId(null)}/>
    </div>
  )
}

function AdminDash({ lang }) {
  const [stats, setStats] = useState(null)
  const [vendors, setVendors] = useState([])
  const [tab, setTab] = useState('pending')
  const [confirmId, setConfirmId] = useState(null)
  const [confirmAction, setConfirmAction] = useState(null)

  useEffect(() => {
    api.get('/admin/stats').then(r=>setStats(r.data)).catch(()=>{})
    api.get('/admin/vendors').then(r=>setVendors(r.data)).catch(()=>{})
  }, [])

  const handleAction = async (id, action) => {
    try {
      if (action==='approve') await api.patch(`/admin/vendors/${id}/approve`)
      else if (action==='reject') await api.patch(`/admin/vendors/${id}/reject`)
      else await api.delete(`/admin/vendors/${id}`)
      toast.success(action==='approve'?'Vendor approved!':action==='reject'?'Vendor rejected':'Vendor deleted')
      api.get('/admin/vendors').then(r=>setVendors(r.data))
      api.get('/admin/stats').then(r=>setStats(r.data))
    } catch { toast.error('Action failed') }
    setConfirmId(null); setConfirmAction(null)
  }

  const pending = vendors.filter(v=>!v.isApproved&&v.isActive)
  const approved = vendors.filter(v=>v.isApproved)

  return (
    <div>
      {/* stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {label:lang==='mr'?'एकूण शेतकरी':'Total Farmers', val:stats?.totalFarmers||0, c:'bg-green-50 text-green-700'},
          {label:lang==='mr'?'मंजूर विक्रेते':'Approved Vendors', val:stats?.totalVendors||0, c:'bg-blue-50 text-blue-700'},
          {label:lang==='mr'?'प्रतीक्षेत विक्रेते':'Pending Vendors', val:stats?.pendingVendors||0, c:'bg-amber-50 text-amber-700'},
          {label:lang==='mr'?'सक्रिय याद्या':'Active Listings', val:stats?.activeListings||0, c:'bg-brand-50 text-brand-700'},
        ].map((s,i)=>(
          <div key={i} className={`card p-5 ${s.c} border-0`}>
            <div className={`text-3xl font-bold font-heading mb-1 ${s.c.split(' ')[1]}`}><Counter value={s.val} suffix=""/></div>
            <div className="text-xs font-medium opacity-70">{s.label}</div>
          </div>
        ))}
      </div>
      {/* vendor management */}
      <div className="card overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center gap-2">
          <button onClick={()=>setTab('pending')} className={`px-4 py-2 rounded-xl text-sm font-semibold font-heading transition-colors ${tab==='pending'?'bg-amber-100 text-amber-700':'text-gray-500 hover:bg-gray-50'}`}>{lang==='mr'?'प्रतीक्षेत':'Pending'} {pending.length>0&&<span className="ml-1 bg-amber-500 text-white text-xs rounded-full px-1.5">{pending.length}</span>}</button>
          <button onClick={()=>setTab('approved')} className={`px-4 py-2 rounded-xl text-sm font-semibold font-heading transition-colors ${tab==='approved'?'bg-brand-100 text-brand-700':'text-gray-500 hover:bg-gray-50'}`}>{lang==='mr'?'मंजूर':'Approved'}</button>
        </div>
        <div className="divide-y divide-gray-50">
          {(tab==='pending'?pending:approved).map(v=>(
            <div key={v._id} className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white font-bold shrink-0">{v.name?.[0]?.toUpperCase()}</div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{v.name}</p>
                  <p className="text-xs text-gray-400 truncate">{v.email}</p>
                  {v.district && <p className="text-xs text-gray-400">{v.district}, {v.state}</p>}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 shrink-0 w-full sm:w-auto">
                {tab==='pending' && <button onClick={()=>{setConfirmId(v._id);setConfirmAction('approve')}} className="btn-primary text-xs py-1.5 px-3">{lang==='mr'?'मंजूर करा':'Approve'}</button>}
                {tab==='pending' && <button onClick={()=>{setConfirmId(v._id);setConfirmAction('reject')}} className="text-xs border border-red-200 text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-xl font-semibold transition-colors">{lang==='mr'?'नाकारा':'Reject'}</button>}
                {tab==='approved' && <button onClick={()=>{setConfirmId(v._id);setConfirmAction('delete')}} className="text-xs border border-red-200 text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-xl font-semibold transition-colors">{lang==='mr'?'हटवा':'Delete'}</button>}
              </div>
            </div>
          ))}
          {(tab==='pending'?pending:approved).length===0 && <div className="py-10 text-center text-sm text-gray-400">{tab==='pending'?(lang==='mr'?'कोणतेही प्रतीक्षेत अर्ज नाही':'No pending applications'):(lang==='mr'?'कोणतेही मंजूर विक्रेते नाहीत':'No approved vendors')}</div>}
        </div>
      </div>
      <Confirm open={!!confirmId} msg={confirmAction==='approve'?'Approve this vendor?':confirmAction==='reject'?'Reject this vendor?':'Delete this vendor and all their listings?'} onOk={()=>handleAction(confirmId,confirmAction)} onCancel={()=>{setConfirmId(null);setConfirmAction(null)}} danger={confirmAction!=='approve'}/>
    </div>
  )
}

export default function Dashboard() {
  const { user } = useAuth(); const { lang } = useLang()
  if (!user) return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="page-hero py-8">
        <div className="section">
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-white">{lang==='mr'?'डॅशबोर्ड':'Dashboard'}</h1>
          <p className="text-brand-300 mt-1 text-sm">{lang==='mr'?'तुमचे FarmConnect पोर्टल':'Your FarmConnect Portal'}</p>
        </div>
      </div>
      <div className="section py-8">
        {user.role==='admin' && <AdminDash lang={lang}/>}
        {user.role==='vendor' && <VendorDash user={user} lang={lang}/>}
        {user.role==='farmer' && <FarmerDash user={user} lang={lang}/>}
      </div>
    </div>
  )
}
