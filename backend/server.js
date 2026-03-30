const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/crops', require('./routes/crops'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/schemes', require('./routes/schemes'));
app.use('/api/msp', require('./routes/msp'));
app.use('/api/forum', require('./routes/forum'));
app.use('/api/weather', require('./routes/weather'));

app.get('/', (req, res) => res.json({ message: '🌾 FarmConnect API Running', version: '1.0.0' }));

// Connect MongoDB and seed admin
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/farmconnect')
  .then(async () => {
    console.log('✅ MongoDB Connected');
    await seedAdmin();
  })
  .catch(err => console.error('❌ MongoDB Error:', err));

async function seedAdmin() {
  const User = require('./models/User');
  const existing = await User.findOne({ role: 'admin' });
  if (!existing) {
    await User.create({
      name: 'Admin',
      email: process.env.ADMIN_EMAIL || 'admin@farmconnect.in',
      password: process.env.ADMIN_PASSWORD || 'Admin@1234',
      role: 'admin',
      isApproved: true
    });
    console.log('✅ Admin seeded: admin@farmconnect.in / Admin@1234');
  }
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
