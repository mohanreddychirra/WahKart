import axios from 'axios';
import { getToken } from '../helpers';


export const getCategories = () => dispatch => (
  axios.get('/api/categories')
    .then(response => {
      const { categories } = response.data;
      dispatch({
        type: 'CATEGORIES_FETCHED',
        categories
      })
    })
);

export const addCategory = (categoryName) => dispatch => (
  axios.post('/api/categories', { categoryName }, {
    headers: {
      token: getToken()
    }
  })
    .then(({ data: { category }}) => {
      dispatch({
        type: 'CATEGORY_ADDED',
        category
      });

      return true; 
    })
    .catch(error => error.response.data.message)
);

export const updateCategory = (categoryId, categoryName) => dispatch => (
  axios.patch(`/api/categories/${categoryId}`, { categoryName }, {
    headers: {
      token: getToken()
    }
  })
    .then(({ data: { category }}) => {
      dispatch({
        type: 'CATEGORY_UPDATED',
        category
      });

      return true; 
    })
    .catch(error => error.response.data.message)
);

export const deleteCategory = (categoryId) => dispatch => (
  axios.delete(`/api/categories/${categoryId}`, {
    headers: {
      token: getToken()
    }
  })
    .then(() => {
      dispatch({
        type: 'CATEGORY_DELETED',
        categoryId
      });

      return true; 
    })
    .catch(error => error.response.data.message)
);

export const updateRequest = (requestId, status) => dispatch => (
  axios.patch(`/api/admin/requests/${requestId}`, {
    status
  }, {
    headers: {
      token: getToken()
    }
  })
    .then(() => {
      dispatch({
        type: 'REQUESTS_UPDATED',
        requestId,
        status
      });
    })
);
