// backend/routes/delivery.js

const express = require('express');
const router = express.Router();
const { getAllDeliveries, createDelivery } = require('../controllers/deliveryController');

router.get('/', getAllDeliveries);
router.post('/', createDelivery);

module.exports = router;
