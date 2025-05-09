const Report = require('../models/Report');  // Assuming your model is called Report

// ✅ Create a Missing Person Report
const createReport = async (req, res) => {
  try {
    const { personName, lastSeenLocation, age, gender, contactPhone } = req.body;

    // ❌ Validation: Ensure all required fields are provided
    if (!personName || !lastSeenLocation || !age || !gender || !contactPhone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Store only the filename, not full path
    const photoFilename = req.file ? req.file.filename : null;

    const newReport = await Report.create({
      personName,
      lastSeenLocation,
      age,
      gender,
      contactPhone,
      photo: photoFilename,  // ✅ Only the filename stored
      userId: req.user.id,   // Creator's user ID
    });

    res.status(201).json({
      message: "Missing person report created successfully",
      report: newReport,
    });
  } catch (error) {
    console.error("Error creating missing report:", error);
    res.status(500).json({ message: "Error creating missing report" });
  }
};

// ✅ Get All Missing Person Reports
const getAllReports = async (req, res) => {
  try {
    const reports = await Report.findAll();
    res.status(200).json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ message: "Error fetching reports" });
  }
};

// ✅ Get Missing Person Report by ID
const getReportById = async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json(report);
  } catch (error) {
    console.error("Error fetching report:", error);
    res.status(500).json({ message: "Error fetching report" });
  }
};

// ✅ Update a Missing Person Report
const updateReport = async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    // Ensure the user is either the creator or an admin
    if (report.userId !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: "You are not authorized to update this report" });
    }

    // Update report fields
    const { personName, lastSeenLocation, age, gender, contactPhone } = req.body;
    report.personName = personName || report.personName;
    report.lastSeenLocation = lastSeenLocation || report.lastSeenLocation;
    report.age = age || report.age;
    report.gender = gender || report.gender;
    report.contactPhone = contactPhone || report.contactPhone;

    // ✅ Update photo only if new one uploaded, storing just the filename
    if (req.file) {
      report.photo = req.file.filename;
    }

    await report.save();

    res.status(200).json({
      message: "Missing report updated successfully",
      report,
    });
  } catch (error) {
    console.error("Error updating report:", error);
    res.status(500).json({ message: "Error updating report" });
  }
};

// ✅ Delete a Missing Person Report
const deleteReport = async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    // Only an admin can delete the report
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: "You are not authorized to delete this report" });
    }

    await report.destroy();

    res.status(200).json({ message: "Missing report deleted successfully" });
  } catch (error) {
    console.error("Error deleting report:", error);
    res.status(500).json({ message: "Error deleting report" });
  }
};

module.exports = {
  createReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport,
};
