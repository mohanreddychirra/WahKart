const initialState = {
  products: [],
};

const addProduct = (allProducts, product) => {
  return [
    product,
    ...allProducts.filter(p => `${p.id}` != `${product.id}`)
  ]; 
}

export default (state=initialState, action) => {
  switch(action.type) {
    case 'SET_PRODUCTS_VIEWED': return {
      ...state,
      products: [...action.products]
    }
    
    case 'SET_PRODUCT_VIEWED': return {
      ...state,
      products: addProduct(state.products, action.product)
    }

    case 'AUTH_LOGOUT': return {
      ...state,
      products: []
    }
    default: return state;
  }
};
