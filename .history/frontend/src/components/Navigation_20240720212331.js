import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navigation = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Gestão de Produtividade
        </Typography>
        <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
        <Button color="inherit" component={Link} to="/history">Histórico</Button>
        <Button color="inherit" component={Link} to="/add-entregador">Entregador</Button>
        <Button color="inherit" component={Link} to="/add-cliente">Cliente</Button>
        <Button color="inherit" component={Link} to="/add-status">Status</Button>
        <Button color="inherit" component={Link} to="/metrics">Metricas</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
