import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, List, ListItem, ListItemText, Divider } from '@mui/material';

const Navigation = () => {
  return (
    <Box
      sx={{
        width: 240,
        bgcolor: 'background.paper',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ m: 2 }}>
          Gestão de Entregas
        </Typography>
        <Divider />
        <List>
          <ListItem button component={Link} to="/dashboard">
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/history">
            <ListItemText primary="Histórico" />
          </ListItem>
          <ListItem button component={Link} to="/metrics">
            <ListItemText primary="Métricas" />
          </ListItem>
        </List>
        <Divider />
        <List>
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
    </Box>
  );
};

export default Navigation;
