import axios from 'axios';
import { getCartItems } from './cartAction';
import history from '../history';
import { getOrders } from './orderAction';
import { getRequests } from './adminAction';
import { redirectPath } from '../utils';

const loadData = (role, dispatch) => {
  if (role == 'admin') {
    dispatch(getRequests());

    const { pathname } = history.location;
    const redirect = redirectPath(pathname, role);
    history.push(redirect);
  }

  if (role === 'vendor') {
    history.push('/');
  }

  if (role === 'customer') {
    dispatch(getCartItems());
    dispatch(getOrders());
    history.push('/');
  }
}

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
      
      loadData(user.role, dispatch);
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

        loadData(user.role, dispatch)

        dispatch({
          type: 'UPDATE_AUTH_DATA',
          user
        });
      })
      .catch(() => {
        localStorage.removeItem('token');

        dispatch({
          type: 'UPDATE_AUTH_DATA_ERROR'
        });
      })
  } else {
    dispatch({
      type: 'NO_LOGIN'
    });
  }
}

export const logout = () => dispatch => {
  localStorage.removeItem('token');

  dispatch({
    type: 'AUTH_LOGOUT'
  });

  history.push('/');
}