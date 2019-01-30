const initialState = {
  open: false,
  active: null
}

export default (state=initialState, action) => {
  switch(action.type) {
    case 'OPEN_MODAL': return {
      open: true,
      active: action.name
    }

    case 'CLOSE_MODAL': return {
      open: false,
      active: null
    }

    default: return state;
  }
};
