const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  tenant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  landlord: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  paidDate: { type: Date },
  status: { 
    type: String, 
    enum: ['pending', 'paid', 'overdue', 'cancelled'], 
    default: 'pending' 
  },
  paymentMethod: { 
    type: String, 
    enum: ['paypal', 'phonepe', 'bank_transfer', 'cash', 'other'] 
  },
  transactionId: { type: String }, // External payment gateway transaction ID
  lateFee: { type: Number, default: 0 },
  notes: { type: String },
  month: { type: Number, required: true }, // 1-12
  year: { type: Number, required: true },
}, { timestamps: true });

// Index for efficient queries
paymentSchema.index({ property: 1, tenant: 1, year: 1, month: 1 });
paymentSchema.index({ status: 1, dueDate: 1 });

module.exports = mongoose.model('Payment', paymentSchema);
