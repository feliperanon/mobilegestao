// frontend/src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './screens/Home';
import History from './screens/History';
import Analysis from './screens/Analysis';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import AddDelivery from './components/AddDelivery';
import Deliveries from './components/Deliveries';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/history" component={History} />
      <Route path="/analysis" component={Analysis} />
      <Route path="/add-delivery" component={AddDelivery} />
      <Route path="/deliveries" component={Deliveries} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
