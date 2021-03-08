const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true],
  },
  cpf: {
    type: String,
    require: [true],
  },
  email: {
    type: String,
    require: [true],
  },
  phone: {
    type: String,
    require: [true],
  },
  office: {
    type: String,
    require: [true],
  },
  policeStation: {
    type: String,
    require: [true],
  },
  city: {
    type: String,
    require: [true],
  },
  active: {
    type: Boolean,
    require: [false],
    default: true,
  },
});

clientSchema.set('timestamps', true);
module.exports = mongoose.model('Client', clientSchema);
