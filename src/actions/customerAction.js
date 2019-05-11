import axios from 'axios';
import { getToken } from '../helpers';

export const getProductViewed = () => dispatch => (
  axios.get(`/api/customers/products`, {
    headers: {
      token: getToken()
    }
  })
    .then(response => {
      const { products } = response.data;

      dispatch({
        type: 'SET_PRODUCTS_VIEWED',
        products
      });    
    })
    .catch(() => {})
);

export const setProductViewed = (product) => dispatch => (
  axios.post(`/api/customers/products/${product.id}`, {}, {
    headers: {
      token: getToken()
    }
  })
    .then(() => {
      dispatch({
        type: 'SET_PRODUCT_VIEWED',
        product
      });    
    })
    .catch(() => {})
);

export const updateCustomer = details => (
  axios.put(`/api/customers`, { ...details }, {
    headers: {
      token: getToken()
    }
  })
    .then(({ data: { customer }}) => customer)
    .catch(() => null)
);

export const getCustomer = () => (
  axios.get(`/api/customers`, {
    headers: {
      token: getToken()
    }
  })
    .then(({ data: { customer }}) => customer)
    .catch(() => null)
);
