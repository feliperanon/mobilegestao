// frontend/src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
} from '@mui/material';

const Dashboard = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [entregadores, setEntregadores] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [entregador, setEntregador] = useState('');
  const [cliente, setCliente] = useState('');
  const [status, setStatus] = useState('');
  const [volume, setVolume] = useState('');
  const [tempoEstimado, setTempoEstimado] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const deliveriesRes = await axios.get('http://localhost:5008/api/deliveries');
      setDeliveries(deliveriesRes.data);

      const entregadoresRes = await axios.get('http://localhost:5008/api/lists/entregadores');
      setEntregadores(entregadoresRes.data);

      const clientesRes = await axios.get('http://localhost:5008/api/lists/clientes');
      setClientes(clientesRes.data);

      const statusRes = await axios.get('http://localhost:5008/api/lists/status');
      setStatusList(statusRes.data);
    };

    fetchData();

    const intervalId = setInterval(() => {
      setDeliveries((prevDeliveries) => 
        prevDeliveries.map((delivery) => {
          const tempoEmAndamento = Math.floor((Date.now() - new Date(delivery.iniciado)) / 60000);
          return { ...delivery, tempoEmAndamento };
        })
      );
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5008/api/deliveries', {
        entregador,
        cliente,
        status,
        volume,
        tempoEstimado,
      });
      setDeliveries([res.data, ...deliveries]);
      setEntregador('');
      setCliente('');
      setStatus('');
      setVolume('');
      setTempoEstimado('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <TextField
          select
          label="Entregador"
          value={entregador}
          onChange={(e) => setEntregador(e.target.value)}
          fullWidth
          required
          margin="normal"
        >
          {entregadores.map((ent) => (
            <MenuItem key={ent._id} value={ent.nome}>
              {ent.nome}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          fullWidth
          required
          margin="normal"
        >
          {clientes.map((cli) => (
            <MenuItem key={cli._id} value={cli.nome}>
              {cli.nome}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          fullWidth
          required
          margin="normal"
        >
          {statusList.map((stat) => (
            <MenuItem key={stat._id} value={stat.nome}>
              {stat.nome}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Volume"
          type="number"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Tempo Estimado (minutos)"
          type="number"
          value={tempoEstimado}
          onChange={(e) => setTempoEstimado(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Adicionar Entrega
        </Button>
      </Box>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {deliveries.map((delivery) => (
              <TableRow key={delivery._id}>
                <TableCell>{delivery.entregador}</TableCell>
                <TableCell>{delivery.cliente}</TableCell>
                <TableCell>{delivery.status}</TableCell>
                <TableCell>{delivery.volume}</TableCell>
                <TableCell>{delivery.tempoEstimado}</TableCell>
                <TableCell>{delivery.tempoEmAndamento}</TableCell>
                <TableCell>{new Date(delivery.iniciado).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Dashboard;
