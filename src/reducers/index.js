import { combineReducers } from 'redux';
import productReducer from './productReducer';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import shopReducer from './shopReducer';

export default combineReducers({
  productReducer,
  authReducer,
  cartReducer,
  shopReducer
});
