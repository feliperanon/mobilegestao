import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  Button,
} from '@mui/material';
import Navigation from './Navigation';

const Metrics = () => {
  const [metrics, setMetrics] = useState({});
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [entregadores, setEntregadores] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [selectedEntregadores, setSelectedEntregadores] = useState([]);
  const [selectedClientes, setSelectedClientes] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const entregadoresRes = await axios.get('http://localhost:5008/api/lists/entregadores');
        setEntregadores(entregadoresRes.data);
        
        const clientesRes = await axios.get('http://localhost:5008/api/lists/clientes');
        setClientes(clientesRes.data);
      } catch (err) {
        console.error('Erro ao buscar filtros', err);
      }
    };

    fetchFilters();
  }, []);

  const fetchMetrics = async () => {
    try {
      const params = {
        startDate,
        endDate,
        entregadores: selectedEntregadores.join(','),
        clientes: selectedClientes.join(',')
      };
      const response = await axios.get('http://localhost:5008/api/metrics', { params });
      setMetrics(response.data);
    } catch (err) {
      console.error('Erro ao buscar métricas', err);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchMetrics();
  };

  return (
    <Container>
      <Navigation />
      <Typography variant="h4" component="h1" gutterBottom>
        Métricas
      </Typography>
      <Box component="form" onSubmit={handleFilterSubmit} sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Data de Início"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Data de Fim"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          select
          label="Entregadores"
          value={selectedEntregadores}
          onChange={(e) => setSelectedEntregadores(e.target.value)}
          SelectProps={{
            multiple: true,
          }}
          helperText="Selecione um ou mais entregadores"
        >
          {entregadores.map((entregador) => (
            <MenuItem key={entregador._id} value={entregador.nome}>
              {entregador.nome}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Clientes"
          value={selectedClientes}
          onChange={(e) => setSelectedClientes(e.target.value)}
          SelectProps={{
            multiple: true,
          }}
          helperText="Selecione um ou mais clientes"
        >
          {clientes.map((cliente) => (
            <MenuItem key={cliente._id} value={cliente.nome}>
              {cliente.nome}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" color="primary">
          Filtrar
        </Button>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Tempo Ocioso do Entregador
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Entregador</TableCell>
                <TableCell>Tempo Ocioso (min)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(metrics.idleTimes || {}).map(([entregador, idleTime]) => (
                <TableRow key={entregador}>
                  <TableCell>{entregador}</TableCell>
                  <TableCell>{idleTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Quantidade de Entregas por Entregador
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Entregador</TableCell>
                <TableCell>Quantidade de Entregas</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(metrics.deliveryCounts || {}).map(([entregador, count]) => (
                <TableRow key={entregador}>
                  <TableCell>{entregador}</TableCell>
                  <TableCell>{count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Quantidade de Volumes Entregues por Entregador
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Entregador</TableCell>
                <TableCell>Volume Entregue</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(metrics.volumeCounts || {}).map(([entregador, volume]) => (
                <TableRow key={entregador}>
                  <TableCell>{entregador}</TableCell>
                  <TableCell>{volume}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Tempo Total Gasto em Entregas por Entregador
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Entregador</TableCell>
                <TableCell>Tempo Total (min)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(metrics.totalTimes || {}).map(([entregador, totalTime]) => (
                <TableRow key={entregador}>
                  <TableCell>{entregador}</TableCell>
                  <TableCell>{totalTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Cliente com Mais Entregas por Quantidade
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cliente</TableCell>
                <TableCell>Quantidade de Entregas</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(metrics.clientDeliveryCounts || {}).map(([cliente, count]) => (
                <TableRow key={cliente}>
                  <TableCell>{cliente}</TableCell>
                  <TableCell>{count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Cliente que Consome Mais Tempo por Menor Volume
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cliente</TableCell>
                <TableCell>Tempo Médio por Volume (min)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(metrics.clientTimePerVolume || {}).map(([cliente, timePerVolume]) => (
                <TableRow key={cliente}>
                  <TableCell>{cliente}</TableCell>
                  <TableCell>{timePerVolume}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Cliente que Consome Mais Tempo
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cliente</TableCell>
                <TableCell>Tempo Total (min)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(metrics.clientTotalTimes || {}).map(([cliente, totalTime]) => (
                <TableRow key={cliente}>
                  <TableCell>{cliente}</TableCell>
                  <TableCell>{totalTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Cliente que Leva Mais Volumes
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cliente</TableCell>
                <TableCell>Volume Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(metrics.clientVolumes || {}).map(([cliente, volume]) => (
                <TableRow key={cliente}>
                  <TableCell>{cliente}</TableCell>
                  <TableCell>{volume}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Metrics;
