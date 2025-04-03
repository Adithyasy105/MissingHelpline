const express = require('express');
const reportController = require('../controllers/reportController');
const { authenticateUser, authenticateAdmin } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

const router = express.Router();

// Report Routes
router.post('/create', authenticateUser, upload.single('photo'), reportController.createReport);
router.get('/all', reportController.getAllReports);
router.get('/:id', reportController.getReportById);
router.put('/:id', authenticateUser, upload.single('photo'), reportController.updateReport);
router.delete('/:id', authenticateAdmin, reportController.deleteReport);

module.exports = router;
