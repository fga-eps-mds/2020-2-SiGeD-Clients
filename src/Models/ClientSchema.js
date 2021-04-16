const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true],
  },
  cpf: {
    type: String,
    require: [true],
    unique: [true],
  },
  email: {
    type: String,
    require: [true],
    unique: [true],
  },
  phone: {
    type: String,
    require: [true],
  },
  secondaryPhone: {
    type: String,
    require: [true],
  },
  office: {
    type: String,
    require: [true],
  },
  location: {
    type: String,
    require: [true],
  },
  address: {
    type: String,
    require: [true],
  },
  active: {
    type: Boolean,
    require: [false],
    default: true,
  },
  createdAt: {
    type: Date,
    require: true,
  },
  updatedAt: {
    type: Date,
    require: true,
  },
});

module.exports = mongoose.model('Client', clientSchema);
