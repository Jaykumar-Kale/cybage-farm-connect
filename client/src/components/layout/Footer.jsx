import { Link } from 'react-router-dom'
import { useLang } from '../../context/LangContext'

export default function Footer() {
  const { lang, t } = useLang()
  return (
    <footer className="bg-gray-950 text-white mt-20">
      <div className="gov-stripe"/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-white" stroke="currentColor" strokeWidth={1.8}><path d="M7 10s1-4 5-4 5 4 5 4" strokeLinecap="round"/><path d="M5 17s2-3 7-3 7 3 7 3" strokeLinecap="round"/></svg>
              </div>
              <div>
                <div className="font-heading font-bold text-xl">FarmConnect</div>
                <div className="text-xs text-gray-400">शेतकरी बाजारपेठ</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">{lang==='mr'?'दलाल नष्ट करून शेतकऱ्यांना योग्य भाव मिळवून देणारे पारदर्शक डिजिटल व्यासपीठ.':'A transparent digital marketplace eliminating middlemen and ensuring fair prices for Indian farmers.'}</p>
            <div className="mt-4 text-saffron-400 font-heading font-bold text-lg">{lang==='mr'?'जय जवान जय किसान':'Jai Jawan Jai Kisan'}</div>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">{lang==='mr'?'त्वरित दुवे':'Quick Links'}</h4>
            <ul className="space-y-2.5">
              {[['/','Home/मुखपृष्ठ'],['/marketplace','Marketplace/बाजारपेठ'],['/schemes','Schemes/योजना'],['/msp','MSP Rates'],['/forum','Forum/मंच']].map(([to,label])=>
                <li key={to}><Link to={to} className="text-sm text-gray-400 hover:text-white transition-colors">{label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">{lang==='mr'?'सरकारी पोर्टल':'Govt Portals'}</h4>
            <ul className="space-y-2.5">
              {[['https://pmkisan.gov.in','PM-KISAN'],['https://pmfby.gov.in','PMFBY'],['https://enam.gov.in','eNAM'],['https://pmksy.gov.in','PMKSY'],['https://soilhealth.dac.gov.in','Soil Health Card']].map(([url,label])=>
                <li key={url}><a href={url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-brand-400 transition-colors flex items-center gap-1.5"><svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>{label}</a></li>)}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© 2025 FarmConnect. {lang==='mr'?'महाराष्ट्र व भारतातील शेतकऱ्यांसाठी.':'Built for farmers of Maharashtra & India.'}</p>
          <p>Kisan Helpline: <span className="text-saffron-400 font-semibold">1800-180-1551</span></p>
        </div>
      </div>
    </footer>
  )
}
