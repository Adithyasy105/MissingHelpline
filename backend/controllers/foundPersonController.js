const FoundPerson = require('../models/FoundPerson'); 

exports.createFoundPerson = async (req, res) => {
  try {
    const { reportId, place, message, contactPhone } = req.body; // ✅ Changed phoneNumber to contactPhone
    const photo = req.file ? req.file.path : null;

    const foundPerson = await FoundPerson.create({
      reportId,
      place,
      message,
      contactPhone, // ✅ Updated field name
      photo,
    });

    res.status(201).json(foundPerson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get all found persons
exports.getAllFoundPersons = async (req, res) => {
  try {
    const foundPersons = await FoundPerson.findAll();
    res.json(foundPersons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Fetch Found Person by ID
exports.getFoundPersonById = async (req, res) => {
  try {
    const foundPerson = await FoundPerson.findByPk(req.params.id);
    if (!foundPerson) {
      return res.status(404).json({ message: 'Found Person not found' });
    }
    res.json(foundPerson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update Found Person
exports.updateFoundPerson = async (req, res) => {
  try {
    const { reportId, place, message, contactPhone } = req.body; // ✅ Updated here as well
    const photo = req.file ? req.file.path : null;

    const foundPerson = await FoundPerson.findByPk(req.params.id);
    if (!foundPerson) {
      return res.status(404).json({ message: 'Found Person not found' });
    }

    foundPerson.reportId = reportId || foundPerson.reportId;
    foundPerson.place = place || foundPerson.place;
    foundPerson.message = message || foundPerson.message;
    foundPerson.contactPhone = contactPhone || foundPerson.contactPhone; // ✅ Updated here
    foundPerson.photo = photo || foundPerson.photo;

    await foundPerson.save();
    res.json(foundPerson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete Found Person
exports.deleteFoundPerson = async (req, res) => {
  try {
    const foundPerson = await FoundPerson.findByPk(req.params.id);
    if (!foundPerson) {
      return res.status(404).json({ message: 'Found Person not found' });
    }

    await foundPerson.destroy();
    res.json({ message: 'Found Person deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
