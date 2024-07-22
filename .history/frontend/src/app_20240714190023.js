// frontend/src/App.js

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import History from './pages/History';
import AddEntregador from './pages/AddEntregador';
import AddCliente from './pages/AddCliente';
import AddStatus from './pages/AddStatus';

const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/history" component={History} />
        <Route path="/add-entregador" component={AddEntregador} />
        <Route path="/add-cliente" component={AddCliente} />
        <Route path="/add-status" component={AddStatus} />
        <Route path="/" exact component={Dashboard} />
      </Switch>
    </div>
  );
};

export default App;
