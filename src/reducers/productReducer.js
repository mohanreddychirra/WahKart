const initialState = {
  products: [],
  searchResult: null,
  product: null
}

const updateProduct = (products, product) => {
  return products.map(prod => {
    if(prod.id === product.id) {
      return product;
    } else {
      return prod
    }
  });
}

export default (state=initialState, action) => {
  switch(action.type) {
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

    case 'UPDATE_SEARCH_RESULT': return {
      ...state,
      searchResult: action.value
    }

    case 'PRODUCT_FETCH_SUCCESS': return {
      ...state,
      products: [ ...action.products ]
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

    case 'PRODUCT_DELETE_SUCCESS': return {
      ...state,
      products: state.products.filter(product => product.id !== action.productId)
    }

    case 'AUTH_LOGOUT': return {
      ...state,
      products: []
    }

    default: return state;
  }
};
