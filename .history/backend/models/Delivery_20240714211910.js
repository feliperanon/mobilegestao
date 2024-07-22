const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  entregador: String,
  cliente: [String],
  status: String,
  volume: Number,
  tempoEstimado: Number,
  tempoEmAndamento: Number,
  tempoDecorrido: Number, // Adicione este campo
  isActive: Boolean,
  iniciado: Date,
  finalizado: Date,
});

const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;
