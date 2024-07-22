// backend/controllers/metricsController.js

const Delivery = require('../models/Delivery');

const getMetrics = async (req, res) => {
  try {
    const deliveries = await Delivery.find({ isActive: false });

    const idleTimes = {};
    const deliveryCounts = {};
    const volumeCounts = {};
    const totalTimes = {};
    const clientDeliveryCounts = {};
    const clientTimePerVolume = {};
    const clientTotalTimes = {};
    const clientVolumes = {};

    deliveries.forEach((delivery) => {
      // Tempo Ocioso do Entregador
      if (idleTimes[delivery.entregador]) {
        idleTimes[delivery.entregador] += delivery.tempoDecorrido;
      } else {
        idleTimes[delivery.entregador] = delivery.tempoDecorrido;
      }

      // Quantidade de Entregas por Entregador
      deliveryCounts[delivery.entregador] = (deliveryCounts[delivery.entregador] || 0) + 1;

      // Quantidade de Volumes Entregues por Entregador
      volumeCounts[delivery.entregador] = (volumeCounts[delivery.entregador] || 0) + delivery.volume;

      // Tempo Total Gasto em Entregas por Entregador
      totalTimes[delivery.entregador] = (totalTimes[delivery.entregador] || 0) + delivery.tempoDecorrido;

      // Cliente com Mais Entregas por Quantidade
      clientDeliveryCounts[delivery.cliente] = (clientDeliveryCounts[delivery.cliente] || 0) + 1;

      // Cliente que Consome Mais Tempo por Menor Volume
      clientTimePerVolume[delivery.cliente] = (clientTimePerVolume[delivery.cliente] || 0) + (delivery.tempoDecorrido / delivery.volume);

      // Cliente que Consome Mais Tempo
      clientTotalTimes[delivery.cliente] = (clientTotalTimes[delivery.cliente] || 0) + delivery.tempoDecorrido;

      // Cliente que Leva Mais Volumes
      clientVolumes[delivery.cliente] = (clientVolumes[delivery.cliente] || 0) + delivery.volume;
    });

    res.status(200).json({
      idleTimes,
      deliveryCounts,
      volumeCounts,
      totalTimes,
      clientDeliveryCounts,
      clientTimePerVolume,
      clientTotalTimes,
      clientVolumes,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getMetrics };
