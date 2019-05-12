import axios from 'axios';
import toastr from 'toastr';
import { getToken } from '../helpers';

// used in cart, but can be optimized
export const loadProducts = () => dispatch => {
  return axios.get('/api/products')
    .then(response => {
      const { products } = response.data;

      dispatch({
        type: 'PRODUCT_FETCH_SUCCESS',
        products
      });
    })
    .catch(error => {
      throw error;
    })
};

export const loadVendorProducts = () => dispatch => {
  return axios.get('/api/vendor/products', {
    headers: {
      token: getToken()
    }
  })
    .then(response => {
      const { products } = response.data;

      dispatch({
        type: 'PRODUCT_FETCH_SUCCESS',
        products
      });
    })
    .catch(error => {
      throw error;
    })
};

export const addProduct = (formData) => dispatch => (
  axios.post('/api/products', formData, {
    headers: {
      token: getToken()
    }
  })
    .then(response => {
      const { product } = response.data;

      dispatch({
        type: 'PRODUCT_ADD_SUCCESS',
        product
      });
    })
    .catch(error => {
      throw error;
    })
);

export const editProduct = (productId, formData) => dispatch => (
  axios.put(`/api/products/${productId}`, formData, {
    headers: {
      token: getToken(),
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(response => {
      const { product } = response.data;
      dispatch({
        type: 'PRODUCT_UPDATE_SUCCESS',
        product
      });
    })
    .catch(error => {
      throw error;
    })
);

export const getProduct = (productId) => dispatch => {
  dispatch({ type: 'PRODUCT_FETCH_STARTED' });

  axios.get(`/api/products/${productId}`, {
    headers: {
      token: getToken()
    }
  })
    .then(response => {
      const { product } = response.data;
      dispatch({
        type: 'PRODUCT_FETCHED_SUCCESSFULLY',
        product
      })
    })
    .catch(() => {
      dispatch({ type: 'PRODUCT_FETCH_FAILED' });
    })
};

export const deleteProduct = (productId) => dispatch => (
  axios.delete(`/api/products/${productId}`, {
    headers: {
      token: getToken()
    }
  })
    .then(response => {
      dispatch({
        type: 'PRODUCT_DELETE_SUCCESS',
        productId
      });
      toastr.success('Product deleted successfully')
    })
    .catch(error => {
      throw error;
    })
);
