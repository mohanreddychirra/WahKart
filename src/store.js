import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

const configureStore = (initialState) => createStore(
  rootReducer,
  initialState,
  applyMiddleware(
    thunk,
    reduxImmutableStateInvariant()
  )
);

export default configureStore;
