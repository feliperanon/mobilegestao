import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Navigation from './Navigation';
import { Bar } from 'react-chartjs-2';

const Metrics = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [metrics, setMetrics] = useState({
    idleTimes: [],
    deliveryCounts: [],
    volumeCounts: [],
    totalTimeSpent: [],
    topClientsByDeliveryCount: [],
    topClientsByTimePerVolume: [],
    topClientsByTotalTime: [],
    topClientsByVolume: [],
  });

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5008/api/deliveries/history');
        setDeliveries(response.data);
      } catch (err) {
        console.error('Erro ao buscar histórico', err);
      }
    };

    fetchHistory();
  }, []);

  useEffect(() => {
    if (deliveries.length > 0) {
      const calculateMetrics = () => {
        // Lógica para calcular as métricas
        const entregadores = [...new Set(deliveries.map(d => d.entregador))];
        const clientes = [...new Set(deliveries.map(d => d.cliente))];

        const idleTimes = entregadores.map(entregador => {
          const entregas = deliveries.filter(d => d.entregador === entregador).sort((a, b) => new Date(a.finalizado) - new Date(b.finalizado));
          let idleTime = 0;
          for (let i = 1; i < entregas.length; i++) {
            const diff = new Date(entregas[i].iniciado) - new Date(entregas[i - 1].finalizado);
            idleTime += diff / 60000; // Convert to minutes
          }
          return { entregador, idleTime };
        });

        const deliveryCounts = entregadores.map(entregador => ({
          entregador,
          count: deliveries.filter(d => d.entregador === entregador).length,
        }));

        const volumeCounts = entregadores.map(entregador => ({
          entregador,
          volume: deliveries.filter(d => d.entregador === entregador).reduce((total, d) => total + d.volume, 0),
        }));

        const totalTimeSpent = entregadores.map(entregador => ({
          entregador,
          time: deliveries.filter(d => d.entregador === entregador).reduce((total, d) => total + d.tempoDecorrido, 0),
        }));

        const topClientsByDeliveryCount = clientes.map(cliente => ({
          cliente,
          count: deliveries.filter(d => d.cliente === cliente).length,
        })).sort((a, b) => b.count - a.count);

        const topClientsByTimePerVolume = clientes.map(cliente => {
          const clientDeliveries = deliveries.filter(d => d.cliente === cliente);
          const totalVolume = clientDeliveries.reduce((total, d) => total + d.volume, 0);
          const totalTime = clientDeliveries.reduce((total, d) => total + d.tempoDecorrido, 0);
          return { cliente, avgTimePerVolume: totalTime / totalVolume };
        }).sort((a, b) => b.avgTimePerVolume - a.avgTimePerVolume);

        const topClientsByTotalTime = clientes.map(cliente => ({
          cliente,
          time: deliveries.filter(d => d.cliente === cliente).reduce((total, d) => total + d.tempoDecorrido, 0),
        })).sort((a, b) => b.time - a.time);

        const topClientsByVolume = clientes.map(cliente => ({
          cliente,
          volume: deliveries.filter(d => d.cliente === cliente).reduce((total, d) => total + d.volume, 0),
        })).sort((a, b) => b.volume - a.volume);

        setMetrics({
          idleTimes,
          deliveryCounts,
          volumeCounts,
          totalTimeSpent,
          topClientsByDeliveryCount,
          topClientsByTimePerVolume,
          topClientsByTotalTime,
          topClientsByVolume,
        });
      };

      calculateMetrics();
    }
  }, [deliveries]);

  return (
    <Container>
      <Navigation />
      <Typography variant="h4" component="h1" gutterBottom>
        Métricas de Entregas
      </Typography>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Tempo Ocioso do Entregador
        </Typography>
        <Bar
          data={{
            labels: metrics.idleTimes.map(m => m.entregador),
            datasets: [{
              label: 'Tempo Ocioso (min)',
              data: metrics.idleTimes.map(m => m.idleTime),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            }],
          }}
        />
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Quantidade de Entregas por Entregador
        </Typography>
        <Bar
          data={{
            labels: metrics.deliveryCounts.map(m => m.entregador),
            datasets: [{
              label: 'Quantidade de Entregas',
              data: metrics.deliveryCounts.map(m => m.count),
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
            }],
          }}
        />
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Quantidade de Volumes Entregues por Entregador
        </Typography>
        <Bar
          data={{
            labels: metrics.volumeCounts.map(m => m.entregador),
            datasets: [{
              label: 'Volume Entregue',
              data: metrics.volumeCounts.map(m => m.volume),
              backgroundColor: 'rgba(255, 159, 64, 0.2)',
              borderColor: 'rgba(255, 159, 64, 1)',
              borderWidth: 1,
            }],
          }}
        />
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Tempo Total Gasto em Entregas por Entregador
        </Typography>
        <Bar
          data={{
            labels: metrics.totalTimeSpent.map(m => m.entregador),
            datasets: [{
              label: 'Tempo Total (min)',
              data: metrics.totalTimeSpent.map(m => m.time),
              backgroundColor: 'rgba(255, 205, 86, 0.2)',
              borderColor: 'rgba(255, 205, 86, 1)',
              borderWidth: 1,
            }],
          }}
        />
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" component="h2" gutterBottom>
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
              {metrics.topClientsByDeliveryCount.map((client, index) => (
                <TableRow key={index}>
                  <TableCell>{client.cliente}</TableCell>
                  <TableCell>{client.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" component="h2" gutterBottom>
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
              {metrics.topClientsByTimePerVolume.map((client,
