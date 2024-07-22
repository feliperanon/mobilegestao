// frontend/src/pages/Analysis.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Analysis = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:5000/api/analysis');
      setData(res.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Analysis</h1>
      {/* Aqui você pode adicionar gráficos e outras análises */}
    </div>
  );
};

export default Analysis;
