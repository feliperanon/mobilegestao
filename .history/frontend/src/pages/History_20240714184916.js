// frontend/src/pages/History.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const History = () => {
  const [history, setHistory] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchHistory = async (start, end) => {
    try {
      const result = await axios.get('http://localhost:5008/api/deliveries/history', {
        params: {
          startDate: start,
          endDate: end,
        },
      });
      setHistory(result.data);
    } catch (error) {
      console.error('Erro ao buscar histórico', error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleSearch = () => {
    fetchHistory(startDate, endDate);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Histórico de Entregas
      </Typography>
      <nav>
        <Link to="/dashboard">Dashboard</Link> |{' '}
        <Link to="/history">Histórico</Link> |{' '}
        <Link to="/add-entregador">Cadastrar Entregador</Link> |{' '}
        <Link to="/add-cliente">Cadastrar Cliente</Link> |{' '}
        <Link to="/add-status">Cadastrar Status</Link>
      </nav>
      <Box sx={{ mb: 4 }}>
        <TextField
          label="Data Inicial"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ marginRight: 2 }}
        />
        <TextField
          label="Data Final"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ marginRight: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch} sx={{ marginBottom: 2 }}>
          Pesquisar
        </Button>
      </Box>
      {history.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Entregador</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Volume</TableCell>
                <TableCell>Tempo Estimado</TableCell>
                <TableCell>Tempo Final</TableCell>
                <TableCell>Iniciado</TableCell>
                <TableCell>Finalizado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.entregador}</TableCell>
                  <TableCell>{item.cliente.join(', ')}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.volume}</TableCell>
                  <TableCell>{item.tempoEstimado} minutos</TableCell>
                  <TableCell>{item.tempoEmAndamento} minutos</TableCell>
                  <TableCell>{new Date(item.iniciado).toLocaleString()}</TableCell>
                  <TableCell>{new Date(item.finalizado).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>Carregando dados...</p>
      )}
    </Container>
  );
};

export default History;
