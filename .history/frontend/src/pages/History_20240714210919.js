import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('http://localhost:5008/api/history');
        setHistory(res.data);
      } catch (err) {
        console.error('Erro ao buscar histórico', err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Histórico
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Entregador</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Volume</TableCell>
              <TableCell>Tempo Estimado</TableCell>
              <TableCell>Tempo Em Andamento</TableCell>
              <TableCell>Iniciado</TableCell>
              <TableCell>Finalizado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.entregador}</TableCell>
                <TableCell>{item.cliente ? item.cliente.join(', ') : 'N/A'}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.volume}</TableCell>
                <TableCell>{item.tempoEstimado}</TableCell>
                <TableCell>{item.tempoEmAndamento}</TableCell>
                <TableCell>{new Date(item.iniciado).toLocaleString()}</TableCell>
                <TableCell>{new Date(item.finalizado).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default History;
