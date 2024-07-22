// frontend/src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [entregador, setEntregador] = useState('');
  const [cliente, setCliente] = useState('');
  const [status, setStatus] = useState('');
  const [volume, setVolume] = useState('');
  const [tempoEstimado, setTempoEstimado] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:5008/api/deliveries');
      setDeliveries(res.data);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5008/api/deliveries', {
        entregador,
        cliente,
        status,
        volume,
        tempoEstimado,
      });
      setDeliveries([res.data, ...deliveries]);
      setEntregador('');
      setCliente('');
      setStatus('');
      setVolume('');
      setTempoEstimado('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
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
        <button type="submit">Adicionar Entrega</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Entregador</th>
            <th>Cliente</th>
            <th>Status</th>
            <th>Volume</th>
            <th>Tempo Estimado</th>
            <th>Tempo Em Andamento</th>
            <th>Iniciado</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery) => (
            <tr key={delivery._id}>
              <td>{delivery.entregador}</td>
              <td>{delivery.cliente}</td>
              <td>{delivery.status}</td>
              <td>{delivery.volume}</td>
              <td>{delivery.tempoEstimado}</td>
              <td>{delivery.tempoEmAndamento}</td>
              <td>{new Date(delivery.iniciado).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
