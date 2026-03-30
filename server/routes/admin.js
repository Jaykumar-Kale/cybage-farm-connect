const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Crop = require('../models/Crop');
const { protect, requireRole } = require('../middleware/auth');

const adminAuth = [protect, requireRole('admin')];

// GET all vendors (pending + approved)
router.get('/vendors', ...adminAuth, async (req, res) => {
  try {
    const vendors = await User.find({ role: 'vendor' }).select('-password').sort('-createdAt');
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all farmers
router.get('/farmers', ...adminAuth, async (req, res) => {
  try {
    const farmers = await User.find({ role: 'farmer' }).select('-password').sort('-createdAt');
    res.json(farmers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH approve vendor
router.patch('/vendors/:id/approve', ...adminAuth, async (req, res) => {
  try {
    const vendor = await User.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true }).select('-password');
    res.json({ message: 'Vendor approved', vendor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH reject/deactivate vendor
router.patch('/vendors/:id/reject', ...adminAuth, async (req, res) => {
  try {
    const vendor = await User.findByIdAndUpdate(req.params.id, { isApproved: false, isActive: false }, { new: true }).select('-password');
    // Also deactivate their crops
    await Crop.updateMany({ vendor: req.params.id }, { isActive: false });
    res.json({ message: 'Vendor rejected and crops removed', vendor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE vendor (and their crops)
router.delete('/vendors/:id', ...adminAuth, async (req, res) => {
  try {
    await Crop.deleteMany({ vendor: req.params.id });
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Vendor and all their crops deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET dashboard stats
router.get('/stats', ...adminAuth, async (req, res) => {
  try {
    const [totalFarmers, totalVendors, pendingVendors, activeListings] = await Promise.all([
      User.countDocuments({ role: 'farmer' }),
      User.countDocuments({ role: 'vendor', isApproved: true }),
      User.countDocuments({ role: 'vendor', isApproved: false }),
      Crop.countDocuments({ isActive: true })
    ]);
    res.json({ totalFarmers, totalVendors, pendingVendors, activeListings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all crops (admin view)
router.get('/crops', ...adminAuth, async (req, res) => {
  try {
    const crops = await Crop.find().populate('vendor', 'name email district').sort('-createdAt');
    res.json(crops);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
