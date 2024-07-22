// backend/routes/lists.js

const express = require('express');
const router = express.Router();
const { getEntregadores, addEntregador, getClientes, addCliente, getStatus, addStatus } = require('../controllers/listController');

router.get('/entregadores', getEntregadores);
router.post('/entregadores', addEntregador);
router.get('/clientes', getClientes);
router.post('/clientes', addCliente);
router.get('/status', getStatus);
router.post('/status', addStatus);

module.exports = router;
