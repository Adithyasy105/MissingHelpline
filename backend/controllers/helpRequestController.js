const HelpRequest = require('../models/HelpRequest');

const createHelpRequest = async (req, res) => {
  try {
    const { location, message, status } = req.body;
    const userId = req.user ? req.user.id : null; // Get from authenticated user

    // Validate required fields
    if (!location || !message) {
      return res.status(400).json({ error: "Location and message are required" });
    }

    const helpRequest = await HelpRequest.create({
      userId,  // Now userId is correctly assigned
      location,
      message,
      status: status || "pending" // Default status to pending
    });

    res.status(201).json({ message: "Help request created successfully", helpRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get All Help Requests
const getAllHelpRequests = async (req, res) => {
  try {
    const helpRequests = await HelpRequest.findAll();
    res.status(200).json(helpRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Help Request by ID
const getHelpRequestById = async (req, res) => {
  try {
    const helpRequest = await HelpRequest.findByPk(req.params.id);
    if (!helpRequest) {
      return res.status(404).json({ message: 'Help request not found' });
    }
    res.status(200).json(helpRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Help Request
const updateHelpRequest = async (req, res) => {
  try {
    const { location, message, status } = req.body;
    const helpRequest = await HelpRequest.findByPk(req.params.id);

    if (!helpRequest) {
      return res.status(404).json({ message: 'Help request not found' });
    }

    // Update fields only if provided
    await helpRequest.update({
      location: location || helpRequest.location,
      message: message || helpRequest.message,
      status: status || helpRequest.status
    });

    res.status(200).json({ message: 'Help request updated successfully', helpRequest });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Help Request
const deleteHelpRequest = async (req, res) => {
  try {
    const helpRequest = await HelpRequest.findByPk(req.params.id);
    if (!helpRequest) {
      return res.status(404).json({ message: 'Help request not found' });
    }

    await helpRequest.destroy();
    res.status(200).json({ message: 'Help request deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { 
  createHelpRequest, 
  getAllHelpRequests, 
  getHelpRequestById, 
  updateHelpRequest, 
  deleteHelpRequest 
};
