const initialState = {
  shop: null,
  request: null
}


export default (state=initialState, action) => {
  switch(action.type) {
    case 'VENDOR_DETAILS_FETCHED' : return {
      shop: action.shop,
      request: action.request
    }

    default: return state;
  }
};
