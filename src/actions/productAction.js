import axios from 'axios';
import toastr from 'toastr';
import { getToken } from '../helpers';

export const setSearchResult = (value) => dispatch => dispatch({
  type: 'UPDATE_SEARCH_RESULT',
  value
});

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


export const addProduct = (productDetails) => dispatch => (
  axios.post('/api/products', { ...productDetails }, {
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

export const editProduct = (productId, productDetails) => dispatch => (
  axios.put(`/api/products/${productId}`, { ...productDetails }, {
    headers: {
      token: getToken()
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
