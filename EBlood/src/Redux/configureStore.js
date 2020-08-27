import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {user} from './reducers/users';
import {donors} from './reducers/donors';

export const configureStore = () => {
  const store = createStore(
    combineReducers({user, donors}),
    applyMiddleware(thunk, logger),
  );
  return store;
};
