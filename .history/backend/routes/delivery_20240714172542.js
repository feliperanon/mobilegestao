// backend/routes/delivery.js

const express = require('express');
const router = express.Router();
const { getDeliveries, addDelivery, finalizeDelivery, deleteDelivery, updateEntregador } = require('../controllers/deliveryController');

// Rota para obter todas as entregas
router.get('/', getDeliveries);

// Rota para adicionar uma nova entrega
router.post('/', addDelivery);

// Rota para finalizar uma entrega
router.patch('/:id/finalize', finalizeDelivery);

// Rota para excluir uma entrega
router.delete('/:id', deleteDelivery);

// Rota para atualizar o entregador
router.patch('/:id/updateEntregador', updateEntregador);

module.exports = router;
