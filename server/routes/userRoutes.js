const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Pet = require('../models/Pet');
const MedicalRecord = require('../models/MedicalRecord');
const Vaccination = require('../models/Vaccination');
const Visit = require('../models/Visit');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');

// Register route
router.post('/register', async (req, res) => {
  const { name, email, role, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ name, email, role, password: hashedPassword });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error); // Log the error
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Create a JWT token
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, role: user.role });
  } catch (error) {
    console.error('Error logging in user:', error); // Log the error
    res.status(500).json({ error: 'Error logging in user' });
  }
});

// Route to get the current authenticated user
/*router.get('/me/pets', async (req, res) => {
  try {
    const user = req.user; // Get the authenticated user from middleware
    const pets = await Pet.find({ ownerId: user.userId }); // Fetch pets owned by this user
    res.json(pets);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching pets', details: error.message });
  }
});

// Route to get a specific pet by ID for the authenticated user
router.get('/me/pets/:petId', async (req, res) => {
  console.log('Fetching pet with ID:', req.params.petId); // Log the petId
  try {
    const pet = await Pet.findOne({ petId: req.params.petId });
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    res.json(pet);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching pet details', details: error.message });
  }
});


// Route to get medical records for a specific pet
router.get('/me/pets/:petId/medical-records', async (req, res) => {
  try {
    const medicalRecords = await MedicalRecord.find({ petId: req.params.petId });
    res.json(medicalRecords);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching medical records', details: error.message });
  }
});

// Route to get vaccinations for a specific pet
router.get('/me/pets/:petId/vaccinations', async (req, res) => {
  try {
    const vaccinations = await Vaccination.find({ petId: req.params.petId });
    res.json(vaccinations);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching vaccinations', details: error.message });
  }
});

// Route to get visits for a specific pet
router.get('/me/pets/:petId/visits', async (req, res) => {
  try {
    const visits = await Visit.find({ petId: req.params.petId });
    res.json(visits);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching visits', details: error.message });
  }
});
*/

module.exports = router;
