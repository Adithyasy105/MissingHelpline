const express = require('express');
const adminController = require('../controllers/adminController');
const { authenticateAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Existing Routes
router.post('/login', adminController.adminLogin);
router.get('/check-admin', authenticateAdmin, (req, res) => {
  res.status(200).json({ message: 'Admin verified', user: req.user });
});
router.get('/users', authenticateAdmin, adminController.getAllUsers);
router.put('/users/:id/promote', authenticateAdmin, adminController.promoteUserToAdmin);
router.delete('/users/:id', authenticateAdmin, adminController.deleteUser);
router.get('/actions', authenticateAdmin, adminController.getAllAdminActions);

// ✅ New Admin Routes
router.get('/reports', authenticateAdmin, adminController.getAllMissingPersonsReports);
router.put('/reports/:id/approve', authenticateAdmin, adminController.approveOrRejectMissingReport);
router.delete('/reports/:id', authenticateAdmin, adminController.deleteReport);
router.get('/help-requests', authenticateAdmin, adminController.getAllHelpRequests);
router.put('/help-requests/:id/resolve', authenticateAdmin, adminController.resolveHelpRequest);
router.get('/found-persons', authenticateAdmin, adminController.getAllFoundPersonsReports);

module.exports = router;
