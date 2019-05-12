const initialState = {
  showOverlay: false,
  showNavBar: false
}

export default (state=initialState, action) => {
  switch(action.type) {
    case 'SET_OVERLAY_SHOW': return {
      ...state,
      showOverlay: action.show
    }

    case 'SET_NAVBAR_SHOW': return {
      ...state,
      showNavBar: action.show
    }

    default: return state;
  }
}