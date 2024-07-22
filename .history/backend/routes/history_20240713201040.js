// backend/routes/history.js

const express = require('express');
const router = express.Router();
const History = require('../models/History');

// Obter todo o histórico
router.get('/', async (req, res) => {
  try {
    const history = await History.find();
    res.json(history);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
