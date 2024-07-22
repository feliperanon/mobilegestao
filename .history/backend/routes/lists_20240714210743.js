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

router.get('/entregadores', getEntregadores);
router.get('/clientes', getClientes);
router.get('/status', getStatus);

router.post('/entregadores', addEntregador);
router.post('/clientes', addCliente);
router.post('/status', addStatus);

router.put('/entregadores/:id', editEntregador);
router.put('/clientes/:id', editCliente);
router.put('/status/:id', editStatus);

router.delete('/entregadores/:id', deleteEntregador);
router.delete('/clientes/:id', deleteCliente);
router.delete('/status/:id', deleteStatus);

router.patch('/entregadores/:id/deactivate', deactivateEntregador);
router.patch('/clientes/:id/deactivate', deactivateCliente);
router.patch('/status/:id/deactivate', deactivateStatus);

module.exports = router;
