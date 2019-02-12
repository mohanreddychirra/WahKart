import axios from 'axios';
import { getToken } from '../helpers';

export const postReview = (productId, review, rating) => dispatch => (
  axios.post(`/api/products/${productId}/reviews`, { review, rating }, {
    headers: {
      token: getToken()
    }
  })
    .then(response => {
      const { review } = response.data;
      
      dispatch({
        type: 'REVIEW_POSTED_SUCCESSFULLY',
        review
      });

      return true;
    })
    .catch((error) => {
      const { message } = error.response.data;
      return message;
    })
);
