import axios from 'axios';
import { getToken } from '../helpers';

export const deleteReview = (reviewId) => dispatch => (
  axios.delete(`/api/reviews/${reviewId}`, {
    headers: {
      token: getToken()
    }
  })
    .then(() => {
      dispatch({
        type: 'REVIEW_DELETED_SUCCESSFULLY',
        reviewId
      });
    })
    .catch((error) => {
      const { message } = error.response.data;
      return message;
    })
);

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

export const updateReview = (productId, review, rating) => dispatch => (
  axios.put(`/api/products/${productId}/reviews`, { review, rating }, {
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

export const reviewEdit = reviewId => dispatch => dispatch({
  type: 'UNSET_CAN_POST_REVIEW',
  reviewId
})