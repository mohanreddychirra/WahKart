
const initialState = {
  id: null,
  role: null,
  email: null
};

export default (state=initialState, action) => {
  switch(action.type) {
    case 'AUTH_SUCCESSFULL': return {
      id: action.user.id,
      role: action.user.role,
      email: action.user.email
    }

    case 'UPDATE_AUTH_DATA': return {
      id: action.user.id,
      role: action.user.role,
      email: action.user.email
    }

    case 'AUTH_LOGOUT': return {
      ...initialState
    }

    default: return state;
  }
};
