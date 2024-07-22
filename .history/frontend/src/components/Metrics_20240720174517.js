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
import { Bar } from 'react-chartjs-2';
import Navigation from './Navigation';

const Metrics = () => {
  const [metrics, setMetrics] = useState({});
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [entregadores, setEntregadores] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [selectedEntregadores, setSelectedEntregadores] = useState([]);
  const [selectedClientes, setSelectedClientes] = useState([]);
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
        status: selectedStatus.join(',')
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

  const sortAndCalculateTotal = (data) => {
    const sortedData = Object.entries(data).sort((a, b) => b[1] - a[1]);
    const total = sortedData.reduce((acc, [, value]) => acc + value, 0);
    return { sortedData, total };
  };

  const renderTableWithChart = (title, data, formatValue) => {
    const { sortedData, total } = sortAndCalculateTotal(data);

    const labels = sortedData.map(([key]) => key);
    const values = sortedData.map(([, value]) => value);

    return (
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', gap: 4 }}>
          <TableContainer component={Paper} sx={{ flex: 1 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{title.split(' ')[1]}</TableCell>
                  <TableCell>{title.split(' ')[0]}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData.map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell>{key}</TableCell>
                    <TableCell>{formatValue(value)}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell>{formatValue(total)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ width: '400px' }}>
            <Bar
              data={{
                labels,
                datasets: [
                  {
                    label: title,
                    data: values,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    );
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
          SelectProps={{
            multiple: true,
          }}
          helperText="Selecione um ou mais status"
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
      {renderTableWithChart('Tempo Ocioso do Entregador', metrics.idleTimes || {}, formatTime)}
      {renderTableWithChart('Quantidade de Entregas por Entregador', metrics.deliveryCounts || {}, (val) => val)}
      {renderTableWithChart('Quantidade de Volumes Entregues por Entregador', metrics.volumeCounts || {}, (val) => val)}
      {renderTableWithChart('Tempo Total Gasto em Entregas por Entregador', metrics.totalTimes || {}, formatTime)}
      {renderTableWithChart('Cliente com Mais Entregas por Quantidade', metrics.clientDeliveryCounts || {}, (val) => val)}
      {renderTableWithChart('Cliente que Consome Mais Tempo por Menor Volume', metrics.clientTimePerVolume || {}, formatTime)}
      {renderTableWithChart('Cliente que Consome Mais Tempo', metrics.clientTotalTimes || {}, formatTime)}
      {renderTableWithChart('Cliente que Leva Mais Volumes', metrics.clientVolumes || {}, (val) => val)}
    </Container>
  );
};

export default Metrics;
