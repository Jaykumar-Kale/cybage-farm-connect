const router = require('express').Router();
const D = {
  season:'2024-25', announcedBy:'Cabinet Committee on Economic Affairs (CCEA)', announcedDate:'June 2024',
  source:'Government of India — Ministry of Agriculture & Farmers Welfare',
  kharif:[
    {crop:'Paddy (Common)',cropMarathi:'भात (साधा)',msp:2300,increase:117},
    {crop:'Paddy (Grade A)',cropMarathi:'भात (ग्रेड A)',msp:2320,increase:117},
    {crop:'Jowar (Hybrid)',cropMarathi:'ज्वारी (संकरित)',msp:3371,increase:211},
    {crop:'Jowar (Maldandi)',cropMarathi:'ज्वारी (मालदांडी)',msp:3421,increase:211},
    {crop:'Bajra',cropMarathi:'बाजरी',msp:2625,increase:125},
    {crop:'Maize',cropMarathi:'मका',msp:2225,increase:135},
    {crop:'Tur (Arhar)',cropMarathi:'तूर',msp:7550,increase:550},
    {crop:'Moong',cropMarathi:'मूग',msp:8682,increase:124},
    {crop:'Urad',cropMarathi:'उडीद',msp:7400,increase:450},
    {crop:'Groundnut',cropMarathi:'शेंगदाणे',msp:6783,increase:121},
    {crop:'Sunflower Seed',cropMarathi:'सूर्यफूल',msp:7280,increase:395},
    {crop:'Soyabean',cropMarathi:'सोयाबीन',msp:4892,increase:292},
    {crop:'Sesamum',cropMarathi:'तीळ',msp:9267,increase:632},
    {crop:'Cotton (Medium)',cropMarathi:'कापूस (मध्यम)',msp:7121,increase:501},
    {crop:'Cotton (Long)',cropMarathi:'कापूस (लांब)',msp:7521,increase:501},
  ],
  rabi:[
    {crop:'Wheat',cropMarathi:'गहू',msp:2275,increase:150},
    {crop:'Barley',cropMarathi:'जव',msp:1735,increase:115},
    {crop:'Gram (Chana)',cropMarathi:'हरभरा',msp:5440,increase:440},
    {crop:'Lentil (Masur)',cropMarathi:'मसूर',msp:6425,increase:425},
    {crop:'Rapeseed/Mustard',cropMarathi:'मोहरी',msp:5950,increase:300},
    {crop:'Safflower',cropMarathi:'करडई',msp:5800,increase:200},
  ],
};
router.get('/', (_req, res) => res.json(D));
module.exports = router;
