// frontend/src/components/AddEntregador.js

import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box
} from '@mui/material';
import Navigation from './Navigation';

const AddEntregador = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5008/api/lists/entregadores', { nome: name });
      setName('');
    } catch (err) {
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
          label="Nome do Entregador"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Cadastrar
        </Button>
      </Box>
    </Container>
  );
};

export default AddEntregador;
