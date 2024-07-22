// backend/routes/lists.js

const express = require('express');
const router = express.Router();
const { 
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
} = require('../controllers/listController');
