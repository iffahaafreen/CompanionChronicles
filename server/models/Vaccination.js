const mongoose = require('mongoose');
const { Schema } = mongoose;

const vaccinationSchema = new Schema({
  vaccinationId: { type: String, required: true, unique: true },
  petId: { type: String, required: true, ref: 'Pet' },
  vetId: { type: String, required: true, ref: 'User' },
  vaccine: { type: String, required: true },
  dateGiven: { type: Date, required: true }
});

module.exports = mongoose.model('Vaccination', vaccinationSchema);
