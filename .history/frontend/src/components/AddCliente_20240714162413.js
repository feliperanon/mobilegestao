// frontend/src/components/AddCliente.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit, Delete, Block } from '@mui/icons-material';

const AddCliente = () => {
  const [nome, setNome] = useState('');
  const [clientes, setClientes] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchClientes = async () => {
    const res = await axios.get('http://localhost:5008/api/lists/clientes');
    setClientes(res.data);
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5008/api/lists/clientes/${editingId}`, { nome });
        setEditingId(null);
      } else {
        await axios.post('http://localhost:5008/api/lists/clientes', { nome });
      }
      setNome('');
      fetchClientes();
      alert('Cliente cadastrado/editado com sucesso!');
    } catch (err) {
      console.error(err);
      alert('Erro ao cadastrar/editando cliente.');
    }
  };

  const handleEdit = (id, currentNome) => {
    setNome(currentNome);
    setEditingId(id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5008/api/lists/clientes/${id}`);
      fetchClientes();
      alert('Cliente excluído com sucesso!');
    } catch (err) {
      console.error(err);
      alert('Erro ao excluir cliente.');
    }
  };

  const handleDeactivate = async (id) => {
    try {
      await axios.patch(`http://localhost:5008/api/lists/clientes/${id}/deactivate`);
      fetchClientes();
      alert('Cliente desativado com sucesso!');
    } catch (err) {
      console.error(err);
      alert('Erro ao desativar cliente.');
    }
  };

  return (
    <Container>
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
            {clientes.map((cliente) => (
              <TableRow key={cliente._id}>
                <TableCell>{cliente.nome}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(cliente._id, cliente.nome)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(cliente._id)}>
                    <Delete />
                  </IconButton>
                  <IconButton onClick={() => handleDeactivate(cliente._id)}>
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

export default AddCliente;
