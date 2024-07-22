// frontend/src/pages/Analysis.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Analysis = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:5000/api/history');
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Análise de Produtividade</h2>
      {/* Renderizando os dados */}
      {data.length > 0 ? (
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
            {data.map((item) => (
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

export default Analysis;
