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
} from '@mui/material';
import { Autocomplete, TextField } from '@mui/material';
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
  const [selectedClientes, setSelectedClientes] = useState([]);
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
        cliente: Array.isArray(delivery.cliente) ? delivery.cliente : [delivery.cliente],  // Garantir que cliente seja um array
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
    try {
      const res = await axios.post('http://localhost:5008/api/deliveries', {
        entregador: entregador?.nome,
        cliente: selectedClientes.map(cliente => cliente.nome),
        status: status?.nome,
        volume,
        tempoEstimado,
      });
      setDeliveries([{
        ...res.data,
        cliente: selectedClientes.map(cliente => cliente.nome),
        tempoEmAndamento: 0
      }, ...deliveries]);
      setEntregador(null);
      setSelectedClientes([]);
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
      setDeleteDialogOpen(false);
      setDeleteDeliveryId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const openEditDialog = (id, currentEntregador) => {
    setEditDeliveryId(id);
    setEditEntregador({ nome: currentEntregador });
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setEditDeliveryId(null);
    setEditEntregador(null);
  };

  const openDeleteDialog = (id) => {
    setDeleteDeliveryId(id);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setDeleteDeliveryId(null);
  };

  return (
    <Container>
      <Navigation />
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>
        <Autocomplete
          options={entregadores}
          getOptionLabel={(option) => option.nome}
          value={entregador}
          onChange={(event, newValue) => setEntregador(newValue)}
          renderInput={(params) => <TextField {...params} label="Entregador" margin="normal" fullWidth required />}
          sx={{ flex: 1 }}
        />
        <Autocomplete
          multiple
          options={clientes}
          getOptionLabel={(option) => option.nome}
          value={selectedClientes}
          onChange={(event, newValue) => setSelectedClientes(newValue)}
          renderInput={(params) => <TextField {...params} label="Clientes" margin="normal" fullWidth required />}
          sx={{ flex: 1 }}
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
          sx={{ flex: 1 }}
        />
        <TextField
          label="Tempo Estimado (minutos)"
          type="number"
          value={tempoEstimado}
          onChange={(e) => setTempoEstimado(e.target.value)}
          fullWidth
          required
          margin="normal"
          sx={{ flex: 1 }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, flexBasis: '100%'
