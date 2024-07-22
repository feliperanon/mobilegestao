// frontend/src/components/AddCliente.js

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

const AddCliente = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5008/api/lists/clientes', { nome: name });
      setName('');
    } catch (err) {
      console.error('Erro ao adicionar cliente', err);
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
          label="Nome do Cliente"
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

export default AddCliente;
