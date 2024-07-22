const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  entregador: { type: String, required: true },
  cliente: { type: [String], required: true }, // Definido como array de strings
  status: { type: String, required: true },
  volume: { type: Number, required: true },
  tempoEstimado: { type: Number, required: true },
  tempoEmAndamento: { type: Number, default: 0 },
  tempoDecorrido: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  iniciado: { type: Date, default: Date.now },
  finalizado: { type: Date },
});

const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;
