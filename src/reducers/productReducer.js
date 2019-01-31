const initialState = {
  products: [],
  searchResult: null
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

    default: return state;
  }
};
