const express = require('express');
const router = express.Router();
const { 
  createPayment, 
  getTenantPayments, 
  getLandlordPayments, 
  updatePaymentStatus,
  getPaymentById,
  generateRentReminders,
  calculateLateFees
} = require('../controllers/paymentController');
const { auth, authorize } = require('../middleware/auth');

// Public routes
router.get('/:id', getPaymentById);

// Protected routes for tenants
router.post('/', auth, authorize('tenant'), createPayment);
router.get('/tenant/my-payments', auth, authorize('tenant'), getTenantPayments);

// Protected routes for landlords
router.get('/landlord/my-payments', auth, authorize('landlord'), getLandlordPayments);
router.get('/landlord/reminders', auth, authorize('landlord'), generateRentReminders);
router.put('/:id/status', auth, updatePaymentStatus);
router.post('/:id/calculate-late-fee', auth, authorize('landlord'), calculateLateFees);

module.exports = router;
