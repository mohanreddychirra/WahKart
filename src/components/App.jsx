import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home/Index';
import Auth from './Auth/Index';
import NotFound from './NotFound';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/auth" component={Auth} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default App;
