const initialState = {
  products: [],

  filterApplied: false,

  filter: {
    min: '',
    max: '',
    shopIds: []
  },

  pagination: {
    pageCount: 0,
    total: 0,
    pageSize: 0,
    page: 1
  },

  loading: false,

  homeSearchQuery: '',
  homeCategoryId: ''
}

export default (state=initialState, action) => {
  switch(action.type) {
    case 'SET_FILTER_APPLIED': return {
      ...state,
      filterApplied: action.value
    }

    case 'SET_HOME_FILTER': return {
      ...state,
      filter: { ...action.filter }
    }

    case 'SET_HOME_SEARCH_QUERY': return {
      ...state,
      homeSearchQuery: action.query
    }

    case 'SET_HOME_CATEGORY': return {
      ...state,
      homeCategoryId: action.id
    }

    case 'SET_PRODUCT_LOADING': return {
      ...state,
      loading: action.value
    }

    case 'PRODUCT_FETCH_SUCCESS': return {
      ...state,
      products: [ ...action.products ],
      pagination: { ...action.pagination },
    }

    default: return state;
  }
};
