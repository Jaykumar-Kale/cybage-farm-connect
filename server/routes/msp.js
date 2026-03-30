const express = require('express');
const router = express.Router();

const mspData = {
  season: "2024-25",
  announcedBy: "Cabinet Committee on Economic Affairs (CCEA)",
  announcedDate: "June 2024",
  source: "Government of India — Ministry of Agriculture & Farmers Welfare",
  note: "MSP is the minimum price guaranteed by the government for procurement",
  kharif: [
    { crop: "Paddy (Common)", cropMarathi: "भात (साधा)", msp: 2300, increase: 117, unit: "₹/quintal" },
    { crop: "Paddy (Grade A)", cropMarathi: "भात (ग्रेड A)", msp: 2320, increase: 117, unit: "₹/quintal" },
    { crop: "Jowar (Hybrid)", cropMarathi: "ज्वारी (संकरित)", msp: 3371, increase: 211, unit: "₹/quintal" },
    { crop: "Jowar (Maldandi)", cropMarathi: "ज्वारी (मालदांडी)", msp: 3421, increase: 211, unit: "₹/quintal" },
    { crop: "Bajra", cropMarathi: "बाजरी", msp: 2625, increase: 125, unit: "₹/quintal" },
    { crop: "Maize", cropMarathi: "मका", msp: 2225, increase: 135, unit: "₹/quintal" },
    { crop: "Tur (Arhar)", cropMarathi: "तूर (अरहर)", msp: 7550, increase: 550, unit: "₹/quintal" },
    { crop: "Moong", cropMarathi: "मूग", msp: 8682, increase: 124, unit: "₹/quintal" },
    { crop: "Urad", cropMarathi: "उडीद", msp: 7400, increase: 450, unit: "₹/quintal" },
    { crop: "Groundnut", cropMarathi: "शेंगदाणे", msp: 6783, increase: 121, unit: "₹/quintal" },
    { crop: "Sunflower Seed", cropMarathi: "सूर्यफूल", msp: 7280, increase: 395, unit: "₹/quintal" },
    { crop: "Soyabean", cropMarathi: "सोयाबीन", msp: 4892, increase: 292, unit: "₹/quintal" },
    { crop: "Sesamum", cropMarathi: "तीळ", msp: 9267, increase: 632, unit: "₹/quintal" },
    { crop: "Cotton (Medium)", cropMarathi: "कापूस (मध्यम)", msp: 7121, increase: 501, unit: "₹/quintal" },
    { crop: "Cotton (Long)", cropMarathi: "कापूस (लांब)", msp: 7521, increase: 501, unit: "₹/quintal" }
  ],
  rabi: [
    { crop: "Wheat", cropMarathi: "गहू", msp: 2275, increase: 150, unit: "₹/quintal" },
    { crop: "Barley", cropMarathi: "जव", msp: 1735, increase: 115, unit: "₹/quintal" },
    { crop: "Gram (Chana)", cropMarathi: "हरभरा", msp: 5440, increase: 440, unit: "₹/quintal" },
    { crop: "Lentil (Masur)", cropMarathi: "मसूर", msp: 6425, increase: 425, unit: "₹/quintal" },
    { crop: "Rapeseed/Mustard", cropMarathi: "मोहरी", msp: 5950, increase: 300, unit: "₹/quintal" },
    { crop: "Safflower", cropMarathi: "करडई", msp: 5800, increase: 200, unit: "₹/quintal" }
  ]
};

router.get('/', (req, res) => res.json(mspData));
router.get('/kharif', (req, res) => res.json({ ...mspData, rabi: undefined, crops: mspData.kharif }));
router.get('/rabi', (req, res) => res.json({ ...mspData, kharif: undefined, crops: mspData.rabi }));

module.exports = router;
