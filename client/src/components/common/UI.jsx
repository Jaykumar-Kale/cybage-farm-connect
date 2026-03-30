// Spinner
export function Spinner({ size = 'md' }) {
  const s = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' }[size]
  return (
    <div className={`${s} border-3 border-primary-200 border-t-primary-600 rounded-full animate-spin`}
      style={{ borderWidth: '3px' }} />
  )
}

// Loading page
export function LoadingPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <Spinner size="lg" />
      <p className="text-gray-500 font-display animate-pulse">लोड होत आहे...</p>
    </div>
  )
}

// Error message
export function ErrorMsg({ message }) {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2">
      <span>⚠️</span> {message}
    </div>
  )
}

// Stat card
export function StatCard({ label, value, icon, color = 'green' }) {
  const colors = {
    green: 'bg-primary-50 border-primary-200 text-primary-700',
    saffron: 'bg-saffron-50 border-saffron-200 text-saffron-700',
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
    red: 'bg-red-50 border-red-200 text-red-700',
  }
  return (
    <div className={`card p-5 border ${colors[color]} flex items-center gap-4`}>
      <div className="text-3xl">{icon}</div>
      <div>
        <div className="text-2xl font-bold font-display">{value}</div>
        <div className="text-sm font-medium opacity-80">{label}</div>
      </div>
    </div>
  )
}

// Empty state
export function EmptyState({ icon = '📭', message = 'No data found', sub }) {
  return (
    <div className="text-center py-16 text-gray-400">
      <div className="text-5xl mb-3">{icon}</div>
      <p className="font-display font-semibold text-lg text-gray-500">{message}</p>
      {sub && <p className="text-sm mt-1">{sub}</p>}
    </div>
  )
}

// Page header banner (govt portal style)
export function PageHeader({ title, subtitle, icon }) {
  return (
    <div className="bg-gradient-to-r from-primary-800 to-primary-700 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          {icon && <span className="text-4xl">{icon}</span>}
          <div>
            <h1 className="font-display font-bold text-2xl md:text-3xl">{title}</h1>
            {subtitle && <p className="text-primary-200 mt-1 text-sm md:text-base">{subtitle}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

// Crop category badge
export function CategoryBadge({ category }) {
  const map = {
    grains: { label: 'Grains / धान्य', color: 'bg-yellow-100 text-yellow-800', icon: '🌾' },
    vegetables: { label: 'Vegetables / भाजीपाला', color: 'bg-green-100 text-green-800', icon: '🥦' },
    fruits: { label: 'Fruits / फळे', color: 'bg-orange-100 text-orange-800', icon: '🍎' },
    pulses: { label: 'Pulses / कडधान्य', color: 'bg-amber-100 text-amber-800', icon: '🫘' },
    oilseeds: { label: 'Oilseeds / तेलबिया', color: 'bg-lime-100 text-lime-800', icon: '🌻' },
    spices: { label: 'Spices / मसाले', color: 'bg-red-100 text-red-800', icon: '🌶️' },
    cotton: { label: 'Cotton / कापूस', color: 'bg-blue-100 text-blue-800', icon: '🌸' },
    other: { label: 'Other / इतर', color: 'bg-gray-100 text-gray-700', icon: '📦' },
  }
  const info = map[category] || map.other
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${info.color}`}>
      {info.icon} {info.label}
    </span>
  )
}

// Confirm modal
export function ConfirmModal({ isOpen, onConfirm, onCancel, message, confirmText = 'Delete', danger = true }) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6 animate-fade-up">
        <div className="text-3xl mb-3 text-center">⚠️</div>
        <p className="text-center text-gray-700 font-medium mb-6">{message}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 btn-outline text-sm">Cancel</button>
          <button onClick={onConfirm} className={`flex-1 text-sm font-semibold px-4 py-2.5 rounded-lg transition-all ${danger ? 'bg-red-600 hover:bg-red-700 text-white' : 'btn-primary'}`}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

// Crop listing card for marketplace / farmer view
export function CropCard({ crop, showContact = true }) {
  const daysAgo = Math.floor((Date.now() - new Date(crop.updatedAt || crop.createdAt)) / 86400000)
  return (
    <div className="card p-5 hover:border-primary-200 border border-transparent transition-all group">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-display font-bold text-lg text-gray-800 group-hover:text-primary-700 transition-colors">
            {crop.nameMarathi || crop.name}
          </h3>
          <p className="text-gray-500 text-sm">{crop.name}</p>
        </div>
        <CategoryBadge category={crop.category} />
      </div>

      <div className="bg-primary-50 border border-primary-100 rounded-lg p-3 mb-3 text-center">
        <div className="text-3xl font-bold font-display text-primary-700">₹{crop.pricePerQuintal?.toLocaleString()}</div>
        <div className="text-xs text-primary-600 font-medium">/क्विंटल (per quintal)</div>
      </div>

      <div className="space-y-1.5 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-2">
          <span>📍</span>
          <span>{crop.location}{crop.district ? `, ${crop.district}` : ''}</span>
        </div>
        {crop.minQuantity && (
          <div className="flex items-center gap-2">
            <span>⚖️</span>
            <span>Min: {crop.minQuantity} quintal{crop.minQuantity > 1 ? 's' : ''}</span>
          </div>
        )}
        {crop.vendor?.name && (
          <div className="flex items-center gap-2">
            <span>🏪</span>
            <span className="font-medium text-gray-700">{crop.vendor.name}</span>
          </div>
        )}
      </div>

      {showContact && crop.vendor?.phone && (
        <a
          href={`tel:${crop.vendor.phone}`}
          className="w-full btn-primary text-sm text-center block"
        >
          📞 संपर्क करा — {crop.vendor.phone}
        </a>
      )}

      <div className="mt-2 text-xs text-gray-400 text-right">
        {daysAgo === 0 ? 'Today' : `${daysAgo}d ago`}
      </div>
    </div>
  )
}
