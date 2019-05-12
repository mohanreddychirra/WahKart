import { updateProduct } from '../utils';

const initialState = {
  products: [],
  product: null
}

export default (state=initialState, action) => {
  switch(action.type) {
    case 'PRODUCT_FETCH_SUCCESS': return {
      ...state,
      products: [ ...action.products ],
    }

    case 'REVIEW_DELETED_SUCCESSFULLY': return {
      ...state,
      product: {
        ...state.product,
        Reviews: state.product.Reviews.filter(review => (`${review.id}` != `${action.reviewId}`)),
        canPostReview: true
      }
    }

    case 'UNSET_CAN_POST_REVIEW' : return {
      ...state,
      product: {
        ...state.product,
        Reviews: state.product.Reviews.filter(review => (`${review.id}` != `${action.reviewId}`)),
        canPostReview: true
      }
    }

    case 'REVIEW_POSTED_SUCCESSFULLY': return {
      ...state,
      product: {
        ...state.product,
        Reviews: [ action.review, ...state.product.Reviews ],
        canPostReview: false
      }
    }

    case 'PRODUCT_FETCH_STARTED': return {
      ...state,
      product: null
    }

    case 'PRODUCT_FETCHED_SUCCESSFULLY': return {
      ...state,
      product: {
        ...action.product,
        Reviews: action.product.Reviews.reverse()
      }
    }

    case 'PRODUCT_FETCH_FAILED': return {
      ...state,
      product: false
    }
    
    case 'PRODUCT_UPDATE_SUCCESS': return {
      ...state,
      products: [
        ...updateProduct(state.products, action.product)
      ]
    }

    case 'AUTH_LOGOUT': return {
      ...state,
      products: []
    }

    default: return state;
  }
};
