const express = require('express');
const router = express.Router();
const Crop = require('../models/Crop');
const { protect, requireRole, requireApproved } = require('../middleware/auth');

// GET all active crops (public - for farmers)
router.get('/', async (req, res) => {
  try {
    const { category, state, search } = req.query;
    const filter = { isActive: true };
    if (category) filter.category = category;
    if (state) filter.state = state;
    if (search) filter.name = { $regex: search, $options: 'i' };
    const crops = await Crop.find(filter)
      .populate('vendor', 'name phone district state')
      .sort('-updatedAt');
    res.json(crops);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET vendor's own crops
router.get('/my', protect, requireRole('vendor'), async (req, res) => {
  try {
    const crops = await Crop.find({ vendor: req.user._id }).sort('-createdAt');
    res.json(crops);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create crop (vendor only, approved)
router.post('/', protect, requireRole('vendor'), requireApproved, async (req, res) => {
  try {
    const crop = await Crop.create({ ...req.body, vendor: req.user._id });
    res.status(201).json(crop);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update crop
router.put('/:id', protect, requireRole('vendor'), requireApproved, async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (!crop) return res.status(404).json({ message: 'Crop not found' });
    if (crop.vendor.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });
    const updated = await Crop.findByIdAndUpdate(req.params.id, { ...req.body, updatedAt: Date.now() }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE crop
router.delete('/:id', protect, requireRole('vendor'), async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (!crop) return res.status(404).json({ message: 'Crop not found' });
    if (crop.vendor.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });
    await crop.deleteOne();
    res.json({ message: 'Crop listing deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
