const Property = require('../models/Property');

exports.createProperty = async (req, res) => {
  try {
    const propertyData = {
      ...req.body,
      landlord: req.userId // Set landlord from authenticated user
    };
    const property = new Property(propertyData);
    await property.save();
    await property.populate('landlord', 'name email');
    res.status(201).json({
      success: true,
      property
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getAllProperties = async (req, res) => {
  try {
    const props = await Property.find().populate('landlord tenant', 'name email');
    res.json({
      success: true,
      properties: props
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('landlord tenant', 'name email');
    
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }
    
    res.json({
      success: true,
      property
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    // Check if user is the landlord of this property
    if (property.landlord.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this property' });
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('landlord tenant', 'name email');

    res.json({
      success: true,
      property: updatedProperty
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    // Check if user is the landlord of this property
    if (property.landlord.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this property' });
    }

    await Property.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: 'Property deleted successfully'
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getLandlordProperties = async (req, res) => {
  try {
    const properties = await Property.find({ landlord: req.userId })
      .populate('tenant', 'name email');
    res.json({
      success: true,
      properties
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.assignTenant = async (req, res) => {
  try {
    const { tenantId, leaseStart, leaseEnd } = req.body;
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    // Check if user is the landlord of this property
    if (property.landlord.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to assign tenant to this property' });
    }

    property.tenant = tenantId;
    property.leaseStart = leaseStart;
    property.leaseEnd = leaseEnd;
    await property.save();
    
    await property.populate('tenant', 'name email');
    res.json({
      success: true,
      property
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
