const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: String,
  address: String,
  rent: Number,
  available: { type: Boolean, default: true },
  landlord: { type: mongoose.Schema.Types.ObjectId, ref: 'Landlord' },
  tenants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' }]
});

module.exports = mongoose.model('Property', propertySchema);
