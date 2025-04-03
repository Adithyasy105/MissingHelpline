// routes/foundPersonRoutes.js
const express = require('express');
const foundPersonController = require('../controllers/foundPersonController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const router = express.Router();

// Found Person Routes
router.post('/create', authMiddleware.authenticateUser, upload.single('photo'), foundPersonController.createFoundPerson);
router.get('/all', foundPersonController.getAllFoundPersons);
router.get('/:id', foundPersonController.getFoundPersonById);
router.put('/:id', authMiddleware.authenticateUser, upload.single('photo'), foundPersonController.updateFoundPerson);
router.delete('/:id', authMiddleware.authenticateUser, foundPersonController.deleteFoundPerson);

module.exports = router;