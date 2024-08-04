const mongoose = require('mongoose');
const { Schema } = mongoose;

const petSchema = new Schema({
  petId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  species: { type: String, required: true },
  age: { type: Number, required: true },
  ownerId: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = mongoose.model('Pet', petSchema);
