const express = require('express');
const router = express.Router();
const { calculateMetrics } = require('../controllers/metricsController');

router.get('/', calculateMetrics);

module.exports = router; // Corrigido para garantir a exportação correta

