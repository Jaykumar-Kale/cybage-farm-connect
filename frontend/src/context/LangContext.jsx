import { createContext, useContext, useState } from 'react'

const LangContext = createContext()

export const translations = {
  en: {
    home: 'Home', marketplace: 'Marketplace', schemes: 'Govt Schemes',
    msp: 'MSP Rates', forum: 'Forum', login: 'Login', register: 'Register',
    logout: 'Logout', dashboard: 'Dashboard',
    hero_title: 'Direct Farmer to Vendor Marketplace',
    hero_sub: 'Eliminate middlemen. Get fair prices. Grow together.',
    hero_btn: 'View Live Prices', hero_btn2: 'I am a Vendor',
    live_prices: 'Live Crop Prices', govt_schemes: 'Government Schemes',
    msp_rates: 'MSP Rates 2024-25', join_forum: 'Farmer Community Forum',
    farmer: 'Farmer', vendor: 'Vendor', admin: 'Admin',
    name: 'Full Name', email: 'Email Address', password: 'Password',
    phone: 'Phone Number', state: 'State', district: 'District',
    crop_name: 'Crop Name', price: 'Price (₹/Quintal)', location: 'Location',
    category: 'Category', quantity: 'Min Quantity (Qtl)',
    add_crop: 'Add Crop Listing', edit: 'Edit', delete: 'Delete',
    approve: 'Approve', reject: 'Reject', pending: 'Pending Approval',
    approved: 'Approved', active: 'Active', inactive: 'Inactive',
    search: 'Search crops...', filter: 'Filter', all: 'All',
    grains: 'Grains', vegetables: 'Vegetables', fruits: 'Fruits',
    pulses: 'Pulses', oilseeds: 'Oilseeds', spices: 'Spices', cotton: 'Cotton',
    my_listings: 'My Listings', received_orders: 'Vendor Management',
    total_farmers: 'Total Farmers', total_vendors: 'Active Vendors',
    pending_vendors: 'Pending Approvals', active_listings: 'Active Listings',
    kharif: 'Kharif Season', rabi: 'Rabi Season',
    apply_now: 'Apply Now', learn_more: 'Learn More',
    post_question: 'Post a Question', comment: 'Comment', like: 'Like',
    no_listings: 'No listings found', loading: 'Loading...',
    registration_pending: 'Your vendor account is awaiting admin approval.',
    submit: 'Submit', cancel: 'Cancel', save: 'Save Changes',
    footer_tagline: 'Jai Jawan Jai Kisan 🌾',
    per_quintal: '/quintal', min_qty: 'Min Qty',
    contact_vendor: 'Contact Vendor', updated: 'Updated',
    welcome: 'Welcome', crop_prices: 'Today\'s Buying Prices',
    eligible: 'Eligibility', documents: 'Documents Required', how_to: 'How to Apply',
    increase: 'Increase from last year', source: 'Source',
  },
  mr: {
    home: 'मुखपृष्ठ', marketplace: 'बाजारपेठ', schemes: 'सरकारी योजना',
    msp: 'MSP दर', forum: 'मंच', login: 'लॉगिन', register: 'नोंदणी',
    logout: 'बाहेर पडा', dashboard: 'डॅशबोर्ड',
    hero_title: 'शेतकरी ते विक्रेता थेट बाजारपेठ',
    hero_sub: 'दलाल नको. योग्य भाव मिळवा. एकत्र वाढूया.',
    hero_btn: 'थेट भाव पाहा', hero_btn2: 'मी विक्रेता आहे',
    live_prices: 'थेट पीक भाव', govt_schemes: 'सरकारी योजना',
    msp_rates: 'MSP दर २०२४-२५', join_forum: 'शेतकरी समुदाय मंच',
    farmer: 'शेतकरी', vendor: 'विक्रेता', admin: 'प्रशासक',
    name: 'पूर्ण नाव', email: 'ईमेल पत्ता', password: 'पासवर्ड',
    phone: 'फोन नंबर', state: 'राज्य', district: 'जिल्हा',
    crop_name: 'पिकाचे नाव', price: 'भाव (₹/क्विंटल)', location: 'स्थान',
    category: 'श्रेणी', quantity: 'किमान प्रमाण (क्विं.)',
    add_crop: 'पीक यादी जोडा', edit: 'संपादित करा', delete: 'हटवा',
    approve: 'मंजूर करा', reject: 'नाकारा', pending: 'मंजुरी प्रतीक्षेत',
    approved: 'मंजूर', active: 'सक्रिय', inactive: 'निष्क्रिय',
    search: 'पिके शोधा...', filter: 'फिल्टर', all: 'सर्व',
    grains: 'धान्य', vegetables: 'भाजीपाला', fruits: 'फळे',
    pulses: 'कडधान्य', oilseeds: 'तेलबिया', spices: 'मसाले', cotton: 'कापूस',
    my_listings: 'माझ्या याद्या', received_orders: 'विक्रेता व्यवस्थापन',
    total_farmers: 'एकूण शेतकरी', total_vendors: 'सक्रिय विक्रेते',
    pending_vendors: 'प्रतीक्षेत विक्रेते', active_listings: 'सक्रिय याद्या',
    kharif: 'खरीप हंगाम', rabi: 'रब्बी हंगाम',
    apply_now: 'अर्ज करा', learn_more: 'अधिक जाणून घ्या',
    post_question: 'प्रश्न विचारा', comment: 'टिप्पणी', like: 'आवडले',
    no_listings: 'कोणत्याही याद्या आढळल्या नाहीत', loading: 'लोड होत आहे...',
    registration_pending: 'तुमचा विक्रेता खाता प्रशासकाच्या मंजुरीच्या प्रतीक्षेत आहे.',
    submit: 'सादर करा', cancel: 'रद्द करा', save: 'बदल जतन करा',
    footer_tagline: 'जय जवान जय किसान 🌾',
    per_quintal: '/क्विंटल', min_qty: 'किमान प्रमाण',
    contact_vendor: 'विक्रेत्याशी संपर्क करा', updated: 'अपडेट केले',
    welcome: 'स्वागत', crop_prices: 'आजचे खरेदी भाव',
    eligible: 'पात्रता', documents: 'आवश्यक कागदपत्रे', how_to: 'अर्ज कसा करावा',
    increase: 'गेल्या वर्षापेक्षा वाढ', source: 'स्रोत',
  }
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState('mr')
  const t = (key) => translations[lang][key] || translations['en'][key] || key
  const toggleLang = () => setLang(l => l === 'mr' ? 'en' : 'mr')
  return (
    <LangContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
