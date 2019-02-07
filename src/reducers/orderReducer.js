const initialState = {
  orders: []
};

export default (state=initialState, action) => {
  switch(action.type) {
    case 'ADD_ORDER_SUCCESSFULL': return {
      ...state,
      orders: [
        action.order,
        ...state.orders
      ]
    }

    case 'ORDERS_FETCH_SUCCESSFULL': return {
      ...state,
      orders: action.orders.reverse()
    }

    case 'AUTH_LOGOUT': return {
      ...state,
      orders: []
    }
    
    default: return state;
  }
};
