// backend/routes/delivery.js

const express = require('express');
const router = express.Router();
const { getDeliveries, addDelivery, finalizeDelivery, deleteDelivery, updateEntregador, getHistory } = require('../controllers/deliveryController');

// Rota para obter todas as entregas ativas
router.get('/', getDeliveries);

// Rota para adicionar uma nova entrega
router.post('/', addDelivery);

// Rota para finalizar uma entrega
router.patch('/:id/finalize', finalizeDelivery);

// Rota para excluir uma entrega
router.delete('/:id', deleteDelivery);

// Rota para atualizar o entregador de uma entrega
router.patch('/:id/updateEntregador', updateEntregador);

// Rota para obter o histórico de entregas finalizadas
router.get('/history', getHistory);

module.exports = router;
