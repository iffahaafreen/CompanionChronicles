const mongoose = require('mongoose');
const { Schema } = mongoose;

const medicalRecordSchema = new Schema({
  recordId: { type: String, required: true, unique: true },
  petId: { type: String, required: true, ref: 'Pet' },
  vetId: { type: String, required: true, ref: 'User' },
  diagnosis: { type: String, required: true },
  treatment: { type: String, required: true },
  medications: [
    {
      name: { type: String, required: true },
      dosage: { type: String, required: true }
    }
  ]
});

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);
