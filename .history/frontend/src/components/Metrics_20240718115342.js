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
  const [metrics, setMetrics] = useState(null);

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

  if (!metrics) {
    return <Typography>Carregando...</Typography>;
  }

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
      {/* Similar blocks for other metrics */}
    </Container>
  );
};

export default Metrics;
