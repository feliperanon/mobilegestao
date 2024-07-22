// backend/controllers/deliveryController.js

const Delivery = require('../models/Delivery');

const getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    res.status(200).json(deliveries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createDelivery = async (req, res) => {
  const { entregador, cliente, status, volume, tempoEstimado } = req.body;

  const newDelivery = new Delivery({
    entregador,
    cliente,
    status,
    volume,
    tempoEstimado,
    tempoEmAndamento: 0,
  });

  try {
    const savedDelivery = await newDelivery.save();
    res.status(201).json(savedDelivery);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllDeliveries,
  createDelivery,
};
