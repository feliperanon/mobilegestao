// backend/models/Cliente.js

const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true,
  },
  ativo: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Cliente', ClienteSchema);
