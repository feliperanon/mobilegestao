// frontend/src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeliveryForm from './forms/DeliveryForm';
import DeliveryTable from './tables/DeliveryTable';

const Dashboard = () => {
  const [deliveries, setDeliveries] = useState([]);

  const fetchDeliveries = async () => {
    const res = await axios.get('http://localhost:5008/api/deliveries');
    setDeliveries(res.data);
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <DeliveryForm fetchDeliveries={fetchDeliveries} />
      <DeliveryTable deliveries={deliveries} />
    </div>
  );
};

export default Dashboard;
