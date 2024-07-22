import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Gestão de Entregas
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/add-cliente">
          Add Cliente
        </Button>
        <Button color="inherit" component={Link} to="/add-entregador">
          Add Entregador
        </Button>
        <Button color="inherit" component={Link} to="/metrics">
          Métricas
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
