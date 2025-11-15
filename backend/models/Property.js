const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  address: { type: String, required: true },
  city: { type: String },
  area: { type: String },
  rent: { type: Number, required: true },
  bedrooms: { type: Number, default: 1 },
  bathrooms: { type: Number, default: 1 },
  squareFeet: { type: Number },
  furnishing: { 
    type: String, 
    enum: ['Fully Furnished', 'Semi Furnished', 'Not Furnished'],
    default: 'Not Furnished'
  },
  status: { 
    type: String, 
    enum: ['Available', 'Occupied', 'Maintenance Issue'],
    default: 'Available'
  },
  images: [{ type: String }], // Array of image URLs
  landlord: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  leaseStart: { type: Date },
  leaseEnd: { type: Date },
  availableDate: { type: Date },
  localities: [{ type: String }], // Array of nearby localities
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
