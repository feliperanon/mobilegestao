// backend/controllers/listController.js

const Entregador = require('../models/Entregador');
const Cliente = require('../models/Cliente');
const Status = require('../models/Status');

// Funções para Entregadores
const getEntregadores = async (req, res) => {
  try {
    const entregadores = await Entregador.find().sort({ nome: 1 });
    res.status(200).json(entregadores);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar entregadores' });
  }
};

const addEntregador = async (req, res) => {
  const { nome } = req.body;
  try {
    const novoEntregador = new Entregador({ nome });
    await novoEntregador.save();
    res.status(201).json(novoEntregador);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao adicionar entregador' });
  }
};

const editEntregador = async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  try {
    const entregador = await Entregador.findByIdAndUpdate(id, { nome }, { new: true });
    res.status(200).json(entregador);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao editar entregador' });
  }
};

const deleteEntregador = async (req, res) => {
  const { id } = req.params;
  try {
    await Entregador.findByIdAndDelete(id);
    res.status(200).json({ message: 'Entregador excluído' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir entregador' });
  }
};

const deactivateEntregador = async (req, res) => {
  const { id } = req.params;
  try {
    const entregador = await Entregador.findByIdAndUpdate(id, { ativo: false }, { new: true });
    res.status(200).json(entregador);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao desativar entregador' });
  }
};

// Funções para Clientes
const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find().sort({ nome: 1 });
    res.status(200).json(clientes);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar clientes' });
  }
};

const addCliente = async (req, res) => {
  const { nome } = req.body;
  try {
    const novoCliente = new Cliente({ nome });
    await novoCliente.save();
    res.status(201).json(novoCliente);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao adicionar cliente' });
  }
};

const editCliente = async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  try {
    const cliente = await Cliente.findByIdAndUpdate(id, { nome }, { new: true });
    res.status(200).json(cliente);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao editar cliente' });
  }
};

const deleteCliente = async (req, res) => {
  const { id } = req.params;
  try {
    await Cliente.findByIdAndDelete(id);
    res.status(200).json({ message: 'Cliente excluído' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir cliente' });
  }
};

const deactivateCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await Cliente.findByIdAndUpdate(id, { ativo: false }, { new: true });
    res.status(200).json(cliente);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao desativar cliente' });
  }
};

// Funções para Status
const getStatus = async (req, res) => {
  try {
    const statusList = await Status.find().sort({ nome: 1 });
    res.status(200).json(statusList);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar status' });
  }
};

const addStatus = async (req, res) => {
  const { nome } = req.body;
  try {
    const novoStatus = new Status({ nome });
    await novoStatus.save();
    res.status(201).json(novoStatus);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao adicionar status' });
  }
};

const editStatus = async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  try {
    const status = await Status.findByIdAndUpdate(id, { nome }, { new: true });
    res.status(200).json(status);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao editar status' });
  }
};

const deleteStatus = async (req, res) => {
  const { id } = req.params;
  try {
    await Status.findByIdAndDelete(id);
    res.status(200).json({ message: 'Status excluído' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao excluir status' });
  }
};

const deactivateStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const status = await Status.findByIdAndUpdate(id, { ativo: false }, { new: true });
    res.status(200).json(status);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao desativar status' });
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
