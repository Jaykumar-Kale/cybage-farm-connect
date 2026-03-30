const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['farmer', 'vendor', 'admin'], default: 'farmer' },
  phone: { type: String },
  state: { type: String, default: 'Maharashtra' },
  district: { type: String },
  village: { type: String },
  isApproved: { type: Boolean, default: false }, // vendors need admin approval
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (pass) {
  return bcrypt.compare(pass, this.password);
};

// Farmers are auto-approved; vendors need admin approval
userSchema.pre('save', function (next) {
  if (this.isNew && this.role === 'farmer') this.isApproved = true;
  next();
});

module.exports = mongoose.model('User', userSchema);
