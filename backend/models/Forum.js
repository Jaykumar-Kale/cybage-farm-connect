const mongoose = require('mongoose');

const forumSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  titleMarathi: { type: String },
  content: { type: String, required: true },
  category: {
    type: String,
    enum: ['crop-advice', 'pest-control', 'market-price', 'government-scheme', 'weather', 'general'],
    default: 'general'
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String },
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Forum', forumSchema);
