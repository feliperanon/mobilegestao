import React, { useState } from 'react';
import { Container, Typography, Box, Button, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navigation from '../components/Navigation';

const ThemeSettings = ({ setCustomTheme }) => {
  const [primaryColor, setPrimaryColor] = useState('#750e49');
  const [secondaryColor, setSecondaryColor] = useState('#750e49');

  const handleApplyTheme = () => {
    const newTheme = createTheme({
      palette: {
        primary: {
          main: primaryColor,
        },
        secondary: {
          main: secondaryColor,
        },
      },
      typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
      },
    });
    setCustomTheme(newTheme);
  };

  return (
    <Container>
      <Navigation />
      <Typography variant="h4" component="h1" gutterBottom>
        Configurações de Tema
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Cor Primária"
          type="color"
          value={primaryColor}
          onChange={(e) => setPrimaryColor(e.target.value)}
          fullWidth
        />
        <TextField
          label="Cor Secundária"
          type="color"
          value={secondaryColor}
          onChange={(e) => setSecondaryColor(e.target.value)}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={handleApplyTheme}>
          Aplicar Tema
        </Button>
      </Box>
    </Container>
  );
};

export default ThemeSettings;
