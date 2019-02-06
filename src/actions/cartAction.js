import axios from 'axios';
import { getToken } from '../helpers';

export const getCartItems = () => dispatch => (
  axios.get('/api/cart-items', {
    headers: {
      token: getToken()
    }
  })
    .then(response => {
      const cartItems = response.data.cart;
  
      dispatch({
        type: 'CARTITEMS_FETCH_SUCCESS',
        cartItems
      })
    })
    .catch((error) => { throw error; })
);

export const addToCart = (productId) => dispatch => (
  axios.post('/api/cart-items', { productId }, {
    headers: {
      token: getToken()
    }
  })
    .then(response => {
      const { cartItem } = response.data;
  
      dispatch({
        type: 'CARTITEMS_ADD_SUCCESS',
        cartItem
      })
    })
    .catch(error => {
      throw error;
    })
);


export const deleteFromCart = (productId) => dispatch => (
  axios.delete('/api/cart-items', {
    data: { productId },
    headers: {
      token: getToken()
    }
  })
    .then(() => {
      dispatch({
        type: 'CARTITEMS_DELETE_SUCCESS',
        productId
      })
    })
    .catch(error => {
      throw error;
    })
);

export const clearCartItems = () => dispatch => (
  axios.delete('/api/cart-items/clear', {
    headers: {
      token: getToken()
    }
  })
    .then(() => {
      dispatch({
        type: 'CLEAR_CART_ITEMS',
      })
    })
    .catch(error => {
      throw error;
    })
);
