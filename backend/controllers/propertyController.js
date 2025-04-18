const Property = require('../models/Property');

exports.createProperty = async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllProperties = async (req, res) => {
  try {
    const props = await Property.find().populate('landlord tenant', 'name');
    res.json(props);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
