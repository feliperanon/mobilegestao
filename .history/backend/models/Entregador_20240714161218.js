// backend/models/Entregador.js

const mongoose = require('mongoose');

const EntregadorSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Entregador', EntregadorSchema);
