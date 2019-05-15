const initialState = {
  categories: [],
};

export default (state=initialState, action) => {
  switch(action.type) {
    case 'CATEGORIES_FETCHED': return {
      categories: [...action.categories]
    };

    case 'CATEGORY_ADDED': return {
      categories: [ action.category, ...state.categories ]
    }

    case 'CATEGORY_DELETED': return {
      categories: state.categories.filter(category => `${category.id}` !== `${action.categoryId}`)
    }

    case 'CATEGORY_UPDATED': return {
      categories: [
        ...state.categories.map(category =>
            `${category.id}` == `${action.category.id}`
              ? action.category
              : category  
          )
        ]
    }

    default: return state;
  }
};
