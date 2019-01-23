import axios from 'axios';

export const login = (email, password) => dispatch => {
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
    })
}

export const register = (email, password) => dispatch => {
  return axios.post('/api/register', {
    email, password
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
    axios.post('/api/auth', { token })
      .then((response) => {
        const { user } = response.data
        dispatch({
          type: 'UPDATE_AUTH_DATA',
          user
        })
      })
      .catch(() => {})
  }
}

export const logout = () => dispatch => {
  localStorage.removeItem('token');

  dispatch({
    type: 'AUTH_LOGOUT'
  });
}