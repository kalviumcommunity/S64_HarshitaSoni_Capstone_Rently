const express = require('express');
const router = express.Router();
const { 
  createProperty, 
  getAllProperties, 
  getPropertyById, 
  updateProperty, 
  deleteProperty,
  getLandlordProperties,
  assignTenant
} = require('../controllers/propertyController');
const { auth, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getAllProperties);
router.get('/:id', getPropertyById);

// Protected routes (require authentication)
router.post('/', auth, authorize('landlord'), createProperty);
router.get('/landlord/my-properties', auth, authorize('landlord'), getLandlordProperties);
router.put('/:id', auth, authorize('landlord'), updateProperty);
router.delete('/:id', auth, authorize('landlord'), deleteProperty);
router.post('/:id/assign-tenant', auth, authorize('landlord'), assignTenant);

module.exports = router;
