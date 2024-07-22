// backend/controllers/listController.js

const List = require('../models/List');

const getEntregadores = async (req, res) => {
  try {
    const entregadores = await List.find({ type: 'entregador' }).sort({ nome: 1 });
    res.status(200).json(entregadores);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const addEntregador = async (req, res) => {
  try {
    const newEntregador = new List({ nome: req.body.nome, type: 'entregador' });
    await newEntregador.save();
    res.status(201).json(newEntregador);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getClientes = async (req, res) => {
  try {
    const clientes = await List.find({ type: 'cliente' }).sort({ nome: 1 });
    res.status(200).json(clientes);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const addCliente = async (req, res) => {
  try {
    const newCliente = new List({ nome: req.body.nome, type: 'cliente' });
    await newCliente.save();
    res.status(201).json(newCliente);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getStatus = async (req, res) => {
  try {
    const status = await List.find({ type: 'status' }).sort({ nome: 1 });
    res.status(200).json(status);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const addStatus = async (req, res) => {
  try {
    const newStatus = new List({ nome: req.body.nome, type: 'status' });
    await newStatus.save();
    res.status(201).json(newStatus);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getEntregadores, addEntregador, getClientes, addCliente, getStatus, addStatus };
