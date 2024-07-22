// frontend/src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import History from './pages/History';
import Analysis from './pages/Analysis';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import RegisterDelivery from './components/RegisterDelivery';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/history" component={History} />
      <Route path="/analysis" component={Analysis} />
      <Route path="/register-delivery" component={RegisterDelivery} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
