// routes/helpRequestRoutes.js
const express = require('express');
const helpRequestController = require('../controllers/helpRequestController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
// Help Request Routes
router.post('/create', authMiddleware.authenticateUser, helpRequestController.createHelpRequest);
router.get('/all', helpRequestController.getAllHelpRequests);
router.get('/:id', helpRequestController.getHelpRequestById);
router.put('/:id', authMiddleware.authenticateUser, helpRequestController.updateHelpRequest);
router.delete('/:id', authMiddleware.authenticateUser, helpRequestController.deleteHelpRequest);

module.exports = router;
