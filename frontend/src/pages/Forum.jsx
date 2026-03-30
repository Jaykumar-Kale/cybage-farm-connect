import { useState, useEffect } from 'react'
import api from '../utils/api'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { PageHeader, EmptyState } from '../components/common/UI'
import toast from 'react-hot-toast'

const CATEGORIES = [
  { key: 'all', label: 'All Posts', labelM: 'सर्व पोस्ट', icon: '📋' },
  { key: 'crop-advice', label: 'Crop Advice', labelM: 'पीक सल्ला', icon: '🌾' },
  { key: 'pest-control', label: 'Pest Control', labelM: 'कीड नियंत्रण', icon: '🐛' },
  { key: 'market-price', label: 'Market Price', labelM: 'बाजार भाव', icon: '💰' },
  { key: 'government-scheme', label: 'Govt Scheme', labelM: 'सरकारी योजना', icon: '🏛️' },
  { key: 'weather', label: 'Weather', labelM: 'हवामान', icon: '🌧️' },
  { key: 'general', label: 'General', labelM: 'सामान्य', icon: '💬' },
]

function timeAgo(date) {
  const d = Math.floor((Date.now() - new Date(date)) / 1000)
  if (d < 60) return 'just now'
  if (d < 3600) return `${Math.floor(d / 60)}m ago`
  if (d < 86400) return `${Math.floor(d / 3600)}h ago`
  return `${Math.floor(d / 86400)}d ago`
}

function PostCard({ post, onLike, onComment, user, lang }) {
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const liked = user && post.likes?.includes(user._id)

  const handleComment = async () => {
    if (!commentText.trim()) return
    setSubmitting(true)
    try {
      await onComment(post._id, commentText)
      setCommentText('')
    } finally { setSubmitting(false) }
  }

  const cat = CATEGORIES.find(c => c.key === post.category) || CATEGORIES[0]

  return (
    <div className="card p-5 hover:border-primary-200 border border-transparent transition-all">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-100 border-2 border-primary-200 flex items-center justify-center font-bold text-primary-700 font-display shrink-0">
            {post.author?.name?.[0]?.toUpperCase() || '?'}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-display font-semibold text-gray-800">{post.author?.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                post.author?.role === 'vendor' ? 'bg-saffron-100 text-saffron-700' : 'bg-primary-100 text-primary-700'
              }`}>
                {post.author?.role === 'vendor' ? (lang === 'mr' ? 'विक्रेता' : 'Vendor') : (lang === 'mr' ? 'शेतकरी' : 'Farmer')}
              </span>
              {post.author?.district && <span className="text-xs text-gray-400">📍 {post.author.district}</span>}
            </div>
            <div className="text-xs text-gray-400 mt-0.5">{timeAgo(post.createdAt)}</div>
          </div>
        </div>
        <span className="shrink-0 text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">
          {cat.icon} {lang === 'mr' ? cat.labelM : cat.label}
        </span>
      </div>

      <h3 className="font-display font-bold text-gray-800 text-base mb-2">{post.title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-4">{post.content}</p>

      <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
        <button
          onClick={() => user ? onLike(post._id) : toast.error('Please login to like')}
          className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${liked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}
        >
          <span className="text-base">{liked ? '❤️' : '🤍'}</span>
          {post.likes?.length || 0}
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-primary-600 font-medium transition-colors"
        >
          <span className="text-base">💬</span>
          {post.comments?.length || 0} {lang === 'mr' ? 'टिप्पण्या' : 'comments'}
        </button>
      </div>

      {showComments && (
        <div className="mt-4 space-y-3 animate-fade-in">
          {post.comments?.map((c, i) => (
            <div key={i} className="flex gap-2.5 bg-gray-50 rounded-lg p-3">
              <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center text-xs font-bold text-primary-700 shrink-0">
                {c.author?.name?.[0]?.toUpperCase() || '?'}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-700">{c.author?.name}</span>
                  <span className="text-xs text-gray-400">{timeAgo(c.createdAt)}</span>
                </div>
                <p className="text-xs text-gray-600 mt-0.5">{c.content}</p>
              </div>
            </div>
          ))}
          {user ? (
            <div className="flex gap-2 mt-2">
              <input
                type="text" value={commentText} onChange={e => setCommentText(e.target.value)}
                placeholder={lang === 'mr' ? 'टिप्पणी लिहा...' : 'Write a comment...'}
                className="input-field flex-1 py-2 text-sm"
                onKeyDown={e => e.key === 'Enter' && handleComment()}
              />
              <button onClick={handleComment} disabled={submitting} className="btn-primary text-sm py-2 px-4">
                {submitting ? '...' : '→'}
              </button>
            </div>
          ) : (
            <p className="text-xs text-gray-400 text-center">{lang === 'mr' ? 'टिप्पणी करण्यासाठी लॉगिन करा' : 'Login to comment'}</p>
          )}
        </div>
      )}
    </div>
  )
}

export default function Forum() {
  const { user } = useAuth()
  const { lang } = useLang()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [catFilter, setCatFilter] = useState('all')
  const [showNewPost, setShowNewPost] = useState(false)
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'general' })
  const [submitting, setSubmitting] = useState(false)

  const loadPosts = async () => {
    setLoading(true)
    try {
      const params = catFilter !== 'all' ? `?category=${catFilter}` : ''
      const { data } = await api.get(`/forum${params}`)
      setPosts(data)
    } catch { } finally { setLoading(false) }
  }

  useEffect(() => { loadPosts() }, [catFilter])

  const handleLike = async (id) => {
    try {
      await api.post(`/forum/${id}/like`)
      loadPosts()
    } catch { toast.error('Login required') }
  }

  const handleComment = async (id, content) => {
    try {
      await api.post(`/forum/${id}/comment`, { content })
      toast.success(lang === 'mr' ? 'टिप्पणी जोडली' : 'Comment added')
      loadPosts()
    } catch { toast.error('Failed to comment') }
  }

  const handleNewPost = async () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      toast.error('Please fill title and content')
      return
    }
    setSubmitting(true)
    try {
      await api.post('/forum', newPost)
      toast.success(lang === 'mr' ? 'प्रश्न पोस्ट केला!' : 'Post published!')
      setShowNewPost(false)
      setNewPost({ title: '', content: '', category: 'general' })
      loadPosts()
    } catch { toast.error('Login required to post') } finally { setSubmitting(false) }
  }

  return (
    <div>
      <PageHeader
        title={lang === 'mr' ? 'शेतकरी समुदाय मंच' : 'Farmer Community Forum'}
        subtitle={lang === 'mr' ? 'प्रश्न विचारा, अनुभव शेअर करा, एकत्र शिका' : 'Ask questions, share experiences, learn together'}
        icon="💬"
      />

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* New post button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => (
              <button key={cat.key} onClick={() => setCatFilter(cat.key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold font-display transition-all ${catFilter === cat.key ? 'bg-primary-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-primary-300'}`}>
                {cat.icon} {lang === 'mr' ? cat.labelM : cat.label}
              </button>
            ))}
          </div>
          {user && (
            <button onClick={() => setShowNewPost(!showNewPost)} className="btn-primary text-sm shrink-0 ml-2">
              + {lang === 'mr' ? 'प्रश्न विचारा' : 'Ask Question'}
            </button>
          )}
        </div>

        {/* New post form */}
        {showNewPost && (
          <div className="card p-5 mb-6 border-2 border-primary-200 animate-fade-up">
            <h3 className="font-display font-bold text-gray-800 mb-4">
              {lang === 'mr' ? '✍️ नवीन प्रश्न / पोस्ट' : '✍️ New Question / Post'}
            </h3>
            <div className="space-y-3">
              <input type="text" placeholder={lang === 'mr' ? 'शीर्षक लिहा...' : 'Write a title...'}
                value={newPost.title} onChange={e => setNewPost(p => ({ ...p, title: e.target.value }))}
                className="input-field font-display font-semibold" />
              <textarea rows={4} placeholder={lang === 'mr' ? 'तुमचा प्रश्न किंवा अनुभव लिहा...' : 'Write your question or experience...'}
                value={newPost.content} onChange={e => setNewPost(p => ({ ...p, content: e.target.value }))}
                className="input-field resize-none" />
              <select value={newPost.category} onChange={e => setNewPost(p => ({ ...p, category: e.target.value }))} className="input-field">
                {CATEGORIES.filter(c => c.key !== 'all').map(c => (
                  <option key={c.key} value={c.key}>{c.icon} {lang === 'mr' ? c.labelM : c.label}</option>
                ))}
              </select>
              <div className="flex gap-3">
                <button onClick={handleNewPost} disabled={submitting} className="btn-primary flex-1 disabled:opacity-50">
                  {submitting ? '...' : (lang === 'mr' ? 'पोस्ट करा' : 'Post')}
                </button>
                <button onClick={() => setShowNewPost(false)} className="btn-outline flex-1">
                  {lang === 'mr' ? 'रद्द करा' : 'Cancel'}
                </button>
              </div>
            </div>
          </div>
        )}

        {!user && (
          <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 mb-6 text-center">
            <p className="text-primary-700 text-sm font-medium">
              {lang === 'mr' ? '🌾 प्रश्न विचारण्यासाठी किंवा टिप्पणी करण्यासाठी ' : '🌾 To ask questions or comment, '}
              <a href="/login" className="font-bold underline">{lang === 'mr' ? 'लॉगिन करा' : 'login here'}</a>
            </p>
          </div>
        )}

        {/* Posts */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="card p-5 animate-pulse">
                <div className="flex gap-3 mb-3"><div className="w-10 h-10 bg-gray-200 rounded-full" /><div className="flex-1"><div className="h-4 bg-gray-200 rounded w-1/3 mb-2" /><div className="h-3 bg-gray-100 rounded w-1/4" /></div></div>
                <div className="h-5 bg-gray-200 rounded mb-2" /><div className="h-4 bg-gray-100 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <EmptyState icon="💬" message={lang === 'mr' ? 'अजून पोस्ट नाही' : 'No posts yet'} sub={lang === 'mr' ? 'पहिला प्रश्न विचारा!' : 'Be the first to ask a question!'} />
        ) : (
          <div className="space-y-4">
            {posts.map(post => (
              <PostCard key={post._id} post={post} onLike={handleLike} onComment={handleComment} user={user} lang={lang} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
