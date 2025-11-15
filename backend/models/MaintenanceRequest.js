const mongoose = require('mongoose');

const maintenanceRequestSchema = new mongoose.Schema({
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: { type: String, required: true },
  priority: { 
    type: String, 
    enum: ['low', 'medium', 'high', 'urgent'], 
    default: 'medium' 
  },
  status: { 
    type: String, 
    enum: ['pending', 'in_progress', 'resolved', 'cancelled'], 
    default: 'pending' 
  },
  images: [{ type: String }], // Array of image URLs
  notes: { type: String }, // Notes from landlord
  estimatedCost: { type: Number },
  actualCost: { type: Number },
  completionDate: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('MaintenanceRequest', maintenanceRequestSchema);
