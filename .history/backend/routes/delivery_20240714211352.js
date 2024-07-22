// backend/routes/delivery.js

const express = require('express');
const router = express.Router();
const {
  getDeliveries,
  addDelivery,
  finalizeDelivery,
  deleteDelivery,
  updateEntregador,
  getHistory,
} = require('../controllers/deliveryController');

router.get('/', getDeliveries);
router.post('/', addDelivery);
router.patch('/:id/finalize', finalizeDelivery);
router.patch('/:id', updateEntregador);
router.delete('/:id', deleteDelivery);
router.get('/history', getHistory);

module.exports = router;
