import axios from 'axios';

export const setProductLoading = value => ({
  type: 'SET_PRODUCT_LOADING',
  value
});

export const setHomeCategoryId = (id) => dispatch => dispatch({
  type: 'SET_HOME_CATEGORY',
  id
});

export const setHomeSearchQuery = (query) => dispatch => dispatch({
  type: 'SET_HOME_SEARCH_QUERY',
  query
});

export const setHomeFilter = (filter) => dispatch => dispatch({
  type: 'SET_HOME_FILTER',
  filter
});

export const setFilterApplied = (value) => dispatch => dispatch({
  type: 'SET_FILTER_APPLIED',
  value
});

export const getHomeProducts = (categoryId, query, page, filter) => dispatch => {
  categoryId = categoryId == '' ? null : parseInt(categoryId);
  query = query == '' ? null : query.trim;

  let url = (
    !!categoryId
      ? `/api/products/categories/${categoryId}`
      : '/api/products'
  );
  url = `${url}?page=${page}`;
  url = !!query ? `${url}&query=${query}` : url;

  dispatch(setProductLoading(true));

  axios.get(url, {
    params: {
      filter: JSON.stringify(filter)
    }
  })
    .then(({ data }) => {
      const { products, pagination } = data;

      dispatch({
        type: 'PRODUCT_FETCH_SUCCESS',
        products,
        pagination,
      });

      dispatch(setProductLoading(false));
    })
    .catch(() => {
      dispatch(setProductLoading(false));
    });
};
