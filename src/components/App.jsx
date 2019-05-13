import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home/Index';
import Auth from './Auth/Index';
import Cart from './Cart/Index';
import ManageProduct from './Vendor/ManageProduct';
import Product from './Product/Index';
import Header from './common/Header';
import Modal from './Modal/Index';
import Orders from './Orders/Index';
import Vendor from './Vendor/Index';
import VendorRequests from './Admin/VendorRequests';
import Admin from './Admin/Index';
import Customer from './Customer/Index';
import VendorOrders from './Vendor/VendorOrders';

import '../stylesheets/header.scss';
import '../stylesheets/navbar.scss';
import Footer from './common/Footer';

const App = () => (
  <Fragment>
    <Modal />
    <Header />

    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Auth} />
      <Route exact path="/register" component={Auth} />
      <Route exact path="/cart" component={Cart} />
      <Route exact path="/vendor" component={Vendor} />
      <Route exact path="/vendor/orders" component={VendorOrders} />
      <Route exact path="/admin" component={Admin} />
      <Route exact path="/customer" component={Customer} />
      <Route exact path="/admin/requests" component={VendorRequests} />
      <Route exact path="/orders" component={Orders} />
      <Route exact path="/product/add" component={ManageProduct} />
      <Route exact path="/product/:productId" component={Product} />
      <Route exact path="/product/edit/:productId" component={ManageProduct} />
      <Route component={ () => <Redirect to="/" /> } />
    </Switch>

    <Footer />
  </Fragment>
);

export default App;
