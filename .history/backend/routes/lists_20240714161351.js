// backend/routes/lists.js

const express = require('express');
const router = express.Router();
const { getEntregadores, getClientes, getStatus } = require('../controllers/listController');

router.get('/entregadores', getEntregadores);
router.get('/clientes', getClientes);
router.get('/status', getStatus);

module.exports = router;
