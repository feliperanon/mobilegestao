// backend/routes/delivery.js

const express = require('express');
const router = express.Router();
const { createDelivery, getDeliveries } = require('../controllers/deliveryController');

router.post('/', createDelivery);
router.get('/', getDeliveries);

module.exports = router;
