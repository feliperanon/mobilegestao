const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  entregador: { type: String, required: true },
  cliente: [{ type: String, required: true }],
  status: { type: String, required: true },
  volume: { type: Number, required: true },
  tempoEstimado: { type: Number, required: true },
  tempoEmAndamento: { type: Number, default: 0 },
  iniciado: { type: Date, default: Date.now },
  finalizado: { type: Date },
  isActive: { type: Boolean, default: true }
});

const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;
