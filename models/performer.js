const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const perfomerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  group: {
    type: String,
    required: true
  },
  specialty: [{
    type: String,
    enum: ['singer', 'dancer', 'rapper'],
    required: true,
  }],
  photo: { type: String, required: true },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  bio: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Performer', perfomerSchema);