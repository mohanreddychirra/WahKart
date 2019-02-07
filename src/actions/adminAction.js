import axios from 'axios';
import { getToken } from '../helpers';

export const getRequests = () => dispatch => (
  axios.get('/api/admin/requests', {
    headers: {
      token: getToken()
    }
  })
    .then(response => {
      const { requests } = response.data;
      
      dispatch({
        type: 'REQUESTS_FETCHED_SUCCESSFULLY',
        requests
      });
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
    .then(() => {  
      dispatch({
        type: 'REQUESTS_UPDATED',
        requestId,
        status
      });
    })
);
