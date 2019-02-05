const initialState = {
  orders: []
};

export default (state=initialState, action) => {
  switch(action.type) {
    case 'ORDERS_FETCH_SUCCESSFULL': return {
      ...state,
      orders: action.orders.reverse()
    }

    default: return state;
  }
};
