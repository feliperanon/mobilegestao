// backend/controllers/listController.js

const Entregador = require('../models/Entregador');
const Cliente = require('../models/Cliente');
const Status = require('../models/Status');

// Controladores para listar entregadores, clientes e status
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

// Controladores para adicionar entregadores, clientes e status
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
    res.status(500).json({ message: 'Server error' });
  }
};

// Controladores para editar entregadores, clientes e status
const editEntregador = async (req, res) => {
  try {
    const updatedEntregador = await Entregador.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedEntregador);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const editCliente = async (req, res) => {
  try {
    const updatedCliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedCliente);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const editStatus = async (req, res) => {
  try {
    const updatedStatus = await Status.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedStatus);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Controladores para excluir entregadores, clientes e status
const deleteEntregador = async (req, res) => {
  try {
    await Entregador.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Entregador excluído' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteCliente = async (req, res) => {
  try {
    await Cliente.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Cliente excluído' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteStatus = async (req, res) => {
  try {
    await Status.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Status excluído' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Controladores para desativar entregadores, clientes e status
const deactivateEntregador = async (req, res) => {
  try {
    const updatedEntregador = await Entregador.findByIdAndUpdate(req.params.id, { ativo: false }, { new: true });
    res.status(200).json(updatedEntregador);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deactivateCliente = async (req, res) => {
  try {
    const updatedCliente = await Cliente.findByIdAndUpdate(req.params.id, { ativo: false }, { new: true });
    res.status(200).json(updatedCliente);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deactivateStatus = async (req, res) => {
  try {
    const updatedStatus = await Status.findByIdAndUpdate(req.params.id, { ativo: false }, { new: true });
    res.status(200).json(updatedStatus);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { 
  getEntregadores, 
  getClientes, 
  getStatus, 
  addEntregador, 
  addCliente, 
  addStatus, 
  editEntregador, 
  editCliente, 
  editStatus, 
  deleteEntregador, 
  deleteCliente, 
  deleteStatus, 
  deactivateEntregador, 
  deactivateCliente, 
  deactivateStatus 
};
