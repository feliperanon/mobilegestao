// frontend/src/pages/History.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const res = await axios.get('http://localhost:5000/api/history');
      setHistory(res.data);
    };
    fetchHistory();
  }, []);

  return (
    <div>
      <h1>History</h1>
      <ul>
        {history.map((entry) => (
          <li key={entry.id}>
            {entry.entregador} - {entry.cliente} - Volume: {entry.volume} - Status: {entry.status} - Tempo Final: {entry.tempoFinal}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
