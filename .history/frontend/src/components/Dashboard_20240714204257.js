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
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  AppBar,
  Toolbar,
  Link
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';

const Dashboard = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [entregadores, setEntregadores] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [entregador, setEntregador] = useState(null);
  const [selectedClientes, setSelectedClientes] = useState([]);
  const [status, setStatus] = useState('');
  const [volume, setVolume] = useState('');
  const [tempoEstimado, setTempoEstimado] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editDeliveryId, setEditDeliveryId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteDeliveryId, setDeleteDeliveryId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deliveriesRes = await axios.get('http://localhost:5008/api/deliveries');
        setDeliveries(deliveriesRes.data);

        const entregadoresRes = await axios.get('http://localhost:5008/api/lists/entregadores');
        setEntregadores(entregadoresRes.data);

        const clientesRes = await axios.get('http://localhost:5008/api/lists/clientes');
        setClientes(clientesRes.data);

        const statusRes = await axios.get('http://localhost:5008/api/lists/status');
        setStatusList(statusRes.data);
      } catch (err) {
        console.error('Erro ao buscar dados', err);
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      setDeliveries((prevDeliveries) => 
        prevDeliveries.map((delivery) => {
          if (delivery.isActive) {
            const tempoEmAndamento = Math.floor((Date.now() - new Date(delivery.iniciado)) / 60000);
            return { ...delivery, tempoEmAndamento };
          }
          return delivery;
        })
      );
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedClientes.length === 0) {
      alert("Selecione pelo menos um cliente");
      return;
    }

    try {
      const res = await axios.post('http://localhost:5008/api/deliveries', {
        entregador,
        cliente: selectedClientes.map(cliente => cliente.nome),
        status,
        volume,
        tempoEstimado,
      });
      setDeliveries([res.data, ...deliveries]);
      setEntregador(null);
      setSelectedClientes([]);
      setStatus('');
      setVolume('');
      setTempoEstimado('');
    } catch (err) {
      console.error('Erro ao adicionar entrega', err);
    }
  };

  const handleEditEntregador = async () => {
    try {
      await axios.patch(`http://localhost:5008/api/deliveries/${editDeliveryId}/updateEntregador`, { entregador });
      setEditDialogOpen(false);
      setEditDeliveryId(null);
      setEntregador(null);
      const deliveriesRes = await axios.get('http://localhost:5008/api/deliveries');
      setDeliveries(deliveriesRes.data);
    } catch (err) {
      console.error('Erro ao editar entregador', err);
    }
  };

  const handleFinalizeDelivery = async (id) => {
    try {
      await axios.patch(`http://localhost:5008/api/deliveries/${id}/finalize`);
      const deliveriesRes = await axios.get('http://localhost:5008/api/deliveries');
      setDeliveries(deliveriesRes.data);
    } catch (err) {
      console.error('Erro ao finalizar entrega', err);
    }
  };

  const handleDeleteDelivery = async () => {
    try {
      await axios.delete(`http://localhost:5008/api/deliveries/${deleteDeliveryId}`);
      setDeleteDialogOpen(false);
      setDeleteDeliveryId(null);
      const deliveriesRes = await axios.get('http://localhost:5008/api/deliveries');
      setDeliveries(deliveriesRes.data);
    } catch (err) {
      console.error('Erro ao excluir entrega', err);
    }
  };

  const handleOpenEditDialog = (id, currentEntregador) => {
    setEditDeliveryId(id);
    setEntregador(entregadores.find(ent => ent.nome === currentEntregador));
    setEditDialogOpen(true);
  };

  const handleOpenDeleteDialog = (id) => {
    setDeleteDeliveryId(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setEditDeliveryId(null);
    setEntregador(null);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setDeleteDeliveryId(null);
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            App Name
          </Typography>
          <Link href="/dashboard" color="inherit" sx={{ marginRight: 2 }}>Dashboard</Link>
          <Link href="/history" color="inherit" sx={{ marginRight: 2 }}>Histórico</Link>
          <Link href="/add-entregador" color="inherit" sx={{ marginRight: 2 }}>Cadastrar Entregador</Link>
          <Link href="/add-cliente" color="inherit" sx={{ marginRight: 2 }}>Cadastrar Cliente</Link>
          <Link href="/add-status" color="inherit" sx={{ marginRight: 2 }}>Cadastrar Status</Link>
        </Toolbar>
      </AppBar>

      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Autocomplete
            options={entregadores}
            getOptionLabel={(option) => option.nome}
            value={entregador}
            onChange={(e, newValue) => setEntregador(newValue)}
            isOptionEqualToValue={(option, value) => option.nome === value.nome}
            renderInput={(params) => <TextField {...params} label="Entregador" margin="normal" fullWidth required />}
          />
          <Autocomplete
            multiple
            options={clientes}
            getOptionLabel={(option) => option.nome}
            value={selectedClientes}
            onChange={(e, newValue) => setSelectedClientes(newValue)}
            isOptionEqualToValue={(option, value) => option.nome === value.nome}
            renderInput={(params) => <TextField {...params} label="Cliente" margin="normal" fullWidth required />}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
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
        </Box>
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
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deliveries.map((delivery) => (
              <TableRow key={delivery._id}>
                <TableCell>{delivery.entregador}</TableCell>
                <TableCell>{delivery.cliente.join(', ')}</TableCell>
                <TableCell>{delivery.status}</TableCell>
                <TableCell>{delivery.volume}</TableCell>
                <TableCell>{delivery.tempoEstimado}</TableCell>
                <TableCell>{delivery.tempoEmAndamento}</TableCell>
                <TableCell>{new Date(delivery.iniciado).toLocaleString()}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenEditDialog(delivery._id, delivery.entregador)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleFinalizeDelivery(delivery._id)}>
                    <DoneIcon />
                  </IconButton>
                  <IconButton onClick={() => handleOpenDeleteDialog(delivery._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Editar Entregador</DialogTitle>
        <DialogContent>
          <DialogContentText>Selecione um novo entregador para a entrega.</DialogContentText>
          <Autocomplete
            options={entregadores}
            getOptionLabel={(option) => option.nome}
            value={entregador}
            onChange={(e, newValue) => setEntregador(newValue)}
            isOptionEqualToValue={(option, value) => option.nome === value.nome}
            renderInput={(params) => <TextField {...params} label="Entregador" margin="normal" fullWidth required />}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancelar</Button>
          <Button onClick={handleEditEntregador} color="primary">Salvar</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>Tem certeza de que deseja excluir esta entrega?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button onClick={handleDeleteDelivery} color="primary">Excluir</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
