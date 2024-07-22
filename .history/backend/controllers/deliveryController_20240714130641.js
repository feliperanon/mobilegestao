// backend/controllers/deliveryController.js

const Delivery = require('../models/Delivery');

const createDelivery = async (req, res) => {
  const { entregador, cliente, status, volume, tempoEstimado, tempoEmAndamento } = req.body;

  try {
    const newDelivery = new Delivery({
      entregador,
      cliente,
      status,
      volume,
      tempoEstimado,
      tempoEmAndamento,
    });

    const delivery = await newDelivery.save();
    res.json(delivery);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const getDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    res.json(deliveries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = { createDelivery, getDeliveries };
