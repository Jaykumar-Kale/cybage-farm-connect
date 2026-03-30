const express = require('express');
const router = express.Router();

const schemes = [
  {
    id: 1,
    name: "PM-KISAN",
    fullName: "Pradhan Mantri Kisan Samman Nidhi",
    fullNameMarathi: "प्रधानमंत्री किसान सन्मान निधी",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    description: "Income support of ₹6,000 per year to all landholding farmers in three equal installments of ₹2,000 each directly to bank accounts.",
    descriptionMarathi: "सर्व जमीनधारक शेतकऱ्यांना दरवर्षी ₹6,000 उत्पन्न सहाय्य. ₹2,000 च्या 3 हप्त्यांमध्ये थेट बँक खात्यात.",
    benefits: ["₹6,000 annual income support", "Direct Bank Transfer (DBT)", "Three installments of ₹2,000", "No middlemen involved"],
    eligibility: ["All landholding farmer families", "Small & marginal farmers", "Land ownership documents required"],
    documents: ["Aadhaar Card", "Bank Passbook", "Land Records (7/12 Utara)", "Mobile Number linked to Aadhaar"],
    howToApply: "Visit nearest CSC center, Agriculture Office, or register at pmkisan.gov.in",
    link: "https://pmkisan.gov.in",
    category: "income-support",
    icon: "💰",
    color: "#16a34a",
    installment: "Next installment: April 2025"
  },
  {
    id: 2,
    name: "Kisan Credit Card (KCC)",
    fullName: "Kisan Credit Card Scheme",
    fullNameMarathi: "किसान क्रेडिट कार्ड योजना",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    description: "Provides farmers timely and adequate credit at subsidized interest rates of 4% per annum for crop cultivation and allied activities.",
    descriptionMarathi: "शेतकऱ्यांना पीक लागवड आणि इतर कामांसाठी 4% व्याजदराने वेळेवर आणि पुरेसे कर्ज.",
    benefits: ["Credit up to ₹3 lakh at 4% interest", "No collateral up to ₹1.6 lakh", "Flexible repayment aligned to harvest", "Personal accident insurance included"],
    eligibility: ["Individual farmers", "Tenant farmers & sharecroppers", "SHG members", "Joint Liability Groups"],
    documents: ["Aadhaar Card", "Land Records", "Bank Account Details", "Passport size photograph"],
    howToApply: "Apply at nearest bank branch (SBI, cooperative bank, RRB) or online",
    link: "https://agricoop.nic.in/en/kisan-credit-card",
    category: "credit",
    icon: "💳",
    color: "#2563eb"
  },
  {
    id: 3,
    name: "PMFBY",
    fullName: "Pradhan Mantri Fasal Bima Yojana",
    fullNameMarathi: "प्रधानमंत्री फसल बीमा योजना",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    description: "Crop insurance providing financial support to farmers suffering crop loss or damage due to natural calamities, pests & diseases.",
    descriptionMarathi: "नैसर्गिक आपत्ती, कीड आणि रोगांमुळे पीक नुकसानीसाठी शेतकऱ्यांना आर्थिक सहाय्य.",
    benefits: ["Premium: 2% Kharif, 1.5% Rabi, 5% Horticulture", "Government pays remaining premium", "Quick settlement using satellite/drone", "Coverage for prevented sowing too"],
    eligibility: ["All farmers growing notified crops", "Both loanee and non-loanee farmers"],
    documents: ["Aadhaar Card", "Bank Account", "Land Records", "Sowing Certificate", "Loan account number (if loanee)"],
    howToApply: "Apply at bank, CSC, or pmfby.gov.in before cut-off date each season",
    link: "https://pmfby.gov.in",
    category: "insurance",
    icon: "🛡️",
    color: "#dc2626"
  },
  {
    id: 4,
    name: "eNAM",
    fullName: "National Agriculture Market",
    fullNameMarathi: "राष्ट्रीय कृषी बाजार",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    description: "Pan-India electronic trading portal connecting APMC mandis to create a unified national market for better price discovery.",
    descriptionMarathi: "APMC मंडींना जोडणारे इलेक्ट्रॉनिक ट्रेडिंग पोर्टल — योग्य भाव मिळवण्यासाठी.",
    benefits: ["Better price discovery through online auction", "Transparent bidding process", "Online payment within 24 hours", "Access to pan-India buyers", "Reduced transaction costs"],
    eligibility: ["All registered farmers", "Must have Aadhaar & bank account"],
    documents: ["Aadhaar Card", "Bank Account", "Land Records", "Mobile Number"],
    howToApply: "Register at enam.gov.in or visit your local APMC mandi",
    link: "https://enam.gov.in",
    category: "market",
    icon: "🏪",
    color: "#f59e0b"
  },
  {
    id: 5,
    name: "PMKSY",
    fullName: "Pradhan Mantri Krishi Sinchayee Yojana",
    fullNameMarathi: "प्रधानमंत्री कृषी सिंचाई योजना",
    ministry: "Ministry of Jal Shakti",
    description: "'Har Khet Ko Pani, More Crop Per Drop' — ensuring water to every farm and improving water use efficiency through micro-irrigation.",
    descriptionMarathi: "हर खेत को पानी — प्रत्येक शेतापर्यंत पाणी पोहोचवणे आणि ठिबक/तुषार सिंचनाद्वारे जलवापर कार्यक्षमता वाढवणे.",
    benefits: ["Drip irrigation subsidy 55%-75%", "Sprinkler irrigation subsidy", "10% additional for SC/ST farmers", "Convergence of water schemes"],
    eligibility: ["All farmers", "Priority to small & marginal farmers", "Water source must be available"],
    documents: ["Aadhaar Card", "Land Records", "Bank Account", "Equipment quotation"],
    howToApply: "Apply at District Agriculture Office or pmksy.gov.in",
    link: "https://pmksy.gov.in",
    category: "irrigation",
    icon: "💧",
    color: "#0891b2"
  },
  {
    id: 6,
    name: "PKVY",
    fullName: "Paramparagat Krishi Vikas Yojana",
    fullNameMarathi: "परंपरागत कृषी विकास योजना",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    description: "Promotes organic farming through cluster approach with financial assistance to convert conventional farms to organic over 3 years.",
    descriptionMarathi: "जैविक शेतीला प्रोत्साहन — 3 वर्षांत ₹50,000/हेक्टर सहाय्य.",
    benefits: ["₹50,000/hectare over 3 years", "Organic certification support", "Better market linkage for organic produce", "Soil health improvement"],
    eligibility: ["Groups of 50+ farmers", "Minimum 50 acres cluster", "Commitment to organic practices for 3 years"],
    documents: ["Aadhaar Card", "Land Records", "Group formation documents", "Soil test report"],
    howToApply: "Apply through State Agriculture Department or contact your Block Agriculture Officer",
    link: "https://pgsindia-ncof.gov.in",
    category: "organic",
    icon: "🌿",
    color: "#059669"
  },
  {
    id: 7,
    name: "Soil Health Card",
    fullName: "Soil Health Card Scheme",
    fullNameMarathi: "माती आरोग्य कार्ड योजना",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    description: "Provides farmers with crop-wise recommendations on nutrients and fertilizers required for individual farms to improve productivity.",
    descriptionMarathi: "शेतकऱ्यांना जमिनीची माहिती आणि पीकनिहाय खत शिफारसी मोफत.",
    benefits: ["Free soil testing every 2 years", "Crop-specific fertilizer recommendations", "Reduces input costs by 8-10%", "Improves soil health and yield"],
    eligibility: ["All farmers across India — no restrictions"],
    documents: ["Aadhaar Card", "Land Records (optional)", "Mobile number"],
    howToApply: "Contact nearest Krishi Vigyan Kendra or visit soilhealth.dac.gov.in",
    link: "https://soilhealth.dac.gov.in",
    category: "soil",
    icon: "🌱",
    color: "#78350f"
  },
  {
    id: 8,
    name: "Namo Shetkari MH Yojana",
    fullName: "Namo Shetkari Maha Samman Nidhi (Maharashtra)",
    fullNameMarathi: "नमो शेतकरी महासन्मान निधी योजना",
    ministry: "Maharashtra State Government",
    description: "Maharashtra state scheme providing additional ₹6,000 per year to farmers on top of PM-KISAN, totaling ₹12,000 annual benefit.",
    descriptionMarathi: "PM-KISAN वर अतिरिक्त ₹6,000 — महाराष्ट्र शेतकऱ्यांना एकूण ₹12,000 वार्षिक लाभ.",
    benefits: ["Additional ₹6,000 per year (state)", "Combines with PM-KISAN for ₹12,000 total", "Direct bank transfer", "No separate application — PM-KISAN beneficiaries auto-enrolled"],
    eligibility: ["All PM-KISAN beneficiaries in Maharashtra", "Must have valid 7/12 Utara"],
    documents: ["Aadhaar Card", "Bank Account", "7/12 Utara", "Enrolled in PM-KISAN"],
    howToApply: "Auto-enrolled if you receive PM-KISAN. Contact Agriculture Office to verify.",
    link: "https://krishi.maharashtra.gov.in",
    category: "state",
    icon: "🌾",
    color: "#7c3aed"
  }
];

router.get('/', (req, res) => {
  const { category } = req.query;
  if (category) return res.json(schemes.filter(s => s.category === category));
  res.json(schemes);
});

router.get('/:id', (req, res) => {
  const scheme = schemes.find(s => s.id === parseInt(req.params.id));
  if (!scheme) return res.status(404).json({ message: 'Scheme not found' });
  res.json(scheme);
});

module.exports = router;
