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

const store = configureStore({});
store.dispatch(loadProducts());
store.dispatch(authenticate());
store.dispatch(getCartItems());

store.subscribe(() => {
  console.log(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("app-view")
);
