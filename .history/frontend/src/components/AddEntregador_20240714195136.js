// frontend/src/components/AddEntregador.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import Navigation from './Navigation';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeactivateIcon from '@mui/icons-material/Block';

const AddEntregador = () => {
  const [nome, setNome] = useState('');
  const [entregadores, setEntregadores] = useState([]);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchEntregadores = async () => {
      try {
        const response = await axios.get('/api/lists/entregadores');
        setEntregadores(response.data);
      } catch (err) {
        console.error('Erro ao buscar entregadores', err);
      }
    };

    fetchEntregadores();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`/api/lists/entregadores/${editId}`, { nome });
        setMessage('Entregador atualizado com sucesso!');
      } else {
        const response = await axios.post('/api/lists/entregadores', { nome });
        setEntregadores([...entregadores, response.data]);
        setMessage('Entregador cadastrado com sucesso!');
      }
      setNome('');
      setEditMode(false);
      setEditId(null);
    } catch (err) {
      setMessage('Erro ao adicionar/atualizar entregador. Tente novamente.');
      console.error('Erro ao adicionar/atualizar entregador', err);
    }
  };

  const handleEdit = (id, nome) => {
    setEditMode(true);
    setEditId(id);
    setNome(nome);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/lists/entregadores/${id}`);
      setEntregadores(entregadores.filter(entregador => entregador._id !== id));
      setMessage('Entregador excluído com sucesso!');
    } catch (err) {
      setMessage('Erro ao excluir entregador. Tente novamente.');
      console.error('Erro ao excluir entregador', err);
    }
  };

  const handleDeactivate = async (id) => {
    try {
      await axios.patch(`/api/lists/entregadores/${id}/deactivate`);
      setEntregadores(entregadores.map(entregador => entregador._id === id ? { ...entregador, ativo: false } : entregador));
      setMessage('Entregador desativado com sucesso!');
    } catch (err) {
      setMessage('Erro ao desativar entregador. Tente novamente.');
      console.error('Erro ao desativar entregador', err);
    }
  };

  return (
    <Container>
      <Navigation />
      <Typography variant="h4" component="h1" gutterBottom>
        Cadastrar Entregador
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
          {editMode ? 'Atualizar Entregador' : 'Adicionar Entregador'}
        </Button>
        {message && <Typography variant="body2" color="textSecondary">{message}</Typography>}
      </Box>
      <Typography variant="h5" component="h2" gutterBottom>
        Entregadores Cadastrados
      </Typography>
      <List>
        {entregadores.map((entregador) => (
          <ListItem key={entregador._id}>
            <ListItemText primary={entregador.nome} />
            <IconButton onClick={() => handleEdit(entregador._id, entregador.nome)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDeactivate(entregador._id)}>
              <DeactivateIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(entregador._id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AddEntregador;
