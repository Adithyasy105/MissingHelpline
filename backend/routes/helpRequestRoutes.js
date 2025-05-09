const express = require("express");
const helpRequestController = require("../controllers/helpRequestController");
const { authenticateUser, authenticateAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Create a Help Request (Only Authenticated Users)
router.post("/create", authenticateUser, helpRequestController.createHelpRequest);

// ✅ Get All Help Requests (Public Access)
router.get("/all", helpRequestController.getAllHelpRequests);

// ✅ Get a Single Help Request by ID (Public Access)
router.get("/:id", helpRequestController.getHelpRequestById);

// ✅ Update a Help Request (Only Creator or Admin)
router.put("/:id", authenticateUser, helpRequestController.updateHelpRequest);

// ✅ Delete a Help Request (Only Creator or Admin)
router.delete("/:id", authenticateUser, helpRequestController.deleteHelpRequest);

module.exports = router;
