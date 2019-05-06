const initialState = {
  products: [],
  loading: false,
  homeProducts: [],
  product: null
}

const updateProduct = (products, product) => {
  return products.map(prod => (
    prod.id === product.id
      ? product : prod
  ));
}

const isInt = (value) => (
  (
    typeof value == 'number' ||
    typeof value == 'string'
  ) && !!(`${value}`.match(/^\d+$/))
);

const filterProducts = (products, params) => {
  return products.filter(product => {
    const categoryId = params.categoryId;
    const shopIds = params.shopIds;
    const { min, max } = params.price;

    const price = parseInt(product.price.trim().substr(1));

    const minPrice = isInt(min) > 0 ? parseInt(min) : null;
    let maxPrice = isInt(max) > 0 ? parseInt(max) : null;
    if (maxPrice && minPrice && maxPrice <= minPrice) maxPrice = minPrice;
    
    const check1 = categoryId == '' || `${product.categoryId}` == `${categoryId}`;
    const check2 = !shopIds.length || shopIds.includes(product.shopId);
    const check3 = !minPrice || price >= minPrice;
    const check4 = !maxPrice || price <= maxPrice;

    return check1 && check2 && check3 && check4;
  });
}

export default (state=initialState, action) => {
  switch(action.type) {
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
