import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home';
import History from './pages/History';
import Metrics from './components/Metrics';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import AddEntregador from './components/AddEntregador';
import AddCliente from './components/AddCliente';
import AddStatus from './components/AddStatus';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/metrics" element={<Metrics />} />
        <Route path="/add-entregador" element={<AddEntregador />} />
        <Route path="/add-cliente" element={<AddCliente />} />
        <Route path="/add-status" element={<AddStatus />} />
      </Routes>
    </Router>
  </ThemeProvider>
);

export default App;
