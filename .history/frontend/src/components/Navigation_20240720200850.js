import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const Navigation = () => {
  return (
    <Box
      sx={{
        width: 240,
        height: '100vh',
        bgcolor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
      }}
    >
      <Typography variant="h6" sx={{ m: 2 }}>
        Gestão de Entregas
      </Typography>
      <List component="nav">
        <ListItem button component={Link} to="/dashboard">
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/history">
          <ListItemText primary="Histórico" />
        </ListItem>
        <ListItem button component={Link} to="/metrics">
          <ListItemText primary="Métricas" />
        </ListItem>
        <ListItem button component={Link} to="/add-entregador">
          <ListItemText primary="Cadastrar Entregador" />
        </ListItem>
        <ListItem button component={Link} to="/add-cliente">
          <ListItemText primary="Cadastrar Cliente" />
        </ListItem>
        <ListItem button component={Link} to="/add-status">
          <ListItemText primary="Cadastrar Status" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Navigation;
