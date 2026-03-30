const express = require('express')
const router = express.Router()

const weatherData = {
  'Maharashtra': { temp: 32, humidity: 65, condition: 'Partly Cloudy', conditionM: 'अंशतः ढगाळ', rainfall: 12, advisory: 'Good conditions for Kharif sowing', advisoryM: 'खरीप पेरणीसाठी चांगली परिस्थिती' },
  'Punjab': { temp: 28, humidity: 55, condition: 'Sunny', conditionM: 'ऊनाळा', rainfall: 0, advisory: 'Monitor wheat for rust disease', advisoryM: 'गव्हावर गंज रोगाचे निरीक्षण करा' },
  'Gujarat': { temp: 35, humidity: 45, condition: 'Hot & Dry', conditionM: 'उष्ण व कोरडे', rainfall: 0, advisory: 'Irrigate groundnut fields regularly', advisoryM: 'शेंगदाणा शेतांना नियमित पाणी द्या' },
  'Madhya Pradesh': { temp: 31, humidity: 60, condition: 'Partly Cloudy', conditionM: 'अंशतः ढगाळ', rainfall: 5, advisory: 'Favourable for soyabean cultivation', advisoryM: 'सोयाबीन लागवडीसाठी अनुकूल' },
  'Karnataka': { temp: 27, humidity: 75, condition: 'Cloudy', conditionM: 'ढगाळ', rainfall: 20, advisory: 'Watch for paddy blast disease', advisoryM: 'भाताच्या ब्लास्ट रोगापासून सावध राहा' },
}

router.get('/', (req, res) => {
  const { state } = req.query
  if (state && weatherData[state]) return res.json({ state, ...weatherData[state] })
  res.json(Object.entries(weatherData).map(([state, data]) => ({ state, ...data })))
})

module.exports = router
