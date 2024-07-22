// backend/routes/deliveries.js

const express = require('express');
const router = express.Router();
const Delivery = require('../models/Delivery');

// Obter todas as entregas
router.get('/', async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    res.json(deliveries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Criar nova entrega
router.post('/', async (req, res) => {
  const { entregador, cliente, volume, status } = req.body;

  try {
    const newDelivery = new Delivery({
      entregador,
      cliente,
      volume,
      status
    });

    const delivery = await newDelivery.save();
    res.json(delivery);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
