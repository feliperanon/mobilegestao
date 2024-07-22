// frontend/src/components/AddEntregador.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit, Delete, Block } from '@mui/icons-material';

const AddEntregador = () => {
  const [nome, setNome] = useState('');
  const [entregadores, setEntregadores] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchEntregadores = async () => {
    const res = await axios.get('http://localhost:5008/api/lists/entregadores');
    setEntregadores(res.data);
  };

  useEffect(() => {
    fetchEntregadores();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5008/api/lists/entregadores/${editingId}`, { nome });
        setEditingId(null);
      } else {
        await axios.post('http://localhost:5008/api/lists/entregadores', { nome });
      }
      setNome('');
      fetchEntregadores();
      alert('Entregador cadastrado/editado com sucesso!');
    } catch (err) {
      console.error(err);
      alert('Erro ao cadastrar/editando entregador.');
    }
  };

  const handleEdit = (id, currentNome) => {
    setNome(currentNome);
    setEditingId(id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5008/api/lists/entregadores/${id}`);
      fetchEntregadores();
      alert('Entregador excluído com sucesso!');
    } catch (err) {
      console.error(err);
      alert('Erro ao excluir entregador.');
    }
  };

  const handleDeactivate = async (id) => {
    try {
      await axios.patch(`http://localhost:5008/api/lists/entregadores/${id}/deactivate`);
      fetchEntregadores();
      alert('Entregador desativado com sucesso!');
    } catch (err) {
      console.error(err);
      alert('Erro ao desativar entregador.');
    }
  };

  return (
    <Container>
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
            {entregadores.map((entregador) => (
              <TableRow key={entregador._id}>
                <TableCell>{entregador.nome}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(entregador._id, entregador.nome)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(entregador._id)}>
                    <Delete />
                  </IconButton>
                  <IconButton onClick={() => handleDeactivate(entregador._id)}>
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

export default AddEntregador;
