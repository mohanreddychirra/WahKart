const initialState = {
  showOverlay: false,
  showNavBar: false
}

export default (state=initialState, action) => {
  switch(action.type) {
    case 'SET_OVERLAY_SHOW': return {
      ...state,
      showOverlay: !state.showOverlay
    }

    case 'SET_NAVBAR_SHOW': return {
      ...state,
      showNavBar: !state.showNavBar
    }

    default: return state;
  }
}