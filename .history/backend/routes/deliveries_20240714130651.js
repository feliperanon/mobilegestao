// backend/routes/delivery.js

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { createDelivery, getDeliveries } = require('../controllers/deliveryController');

// Rotas de entrega
router.post('/', auth, createDelivery);
router.get('/', auth, getDeliveries);

module.exports = router;
