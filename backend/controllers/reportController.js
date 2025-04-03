const Report = require('../models/Report');

// Create a new report
const createReport = async (req, res) => {
  try {
    const { personName, age, gender, lastSeenLocation, contactPhone } = req.body;
    const photo = req.file ? req.file.filename : null;

    if (!personName || !age || !gender || !lastSeenLocation || !contactPhone) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }

    // Create new report
    const newReport = await Report.create({
      userId: req.user.id,
      personName,
      age,
      gender,
      lastSeenLocation,
      contactPhone,
      photo,
    });

    res.status(201).json({ message: 'Report created successfully', report: newReport });
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all reports
const getAllReports = async (req, res) => {
  try {
    const reports = await Report.findAll();
    res.status(200).json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a report by ID
const getReportById = async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.id);
    if (!report) return res.status(404).json({ message: 'Report not found' });

    res.status(200).json(report);
  } catch (error) {
    console.error('Error fetching report by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a report
const updateReport = async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.id);
    if (!report) return res.status(404).json({ message: 'Report not found' });

    const { personName, age, gender, lastSeenLocation, contactPhone } = req.body;
    const photo = req.file ? req.file.filename : report.photo;

    await report.update({ personName, age, gender, lastSeenLocation, contactPhone, photo });

    res.status(200).json({ message: 'Report updated successfully', report });
  } catch (error) {
    console.error('Error updating report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a report
const deleteReport = async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.id);
    if (!report) return res.status(404).json({ message: 'Report not found' });

    await report.destroy();
    res.status(200).json({ message: 'Report deleted successfully' });
  } catch (error) {
    console.error('Error deleting report:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { createReport, getAllReports, getReportById, updateReport, deleteReport };
