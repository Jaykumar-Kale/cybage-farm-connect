const jwt = require('jsonwebtoken');
const User = require('../models/User');
const protect = async (req, res, next) => {
  const a = req.headers.authorization;
  if (!a?.startsWith('Bearer ')) return res.status(401).json({ message: 'No token' });
  try {
    const { id } = jwt.verify(a.split(' ')[1], process.env.JWT_SECRET || 'secret');
    req.user = await User.findById(id).select('-password');
    if (!req.user) return res.status(401).json({ message: 'User not found' });
    next();
  } catch { res.status(401).json({ message: 'Invalid token' }); }
};
const requireRole = (...roles) => (req, res, next) =>
  roles.includes(req.user.role) ? next() : res.status(403).json({ message: 'Access denied' });
const requireApproved = (req, res, next) =>
  req.user.isApproved ? next() : res.status(403).json({ message: 'Pending approval' });
module.exports = { protect, requireRole, requireApproved };
