const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const tok = id => jwt.sign({ id }, process.env.JWT_SECRET || 'secret', { expiresIn: '30d' });

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, phone, state, district } = req.body;
    if (role === 'admin') return res.status(400).json({ message: 'Cannot register as admin' });
    if (await User.findOne({ email })) return res.status(400).json({ message: 'Email already registered' });
    const u = await User.create({ name, email, password, role: role||'farmer', phone, state, district });
    res.status(201).json({ message: u.role==='vendor' ? 'Registered. Awaiting admin approval.' : 'Registered successfully.', isApproved: u.isApproved });
  } catch(e) { res.status(500).json({ message: e.message }); }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const u = await User.findOne({ email });
    if (!u || !(await u.comparePassword(password))) return res.status(401).json({ message: 'Invalid credentials' });
    if (!u.isActive) return res.status(403).json({ message: 'Account deactivated' });
    res.json({ _id:u._id, name:u.name, email:u.email, role:u.role, isApproved:u.isApproved, state:u.state, district:u.district, phone:u.phone, token: tok(u._id) });
  } catch(e) { res.status(500).json({ message: e.message }); }
});

router.get('/me', protect, (req, res) => res.json(req.user));
module.exports = router;
