// backend/routes/delivery.js

const express = require('express');
const router = express.Router();
const { getDeliveries, addDelivery, finalizeDelivery, deleteDelivery, updateEntregador, getHistory } = require('../controllers/deliveryController');

router.get('/', getDeliveries);
router.post('/', addDelivery);
router.patch('/:id/finalize', finalizeDelivery);
router.delete('/:id', deleteDelivery);
router.patch('/:id/updateEntregador', updateEntregador);
router.get('/history', getHistory);

module.exports = router;
