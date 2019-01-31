const initialState = {
  open: false,
  active: null,

  productFilter: {
    min: null,
    max: null,
    shopIds: []
  }
}

export default (state=initialState, action) => {
  switch(action.type) {
    case 'OPEN_MODAL': return {
      ...state,
      open: true,
      active: action.name
    }

    case 'CLOSE_MODAL': return {
      ...state,
      open: false,
      active: null
    }

    case 'SET_MIN_VALUE': return {
      ...state,
      productFilter: {
        ...state.productFilter,
        min: action.value
      }
    }

    case 'SET_MAX_VALUE': return {
      ...state,
      productFilter: {
        ...state.productFilter,
        max: action.value
      }
    }

    case 'ADD_SHOP_ID': return {
      ...state,
      productFilter: {
        ...state.productFilter,
        shopIds: [
          ...state.productFilter.shopIds,
          action.id
        ]
      }
    }

    case 'REMOVE_SHOP_ID': return {
      ...state,
      productFilter: {
        ...state.productFilter,
        shopIds: state.productFilter.shopIds.filter(id => action.id !== id)
      }
    }

    default: return state;
  }
};
