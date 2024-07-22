// backend/models/Delivery.js

const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema({
  entregador: {
    type: String,
    required: true,
  },
  cliente: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  volume: {
    type: Number,
    required: true,
  },
  tempoEstimado: {
    type: String,
    required: true,
  },
  tempoEmAndamento: {
    type: String,
    required: true,
  },
  iniciado: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Delivery', DeliverySchema);
