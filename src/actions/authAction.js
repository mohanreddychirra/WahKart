import axios from 'axios';
import { getCartItems } from './cartAction';
import history from '../history';

export const login = (email, password) => dispatch => (
  axios.post('/api/login', {
    email, password
  })
    .then(response => {
      const { user, token } = response.data;
      localStorage.setItem('token', token);

      dispatch({
        type: 'AUTH_SUCCESSFULL',
        user
      });

     dispatch(getCartItems());
    })
);

export const register = (email, password, role) => dispatch => {
  return axios.post('/api/register', {
    email, password, role
  })
    .then(response => {
      const { user, token } = response.data;
      localStorage.setItem('token', token);

      dispatch({
        type: 'AUTH_SUCCESSFULL',
        user
      });
    })
}

export const authenticate = () => dispatch => {
  const token = localStorage.getItem('token');

  if (token) {
    dispatch({
      type: 'UPDATE_AUTH_DATA_IN_PROGRESS'
    });

    axios.post('/api/auth', { token })
      .then((response) => {
        const { user } = response.data

        dispatch({
          type: 'UPDATE_AUTH_DATA',
          user
        });

        dispatch(getCartItems());
      })
      .catch(() => {
        localStorage.removeItem('token');

        dispatch({
          type: 'UPDATE_AUTH_DATA_ERROR'
        });
      })
  }
}

export const logout = () => dispatch => {
  localStorage.removeItem('token');

  dispatch({
    type: 'AUTH_LOGOUT'
  });

  history.push('/');
}