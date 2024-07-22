// frontend/src/components/RegisterDelivery.js

import React, { useState } from 'react';
import axios from 'axios';

const RegisterDelivery = () => {
  const [entregador, setEntregador] = useState('');
  const [cliente, setCliente] = useState('');
  const [status, setStatus] = useState('');
  const [volume, setVolume] = useState('');
  const [tempoEstimado, setTempoEstimado] = useState('');
  const [iniciado, setIniciado] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newDelivery = {
        entregador,
        cliente,
        status,
        volume,
        tempoEstimado,
        iniciado,
      };
      await axios.post('http://localhost:5000/api/deliveries', newDelivery);
      alert('Entrega cadastrada com sucesso');
    } catch (err) {
      console.error(err);
      alert('Erro ao cadastrar entrega');
    }
  };

  return (
    <div>
      <h2>Cadastrar Entrega</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Entregador:</label>
          <input type="text" value={entregador} onChange={(e) => setEntregador(e.target.value)} required />
        </div>
        <div>
          <label>Cliente:</label>
          <input type="text" value={cliente} onChange={(e) => setCliente(e.target.value)} required />
        </div>
        <div>
          <label>Status:</label>
          <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} required />
        </div>
        <div>
          <label>Volume:</label>
          <input type="number" value={volume} onChange={(e) => setVolume(e.target.value)} required />
        </div>
        <div>
          <label>Tempo Estimado (min):</label>
          <input type="number" value={tempoEstimado} onChange={(e) => setTempoEstimado(e.target.value)} required />
        </div>
        <div>
          <label>Iniciado (Data e Hora):</label>
          <input type="datetime-local" value={iniciado} onChange={(e) => setIniciado(e.target.value)} required />
        </div>
        <button type="submit">Cadastrar Entrega</button>
      </form>
    </div>
  );
};

export default RegisterDelivery;
