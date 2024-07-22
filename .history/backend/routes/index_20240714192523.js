const express = require('express');
const router = express.Router();
const deliveryRoutes = require('./delivery');
const listRoutes = require('./list');
const historyRoutes = require('./history');

// Usando as rotas
router.use('/deliveries', deliveryRoutes);
router.use('/lists', listRoutes);
router.use('/history', historyRoutes);

module.exports = router;
