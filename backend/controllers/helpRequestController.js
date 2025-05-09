const HelpRequest = require('../models/HelpRequest');

// ✅ Create Help Request
const createHelpRequest = async (req, res) => {
  try {
    const { location, reason } = req.body;

    // Validate fields
    if (!location || !reason) {
      return res.status(400).json({ message: "Location and reason are required" });
    }

    // Debug log to check if the user ID is available
    console.log("User ID from JWT:", req.user.id);

    // Create a new help request
    const newHelpRequest = await HelpRequest.create({
      userId: req.user.id, // assuming user ID is in the JWT token
      location,
      message: reason,  // Use 'message' field in the HelpRequest model
    });

    res.status(201).json({
      message: "Help request created successfully",
      helpRequest: newHelpRequest,
    });
  } catch (error) {
    console.error("Error creating help request:", error.message);  // Log specific error message
    res.status(500).json({ message: "Error creating help request" });
  }
};

// ✅ Get All Help Requests
const getAllHelpRequests = async (req, res) => {
  try {
    const helpRequests = await HelpRequest.findAll();
    res.status(200).json(helpRequests);
  } catch (error) {
    console.error("Error fetching help requests:", error.message);
    res.status(500).json({ message: "Error fetching help requests" });
  }
};

// ✅ Get Help Request by ID
const getHelpRequestById = async (req, res) => {
  try {
    const helpRequest = await HelpRequest.findByPk(req.params.id);

    if (!helpRequest) {
      return res.status(404).json({ message: "Help request not found" });
    }

    res.status(200).json(helpRequest);
  } catch (error) {
    console.error("Error fetching help request:", error.message);
    res.status(500).json({ message: "Error fetching help request" });
  }
};

// ✅ Update Help Request (Only Creator or Admin)
const updateHelpRequest = async (req, res) => {
  try {
    const helpRequest = await HelpRequest.findByPk(req.params.id);

    if (!helpRequest) {
      return res.status(404).json({ message: "Help request not found" });
    }

    // Check if the user is the creator or an admin
    if (helpRequest.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "You are not authorized to update this help request" });
    }

    // Update request
    helpRequest.location = req.body.location || helpRequest.location;
    helpRequest.message = req.body.reason || helpRequest.message; // 'reason' mapped to 'message'
    await helpRequest.save();

    res.status(200).json({
      message: "Help request updated successfully",
      helpRequest,
    });
  } catch (error) {
    console.error("Error updating help request:", error.message);
    res.status(500).json({ message: "Error updating help request" });
  }
};

// ✅ Delete Help Request (Only Creator or Admin)
const deleteHelpRequest = async (req, res) => {
  try {
    const helpRequest = await HelpRequest.findByPk(req.params.id);

    if (!helpRequest) {
      return res.status(404).json({ message: "Help request not found" });
    }

    // Check if the user is the creator or an admin
    if (helpRequest.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "You are not authorized to delete this help request" });
    }

    await helpRequest.destroy();
    res.status(200).json({ message: "Help request deleted successfully" });
  } catch (error) {
    console.error("Error deleting help request:", error.message);
    res.status(500).json({ message: "Error deleting help request" });
  }
};

module.exports = {
  createHelpRequest,
  getAllHelpRequests,
  getHelpRequestById,
  updateHelpRequest,
  deleteHelpRequest,
};
