// backend/controllers/deliveryController.js

const Delivery = require('../models/Delivery');

const createDelivery = async (req, res) => {
  const { entregador, cliente, status, volume, tempoEstimado, iniciado } = req.body;
  try {
    const newDelivery = new Delivery({ entregador, cliente, status, volume, tempoEstimado, iniciado });
    await newDelivery.save();
    res.status(201).json(newDelivery);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    res.status(200).json(deliveries);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createDelivery, getDeliveries };
