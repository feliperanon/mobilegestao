// backend/models/Status.js

const mongoose = require('mongoose');

const StatusSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Status', StatusSchema);
