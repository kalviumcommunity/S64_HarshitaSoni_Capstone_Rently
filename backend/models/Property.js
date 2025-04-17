const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  address: { type: String, required: true },
  rent: { type: Number, required: true },
  landlord: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  leaseStart: { type: Date },
  leaseEnd: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
