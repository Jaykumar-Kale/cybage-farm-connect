const router = require('express').Router();
const Forum = require('../models/Forum');
const { protect } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const f = req.query.category ? { category: req.query.category } : {};
    res.json(await Forum.find(f).populate('author','name role district').populate('comments.author','name role').sort('-createdAt'));
  } catch(e) { res.status(500).json({ message: e.message }); }
});
router.post('/', protect, async (req, res) => {
  try { res.status(201).json(await Forum.create({ ...req.body, author: req.user._id })); }
  catch(e) { res.status(500).json({ message: e.message }); }
});
router.post('/:id/comment', protect, async (req, res) => {
  try {
    const p = await Forum.findByIdAndUpdate(req.params.id,
      { $push: { comments: { author: req.user._id, content: req.body.content } } },
      { new: true }).populate('comments.author','name role');
    res.json(p);
  } catch(e) { res.status(500).json({ message: e.message }); }
});
router.post('/:id/like', protect, async (req, res) => {
  try {
    const p = await Forum.findById(req.params.id);
    const i = p.likes.indexOf(req.user._id);
    i===-1 ? p.likes.push(req.user._id) : p.likes.splice(i,1);
    await p.save(); res.json({ likes: p.likes.length });
  } catch(e) { res.status(500).json({ message: e.message }); }
});
module.exports = router;
