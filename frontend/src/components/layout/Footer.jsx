import { Link } from 'react-router-dom'
import { useLang } from '../../context/LangContext'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="bg-primary-900 text-white mt-16">
      <div className="gov-stripe" />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">🌾</span>
              <div>
                <div className="font-display font-bold text-xl">FarmConnect</div>
                <div className="text-primary-300 text-sm">शेतकरी बाजारपेठ</div>
              </div>
            </div>
            <p className="text-primary-200 text-sm leading-relaxed max-w-sm">
              Eliminating middlemen and ensuring fair, transparent pricing for Indian farmers. Direct connection between farmers and verified vendors.
            </p>
            <p className="text-saffron-400 font-display font-bold text-lg mt-4">{t('footer_tagline')}</p>
          </div>
          <div>
            <h4 className="font-display font-semibold text-saffron-400 mb-3 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-200">
              {[['/', t('home')], ['/marketplace', t('marketplace')], ['/schemes', t('schemes')], ['/msp', t('msp')], ['/forum', t('forum')]].map(([path, label]) => (
                <li key={path}><Link to={path} className="hover:text-white transition-colors">→ {label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold text-saffron-400 mb-3 text-sm uppercase tracking-wider">Govt. Links</h4>
            <ul className="space-y-2 text-sm text-primary-200">
              {[
                ['https://pmkisan.gov.in', 'PM-KISAN'],
                ['https://pmfby.gov.in', 'PMFBY'],
                ['https://enam.gov.in', 'eNAM'],
                ['https://agri.maharashtra.gov.in', 'Krishi Vibhag MH'],
                ['https://soilhealth.dac.gov.in', 'Soil Health Card'],
              ].map(([url, label]) => (
                <li key={url}>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">↗ {label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-700 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-primary-400 gap-2">
          <p>© 2025 FarmConnect. Built for farmers of Maharashtra & India.</p>
          <p>Helpline: <span className="text-saffron-400 font-semibold">1800-180-1551</span> | Kisan Call Centre</p>
        </div>
      </div>
    </footer>
  )
}
