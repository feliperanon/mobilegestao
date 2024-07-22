import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AddCliente from './components/AddCliente';
import AddEntregador from './components/AddEntregador';
import Metrics from './components/Metrics';
import Navigation from './components/Navigation';

const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-cliente" element={<AddCliente />} />
        <Route path="/add-entregador" element={<AddEntregador />} />
        <Route path="/metrics" element={<Metrics />} />
      </Routes>
    </Router>
  );
};

export default App;
