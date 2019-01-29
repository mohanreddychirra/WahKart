const initialState = {
  shops: []
}


export default (state=initialState, action) => {
  switch(action.type) {
    case 'SHOPS_FETCH_SUCCESS': return {
      shops: [ ...action.shops ]
    }

    default: return state;
  }
};
