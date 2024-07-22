// frontend/src/components/AddCliente.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import Navigation from './Navigation';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeactivateIcon from '@mui/icons-material/Block';

const AddCliente = () => {
  const [nome, setNome] = useState('');
  const [clientes, setClientes] = useState([]);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await axios.get('http://localhost:5008/api/lists/clientes');
        setClientes(response.data);
      } catch (err) {
        console.error('Erro ao buscar clientes', err);
      }
    };

    fetchClientes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://localhost:5008/api/lists/clientes/${editId}`, { nome });
        setMessage('Cliente atualizado com sucesso!');
      } else {
        const response = await axios.post('http://localhost:5008/api/lists/clientes', { nome });
        setClientes([...clientes, response.data]);
        setMessage('Cliente cadastrado com sucesso!');
      }
      setNome('');
      setEditMode(false);
      setEditId(null);
    } catch (err) {
      setMessage('Erro ao adicionar/atualizar cliente. Tente novamente.');
      console.error('Erro ao adicionar/atualizar cliente', err);
    }
  };

  const handleEdit = (id, nome) => {
    setEditMode(true);
    setEditId(id);
    setNome(nome);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5008/api/lists/clientes/${id}`);
      setClientes(clientes.filter(cliente => cliente._id !== id));
      setMessage('Cliente excluído com sucesso!');
    } catch (err) {
      setMessage('Erro ao excluir cliente. Tente novamente.');
      console.error('Erro ao excluir cliente', err);
    }
  };

  const handleDeactivate = async (id) => {
    try {
      await axios.patch(`http://localhost:5008/api/lists/clientes/${id}/deactivate`);
      setClientes(clientes.map(cliente => cliente._id === id ? { ...cliente, ativo: false } : cliente));
      setMessage('Cliente desativado com sucesso!');
    } catch (err) {
      setMessage('Erro ao desativar cliente. Tente novamente.');
      console.error('Erro ao desativar cliente', err);
    }
  };

  return (
    <Container>
      <Navigation />
      <Typography variant="h4" component="h1" gutterBottom>
        Cadastrar Cliente
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
        <TextField
          label="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          {editMode ? 'Atualizar Cliente' : 'Adicionar Cliente'}
        </Button>
        {message && <Typography variant="body2" color="textSecondary">{message}</Typography>}
      </Box>
      <Typography variant="h5" component="h2" gutterBottom>
        Clientes Cadastrados
      </Typography>
      <List>
        {clientes.map((cliente) => (
          <ListItem key={cliente._id}>
            <ListItemText primary={cliente.nome} />
            <IconButton onClick={() => handleEdit(cliente._id, cliente.nome)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDeactivate(cliente._id)}>
              <DeactivateIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(cliente._id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AddCliente;
