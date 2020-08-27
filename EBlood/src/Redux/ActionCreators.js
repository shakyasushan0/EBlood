import * as ActionTypes from './ActionTypes';

export const storeUser = (data) => {
  return {
    type: ActionTypes.STORE_USER,
    payload: data,
  };
};

export const clearUser = () => {
  return {
    type: ActionTypes.CLEAR_USER,
    payload: null,
  };
};
