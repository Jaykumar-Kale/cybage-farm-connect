import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../utils/api'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { PageHeader, Empty } from '../components/common/UI'
import toast from 'react-hot-toast'

const CATS = [{k:'all',en:'All',mr:'सर्व'},{k:'crop-advice',en:'Crop Advice',mr:'पीक सल्ला'},{k:'pest-control',en:'Pest Control',mr:'कीड नियंत्रण'},{k:'market-price',en:'Market Price',mr:'बाजार भाव'},{k:'government-scheme',en:'Govt Scheme',mr:'सरकारी योजना'},{k:'weather',en:'Weather',mr:'हवामान'},{k:'general',en:'General',mr:'सामान्य'}]

function ago(d) { const s=Math.floor((Date.now()-new Date(d))/1000); if(s<60)return'just now'; if(s<3600)return`${Math.floor(s/60)}m ago`; if(s<86400)return`${Math.floor(s/3600)}h ago`; return`${Math.floor(s/86400)}d ago` }

function PostCard({ post, onLike, onComment, user, lang }) {
  const [showC, setShowC] = useState(false)
  const [txt, setTxt] = useState('')
  const [sub, setSub] = useState(false)
  const liked = user && post.likes?.includes(user._id)
  const cat = CATS.find(c=>c.k===post.category)||CATS[0]

  const handleComment = async () => {
    if (!txt.trim()) return; setSub(true)
    try { await onComment(post._id, txt); setTxt('') } finally { setSub(false) }
  }

  return (
    <div className="card p-5">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-sm shrink-0">{post.author?.name?.[0]?.toUpperCase()}</div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-heading font-semibold text-gray-900 text-sm">{post.author?.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${post.author?.role==='vendor'?'bg-saffron-50 text-saffron-700 border-saffron-200':'bg-brand-50 text-brand-700 border-brand-200'}`}>{post.author?.role==='vendor'?(lang==='mr'?'विक्रेता':'Vendor'):(lang==='mr'?'शेतकरी':'Farmer')}</span>
              {post.author?.district && <span className="text-xs text-gray-400">{post.author.district}</span>}
            </div>
            <p className="text-xs text-gray-400 mt-0.5">{ago(post.createdAt)}</p>
          </div>
        </div>
        <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium border border-gray-200 shrink-0">{lang==='mr'?cat.mr:cat.en}</span>
      </div>
      <h3 className="font-heading font-bold text-gray-900 mb-2">{post.title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">{post.content}</p>
      <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
        <button onClick={()=>user?onLike(post._id):toast.error('Login required')} className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${liked?'text-red-500':'text-gray-400 hover:text-red-400'}`}>
          <svg className="w-4 h-4" fill={liked?'currentColor':'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
          {post.likes?.length||0}
        </button>
        <button onClick={()=>setShowC(!showC)} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-brand-600 font-medium transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
          {post.comments?.length||0} {lang==='mr'?'टिप्पण्या':'comments'}
        </button>
      </div>
      {showC && (
        <div className="mt-4 space-y-3 animate-fade-in">
          {post.comments?.map((c,i)=>(
            <div key={i} className="flex gap-2.5 bg-gray-50 rounded-xl p-3">
              <div className="w-7 h-7 rounded-lg bg-brand-100 flex items-center justify-center text-xs font-bold text-brand-700 shrink-0">{c.author?.name?.[0]?.toUpperCase()}</div>
              <div><div className="flex items-center gap-2"><span className="text-xs font-semibold text-gray-700">{c.author?.name}</span><span className="text-xs text-gray-400">{ago(c.createdAt)}</span></div><p className="text-xs text-gray-600 mt-0.5">{c.content}</p></div>
            </div>
          ))}
          {user
            ? <div className="flex flex-col sm:flex-row gap-2"><input type="text" value={txt} onChange={e=>setTxt(e.target.value)} placeholder={lang==='mr'?'टिप्पणी लिहा...':'Write a comment...'} className="input flex-1 py-2 text-sm" onKeyDown={e=>e.key==='Enter'&&handleComment()}/><button onClick={handleComment} disabled={sub} className="btn-primary text-sm py-2 px-4 w-full sm:w-auto">{sub?'...':'→'}</button></div>
            : <p className="text-xs text-gray-400 text-center">{lang==='mr'?'टिप्पणी करण्यासाठी लॉगिन करा':'Login to comment'}</p>}
        </div>
      )}
    </div>
  )
}

export default function Forum() {
  const { user } = useAuth(); const { lang } = useLang()
  const [posts, setPosts] = useState([]); const [loading, setLoading] = useState(true)
  const [cat, setCat] = useState('all'); const [showForm, setShowForm] = useState(false)
  const [np, setNp] = useState({ title:'', content:'', category:'general' }); const [sub, setSub] = useState(false)

  const load = async () => {
    setLoading(true)
    try { const p = cat!=='all'?`?category=${cat}`:''; const { data } = await api.get(`/forum${p}`); setPosts(data) }
    catch {} finally { setLoading(false) }
  }
  useEffect(() => { load() }, [cat])

  const handleLike = async id => { try { await api.post(`/forum/${id}/like`); load() } catch { toast.error('Login required') } }
  const handleComment = async (id, content) => { try { await api.post(`/forum/${id}/comment`, { content }); toast.success('Comment added'); load() } catch { toast.error('Failed') } }
  const handlePost = async () => {
    if (!np.title.trim() || !np.content.trim()) { toast.error('Fill title and content'); return }
    setSub(true)
    try { await api.post('/forum', np); toast.success('Posted!'); setShowForm(false); setNp({ title:'', content:'', category:'general' }); load() }
    catch { toast.error('Login required') } finally { setSub(false) }
  }

  return (
    <div>
      <PageHeader title={lang==='mr'?'शेतकरी समुदाय मंच':'Farmer Community Forum'} subtitle={lang==='mr'?'प्रश्न विचारा, अनुभव शेअर करा':'Ask questions, share experiences, learn together'} crumb={lang==='mr'?'मुखपृष्ठ / मंच':'Home / Forum'}/>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
          <div className="flex flex-wrap gap-2">
            {CATS.map(c=><button key={c.k} onClick={()=>setCat(c.k)} className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${cat===c.k?'bg-brand-600 text-white':'bg-white border border-gray-200 text-gray-600 hover:border-brand-300'}`}>{lang==='mr'?c.mr:c.en}</button>)}
          </div>
          {user && <button onClick={()=>setShowForm(!showForm)} className="btn-primary text-xs py-2 px-4 shrink-0">+ {lang==='mr'?'प्रश्न विचारा':'Ask Question'}</button>}
        </div>
        {showForm && (
          <div className="card p-5 mb-6 border-2 border-brand-200 animate-slide-up">
            <h3 className="font-heading font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">{lang==='mr'?'नवीन पोस्ट':'New Post'}</h3>
            <div className="space-y-3">
              <input type="text" placeholder={lang==='mr'?'शीर्षक...':'Title...'} value={np.title} onChange={e=>setNp(p=>({...p,title:e.target.value}))} className="input font-heading font-semibold"/>
              <textarea rows={3} placeholder={lang==='mr'?'तुमचा प्रश्न किंवा अनुभव...':'Your question or experience...'} value={np.content} onChange={e=>setNp(p=>({...p,content:e.target.value}))} className="input resize-none"/>
              <select value={np.category} onChange={e=>setNp(p=>({...p,category:e.target.value}))} className="input">{CATS.filter(c=>c.k!=='all').map(c=><option key={c.k} value={c.k}>{lang==='mr'?c.mr:c.en}</option>)}</select>
              <div className="flex flex-col sm:flex-row gap-3"><button onClick={handlePost} disabled={sub} className="btn-primary flex-1 justify-center disabled:opacity-50">{sub?'...':(lang==='mr'?'प्रकाशित करा':'Publish')}</button><button onClick={()=>setShowForm(false)} className="btn-outline flex-1 justify-center">{lang==='mr'?'रद्द करा':'Cancel'}</button></div>
            </div>
          </div>
        )}
        {!user && <div className="card p-4 mb-6 text-center border border-brand-100"><p className="text-sm text-brand-700">{lang==='mr'?'प्रश्न विचारण्यासाठी ':'To post or comment, '}<Link to="/login" className="font-bold underline">{lang==='mr'?'लॉगिन करा':'login here'}</Link></p></div>}
        {loading
          ? <div className="space-y-4">{[...Array(3)].map((_,i)=><div key={i} className="card p-5 space-y-3"><div className="shimmer h-5 rounded w-3/4"/><div className="shimmer h-4 rounded"/><div className="shimmer h-4 rounded w-1/2"/></div>)}</div>
          : posts.length===0
            ? <Empty title={lang==='mr'?'अजून पोस्ट नाही':'No posts yet'} sub={lang==='mr'?'पहिला प्रश्न विचारा':'Be the first to ask!'}/>
            : <div className="space-y-4">{posts.map(p=><PostCard key={p._id} post={p} onLike={handleLike} onComment={handleComment} user={user} lang={lang}/>)}</div>}
      </div>
    </div>
  )
}
