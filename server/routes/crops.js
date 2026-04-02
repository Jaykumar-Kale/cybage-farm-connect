const router = require('express').Router();
const Crop = require('../models/Crop');
const { protect, requireRole, requireApproved } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const { category, state, search } = req.query;
    const f = { isActive: true };
    if (category) f.category = category;
    if (state) f.state = state;
    if (search) f.name = { $regex: search, $options: 'i' };
    res.json(await Crop.find(f).populate('vendor','name phone district state').sort('-updatedAt'));
  } catch(e) { res.status(500).json({ message: e.message }); }
});
router.get('/my', protect, requireRole('vendor'), async (req, res) => {
  try { res.json(await Crop.find({ vendor: req.user._id }).sort('-createdAt')); }
  catch(e) { res.status(500).json({ message: e.message }); }
});
router.post('/', protect, requireRole('vendor'), requireApproved, async (req, res) => {
  try { res.status(201).json(await Crop.create({ ...req.body, vendor: req.user._id })); }
  catch(e) { res.status(500).json({ message: e.message }); }
});
router.put('/:id', protect, requireRole('vendor'), requireApproved, async (req, res) => {
  try {
    const c = await Crop.findById(req.params.id);
    if (!c) return res.status(404).json({ message: 'Not found' });
    if (c.vendor.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
    res.json(await Crop.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: Date.now() }, { new: true }));
  } catch(e) { res.status(500).json({ message: e.message }); }
});
router.delete('/:id', protect, requireRole('vendor'), async (req, res) => {
  try {
    const c = await Crop.findById(req.params.id);
    if (!c) return res.status(404).json({ message: 'Not found' });
    if (c.vendor.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Forbidden' });
    await c.deleteOne();
    res.json({ message: 'Deleted' });
  } catch(e) { res.status(500).json({ message: e.message }); }
});
module.exports = router;
