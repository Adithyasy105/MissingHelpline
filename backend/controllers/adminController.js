const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AdminAction = require('../models/AdminAction');
const MissingReport = require('../models/Report');
const HelpRequest = require('../models/HelpRequest');
const FoundPerson = require('../models/FoundPerson');
const User = require('../models/User');

// Admin Login
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the admin by email
    const admin = await User.findOne({ where: { email, role: 'admin' } });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found or unauthorized' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Admin logged in successfully', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch all users (Admin access required)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Promote a user to admin
exports.promoteUserToAdmin = async (req, res) => {
  try {
    const adminId = req.user.id; // Admin performing the action
    const user = await User.findByPk(req.params.id);
    
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.role === 'admin') return res.status(400).json({ message: 'User is already an admin' });

    user.role = 'admin';
    await user.save();

    // Log admin action
    await AdminAction.create({
      userId: adminId,
      actionType: 'Promote to Admin',
      targetId: user.id,
      details: `Admin promoted user ${user.id} to admin`
    });

    res.json({ message: 'User promoted to admin', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const adminId = req.user.id; // Admin performing the action
    const user = await User.findByPk(req.params.id);

    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.id === adminId) return res.status(403).json({ message: 'You cannot delete yourself' });

    await user.destroy();

    // Log admin action
    await AdminAction.create({
      userId: adminId,
      actionType: 'Delete User',
      targetId: user.id,
      details: `Admin deleted user ${user.id}`
    });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch all admin actions
exports.getAllAdminActions = async (req, res) => {
  try {
    const adminActions = await AdminAction.findAll();
    res.json(adminActions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// ✅ Get all missing person reports
exports.getAllMissingPersonsReports = async (req, res) => {
  try {
    const reports = await MissingReport.findAll();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Approve or reject a missing person report
exports.approveOrRejectMissingReport = async (req, res) => {
  try {
    const { status } = req.body; // "approved" or "rejected"
    const report = await MissingReport.findByPk(req.params.id);

    if (!report) return res.status(404).json({ message: 'Report not found' });

    report.status = status;
    await report.save();

    await AdminAction.create({
      userId: req.user.id,
      actionType: 'Update Report Status',
      targetId: report.id,
      details: `Admin changed report ${report.id} status to ${status}`,
    });

    res.json({ message: `Report status updated to ${status}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete an inappropriate missing person report
exports.deleteReport = async (req, res) => {
  try {
    const report = await MissingReport.findByPk(req.params.id);

    if (!report) return res.status(404).json({ message: 'Report not found' });

    await report.destroy();

    await AdminAction.create({
      userId: req.user.id,
      actionType: 'Delete Report',
      targetId: report.id,
      details: `Admin deleted report ${report.id}`,
    });

    res.json({ message: 'Report deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get all help requests
exports.getAllHelpRequests = async (req, res) => {
  try {
    const helpRequests = await HelpRequest.findAll();
    res.json(helpRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Resolve a help request
exports.resolveHelpRequest = async (req, res) => {
  try {
    const helpRequest = await HelpRequest.findByPk(req.params.id);

    if (!helpRequest) return res.status(404).json({ message: 'Help request not found' });

    helpRequest.status = 'resolved';
    await helpRequest.save();

    await AdminAction.create({
      userId: req.user.id,
      actionType: 'Resolve Help Request',
      targetId: helpRequest.id,
      details: `Admin resolved help request ${helpRequest.id}`,
    });

    res.json({ message: 'Help request marked as resolved' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get all found person reports
exports.getAllFoundPersonsReports = async (req, res) => {
  try {
    const foundPersons = await FoundPerson.findAll();
    res.json(foundPersons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
