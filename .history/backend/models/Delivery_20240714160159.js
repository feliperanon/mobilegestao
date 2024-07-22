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
    type: Number,
    required: true,
  },
  tempoEmAndamento: {
    type: Number,
    required: true,
  },
  iniciado: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Delivery', DeliverySchema);
