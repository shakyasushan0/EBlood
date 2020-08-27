import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {user} from './reducers/users';

export const configureStore = () => {
  const store = createStore(
    combineReducers({user}),
    applyMiddleware(thunk, logger),
  );
  return store;
};
