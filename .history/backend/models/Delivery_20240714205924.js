const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  entregador: String,
  cliente: String,
  status: String,
  volume: Number,
  tempoEstimado: Number,
  iniciado: { type: Date, default: Date.now },
  finalizado: Date,
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Delivery', deliverySchema);
