const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const s = new mongoose.Schema({
  name:       { type: String, required: true, trim: true },
  email:      { type: String, required: true, unique: true, lowercase: true },
  password:   { type: String, required: true },
  role:       { type: String, enum: ['farmer','vendor','admin'], default: 'farmer' },
  phone:      String, state: { type: String, default: 'Maharashtra' },
  district:   String, isApproved: { type: Boolean, default: false },
  isActive:   { type: Boolean, default: true },
  createdAt:  { type: Date, default: Date.now },
});
s.pre('save', async function(n) {
  if (!this.isModified('password')) return n();
  this.password = await bcrypt.hash(this.password, 12); n();
});
s.pre('save', function(n) {
  if (this.isNew && this.role === 'farmer') this.isApproved = true; n();
});
s.methods.comparePassword = function(p) { return bcrypt.compare(p, this.password); };
module.exports = mongoose.model('User', s);
