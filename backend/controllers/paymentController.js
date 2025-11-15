const Payment = require('../models/Payment');
const Property = require('../models/Property');

exports.createPayment = async (req, res) => {
  try {
    const { propertyId, amount, dueDate, month, year } = req.body;
    
    // Verify the property exists and get landlord info
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    // Check if user is the tenant of this property
    if (property.tenant.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to create payment for this property' });
    }

    const payment = new Payment({
      property: propertyId,
      tenant: req.userId,
      landlord: property.landlord,
      amount,
      dueDate,
      month,
      year
    });

    await payment.save();
    await payment.populate('property tenant landlord', 'name email title address');
    
    res.status(201).json({
      success: true,
      payment
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getTenantPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ tenant: req.userId })
      .populate('property', 'title address')
      .populate('landlord', 'name email')
      .sort({ dueDate: -1 });
    
    res.json({
      success: true,
      payments
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getLandlordPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ landlord: req.userId })
      .populate('property', 'title address')
      .populate('tenant', 'name email')
      .sort({ dueDate: -1 });
    
    res.json({
      success: true,
      payments
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, paymentMethod, transactionId, notes } = req.body;

    const payment = await Payment.findById(id);
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }

    // Check if user is the tenant or landlord
    const isTenant = payment.tenant.toString() === req.userId;
    const isLandlord = payment.landlord.toString() === req.userId;
    
    if (!isTenant && !isLandlord) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this payment' });
    }

    payment.status = status;
    if (paymentMethod) payment.paymentMethod = paymentMethod;
    if (transactionId) payment.transactionId = transactionId;
    if (notes) payment.notes = notes;
    
    if (status === 'paid') {
      payment.paidDate = new Date();
    }

    await payment.save();
    await payment.populate('property tenant landlord', 'name email title address');
    
    res.json({
      success: true,
      payment
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('property tenant landlord', 'name email title address');
    
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }
    
    res.json({
      success: true,
      payment
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.generateRentReminders = async (req, res) => {
  try {
    // Find all overdue payments
    const overduePayments = await Payment.find({
      status: 'pending',
      dueDate: { $lt: new Date() },
      landlord: req.userId
    }).populate('property tenant', 'title address name email');

    res.json({
      success: true,
      overduePayments,
      count: overduePayments.length
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.calculateLateFees = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { lateFeeRate = 0.05 } = req.body; // 5% default late fee rate

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }

    if (payment.status !== 'pending' || payment.dueDate >= new Date()) {
      return res.status(400).json({ success: false, message: 'Late fee can only be calculated for overdue pending payments' });
    }

    const daysOverdue = Math.ceil((new Date() - payment.dueDate) / (1000 * 60 * 60 * 24));
    const lateFee = payment.amount * lateFeeRate * daysOverdue;

    payment.lateFee = lateFee;
    await payment.save();

    res.json({
      success: true,
      payment,
      daysOverdue,
      lateFee
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
