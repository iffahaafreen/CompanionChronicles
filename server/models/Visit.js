const mongoose = require('mongoose');
const { Schema } = mongoose;

const visitSchema = new Schema({
  visitId: { type: String, required: true, unique: true },
  petId: { type: String, required: true, ref: 'Pet' },
  vetId: { type: String, required: true, ref: 'User' },
  date: { type: Date, required: true },
  reason: { type: String, required: true }
});

module.exports = mongoose.model('Visit', visitSchema);
