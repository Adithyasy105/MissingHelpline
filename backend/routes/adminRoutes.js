const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import User model
const { authenticateUser, authenticateAdmin } = require("../middleware/authMiddleware"); // Use user authentication
const Report = require("../models/Report");
const HelpRequest = require("../models/HelpRequest");
const FoundPerson = require("../models/FoundPerson");
const router = express.Router();

// ✅ User & Admin Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("🔍 Login Attempt:", email); // Log the login attempt

    // Find the user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log("❌ User Not Found:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("✅ User Found:", user.email, "Role:", user.role);

    // Check if the password matches the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("❌ Incorrect Password:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    console.log("✅ Login Successful:", email, "Role:", user.role);

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });

  } catch (error) {
    console.error("🚨 Error during login:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get('/reports', authenticateAdmin, async (req, res) => {
  try {
    const reports = await Report.findAll();
    res.status(200).json(reports);
  } catch (error) {
    console.error("🚨 Error fetching reports:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Admin: Get all help requests
router.get('/help-requests', authenticateAdmin, async (req, res) => {
  try {
    const helpRequests = await HelpRequest.findAll();
    res.status(200).json(helpRequests);
  } catch (error) {
    console.error("🚨 Error fetching help requests:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Admin: Get all found person reports
router.get('/found-persons', authenticateAdmin, async (req, res) => {
  try {
    const foundPersons = await FoundPerson.findAll();
    res.status(200).json(foundPersons);
  } catch (error) {
    console.error("🚨 Error fetching found persons:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Admin: Delete a report by ID
router.delete('/reports/:id', authenticateAdmin, async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });

    await report.destroy();
    res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    console.error("🚨 Error deleting report:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Admin: Delete a help request by ID
router.delete('/help-requests/:id', authenticateAdmin, async (req, res) => {
  try {
    const helpRequest = await HelpRequest.findByPk(req.params.id);
    if (!helpRequest) return res.status(404).json({ message: "Help request not found" });

    await helpRequest.destroy();
    res.status(200).json({ message: "Help request deleted successfully" });
  } catch (error) {
    console.error("🚨 Error deleting help request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Admin: Delete a found person report by ID
router.delete('/found-persons/:id', authenticateAdmin, async (req, res) => {
  try {
    const foundPerson = await FoundPerson.findByPk(req.params.id);
    if (!foundPerson) return res.status(404).json({ message: "Found person report not found" });

    await foundPerson.destroy();
    res.status(200).json({ message: "Found person report deleted successfully" });
  } catch (error) {
    console.error("🚨 Error deleting found person report:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
