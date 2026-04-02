const mongoose = require('mongoose');
const s = new mongoose.Schema({
  vendor:          { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name:            { type: String, required: true },
  nameMarathi:     String,
  category:        { type: String, enum: ['grains','vegetables','fruits','pulses','oilseeds','spices','cotton','other'], required: true },
  pricePerQuintal: { type: Number, required: true },
  minQuantity:     { type: Number, default: 1 },
  maxQuantity:     Number, location: { type: String, required: true },
  district:        String, state: { type: String, default: 'Maharashtra' },
  description:     String, isActive: { type: Boolean, default: true },
  createdAt:       { type: Date, default: Date.now },
  updatedAt:       { type: Date, default: Date.now },
});
s.pre('save', function(n) { this.updatedAt = Date.now(); n(); });
module.exports = mongoose.model('Crop', s);
