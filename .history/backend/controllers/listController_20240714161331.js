// backend/controllers/listController.js

const Entregador = require('../models/Entregador');
const Cliente = require('../models/Cliente');
const Status = require('../models/Status');

const getEntregadores = async (req, res) => {
  try {
    const entregadores = await Entregador.find().sort({ nome: 1 });
    res.status(200).json(entregadores);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find().sort({ nome: 1 });
    res.status(200).json(clientes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getStatus = async (req, res) => {
  try {
    const statusList = await Status.find().sort({ nome: 1 });
    res.status(200).json(statusList);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getEntregadores, getClientes, getStatus };
