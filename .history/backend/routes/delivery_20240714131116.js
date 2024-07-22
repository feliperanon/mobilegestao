// backend/routes/delivery.js

const express = require('express');
const router = express.Router();
const { getDeliveries, addDelivery } = require('../controllers/deliveryController');

// Rota para obter todas as entregas
router.get('/', getDeliveries);

// Rota para adicionar uma nova entrega
router.post('/', addDelivery);

module.exports = router;
