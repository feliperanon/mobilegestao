import React, { useState, useEffect } from 'react';
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
  MenuItem,
} from '@mui/material';

const AddEntregador = () => {
  const [entregadores, setEntregadores] = useState([]);
  const [nome, setNome] = useState('');

  useEffect(() => {
    const fetchEntregadores = async () => {
      try {
        const response = await axios.get('http://localhost:5008/api/lists/entregadores');
        setEntregadores(response.data);
      } catch (error) {
        console.error('Erro ao buscar entregadores:', error);
      }
    };

    fetchEntregadores();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5008/api/lists/entregadores', { nome });
      setEntregadores([...entregadores, response.data]);
      setNome('');
    } catch (error) {
      console.error('Erro ao adicionar entregador:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Adicionar Entregador
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>
        <TextField
          label="Nome do Entregador"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          fullWidth
          required
          margin="normal"
          sx={{ flex: 1 }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, flexBasis: '100%' }}>
          Adicionar
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entregadores.map((entregador) => (
              <TableRow key={entregador._id}>
                <TableCell>{entregador.nome}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AddEntregador;
