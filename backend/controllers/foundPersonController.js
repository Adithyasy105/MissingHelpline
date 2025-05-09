const FoundPerson = require("../models/FoundPerson");
const Report = require("../models/Report"); // Ensure Report model exists

// ✅ Create Found Person Report
exports.createFoundPerson = async (req, res) => {
  try {
    const { reportId, place, message, contactPhone } = req.body;
    const photo = req.file?.path || null; // Safe optional chaining

    // Validate required fields
    if (!place || !contactPhone) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ Check if Report ID exists, but only if reportId is not null or undefined
    let validReport = null;
    if (reportId) {
      validReport = await Report.findByPk(reportId);
      if (!validReport) {
        return res.status(404).json({ message: "Report ID does not exist" });
      }
    }

    // ✅ If no reportId is provided, we handle it by setting it to null or skipping validation
    const foundPerson = await FoundPerson.create({
      reportId: validReport ? reportId : null, // Only set reportId if it's valid
      place,
      message,
      contactPhone,
      photo,
    });

    res.status(201).json({ message: "Found Person reported successfully", foundPerson });
  } catch (error) {
    console.error("Error creating Found Person report:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Get all found persons
exports.getAllFoundPersons = async (req, res) => {
  try {
    const foundPersons = await FoundPerson.findAll();
    res.status(200).json(foundPersons);
  } catch (error) {
    console.error("Error fetching found persons:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Fetch Found Person by ID
exports.getFoundPersonById = async (req, res) => {
  try {
    const foundPerson = await FoundPerson.findByPk(req.params.id);
    if (!foundPerson) {
      return res.status(404).json({ message: "Found Person not found" });
    }
    res.status(200).json(foundPerson);
  } catch (error) {
    console.error("Error fetching Found Person:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Update Found Person
exports.updateFoundPerson = async (req, res) => {
  try {
    const foundPerson = await FoundPerson.findByPk(req.params.id);
    if (!foundPerson) {
      return res.status(404).json({ message: "Found Person not found" });
    }

    // ✅ Use update() instead of Object.assign()
    await foundPerson.update({
      reportId: req.body.reportId || foundPerson.reportId,
      place: req.body.place || foundPerson.place,
      message: req.body.message || foundPerson.message,
      contactPhone: req.body.contactPhone || foundPerson.contactPhone,
      photo: req.file?.path || foundPerson.photo,
    });

    res.status(200).json({ message: "Found Person updated successfully", foundPerson });
  } catch (error) {
    console.error("Error updating Found Person:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Delete Found Person
exports.deleteFoundPerson = async (req, res) => {
  try {
    const foundPerson = await FoundPerson.findByPk(req.params.id);
    if (!foundPerson) {
      return res.status(404).json({ message: "Found Person not found" });
    }

    await foundPerson.destroy();
    res.status(200).json({ message: "Found Person deleted successfully" });
  } catch (error) {
    console.error("Error deleting Found Person:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
