import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home/Index';
import Auth from './Auth/Index';
import Cart from './Cart/Index';
import ManageProduct from './Product/ManageProduct';
import NotFound from './NotFound';
import Header from './common/Header';
import Modal from './Modal/Index';

import '../stylesheets/header.scss';

const App = () => (
  <Fragment>
    <Modal />
    <Header />

    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Auth} />
      <Route exact path="/register" component={Auth} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/product/add" component={ManageProduct} />
      <Route exact path="/product/edit/:productId" component={ManageProduct} />
      <Route component={NotFound} />
    </Switch>
  </Fragment>
);

export default App;
