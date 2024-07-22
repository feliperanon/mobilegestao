// backend/routes/delivery.js

const express = require('express');
const router = express.Router();
const { addDelivery, getDeliveries } = require('../controllers/deliveryController');

// Rota para adicionar uma nova entrega
router.post('/add', addDelivery);

// Rota para listar todas as entregas
router.get('/', getDeliveries);

module.exports = router;
