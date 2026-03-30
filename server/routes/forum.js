const express = require('express');
const router = express.Router();
const Forum = require('../models/Forum');
const { protect } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const posts = await Forum.find(filter)
      .populate('author', 'name role district')
      .populate('comments.author', 'name role')
      .sort('-createdAt');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const post = await Forum.create({ ...req.body, author: req.user._id });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/:id/comment', protect, async (req, res) => {
  try {
    const post = await Forum.findByIdAndUpdate(
      req.params.id,
      { $push: { comments: { author: req.user._id, content: req.body.content } } },
      { new: true }
    ).populate('comments.author', 'name role');
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/:id/like', protect, async (req, res) => {
  try {
    const post = await Forum.findById(req.params.id);
    const idx = post.likes.indexOf(req.user._id);
    if (idx === -1) post.likes.push(req.user._id);
    else post.likes.splice(idx, 1);
    await post.save();
    res.json({ likes: post.likes.length });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
