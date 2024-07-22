const Delivery = require('../models/Delivery');

const calculateMetrics = async (req, res) => {
  try {
    const { startDate, endDate, entregadores, clientes, status } = req.query;

    const query = { isActive: false };
    if (startDate) query.finalizado = { $gte: new Date(startDate) };
    if (endDate) query.finalizado = { ...query.finalizado, $lte: new Date(endDate) };
    if (entregadores) query.entregador = { $in: entregadores.split(',') };
    if (clientes) query.cliente = { $in: clientes.split(',') };
    if (status) query.status = { $in: status.split(',') };

    const deliveries = await Delivery.find(query);

    const metrics = {
      idleTimes: {},
      deliveryCounts: {},
      volumeCounts: {},
      totalTimes: {},
      clientDeliveryCounts: {},
      clientTimePerVolume: {},
      clientTotalTimes: {},
      clientVolumes: {},
    };

    deliveries.forEach((delivery) => {
      const { entregador, cliente, volume, tempoDecorrido, iniciado, finalizado } = delivery;
      const duration = (new Date(finalizado) - new Date(iniciado)) / 60000;

      // Tempo Ocioso do Entregador
      if (!metrics.idleTimes[entregador]) {
        metrics.idleTimes[entregador] = [];
      }
      if (metrics.idleTimes[entregador].length > 0) {
        const lastEndTime = metrics.idleTimes[entregador][metrics.idleTimes[entregador].length - 1].endTime;
        const idleTime = (new Date(iniciado) - new Date(lastEndTime)) / 60000;
        metrics.idleTimes[entregador].push({ startTime: lastEndTime, endTime: new Date(iniciado), idleTime });
      }
      metrics.idleTimes[entregador].push({ startTime: new Date(iniciado), endTime: new Date(finalizado), idleTime: 0 });

      // Quantidade de Entregas por Entregador
      metrics.deliveryCounts[entregador] = (metrics.deliveryCounts[entregador] || 0) + 1;

      // Quantidade de Volumes Entregues por Entregador
      metrics.volumeCounts[entregador] = (metrics.volumeCounts[entregador] || 0) + volume;

      // Tempo Total Gasto em Entregas por Entregador
      metrics.totalTimes[entregador] = (metrics.totalTimes[entregador] || 0) + duration;

      // Cliente com Mais Entregas por Quantidade
      metrics.clientDeliveryCounts[cliente] = (metrics.clientDeliveryCounts[cliente] || 0) + 1;

      // Cliente que Consome Mais Tempo por Menor Volume
      metrics.clientTimePerVolume[cliente] = metrics.clientTimePerVolume[cliente] || { totalVolume: 0, totalTime: 0 };
      metrics.clientTimePerVolume[cliente].totalVolume += volume;
      metrics.clientTimePerVolume[cliente].totalTime += duration;

      // Cliente que Consome Mais Tempo
      metrics.clientTotalTimes[cliente] = (metrics.clientTotalTimes[cliente] || 0) + duration;

      // Cliente que Leva Mais Volumes
      metrics.clientVolumes[cliente] = (metrics.clientVolumes[cliente] || 0) + volume;
    });

    // Processar Tempo Ocioso Total por Entregador
    for (const entregador in metrics.idleTimes) {
      metrics.idleTimes[entregador] = metrics.idleTimes[entregador].reduce((total, record) => total + record.idleTime, 0);
    }

    // Cliente que Consome Mais Tempo por Menor Volume
    for (const cliente in metrics.clientTimePerVolume) {
      metrics.clientTimePerVolume[cliente] = metrics.clientTimePerVolume[cliente].totalTime / metrics.clientTimePerVolume[cliente].totalVolume;
    }

    res.status(200).json(metrics);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { calculateMetrics };
