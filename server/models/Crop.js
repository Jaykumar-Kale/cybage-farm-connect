const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  nameMarathi: { type: String }, // Marathi name of crop
  category: {
    type: String,
    enum: ['grains', 'vegetables', 'fruits', 'pulses', 'oilseeds', 'spices', 'cotton', 'other'],
    required: true
  },
  pricePerQuintal: { type: Number, required: true },
  minQuantity: { type: Number, default: 1 }, // minimum quintals vendor will buy
  maxQuantity: { type: Number }, // max quintals vendor will buy
  location: { type: String, required: true }, // vendor buying location
  district: { type: String },
  state: { type: String, default: 'Maharashtra' },
  description: { type: String },
  isActive: { type: Boolean, default: true },
  validUntil: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

cropSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Crop', cropSchema);
