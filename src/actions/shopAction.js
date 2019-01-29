import axios from 'axios';

export const loadShops = () => dispatch => {
  return axios.get('/api/shops')
    .then(response => {
      const { shops } = response.data;
      dispatch({
        type: 'SHOPS_FETCH_SUCCESS',
        shops
      });
    })
    .catch(error => {
      throw error;
    })
};
