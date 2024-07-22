import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Drawer, Toolbar, List, ListItem, ListItemText } from '@mui/material';

const Navigation = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
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
    </Drawer>
  );
};

export default Navigation;
