// This is the entry or main file for the client application
// which built with the react library.

// This file is passed in webpack.config.js file as the entry file
// and this serves as the starting point for bundling the whole frontend codes

// Webpack recusively bundles codes starting for the provided entry files and can
// also help to transform module using babel for ES6 codes and other kind of loaders.

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { loadProducts } from './actions/productAction';
import { authenticate } from './actions/authAction';
import { getCartItems } from './actions/cartAction';
import configureStore from './store';
import App from './components/App';
import '../node_modules/toastr/build/toastr.min.css';

// create a store to be used by the application
const store = configureStore({});

// dispatch actions that update the store by fetching
// neccessary data from the api
store.dispatch(loadProducts());
store.dispatch(authenticate());
store.dispatch(getCartItems());

// Render the main App component after wrapping it around
// other components that exposes it to the redux store and
// routing functionalities.

// The BrowserRouter component bind some useful props to the
// App component and its decendants.
// Some of the props passed are { match: holds routes data } and
// { history: for redirection }
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("app-view")
);
