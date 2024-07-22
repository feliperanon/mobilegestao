// frontend/src/pages/Analysis.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Analysis = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5008/api/analysis');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Analysis</h2>
      <table>
        <thead>
          <tr>
            <th>Entregador</th>
            <th>Cliente</th>
            <th>Status</th>
            <th>Volume</th>
            <th>Tempo Estimado</th>
            <th>Tempo Final</th>
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
              <td>{item.tempoEstimado}</td>
              <td>{item.tempoFinal}</td>
              <td>{item.iniciado}</td>
              <td>{item.finalizado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Analysis;
