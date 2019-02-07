const initialState = {
  requests: []
};

export default (state=initialState, action) => {
  switch(action.type) {
    case 'REQUESTS_FETCHED_SUCCESSFULLY': return {
      ...state,
      requests: action.requests
    }

    case 'REQUESTS_UPDATED': return {
      ...state,
      requests: state.requests.map(request => {
        if (action.requestId === request.id) {
          return {
            ...request,
            status: action.status
          }
        }

        return request;
      })
    }

    default: return state;
  }
};
