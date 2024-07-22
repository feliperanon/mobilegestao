import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../components/Navigation';
import { Container, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';

const History = () => {
  const [history, setHistory] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const result = await axios.get('http://localhost:5008/api/deliveries/history');
        setHistory(result.data);
      } catch (err) {
        console.error('Erro ao buscar histórico', err);
      }
    };
    fetchHistory();
  }, []);

  const handleSearch = async () => {
    try {
      const result = await axios.get('http://localhost:5008/api/deliveries/history', {
        params: { startDate, endDate }
      });
      setHistory(result.data);
    } catch (err) {
      console.error('Erro ao buscar histórico', err);
    }
  };

  return (
    <Container>
      <Navigation />
      <Typography variant="h4" component="h1" gutterBottom>
        Histórico de Entregas
      </Typography>
      <Box sx={{ mb: 4 }}>
        <TextField
          label="Data Inicial"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Data Final"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Buscar
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
                <TableCell>Tempo Decorrido</TableCell>
                <TableCell>Iniciado</TableCell>
                <TableCell>Finalizado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.entregador}</TableCell>
                  <TableCell>{Array.isArray(item.cliente) ? item.cliente.join(', ') : item.cliente}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.volume}</TableCell>
                  <TableCell>{item.tempoDecorrido} min</TableCell>
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
