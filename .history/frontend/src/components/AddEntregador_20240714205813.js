// frontend/src/components/AddEntregador.js

import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import Navigation from './Navigation';

const AddEntregador = () => {
  const [nome, setNome] = useState('');
  const [entregadores, setEntregadores] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5008/api/lists/entregadores', { nome });
      setEntregadores([res.data, ...entregadores]);
      setNome('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5008/api/lists/entregadores/${id}`);
      setEntregadores(entregadores.filter((ent) => ent._id !== id));
    } catch (err) {
      console.error(err);
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
                  <Button onClick={() => handleDelete(entregador._id)} color="secondary">
                    Excluir
                  </Button>
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
