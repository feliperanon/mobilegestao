// backend/routes/analysis.js

const express = require('express');
const router = express.Router();
const History = require('../models/History');

// Obter dados de análise
router.get('/', async (req, res) => {
  try {
    const history = await History.find();
    // Aqui você pode adicionar lógica para análise dos dados
    res.json(history);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
