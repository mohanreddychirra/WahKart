import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { composeWithDevTools } from 'redux-devtools-extension';

/**
 * 
 * @description 
 * Declares a function that help create our store while
 * setting up reducers and middlewares with it.
 * 
 * redux-thunk: is a middleware that enables us define our
 * action creators as functions and not just object, this
 * is useful for asyncronous operataions such as fetching
 * data from the API.
 * 
 * redux-immutable-state-invariant: when applied, shows up
 * error in the console when we try to mutate the state, as
 * redux state should never be mutated.
 * 
 * @param { Object } initialState 
 * 
 * @returns { Function }
 */
const configureStore = (initialState) => createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      reduxImmutableStateInvariant()
    )
  )
);

export default configureStore;
