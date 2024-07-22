// frontend/src/components/Deliveries.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Deliveries = () => {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:5008/api/deliveries');
      setDeliveries(res.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Deliveries</h2>
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

export default Deliveries;
