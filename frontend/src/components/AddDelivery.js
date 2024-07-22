// frontend/src/components/AddDelivery.js

import React, { useState } from 'react';
import axios from 'axios';

const AddDelivery = () => {
  const [entregador, setEntregador] = useState('');
  const [cliente, setCliente] = useState('');
  const [status, setStatus] = useState('');
  const [volume, setVolume] = useState('');
  const [tempoEstimado, setTempoEstimado] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5008/api/deliveries/add', {
        entregador,
        cliente,
        status,
        volume,
        tempoEstimado,
      });
      console.log(res.data);
      alert('Delivery added successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to add delivery');
    }
  };

  return (
    <div>
      <h2>Add Delivery</h2>
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
          <label>Tempo Estimado:</label>
          <input type="number" value={tempoEstimado} onChange={(e) => setTempoEstimado(e.target.value)} required />
        </div>
        <button type="submit">Add Delivery</button>
      </form>
    </div>
  );
};

export default AddDelivery;
