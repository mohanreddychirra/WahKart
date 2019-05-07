import { updateProduct } from '../utils';

const initialState = {
  shop: null,
  request: null,
  products: []
}


export default (state=initialState, action) => {
  switch(action.type) {
    case 'VENDOR_PRODUCT_FETCH_SUCCESS': return {
      ...state,
      products: [ ...action.products ]
    }
    case 'VENDOR_DETAILS_FETCHED' : return {
      ...state,
      shop: action.shop,
      request: action.request
    }

    case 'PRODUCT_DELETE_SUCCESS': return {
      ...state,
      products: state.products.filter(product => product.id !== action.productId)
    }
    
    case 'PRODUCT_ADD_SUCCESS': return {
      ...state,
      products: [
        action.product,
        ...state.products
      ]
    }

    case 'PRODUCT_UPDATE_SUCCESS': return {
      ...state,
      products: [
        ...updateProduct(state.products, action.product)
      ]
    }
    
    case 'AUTH_LOGOUT': return {
      ...initialState
    }

    default: return state;
  }
};
