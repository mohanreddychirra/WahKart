const initialState = {
  categories: [],
};

export default (state=initialState, action) => {
  switch(action.type) {
    case 'CATEGORIES_FETCHED': return {
      categories: [...action.categories]
    };
    default: return state;
  }
};
