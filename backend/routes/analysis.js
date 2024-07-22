// backend/routes/analysis.js

const express = require('express');
const router = express.Router();
const { getAnalysis } = require('../controllers/analysisController');

// Rota de Análise
router.get('/', getAnalysis);

module.exports = router;
