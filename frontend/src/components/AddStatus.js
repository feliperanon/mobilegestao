// frontend/src/components/AddStatus.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import Navigation from './Navigation';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeactivateIcon from '@mui/icons-material/Block';

const AddStatus = () => {
  const [nome, setNome] = useState('');
  const [statusList, setStatusList] = useState([]);
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get('http://localhost:5008/api/lists/status');
        setStatusList(response.data);
      } catch (err) {
        console.error('Erro ao buscar status', err);
      }
    };

    fetchStatus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`http://localhost:5008/api/lists/status/${editId}`, { nome });
        setMessage('Status atualizado com sucesso!');
      } else {
        const response = await axios.post('http://localhost:5008/api/lists/status', { nome });
        setStatusList([...statusList, response.data]);
        setMessage('Status cadastrado com sucesso!');
      }
      setNome('');
      setEditMode(false);
      setEditId(null);
    } catch (err) {
      setMessage('Erro ao adicionar/atualizar status. Tente novamente.');
      console.error('Erro ao adicionar/atualizar status', err);
    }
  };

  const handleEdit = (id, nome) => {
    setEditMode(true);
    setEditId(id);
    setNome(nome);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5008/api/lists/status/${id}`);
      setStatusList(statusList.filter(status => status._id !== id));
      setMessage('Status excluído com sucesso!');
    } catch (err) {
      setMessage('Erro ao excluir status. Tente novamente.');
      console.error('Erro ao excluir status', err);
    }
  };

  const handleDeactivate = async (id) => {
    try {
      await axios.patch(`http://localhost:5008/api/lists/status/${id}/deactivate`);
      setStatusList(statusList.map(status => status._id === id ? { ...status, ativo: false } : status));
      setMessage('Status desativado com sucesso!');
    } catch (err) {
      setMessage('Erro ao desativar status. Tente novamente.');
      console.error('Erro ao desativar status', err);
    }
  };

  return (
    <Container>
      <Navigation />
      <Typography variant="h4" component="h1" gutterBottom>
        Cadastrar Status
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
          {editMode ? 'Atualizar Status' : 'Adicionar Status'}
        </Button>
        {message && <Typography variant="body2" color="textSecondary">{message}</Typography>}
      </Box>
      <Typography variant="h5" component="h2" gutterBottom>
        Status Cadastrados
      </Typography>
      <List>
        {statusList.map((status) => (
          <ListItem key={status._id}>
            <ListItemText primary={status.nome} />
            <IconButton onClick={() => handleEdit(status._id, status.nome)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDeactivate(status._id)}>
              <DeactivateIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(status._id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AddStatus;
