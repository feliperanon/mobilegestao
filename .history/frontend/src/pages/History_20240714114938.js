// frontend/src/pages/History.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const result = await axios.get('http://localhost:5000/api/history');
      setHistory(result.data);
    };
    fetchHistory();
  }, []);

  return (
    <div>
      <h2>Histórico de Entregas</h2>
      {history.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Entregador</th>
              <th>Cliente</th>
              <th>Status</th>
              <th>Volume</th>
              <th>Tempo Decorrido</th>
              <th>Iniciado</th>
              <th>Finalizado</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td>{item.entregador}</td>
                <td>{item.cliente}</td>
                <td>{item.status}</td>
                <td>{item.volume}</td>
                <td>{item.tempoDecorrido}</td>
                <td>{item.iniciado}</td>
                <td>{item.finalizado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Carregando dados...</p>
      )}
    </div>
  );
};

export default History;
