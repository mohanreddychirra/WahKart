const initialState = {
  products: []
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
    case 'PRODUCT_FETCH_SUCCESS': return {
      products: [ ...action.products ]
    }

    case 'PRODUCT_ADD_SUCCESS': return {
      products: [
        action.product,
        ...state.products
      ]
    }
    
    case 'PRODUCT_UPDATE_SUCCESS': return {
      products: [
        ...updateProduct(state.products, action.product)
      ]
    }

    case 'PRODUCT_DELETE_SUCCESS': return {
      products: state.products.filter(product => product.id !== action.productId)
    }

    default: return state;
  }
};
