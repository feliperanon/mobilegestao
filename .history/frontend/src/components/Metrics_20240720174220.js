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
import { Bar } from 'react-chartjs-2';

const Metrics = () => {
  const [metrics, setMetrics] = useState({});
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [entregadores, setEntregadores] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [selectedEntregadores, setSelectedEntregadores] = useState([]);
  const [selectedClientes, setSelectedClientes] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');

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
        status: selectedStatus
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

  const getSortedEntries = (obj) => {
    return Object.entries(obj || {}).sort(([, a], [, b]) => b - a);
  };

  const getTotal = (obj) => {
    return Object.values(obj || {}).reduce((acc, value) => acc + value, 0);
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
        <TextField
          select
          label="Status"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          helperText="Selecione um status"
        >
          {statusList.map((status) => (
            <MenuItem key={status._id} value={status.nome}>
              {status.nome}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" color="primary">
          Filtrar
        </Button>
      </Box>

      {['idleTimes', 'deliveryCounts', 'volumeCounts', 'totalTimes', 'clientDeliveryCounts', 'clientTimePerVolume', 'clientTotalTimes', 'clientVolumes'].map((metricKey, index) => (
        <Box sx={{ mb: 4 }} key={index}>
          <Typography variant="h5" component="h2" gutterBottom>
            {metricKey.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{metricKey.includes('client') ? 'Cliente' : 'Entregador'}</TableCell>
                  <TableCell>{metricKey.includes('Time') ? 'Tempo (min)' : metricKey.includes('Volume') ? 'Volume' : 'Quantidade'}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getSortedEntries(metrics[metricKey]).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell>{key}</TableCell>
                    <TableCell>{metricKey.includes('Time') ? formatTime(value) : value}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell>{metricKey.includes('Time') ? formatTime(getTotal(metrics[metricKey])) : getTotal(metrics[metricKey])}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Bar
            data={{
              labels: getSortedEntries(metrics[metricKey]).map(([key]) => key),
              datasets: [{
                label: metricKey,
                data: getSortedEntries(metrics[metricKey]).map(([, value]) => value),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
              }]
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
        </Box>
      ))}
    </Container>
  );
};

export default Metrics;
