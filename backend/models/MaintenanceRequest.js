const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'Tenant' },
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property' },
  description: String,
  status: { type: String, default: 'Pending' }
});

module.exports = mongoose.model('MaintenanceRequest', requestSchema);
