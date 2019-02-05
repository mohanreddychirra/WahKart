
const initialState = {
  id: null,
  role: null,
  email: null,
  noLogin: false,
  inProgress: false
};

export default (state=initialState, action) => {
  switch(action.type) {
    case 'NO_LOGIN': return {
      ...state,
      noLogin: true
    }

    case 'UPDATE_AUTH_DATA_IN_PROGRESS': return {
      ...state,
      noLogin: false,
      inProgress: true
    }

    case 'UPDATE_AUTH_DATA_ERROR': return {
      ...initialState
    }

    case 'AUTH_SUCCESSFULL': return {
      id: action.user.id,
      role: action.user.role,
      email: action.user.email,
      noLogin: false,
      inProgress: false
    }

    case 'UPDATE_AUTH_DATA': return {
      id: action.user.id,
      role: action.user.role,
      email: action.user.email,
      noLogin: false,
      inProgress: false
    }

    case 'AUTH_LOGOUT': return {
      ...initialState
    }

    default: return state;
  }
};
