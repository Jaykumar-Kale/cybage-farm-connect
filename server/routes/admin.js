const router = require('express').Router();
const User = require('../models/User');
const Crop = require('../models/Crop');
const { protect, requireRole } = require('../middleware/auth');
const A = [protect, requireRole('admin')];

router.get('/stats', ...A, async (req, res) => {
  try {
    const [totalFarmers, totalVendors, pendingVendors, activeListings] = await Promise.all([
      User.countDocuments({ role:'farmer' }),
      User.countDocuments({ role:'vendor', isApproved:true }),
      User.countDocuments({ role:'vendor', isApproved:false }),
      Crop.countDocuments({ isActive:true }),
    ]);
    res.json({ totalFarmers, totalVendors, pendingVendors, activeListings });
  } catch(e) { res.status(500).json({ message: e.message }); }
});
router.get('/vendors', ...A, async (req, res) => {
  try { res.json(await User.find({ role:'vendor' }).select('-password').sort('-createdAt')); }
  catch(e) { res.status(500).json({ message: e.message }); }
});
router.get('/farmers', ...A, async (req, res) => {
  try { res.json(await User.find({ role:'farmer' }).select('-password').sort('-createdAt')); }
  catch(e) { res.status(500).json({ message: e.message }); }
});
router.get('/crops', ...A, async (req, res) => {
  try { res.json(await Crop.find().populate('vendor','name email district').sort('-createdAt')); }
  catch(e) { res.status(500).json({ message: e.message }); }
});
router.patch('/vendors/:id/approve', ...A, async (req, res) => {
  try {
    const v = await User.findByIdAndUpdate(req.params.id, { isApproved:true }, { new:true }).select('-password');
    res.json({ message:'Approved', vendor: v });
  } catch(e) { res.status(500).json({ message: e.message }); }
});
router.patch('/vendors/:id/reject', ...A, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { isApproved:false, isActive:false });
    await Crop.updateMany({ vendor: req.params.id }, { isActive:false });
    res.json({ message:'Rejected' });
  } catch(e) { res.status(500).json({ message: e.message }); }
});
router.delete('/vendors/:id', ...A, async (req, res) => {
  try {
    await Crop.deleteMany({ vendor: req.params.id });
    await User.findByIdAndDelete(req.params.id);
    res.json({ message:'Deleted' });
  } catch(e) { res.status(500).json({ message: e.message }); }
});
module.exports = router;
