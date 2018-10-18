import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home/Index';
import Auth from './Auth/Index';
import NotFound from './NotFound';
import Header from './common/Header';

import '../stylesheets/header.scss';

const App = () => (
  <Fragment>
    <Header />

    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Auth} />
      <Route exact path="/register" component={Auth} />
      <Route component={NotFound} />
    </Switch>
  </Fragment>
);

export default App;
