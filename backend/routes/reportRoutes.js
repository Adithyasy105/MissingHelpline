const express = require("express");
const reportController = require("../controllers/reportController");
const { authenticateUser, authenticateAdmin } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

// ✅ Create a Missing Person Report (Only Authenticated Users)
router.post("/create", authenticateUser, upload.single("photo"), reportController.createReport);

// ✅ Get All Missing Person Reports (Public Access)
router.get("/all", reportController.getAllReports);

// ✅ Get a Single Missing Person Report by ID (Public Access)
router.get("/:id", reportController.getReportById);

// ✅ Update a Report (Only the Creator or Admin)
router.put("/:id", authenticateUser, upload.single("photo"), reportController.updateReport);

// ✅ Delete a Report (Only Admins)
router.delete("/:id", authenticateAdmin, reportController.deleteReport);

module.exports = router;
