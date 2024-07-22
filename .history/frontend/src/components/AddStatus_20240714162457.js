// frontend/src/components/AddStatus.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit, Delete, Block } from '@mui/icons-material';

const AddStatus = () => {
  const [nome, setNome] = useState('');
  const [statusList, setStatusList] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchStatus = async () => {
    const res = await axios.get('http://localhost:5008/api/lists/status');
    setStatusList(res.data);
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5008/api/lists/status/${editingId}`, { nome });
        setEditingId(null);
      } else {
        await axios.post('http://localhost:5008/api/lists/status', { nome });
      }
      setNome('');
      fetchStatus();
      alert('Status cadastrado/editado com sucesso!');
    } catch (err) {
      console.error(err);
      alert('Erro ao cadastrar/editando status.');
    }
  };

  const handleEdit = (id, currentNome) => {
    setNome(currentNome);
    setEditingId(id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5008/api/lists/status/${id}`);
      fetchStatus();
      alert('Status excluído com sucesso!');
    } catch (err) {
      console.error(err);
      alert('Erro ao excluir status.');
    }
  };

  const handleDeactivate = async (id) => {
    try {
      await axios.patch(`http://localhost:5008/api/lists/status/${id}/deactivate`);
      fetchStatus();
      alert('Status desativado com sucesso!');
    } catch (err) {
      console.error(err);
      alert('Erro ao desativar status.');
    }
  };

  return (
    <Container>
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
          {editingId ? 'Editar' : 'Cadastrar'}
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {statusList.map((status) => (
              <TableRow key={status._id}>
                <TableCell>{status.nome}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(status._id, status.nome)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(status._id)}>
                    <Delete />
                  </IconButton>
                  <IconButton onClick={() => handleDeactivate(status._id)}>
                    <Block />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AddStatus;
