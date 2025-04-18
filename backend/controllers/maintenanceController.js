const MaintenanceRequest = require('../models/MaintenanceRequest');

exports.createMaintenanceRequest = async (req, res) => {
  try {
    const { property, tenant, description } = req.body;
    const maintenanceRequest = new MaintenanceRequest({ property, tenant, description });
    await maintenanceRequest.save();
    res.status(201).json(maintenanceRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllMaintenanceRequests = async (req, res) => {
  try {
    const maintenanceRequests = await MaintenanceRequest.find()
      .populate('property tenant')
      .exec();
    res.status(200).json(maintenanceRequests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMaintenanceRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const maintenanceRequest = await MaintenanceRequest.findById(id);

    if (!maintenanceRequest) {
      return res.status(404).json({ error: 'Maintenance request not found' });
    }

    maintenanceRequest.status = status;
    await maintenanceRequest.save();
    res.status(200).json(maintenanceRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
