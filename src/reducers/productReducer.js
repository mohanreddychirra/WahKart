const initialState = {
  products: [],
  loading: false,
  homeProducts: [],
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

const filterProducts = (products, params) => {
  return [];
  if (categoryId == '') return products;
  return products.filter(product => product.categoryId == categoryId);
}

export default (state=initialState, action) => {
  switch(action.type) {
    case 'SET_SEARCH_RESULTS' : return {
      ...state,
      homeProducts: action.products
    };

    case 'SET_HOME_PRODUCTS': return {
      ...state,
      homeProducts: filterProducts(state.products, action.params)
    };

    case 'SET_PRODUCT_LOADING': return {
      ...state,
      loading: action.value
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
