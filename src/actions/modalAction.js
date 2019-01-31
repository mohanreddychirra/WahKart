export const openModal = name => dispatch => dispatch({
  type: 'OPEN_MODAL',
  name
});

export const closeModal = () => dispatch => dispatch({
  type: 'CLOSE_MODAL',
});

export const addFilterShopId = (id) => dispatch => dispatch({
  type: 'ADD_SHOP_ID',
  id
});

export const removeFilterShopId = (id) => dispatch => dispatch({
  type: 'REMOVE_SHOP_ID',
  id
});

export const setFilterMin = (value) => dispatch => dispatch({
  type: 'SET_MIN_VALUE',
  value
});


export const setFilterMax = (value) => dispatch => dispatch({
  type: 'SET_MAX_VALUE',
  value
});
