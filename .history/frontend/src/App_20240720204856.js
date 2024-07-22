import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import Home from './pages/Home';
import History from './pages/History';
import Analysis from './pages/Analysis';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import AddEntregador from './components/AddEntregador';
import AddCliente from './components/AddCliente';
import AddStatus from './components/AddStatus';
import Metrics from './components/Metrics';
import ThemeSettings from './pages/ThemeSettings';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/history" component={History} />
        <Route path="/analysis" component={Analysis} />
        <Route path="/metrics" component={Metrics} />
        <Route path="/theme-settings" component={ThemeSettings} />
        <Route path="/add-entregador" component={AddEntregador} />
        <Route path="/add-cliente" component={AddCliente} />
        <Route path="/add-status" component={AddStatus} />
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;
