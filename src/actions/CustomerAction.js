import axios from 'axios';
import { getToken } from '../helpers';

export const updateCustomer = details => (
  axios.put(`/api/customers`, { ...details }, {
    headers: {
      token: getToken()
    }
  })
    .then(({ data: { customer }}) => customer)
    .catch(() => null)
);

export const getCustomer = () => (
  axios.get(`/api/customers`, {
    headers: {
      token: getToken()
    }
  })
    .then(({ data: { customer }}) => customer)
    .catch(() => null)
);
