const mongoose = require('mongoose');

const UtilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('Utility', UtilitySchema);