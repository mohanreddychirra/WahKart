const initialState = [];

export default (state=initialState, action) => {
  switch(action.type) {
    case 'CATEGORIES_FETCHED': return [ ...action.categories ];
    default: return state;
  }
};
