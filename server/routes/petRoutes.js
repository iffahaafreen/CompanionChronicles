const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const MedicalRecord = require('../models/MedicalRecord');
const Vaccination = require('../models/Vaccination');
const Visit = require('../models/Visit');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

// Route to get all pets
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching pets', details: error.message });
  }
});

// Route to get a specific pet by petId
router.get('/:petId', async (req, res) => {
  try {
    const pet = await Pet.findOne({ petId: req.params.petId }).populate('ownerId', 'email');
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    res.json(pet);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching pet', details: error.message });
  }
});

// Route to add a new pet
router.post('/add-pet', async (req, res) => { // Changed from '/add-pet' to '/'
  try {
    const { petId, name, species, age, ownerEmail } = req.body;
    const user = await User.findOne({ email: ownerEmail });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newPet = new Pet({
      petId,
      name,
      species,
      age,
      ownerId: user._id
    });

    await newPet.save();
    res.status(201).json(newPet);
  } catch (error) {
    res.status(500).json({ error: 'Error adding pet', details: error.message });
  }
});

router.get('pets/:petId', async (req, res) => {
  const { petId } = req.params;
  try {
    // Fetch pet details from the database
    const pet = await Pet.findById(petId); // Adjust based on your actual model/query
    if (pet) {
      res.json(pet);
    } else {
      res.status(404).send('Pet not found');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
});
// Route to get specific medical records
router.get('/:petId/medical-records', async (req, res) => {
  try {
    const medicalRecords = await MedicalRecord.find({ petId: req.params.petId });
    res.json(medicalRecords);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching medical records', details: error.message });
  }
});

// Get all medical records
router.get('all/medical-records', async (req, res) => {
  try {
    const medicalRecords = await MedicalRecord.find();
    res.json(medicalRecords);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching medical records', details: error.message });
  }
});


// Route to add a new medical record
router.post('/:petId/medical-records', async (req, res) => {
  try {
    const { recordId, diagnosis, treatment, medications } = req.body;
    if (!recordId || !diagnosis || !treatment || !medications) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const newRecord = new MedicalRecord({
      recordId,
      petId: req.params.petId,
      vetId: uuidv4(),
      diagnosis,
      treatment,
      medications
    });

    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ error: 'Error adding medical record', details: error.message });
  }
});

// Route to update a medical record
router.put('/medical-records/:recordId', async (req, res) => {
  try {
    const updatedRecord = await MedicalRecord.findByIdAndUpdate(
      req.params.recordId,
      req.body,
      { new: true }
    );
    res.json(updatedRecord);
  } catch (error) {
    res.status(500).json({ error: 'Error updating medical record', details: error.message });
  }
});

// Get all vaccinations
router.get('/all/vaccinations', async (req, res) => {
  try {
    const vaccinations = await Vaccination.find();
    res.status(200).json(vaccinations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching vaccinations', error });
  }
});

// Route to get vaccinations for a specific pet
router.get('/:petId/vaccinations', async (req, res) => {
  try {
    const vaccinations = await Vaccination.find({ petId: req.params.petId });
    res.json(vaccinations);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching vaccinations', details: error.message });
  }
});

// Route to add a new vaccination
router.post('/:petId/vaccinations', async (req, res) => {
  try {
    const { vaccinationId, vaccine, dateGiven } = req.body;
    if (!vaccinationId || !vaccine || !dateGiven) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const newVaccination = new Vaccination({
      vaccinationId,
      petId: req.params.petId,
      vetId: uuidv4(),
      vaccine,
      dateGiven
    });

    await newVaccination.save();
    res.status(201).json(newVaccination);
  } catch (error) {
    res.status(500).json({ error: 'Error adding vaccination', details: error.message });
  }
});

// Route to update a vaccination
router.put('/vaccinations/:vaccinationId', async (req, res) => {
  try {
    const updatedVaccination = await Vaccination.findByIdAndUpdate(
      req.params.vaccinationId,
      req.body,
      { new: true }
    );
    res.json(updatedVaccination);
  } catch (error) {
    res.status(500).json({ error: 'Error updating vaccination', details: error.message });
  }
});

// Get all visits
router.get('/all/visits', async (req, res) => {
  try {
    const visits = await Visit.find();
    res.status(200).json(visits);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching visits', error });
  }
});

// Route to add a new visit
router.post('/:petId/visits', async (req, res) => {
  try {
    const { visitId, date, reason } = req.body;
    if (!visitId || !date || !reason) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newVisit = new Visit({
      visitId,
      petId: req.params.petId,
      vetId: uuidv4(),
      date,
      reason
    });

    await newVisit.save();
    res.status(201).json(newVisit);
  } catch (error) {
    res.status(500).json({ error: 'Error adding visit', details: error.message });
  }
});

// Route to get visits for a specific pet
router.get('/:petId/visits', async (req, res) => {
  try {
    const visits = await Visit.find({ petId: req.params.petId });
    res.json(visits);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching visits', details: error.message });
  }
});

// Route to update a visit
router.put('/visits/:visitId', async (req, res) => {
  try {
    const updatedVisit = await Visit.findByIdAndUpdate(
      req.params.visitId,
      req.body,
      { new: true }
    );
    res.json(updatedVisit);
  } catch (error) {
    res.status(500).json({ error: 'Error updating visit', details: error.message });
  }
});

// Additional route to get all medical records by specific petId (new)
router.get('/:petId/medical-records/all', async (req, res) => {
  try {
    const medicalRecords = await MedicalRecord.find({ petId: req.params.petId });
    res.json(medicalRecords);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching medical records', details: error.message });
  }
});

// Additional route to get all vaccinations by specific petId (new)
router.get('/:petId/vaccinations/all', async (req, res) => {
  try {
    const vaccinations = await Vaccination.find({ petId: req.params.petId });
    res.json(vaccinations);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching vaccinations', details: error.message });
  }
});

// Additional route to get all visits by specific petId (new)
router.get('/:petId/visits/all', async (req, res) => {
  try {
    const visits = await Visit.find({ petId: req.params.petId });
    res.json(visits);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching visits', details: error.message });
  }
});

module.exports = router;
