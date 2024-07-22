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

const addEntregador = async (req, res) => {
  try {
    const existing = await Entregador.findOne({ nome: req.body.nome });
    if (existing) {
      return res.status(400).json({ message: 'Entregador já cadastrado' });
    }
    const newEntregador = new Entregador(req.body);
    await newEntregador.save();
    res.status(201).json(newEntregador);
  } catch (err) {
    console.error(err); // Adicione isto para logar o erro
    res.status(500).json({ message: 'Server error' });
  }
};

const addCliente = async (req, res) => {
  try {
    const existing = await Cliente.findOne({ nome: req.body.nome });
    if (existing) {
      return res.status(400).json({ message: 'Cliente já cadastrado' });
    }
    const newCliente = new Cliente(req.body);
    await newCliente.save();
    res.status(201).json(newCliente);
  } catch (err) {
    console.error(err); // Adicione isto para logar o erro
    res.status(500).json({ message: 'Server error' });
  }
};

const addStatus = async (req, res) => {
  try {
    const existing = await Status.findOne({ nome: req.body.nome });
    if (existing) {
      return res.status(400).json({ message: 'Status já cadastrado' });
    }
    const newStatus = new Status(req.body);
    await newStatus.save();
    res.status(201).json(newStatus);
  } catch (err) {
    console.error(err); // Adicione isto para logar o erro
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getEntregadores, getClientes, getStatus, addEntregador, addCliente, addStatus };
