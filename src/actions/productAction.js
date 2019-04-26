import axios from 'axios';
import toastr from 'toastr';
import { getToken } from '../helpers';

export const searchProducts = (query, categoryId) => dispatch => {
  return axios.post('/api/products/search', {
    query,
    categoryId
  })
    .then(response => {
      const { products } = response.data;

      return dispatch({
        type: 'SET_SEARCH_RESULTS',
        products
      });
    })
    .catch(() => {
      return dispatch({
        type: 'SET_SEARCH_RESULTS',
        products: []
      });
    });
}

export const setProductLoading = value => dispatch => dispatch({
  type: 'SET_PRODUCT_LOADING',
  value
});

export const setHomeProducts = (params) => dispatch => dispatch({
  type: 'SET_HOME_PRODUCTS',
  params
})

export const loadProducts = () => dispatch => {
  dispatch(setProductLoading(true));

  return axios.get('/api/products')
    .then(response => {
      const { products } = response.data;

      dispatch({
        type: 'PRODUCT_FETCH_SUCCESS',
        products
      });

      dispatch(setProductLoading(false));
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

export const addProduct = (productDetails, shopId) => dispatch => (
  axios.post('/api/products', { ...productDetails, shopId }, {
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

export const editProduct = (productId, productDetails, shopId) => dispatch => (
  axios.put(`/api/products/${productId}`, { ...productDetails, shopId }, {
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
