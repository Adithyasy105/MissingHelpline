const HelpRequest = require('../models/HelpRequest');
const Report = require('../models/Report');
const FoundPerson = require('../models/FoundPerson');
const User = require('../models/User');

//
// ====================== HELP REQUESTS ======================
//

// ✅ Get All Help Requests (Admin)
const getAllHelpRequestsAdmin = async (req, res) => {
  try {
    const helpRequests = await HelpRequest.findAll({
      include: [{ model: User, attributes: ['name', 'email'] }],
    });
    res.status(200).json(helpRequests);
  } catch (error) {
    console.error("Error fetching help requests:", error.message);
    res.status(500).json({ message: "Error fetching help requests" });
  }
};

// ✅ Get Help Request by ID (Admin)
const getHelpRequestByIdAdmin = async (req, res) => {
  try {
    const helpRequest = await HelpRequest.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['name', 'email'] }],
    });

    if (!helpRequest) {
      return res.status(404).json({ message: "Help request not found" });
    }

    res.status(200).json(helpRequest);
  } catch (error) {
    console.error("Error fetching help request:", error.message);
    res.status(500).json({ message: "Error fetching help request" });
  }
};

// ✅ Update Help Request by Admin
const updateHelpRequestAdmin = async (req, res) => {
  try {
    const helpRequest = await HelpRequest.findByPk(req.params.id);

    if (!helpRequest) {
      return res.status(404).json({ message: "Help request not found" });
    }

    helpRequest.location = req.body.location || helpRequest.location;
    helpRequest.message = req.body.message || helpRequest.message;
    helpRequest.status = req.body.status || helpRequest.status;

    await helpRequest.save();

    res.status(200).json({
      message: "Help request updated successfully by admin",
      helpRequest,
    });
  } catch (error) {
    console.error("Error updating help request:", error.message);
    res.status(500).json({ message: "Error updating help request" });
  }
};

// ✅ Delete Help Request by Admin
const deleteHelpRequestAdmin = async (req, res) => {
  try {
    const helpRequest = await HelpRequest.findByPk(req.params.id);

    if (!helpRequest) {
      return res.status(404).json({ message: "Help request not found" });
    }

    await helpRequest.destroy();
    res.status(200).json({ message: "Help request deleted successfully by admin" });
  } catch (error) {
    console.error("Error deleting help request:", error.message);
    res.status(500).json({ message: "Error deleting help request" });
  }
};

//
// ====================== MISSING PERSON REPORTS ======================
//

// ✅ Get All Reports (Admin)
const getAllReportsAdmin = async (req, res) => {
  try {
    const reports = await Report.findAll({
      include: [{ model: User, attributes: ['name', 'email'] }],
    });
    res.status(200).json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error.message);
    res.status(500).json({ message: "Error fetching reports" });
  }
};

// ✅ Get Report by ID (Admin)
const getReportByIdAdmin = async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['name', 'email'] }],
    });

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json(report);
  } catch (error) {
    console.error("Error fetching report:", error.message);
    res.status(500).json({ message: "Error fetching report" });
  }
};

// ✅ Update Report (Admin)
const updateReportAdmin = async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    const { personName, lastSeenLocation, age, gender, contactPhone, status } = req.body;

    report.personName = personName || report.personName;
    report.lastSeenLocation = lastSeenLocation || report.lastSeenLocation;
    report.age = age || report.age;
    report.gender = gender || report.gender;
    report.contactPhone = contactPhone || report.contactPhone;
    report.status = status || report.status;

    await report.save();

    res.status(200).json({
      message: "Report updated successfully by admin",
      report,
    });
  } catch (error) {
    console.error("Error updating report:", error.message);
    res.status(500).json({ message: "Error updating report" });
  }
};

// ✅ Delete Report (Admin)
const deleteReportAdmin = async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    await report.destroy();
    res.status(200).json({ message: "Report deleted successfully by admin" });
  } catch (error) {
    console.error("Error deleting report:", error.message);
    res.status(500).json({ message: "Error deleting report" });
  }
};

//
// ====================== FOUND PERSON REPORTS ======================
//

// ✅ Get All Found Persons (Admin)
const getAllFoundPersonsAdmin = async (req, res) => {
  try {
    const foundPersons = await FoundPerson.findAll({
      include: [{ model: User, attributes: ['name', 'email'] }],
    });
    res.status(200).json(foundPersons);
  } catch (error) {
    console.error("Error fetching found persons:", error.message);
    res.status(500).json({ message: "Error fetching found persons" });
  }
};

// ✅ Get Found Person by ID (Admin)
const getFoundPersonByIdAdmin = async (req, res) => {
  try {
    const foundPerson = await FoundPerson.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['name', 'email'] }],
    });

    if (!foundPerson) {
      return res.status(404).json({ message: "Found person not found" });
    }

    res.status(200).json(foundPerson);
  } catch (error) {
    console.error("Error fetching found person:", error.message);
    res.status(500).json({ message: "Error fetching found person" });
  }
};

// ✅ Update Found Person (Admin)
const updateFoundPersonAdmin = async (req, res) => {
  try {
    const foundPerson = await FoundPerson.findByPk(req.params.id);

    if (!foundPerson) {
      return res.status(404).json({ message: "Found person not found" });
    }

    const { place, message, contactPhone, status } = req.body;

    foundPerson.place = place || foundPerson.place;
    foundPerson.message = message || foundPerson.message;
    foundPerson.contactPhone = contactPhone || foundPerson.contactPhone;
    foundPerson.status = status || foundPerson.status;

    await foundPerson.save();

    res.status(200).json({
      message: "Found person updated successfully by admin",
      foundPerson,
    });
  } catch (error) {
    console.error("Error updating found person:", error.message);
    res.status(500).json({ message: "Error updating found person" });
  }
};

// ✅ Delete Found Person (Admin)
const deleteFoundPersonAdmin = async (req, res) => {
  try {
    const foundPerson = await FoundPerson.findByPk(req.params.id);

    if (!foundPerson) {
      return res.status(404).json({ message: "Found person not found" });
    }

    await foundPerson.destroy();
    res.status(200).json({ message: "Found person deleted successfully by admin" });
  } catch (error) {
    console.error("Error deleting found person:", error.message);
    res.status(500).json({ message: "Error deleting found person" });
  }
};

//
// ====================== EXPORT ======================
//

module.exports = {
  // Help Requests
  getAllHelpRequestsAdmin,
  getHelpRequestByIdAdmin,
  updateHelpRequestAdmin,
  deleteHelpRequestAdmin,

  // Reports
  getAllReportsAdmin,
  getReportByIdAdmin,
  updateReportAdmin,
  deleteReportAdmin,

  // Found Persons
  getAllFoundPersonsAdmin,
  getFoundPersonByIdAdmin,
  updateFoundPersonAdmin,
  deleteFoundPersonAdmin,
};
