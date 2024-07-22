// frontend/src/components/AddStatus.js

import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const AddStatus = () => {
  const [nome, setNome] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5008/api/lists/status', { nome });
      setNome('');
      alert('Status cadastrado com sucesso!');
    } catch (err) {
      console.error(err);
      alert('Erro ao cadastrar status.');
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
          Cadastrar
        </Button>
      </Box>
    </Container>
  );
};

export default AddStatus;
