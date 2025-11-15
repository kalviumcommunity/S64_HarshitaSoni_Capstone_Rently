const MaintenanceRequest = require('../models/MaintenanceRequest');

exports.createMaintenanceRequest = async (req, res) => {
  try {
    const { property, description, priority = 'medium' } = req.body;
    const maintenanceRequest = new MaintenanceRequest({ 
      property, 
      tenant: req.userId, // Set tenant from authenticated user
      description,
      priority
    });
    await maintenanceRequest.save();
    await maintenanceRequest.populate('property tenant', 'name email title address');
    res.status(201).json({
      success: true,
      maintenanceRequest
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getAllMaintenanceRequests = async (req, res) => {
  try {
    const maintenanceRequests = await MaintenanceRequest.find()
      .populate('property tenant', 'name email title address')
      .sort({ createdAt: -1 })
      .exec();
    res.status(200).json({
      success: true,
      maintenanceRequests
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getMaintenanceRequestById = async (req, res) => {
  try {
    const maintenanceRequest = await MaintenanceRequest.findById(req.params.id)
      .populate('property tenant', 'name email title address');
    
    if (!maintenanceRequest) {
      return res.status(404).json({ success: false, message: 'Maintenance request not found' });
    }
    
    res.json({
      success: true,
      maintenanceRequest
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateMaintenanceRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const maintenanceRequest = await MaintenanceRequest.findById(id);

    if (!maintenanceRequest) {
      return res.status(404).json({ success: false, message: 'Maintenance request not found' });
    }

    // Check if user is the landlord of the property or the tenant who created the request
    const isLandlord = maintenanceRequest.property.landlord.toString() === req.userId;
    const isTenant = maintenanceRequest.tenant.toString() === req.userId;
    
    if (!isLandlord && !isTenant) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this request' });
    }

    maintenanceRequest.status = status;
    if (notes) {
      maintenanceRequest.notes = notes;
    }
    await maintenanceRequest.save();
    
    await maintenanceRequest.populate('property tenant', 'name email title address');
    res.status(200).json({
      success: true,
      maintenanceRequest
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getTenantMaintenanceRequests = async (req, res) => {
  try {
    const maintenanceRequests = await MaintenanceRequest.find({ tenant: req.userId })
      .populate('property', 'title address')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      maintenanceRequests
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getLandlordMaintenanceRequests = async (req, res) => {
  try {
    // Get all properties owned by the landlord
    const Property = require('../models/Property');
    const landlordProperties = await Property.find({ landlord: req.userId });
    const propertyIds = landlordProperties.map(p => p._id);
    
    const maintenanceRequests = await MaintenanceRequest.find({ 
      property: { $in: propertyIds } 
    })
      .populate('property tenant', 'title address name email')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      maintenanceRequests
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteMaintenanceRequest = async (req, res) => {
  try {
    const maintenanceRequest = await MaintenanceRequest.findById(req.params.id);
    
    if (!maintenanceRequest) {
      return res.status(404).json({ success: false, message: 'Maintenance request not found' });
    }

    // Only the tenant who created the request or the landlord can delete it
    const isLandlord = maintenanceRequest.property.landlord.toString() === req.userId;
    const isTenant = maintenanceRequest.tenant.toString() === req.userId;
    
    if (!isLandlord && !isTenant) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this request' });
    }

    await MaintenanceRequest.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: 'Maintenance request deleted successfully'
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
