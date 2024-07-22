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
  Grid,
} from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Navigation from './Navigation';

// Registre os componentes necessários do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Metrics = () => {
  const [metrics, setMetrics] = useState({});
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [entregadores, setEntregadores] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [selectedEntregadores, setSelectedEntregadores] = useState([]);
  const [selectedClientes, setSelectedClientes] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const entregadoresRes = await axios.get('http://localhost:5008/api/lists/entregadores');
        setEntregadores(entregadoresRes.data);

        const clientesRes = await axios.get('http://localhost:5008/api/lists/clientes');
        setClientes(clientesRes.data);

        const statusRes = await axios.get('http://localhost:5008/api/lists/status');
        setStatusList(statusRes.data);
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
        clientes: selectedClientes.join(','),
        status: selectedStatus.join(','),
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

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.round(minutes % 60);
    return `${hours ? `${hours}h ` : ''}${remainingMinutes}min`;
  };

  const sortedEntries = (data) => {
    if (!data) return [];
    return Object.entries(data).sort(([, a], [, b]) => b - a);
  };

  const totalSum = (data) => {
    if (!data) return 0;
    return Object.values(data).reduce((sum, value) => sum + value, 0);
  };

  const createChartData = (data, label) => {
    if (!data) return { labels: [], datasets: [] };
    const labels = Object.keys(data);
    const values = Object.values(data);
    return {
      labels,
      datasets: [
        {
          label,
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <Container>
      <Navigation />
      <Typography variant="h4" component="h1" gutterBottom>
        Métricas
      </Typography>
      <Box component="form" onSubmit={handleFilterSubmit} sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              select
              label="Entregadores"
              value={selectedEntregadores}
              onChange={(e) => setSelectedEntregadores(e.target.value)}
              SelectProps={{
                multiple: true,
              }}
              helperText="Selecione um ou mais entregadores"
              fullWidth
            >
              {entregadores.map((entregador) => (
                <MenuItem key={entregador._id} value={entregador.nome}>
                  {entregador.nome}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              select
              label="Clientes"
              value={selectedClientes}
              onChange={(e) => setSelectedClientes(e.target.value)}
              SelectProps={{
                multiple: true,
              }}
              helperText="Selecione um ou mais clientes"
              fullWidth
            >
              {clientes.map((cliente) => (
                <MenuItem key={cliente._id} value={cliente.nome}>
                  {cliente.nome}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              select
              label="Status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              SelectProps={{
                multiple: true,
              }}
              helperText="Selecione um ou mais status"
              fullWidth
            >
              {statusList.map((status) => (
                <MenuItem key={status._id} value={status.nome}>
                  {status.nome}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <TextField
              label="Data de Início"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              label="Data de Fim"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Filtrar
            </Button>
          </Grid>
        </Grid>
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
              {sortedEntries(metrics.idleTimes).map(([entregador, idleTime]) => (
                <TableRow key={entregador}>
                  <TableCell>{entregador}</TableCell>
                  <TableCell>{formatTime(idleTime)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell><strong>Total</strong></TableCell>
                <TableCell><strong>{formatTime(totalSum(metrics.idleTimes))}</strong></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Bar data={createChartData(metrics.idleTimes, 'Tempo Ocioso (min)')} />
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
              {sortedEntries(metrics.deliveryCounts).map(([entregador, count]) => (
                <TableRow key={entregador}>
                  <TableCell>{entregador}</TableCell>
                  <TableCell>{count}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell><strong>Total</strong></TableCell>
                <TableCell><strong>{totalSum(metrics.deliveryCounts)}</strong></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Bar data={createChartData(metrics.deliveryCounts, 'Quantidade de Entregas')} />
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
              {sortedEntries(metrics.volumeCounts).map(([entregador, volume]) => (
                <TableRow key={entregador}>
                  <TableCell>{entregador}</TableCell>
                  <TableCell>{volume}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell><strong>Total</strong></TableCell>
                <TableCell><strong>{totalSum(metrics.volumeCounts)}</strong></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Bar data={createChartData(metrics.volumeCounts, 'Volume Entregue')} />
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
              {sortedEntries(metrics.totalTimes).map(([entregador, totalTime]) => (
                <TableRow key={entregador}>
                  <TableCell>{entregador}</TableCell>
                  <TableCell>{formatTime(totalTime)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell><strong>Total</strong></TableCell>
                <TableCell><strong>{formatTime(totalSum(metrics.totalTimes))}</strong></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Bar data={createChartData(metrics.totalTimes, 'Tempo Total (min)')} />
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
              {sortedEntries(metrics.clientDeliveryCounts).map(([cliente, count]) => (
                <TableRow key={cliente}>
                  <TableCell>{cliente}</TableCell>
                  <TableCell>{count}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell><strong>Total</strong></TableCell>
                <TableCell><strong>{totalSum(metrics.clientDeliveryCounts)}</strong></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Bar data={createChartData(metrics.clientDeliveryCounts, 'Quantidade de Entregas')} />
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
              {sortedEntries(metrics.clientTimePerVolume).map(([cliente, timePerVolume]) => (
                <TableRow key={cliente}>
                  <TableCell>{cliente}</TableCell>
                  <TableCell>{formatTime(timePerVolume)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell><strong>Total</strong></TableCell>
                <TableCell><strong>{formatTime(totalSum(metrics.clientTimePerVolume))}</strong></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Bar data={createChartData(metrics.clientTimePerVolume, 'Tempo Médio por Volume (min)')} />
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
              {sortedEntries(metrics.clientTotalTimes).map(([cliente, totalTime]) => (
                <TableRow key={cliente}>
                  <TableCell>{cliente}</TableCell>
                  <TableCell>{formatTime(totalTime)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell><strong>Total</strong></TableCell>
                <TableCell><strong>{formatTime(totalSum(metrics.clientTotalTimes))}</strong></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Bar data={createChartData(metrics.clientTotalTimes, 'Tempo Total (min)')} />
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Cliente que Leva Mais Volumes
        </Typography>
        <TableContainer component={Paper}>
          <Table
