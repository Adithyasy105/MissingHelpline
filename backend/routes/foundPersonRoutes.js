const express = require("express");
const foundPersonController = require("../controllers/foundPersonController");
const { authenticateUser, authenticateAdmin } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

// ✅ Create Found Person Report (Only Authenticated Users)
router.post(
  "/create",
  authenticateUser, // Ensure user is authenticated
  upload.single("photo"), // Upload photo (ensure file validation in middleware)
  foundPersonController.createFoundPerson
);

// ✅ Get All Found Persons (Public Access)
router.get("/all", foundPersonController.getAllFoundPersons);

// ✅ Get a Single Found Person Report by ID (Public Access)
router.get("/:id", foundPersonController.getFoundPersonById);

// ✅ Update Found Person Report (Only Creator or Admin)
router.put(
  "/:id",
  authenticateUser, // Ensure user is authenticated
  upload.single("photo"), // Upload new photo if applicable (ensure validation)
  foundPersonController.updateFoundPerson
);

// ✅ Delete Found Person Report (Only Creator or Admin)
router.delete("/:id", authenticateUser, foundPersonController.deleteFoundPerson);

module.exports = router;
