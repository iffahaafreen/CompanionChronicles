const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid'); // Import uuid

const userSchema = new Schema({
  userId: { type: String, required: true, unique: true, default: uuidv4 }, // Set default to uuid
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['vet', 'parent'] },
});

module.exports = mongoose.model('User', userSchema);
