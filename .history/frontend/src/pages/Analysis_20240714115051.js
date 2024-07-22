// frontend/src/pages/Analysis.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Analysis = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:5008/api/deliveries'); // Use the correct endpoint
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Análise de Produtividade</h2>
      {/* Renderize os dados conforme necessário */}
    </div>
  );
};

export default Analysis;
