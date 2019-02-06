const initialState = [];

export default (state=initialState, action) => {
  switch(action.type) {
    case 'CLEAR_CART_ITEMS': return [];

    case 'CARTITEMS_FETCH_SUCCESS': return [
      ...state,
      ...action.cartItems
    ];

    case 'CARTITEMS_ADD_SUCCESS': return [
      { ...action.cartItem },
      ...state
    ];

    case 'CARTITEMS_DELETE_SUCCESS': return (
      state.filter(cartItem => cartItem.productId !== action.productId)
    );

    default: return state;
  }
};
