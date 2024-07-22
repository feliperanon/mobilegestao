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
} from '@mui/material';
import Navigation from './Navigation';

const Metrics = () => {
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get('http://localhost:5008/api/metrics');
        setMetrics(response.data);
      } catch (err) {
        console.error('Erro ao buscar métricas', err);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <Container>
      <Navigation />
      <Typography variant="h4" component="h1" gutterBottom>
        Métricas
      </Typography>
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
