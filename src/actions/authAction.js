import axios from 'axios';
import { getCartItems } from './cartAction';
import history from '../history';
import { getOrders } from './orderAction';
import { getRequests } from './adminAction';
import {
  vendorRedirectPath,
  customerRedirectPath,
  adminRedirectPath
} from '../utils';

const loadData = (user, dispatch) => {
  const role = user.role;
  const { pathname } = history.location;

  if (role == 'admin') {
    dispatch(getRequests());
    const redirect = adminRedirectPath(pathname);
    history.push(redirect);
  }

  else if (role === 'vendor') {
    const details = {
      shop: user.Shop,
      request: user.VendorRequest
    }
    
    if (user.Shop) {
      const { Products, ...newShop } = user.Shop;
      details.shop = newShop;
      
      dispatch({
       type: 'VENDOR_PRODUCT_FETCH_SUCCESS',
       products: Products
      });
    }
  
    dispatch({
      type: 'VENDOR_DETAILS_FETCHED',
      ...details
    });
    
    const status = user.VendorRequest.status;
    const redirect = vendorRedirectPath(pathname, status);
    history.push(redirect);
  }

  else if (role === 'customer') {
    dispatch(getCartItems());
    dispatch(getOrders());

    const redirect = ['/login', '/register'].includes(pathname)
      ? '/'  
      : customerRedirectPath(pathname);
    history.push(redirect);
  }

  else {
    history.push('/');
  }

}

export const authInProgress = () => ({
  type: 'AUTH_IN_PROGRESS'
});

export const login = (email, password) => dispatch => {
  dispatch(authInProgress());

  return axios.post('/api/login', {
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
    .catch(error => {
      throw error
    })
}

export const register = (email, password, role, shopName) => dispatch => {
  dispatch(authInProgress());

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
    .catch(error => {
      throw error;
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