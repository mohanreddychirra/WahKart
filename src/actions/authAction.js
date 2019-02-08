import axios from 'axios';
import { getCartItems } from './cartAction';
import history from '../history';
import { getOrders } from './orderAction';
import { getRequests } from './adminAction';
import { redirectPath } from '../utils';

const loadData = (user, dispatch) => {
  const role = user.role;
  const { pathname } = history.location;
  const redirect = redirectPath(pathname, role);

  if (role == 'admin') {
    dispatch(getRequests());
    history.push(redirect);
  }

  if (role === 'vendor') {
    const details = {
      shop: user.Shop,
      request: user.VendorRequest
    }
  
    dispatch({
      type: 'VENDOR_DETAILS_FETCHED',
      ...details
    });
    
    history.push(redirect);
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
  
      loadData(user, dispatch);
    })
);

export const register = (email, password, role, shopName) => dispatch => {
  return axios.post('/api/register', {
    email, password, role, shopName
  })
    .then(response => {
      const { user, token } = response.data;
      localStorage.setItem('token', token);

      loadData(user, dispatch);
      
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
        loadData(user, dispatch)

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