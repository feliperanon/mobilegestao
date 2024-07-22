// backend/routes/lists.js

const express = require('express');
const router = express.Router();
const { getEntregadores, getClientes, getStatus, addEntregador, addCliente, addStatus } = require('../controllers/listController');

router.get('/entregadores', getEntregadores);
router.get('/clientes', getClientes);
router.get('/status', getStatus);

router.post('/entregadores', addEntregador);
router.post('/clientes', addCliente);
router.post('/status', addStatus);

module.exports = router;
