const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const genToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' });

// POST /api/auth/register  (farmers & vendors only; no admin signup)
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, phone, state, district, village } = req.body;
    if (role === 'admin') return res.status(400).json({ message: 'Cannot register as admin' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });
    const user = await User.create({ name, email, password, role: role || 'farmer', phone, state, district, village });
    const msg = user.role === 'vendor'
      ? 'Registration successful. Awaiting admin approval.'
      : 'Registration successful. You can now login.';
    res.status(201).json({ message: msg, isApproved: user.isApproved });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: 'Invalid email or password' });
    if (!user.isActive) return res.status(403).json({ message: 'Account has been deactivated' });
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isApproved: user.isApproved,
      state: user.state,
      district: user.district,
      phone: user.phone,
      token: genToken(user._id)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/auth/me
router.get('/me', protect, (req, res) => res.json(req.user));

module.exports = router;
