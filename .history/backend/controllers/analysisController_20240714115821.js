// backend/controllers/analysisController.js

const Delivery = require('../models/Delivery'); // Certifique-se de ter um modelo de Delivery

const getAnalysis = async (req, res) => {
  try {
    const data = await Delivery.find(); // Ajuste conforme necessário para obter os dados de análise
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAnalysis };
