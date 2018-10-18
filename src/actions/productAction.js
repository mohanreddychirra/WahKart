import axios from 'axios';

export const loadProducts = () => dispatch => {
  return axios.get('/api/products')
    .then(response => {
      const { products } = response.data;
      dispatch({
        type: 'PRODUCT_FETCH_SUCCESS',
        products
      });
    })
    .catch((error) => {
      throw error;
    });
};
