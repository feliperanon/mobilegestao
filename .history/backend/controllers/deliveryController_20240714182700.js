// backend/controllers/deliveryController.js

const Delivery = require('../models/Delivery');

const getDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find({ isActive: true }).sort({ iniciado: -1 });
    res.status(200).json(deliveries);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const addDelivery = async (req, res) => {
  const { entregador, cliente, status, volume, tempoEstimado } = req.body;
  try {
    const existingDelivery = await Delivery.findOne({ entregador, isActive: true });
    if (existingDelivery) {
      return res.status(400).json({ message: 'Entregador já está em uma rotina ativa' });
    }
    const tempoEmAndamento = 0;
    const newDelivery = new Delivery({ entregador, cliente, status, volume, tempoEstimado, tempoEmAndamento });
    await newDelivery.save();
    res.status(201).json(newDelivery);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const finalizeDelivery = async (req, res) => {
  try {
    const updatedDelivery = await Delivery.findByIdAndUpdate(
      req.params.id,
      { isActive: false, finalizado: new Date() },
      { new: true }
    );
    res.status(200).json(updatedDelivery);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteDelivery = async (req, res) => {
  try {
    await Delivery.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Entrega excluída' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateEntregador = async (req, res) => {
  try {
    const { entregador } = req.body;
    const updatedDelivery = await Delivery.findByIdAndUpdate(req.params.id, { entregador }, { new: true });
    res.status(200).json(updatedDelivery);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getHistory = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let query = { isActive: false };

    if (startDate && endDate) {
      query.finalizado = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const history = await Delivery.find(query).sort({ finalizado: -1 });
    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getDeliveries, addDelivery, finalizeDelivery, deleteDelivery, updateEntregador, getHistory };
