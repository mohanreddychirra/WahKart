import { combineReducers } from 'redux';
import productReducer from './productReducer';
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import shopReducer from './shopReducer';
import modalReducer from './modalReducer';
import orderReducer from './orderReducer';
import adminReducer from './adminReducer';
import vendorReducer from './vendorReducer';
import appReducer from './appReducer';
import categoryReducer from './categoryReducer';

export default combineReducers({
  productReducer,
  authReducer,
  modalReducer,
  cartReducer,
  shopReducer,
  orderReducer,
  adminReducer,
  vendorReducer,
  appReducer,
  categoryReducer
});
