import axios from 'axios';

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

export const updateRequest = (requestId, status) => dispatch => (
  axios.patch(`/api/admin/requests/${requestId}`, {
    status
  }, {
    headers: {
      token: getToken()
    }
  })
    .then((response) => {
      console.log(response.data);

      dispatch({
        type: 'REQUESTS_UPDATED',
        requestId,
        status
      });
    })
);
