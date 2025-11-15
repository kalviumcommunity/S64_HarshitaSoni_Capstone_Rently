const express = require('express');
const router = express.Router();
const { 
  createMaintenanceRequest, 
  getAllMaintenanceRequests, 
  getMaintenanceRequestById,
  updateMaintenanceRequestStatus,
  getTenantMaintenanceRequests,
  getLandlordMaintenanceRequests,
  deleteMaintenanceRequest
} = require('../controllers/maintenanceController');
const { auth, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getAllMaintenanceRequests);
router.get('/:id', getMaintenanceRequestById);

// Protected routes for tenants
router.post('/', auth, authorize('tenant'), createMaintenanceRequest);
router.get('/tenant/my-requests', auth, authorize('tenant'), getTenantMaintenanceRequests);

// Protected routes for landlords
router.get('/landlord/my-requests', auth, authorize('landlord'), getLandlordMaintenanceRequests);
router.put('/:id', auth, updateMaintenanceRequestStatus);
router.delete('/:id', auth, deleteMaintenanceRequest);

module.exports = router;
