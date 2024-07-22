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

router.get('/deliveries', getDeliveries);
router.post('/deliveries', addDelivery);
router.patch('/deliveries/:id/finalize', finalizeDelivery);
router.patch('/deliveries/:id', updateEntregador);
router.delete('/deliveries/:id', deleteDelivery);
router.get('/history', getHistory);

module.exports = router;
