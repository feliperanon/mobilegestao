// frontend/src/pages/AddEntregador.js

import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const AddEntregador = () => {
  const [nome, setNome] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5008/api/lists/entregadores', { nome });
      setNome('');
    } catch (err) {
      console.error('Erro ao adicionar entregador', err);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Cadastrar Entregador
      </Typography>
      <nav>
        <Link to="/dashboard">Dashboard</Link> |{' '}
        <Link to="/history">Histórico</Link> |{' '}
        <Link to="/add-entregador">Cadastrar Entregador</Link> |{' '}
        <Link to="/add-cliente">Cadastrar Cliente</Link> |{' '}
        <Link to="/add-status">Cadastrar Status</Link>
      </nav>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <TextField
          label="Nome do Entregador"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Adicionar
        </Button>
      </Box>
    </Container>
  );
};

export default AddEntregador;
