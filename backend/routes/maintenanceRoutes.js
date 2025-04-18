const express = require('express');
const router = express.Router();
const { createMaintenanceRequest, getAllMaintenanceRequests, updateMaintenanceRequestStatus } = require('../controllers/maintenanceController');

// Create a maintenance request
router.post('/', createMaintenanceRequest);

// Get all maintenance requests
router.get('/', getAllMaintenanceRequests);

// Update the status of a maintenance request
router.put('/:id', updateMaintenanceRequestStatus);

module.exports = router;
