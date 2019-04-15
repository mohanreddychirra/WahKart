const initialState = {
  show: false
}

export default (state=initialState, action) => {
  switch(action.type) {
    case 'SET_NAVBAR_SHOW': return {
      show: !state.show
    }

    default: return state;
  }
}