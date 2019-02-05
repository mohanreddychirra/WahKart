import axios from 'axios';
import { getToken } from '../helpers';

export const getOrders = () => dispatch => (
  axios.get('/api/orders', {
    headers: {
      token: getToken()
    }
  })
    .then(response => {
      const { orders } = response.data;
    
      dispatch({
        type: 'ORDERS_FETCH_SUCCESSFULL',
        orders
      });
    })
);
