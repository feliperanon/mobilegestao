// frontend/src/components/AddEntregador.js

import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import Navigation from './Navigation';

const AddEntregador = () => {
  const [nome, setNome] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5008/api/lists/entregadores', { nome });
      setNome('');
      setMessage('Entregador cadastrado com sucesso!');
    } catch (err) {
      setMessage('Erro ao adicionar entregador. Tente novamente.');
      console.error('Erro ao adicionar entregador', err);
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
          Adicionar Entregador
        </Button>
        {message && <Typography variant="body2" color="textSecondary">{message}</Typography>}
      </Box>
    </Container>
  );
};

export default AddEntregador;
