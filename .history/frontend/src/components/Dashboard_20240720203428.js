import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
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
  TextField,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import Navigation from './Navigation';

const Dashboard = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [entregadores, setEntregadores] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [entregador, setEntregador] = useState(null);
  const [cliente, setCliente] = useState(null);
  const [status, setStatus] = useState(null);
  const [volume, setVolume] = useState('');
  const [tempoEstimado, setTempoEstimado] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editDeliveryId, setEditDeliveryId] = useState(null);
  const [editEntregador, setEditEntregador] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteDeliveryId, setDeleteDeliveryId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const deliveriesRes = await axios.get('http://localhost:5008/api/deliveries');
      const updatedDeliveries = deliveriesRes.data.map(delivery => ({
        ...delivery,
        tempoEmAndamento: Math.floor((Date.now() - new Date(delivery.iniciado)) / 60000)
      }));
      setDeliveries(updatedDeliveries);

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
        prevDeliveries.map((delivery) => ({
          ...delivery,
          tempoEmAndamento: Math.floor((Date.now() - new Date(delivery.iniciado)) / 60000)
        }))
      );
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!entregador || !cliente || !status) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5008/api/deliveries', {
        entregador: entregador?.nome,
        cliente: cliente?.nome,
        status: status?.nome,
        volume,
        tempoEstimado,
      });
      setDeliveries([{
        ...res.data,
        tempoEmAndamento: 0
      }, ...deliveries]);
      setEntregador(null);
      setCliente(null);
      setStatus(null);
      setVolume('');
      setTempoEstimado('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5008/api/deliveries/${editDeliveryId}`, { entregador: editEntregador?.nome });
      const updatedDeliveries = deliveries.map((delivery) =>
        delivery._id === editDeliveryId ? { ...delivery, entregador: editEntregador?.nome } : delivery
      );
      setDeliveries(updatedDeliveries);
      setEditDialogOpen(false);
      setEditDeliveryId(null);
      setEditEntregador(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFinalize = async (id) => {
    try {
      await axios.patch(`http://localhost:5008/api/deliveries/${id}/finalize`);
      const updatedDeliveries = deliveries.filter((delivery) => delivery._id !== id);
      setDeliveries(updatedDeliveries);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5008/api/deliveries/${id}`);
      const updatedDeliveries = deliveries.filter((delivery) => delivery._id !== id);
      setDeliveries(updatedDeliveries);
      closeDeleteDialog();
    } catch (err) {
      console.error(err);
    }
  };

  const openEditDialog = (id, currentEntregador) => {
    setEditDeliveryId(id);
    setEditEntregador({ nome: currentEntregador });
    setEditDialogOpen(true);
  };

  const openDeleteDialog = (id) => {
    setDeleteDeliveryId(id);
    setDeleteDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setEditDeliveryId(null);
    setEditEntregador(null);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setDeleteDeliveryId(null);
  };

  return (
    <Container>
      <Navigation />
      <Typography variant="h" component="h1" gutterBottom>
              </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>
        <Autocomplete
          options={entregadores}
          getOptionLabel={(option) => option.nome}
          value={entregador}
          onChange={(event, newValue) => setEntregador(newValue)}
          renderInput={(params) => <TextField {...params} label="Entregador" margin="normal" fullWidth required />}
          sx={{ flex: 2 }}
        />
        <Autocomplete
          options={clientes}
          getOptionLabel={(option) => option.nome}
          value={cliente}
          onChange={(event, newValue) => setCliente(newValue)}
          renderInput={(params) => <TextField {...params} label="Cliente" margin="normal" fullWidth required />}
          sx={{ flex: 2 }}
        />
        <Autocomplete
          options={statusList}
          getOptionLabel={(option) => option.nome}
          value={status}
          onChange={(event, newValue) => setStatus(newValue)}
          renderInput={(params) => <TextField {...params} label="Status" margin="normal" fullWidth required />}
          sx={{ flex: 1 }}
        />
        <TextField
          label="Volume"
          type="number"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          fullWidth
          required
          margin="normal"
          sx={{ flex: 0.6 }}
        />
        <TextField
          label="Tempo"
          type="number"
          value={tempoEstimado}
          onChange={(e) => setTempoEstimado(e.target.value)}
          fullWidth
          required
          margin="normal"
          sx={{ flex: 0.6 }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 4, flexBasis: '100%' }}>
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
              <TableCell>Estimado</TableCell>
              <TableCell>Andamento</TableCell>
              <TableCell>Iniciado</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deliveries.map((delivery) => (
              <TableRow key={delivery._id}>
                <TableCell>{delivery.entregador}</TableCell>
                <TableCell>{delivery.cliente}</TableCell> {/* Tratamento como string */}
                <TableCell>{delivery.status}</TableCell>
                <TableCell>{delivery.volume}</TableCell>
                <TableCell>{delivery.tempoEstimado}</TableCell>
                <TableCell>{delivery.tempoEmAndamento}</TableCell>
                <TableCell>{new Date(delivery.iniciado).toLocaleString()}</TableCell>
                <TableCell>
                  <IconButton onClick={() => openEditDialog(delivery._id, delivery.entregador)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleFinalize(delivery._id)}>
                    <DoneIcon />
                  </IconButton>
                  <IconButton onClick={() => openDeleteDialog(delivery._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={editDialogOpen} onClose={closeEditDialog}>
        <DialogTitle>Editar Entregador</DialogTitle>
        <DialogContent>
          <DialogContentText>Selecione um novo entregador para a entrega.</DialogContentText>
          <Autocomplete
            options={entregadores}
            getOptionLabel={(option) => option.nome}
            value={editEntregador}
            onChange={(event, newValue) => setEditEntregador(newValue)}
            renderInput={(params) => <TextField {...params} label="Entregador" margin="normal" fullWidth required />}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog}>Cancelar</Button>
          <Button onClick={handleEditSubmit} color="primary">Salvar</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>Tem certeza de que deseja excluir esta entrega?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog}>Cancelar</Button>
          <Button onClick={() => handleDelete(deleteDeliveryId)} color="primary">Excluir</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
