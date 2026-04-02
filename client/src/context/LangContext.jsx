import { createContext, useContext, useState } from 'react'
const Ctx = createContext()
const T = {
  en:{ home:'Home', marketplace:'Marketplace', schemes:'Govt Schemes', msp:'MSP Rates', forum:'Forum', login:'Login', register:'Register', logout:'Logout', dashboard:'Dashboard', farmer:'Farmer', vendor:'Vendor', admin:'Admin', live_prices:'Live Crop Prices', view_all:'View All', search:'Search crops...', all:'All', category:'Category', state:'State', kharif:'Kharif Season', rabi:'Rabi Season', apply:'Apply Now', more:'More Details', less:'Show Less', post:'Post', comment:'Comment', like:'Like', ask:'Ask Question', publish:'Publish', cancel:'Cancel', approve:'Approve', reject:'Reject', delete:'Delete', edit:'Edit', add_crop:'Add Crop', save:'Save Changes', my_listings:'My Listings', pending:'Pending Approval', approved:'Approved', loading:'Loading...', no_data:'No data found', contact:'Contact Vendor' },
  mr:{ home:'मुखपृष्ठ', marketplace:'बाजारपेठ', schemes:'सरकारी योजना', msp:'MSP दर', forum:'मंच', login:'लॉगिन', register:'नोंदणी', logout:'बाहेर पडा', dashboard:'डॅशबोर्ड', farmer:'शेतकरी', vendor:'विक्रेता', admin:'प्रशासक', live_prices:'थेट पीक भाव', view_all:'सर्व पाहा', search:'पिके शोधा...', all:'सर्व', category:'श्रेणी', state:'राज्य', kharif:'खरीप हंगाम', rabi:'रब्बी हंगाम', apply:'अर्ज करा', more:'अधिक माहिती', less:'कमी दाखवा', post:'पोस्ट', comment:'टिप्पणी', like:'आवडले', ask:'प्रश्न विचारा', publish:'प्रकाशित करा', cancel:'रद्द करा', approve:'मंजूर करा', reject:'नाकारा', delete:'हटवा', edit:'संपादित', add_crop:'पीक जोडा', save:'बदल जतन करा', my_listings:'माझ्या याद्या', pending:'मंजुरी प्रतीक्षेत', approved:'मंजूर', loading:'लोड होत आहे...', no_data:'कोणताही डेटा नाही', contact:'विक्रेत्याशी संपर्क' },
}
export function LangProvider({ children }) {
  const [lang, setLang] = useState('mr')
  const t = k => T[lang][k] || T.en[k] || k
  const toggleLang = () => setLang(l => l==='mr'?'en':'mr')
  return <Ctx.Provider value={{ lang, t, toggleLang }}>{children}</Ctx.Provider>
}
export const useLang = () => useContext(Ctx)
