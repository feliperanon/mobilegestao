// frontend/src/components/Dashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    const fetchDeliveries = async () => {
      const res = await axios.get('http://localhost:5000/api/deliveries');
      setDeliveries(res.data);
    };
    fetchDeliveries();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {deliveries.map((delivery) => (
          <li key={delivery.id}>
            {delivery.entregador} - {delivery.cliente} - Volume: {delivery.volume} - Status: {delivery.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
