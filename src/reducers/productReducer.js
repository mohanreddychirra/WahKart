const initialState = {
  products: []
}

export default (state=initialState, action) => {
  switch(action.type) {
    case 'PRODUCT_FETCH_SUCCESS': return {
      products: [ ...action.products ]
    }

    default: return state;
  }
};
