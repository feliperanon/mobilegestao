// frontend/src/pages/History.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Box,
  Grid
} from '@mui/material';
import Navigation from '../components/Navigation';

const History = () => {
  const [history, setHistory] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const result = await axios.get('http://localhost:5008/api/history');
      setHistory(result.data);
    } catch (err) {
      console.error('Erro ao buscar histórico', err);
    }
  };

  const handleSearch = async () => {
    try {
      const result = await axios.get('http://localhost:5008/api/history', {
        params: {
          startDate,
          endDate,
        },
      });
      setHistory(result.data);
    } catch (err) {
      console.error('Erro ao buscar histórico por período', err);
    }
  };

  return (
    <Container>
      <Navigation />
      <Typography variant="h4" component="h1" gutterBottom>
        Histórico de Entregas
      </Typography>
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={5}>
            <TextField
              label="Data de Início"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField
              label="Data de Fim"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              sx={{ mt: 2 }}
            >
              Buscar
            </Button>
          </Grid>
        </Grid>
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
                  <TableCell>{item.cliente.join(', ')}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.volume}</TableCell>
                  <TableCell>{item.tempoDecorrido}</TableCell>
                  <TableCell>{new Date(item.iniciado).toLocaleString()}</TableCell>
                  <TableCell>{new Date(item.finalizado).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>Carregando dados...</Typography>
      )}
    </Container>
  );
};

export default History;
