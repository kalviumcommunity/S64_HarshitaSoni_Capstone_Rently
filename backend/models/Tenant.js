const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  name: String,
  email: String,
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' }
});

module.exports = mongoose.model('Tenant', tenantSchema);
