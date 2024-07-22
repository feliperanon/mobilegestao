const Delivery = require('../models/Delivery');

const calculateMetrics = async (req, res) => {
  try {
    const deliveries = await Delivery.find({ isActive: false });

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

      if (!metrics.idleTimes[entregador]) {
        metrics.idleTimes[entregador] = [];
      }
      if (metrics.idleTimes[entregador].length > 0) {
        const lastEndTime = metrics.idleTimes[entregador][metrics.idleTimes[entregador].length - 1].endTime;
        const idleTime = (new Date(iniciado) - new Date(lastEndTime)) / 60000;
        metrics.idleTimes[entregador].push({ startTime: lastEndTime, endTime: new Date(iniciado), idleTime });
      }
      metrics.idleTimes[entregador].push({ startTime: new Date(iniciado), endTime: new Date(finalizado), idleTime: 0 });

      metrics.deliveryCounts[entregador] = (metrics.deliveryCounts[entregador] || 0) + 1;
      metrics.volumeCounts[entregador] = (metrics.volumeCounts[entregador] || 0) + volume;
      metrics.totalTimes[entregador] = (metrics.totalTimes[entregador] || 0) + duration;
      metrics.clientDeliveryCounts[cliente] = (metrics.clientDeliveryCounts[cliente] || 0) + 1;
      metrics.clientTimePerVolume[cliente] = metrics.clientTimePerVolume[cliente] || { totalVolume: 0, totalTime: 0 };
      metrics.clientTimePerVolume[cliente].totalVolume += volume;
      metrics.clientTimePerVolume[cliente].totalTime += duration;
      metrics.clientTotalTimes[cliente] = (metrics.clientTotalTimes[cliente] || 0) + duration;
      metrics.clientVolumes[cliente] = (metrics.clientVolumes[cliente] || 0) + volume;
    });

    for (const entregador in metrics.idleTimes) {
      metrics.idleTimes[entregador] = metrics.idleTimes[entregador].reduce((total, record) => total + record.idleTime, 0);
    }

    for (const cliente in metrics.clientTimePerVolume) {
      metrics.clientTimePerVolume[cliente] = metrics.clientTimePerVolume[cliente].totalTime / metrics.clientTimePerVolume[cliente].totalVolume;
    }

    res.status(200).json(metrics);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { calculateMetrics };
