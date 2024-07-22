const express = require('express');
const router = express.Router();
const Delivery = require('../models/Delivery');

// Rota para buscar histórico de entregas finalizadas
router.get('/', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let query = { isActive: false };

    if (startDate && endDate) {
      query.finalizado = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      query.finalizado = {
        $gte: today,
        $lt: tomorrow
      };
    }

    const history = await Delivery.find(query).sort({ finalizado: -1 });
    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
