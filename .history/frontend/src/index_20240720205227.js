import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Home from './pages/Home';
import History from './pages/History';
import Analysis from './pages/Analysis';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import AddEntregador from './components/AddEntregador';
import AddCliente from './components/AddCliente';
import AddStatus from './components/AddStatus';
import Metrics from './components/Metrics';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/metrics" element={<Metrics />} />
        <Route path="/add-entregador" element={<AddEntregador />} />
        <Route path="/add-cliente" element={<AddCliente />} />
        <Route path="/add-status" element={<AddStatus />} />
      </Routes>
    </Router>
  </ThemeProvider>
);
