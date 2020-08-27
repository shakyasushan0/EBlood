import * as ActionTypes from './ActionTypes';

export const storeUser = (data) => {
  return {
    type: ActionTypes.STORE_USER,
    payload: data,
  };
};

export const addCurrentLocation = (data) => {
  return {
    type: ActionTypes.ADD_CURRENT_LOCATION,
    payload: data,
  };
};

export const clearUser = () => {
  return {
    type: ActionTypes.CLEAR_USER,
    payload: null,
  };
};
// DOnors

export const addDonor = (data) => {
  return {
    type: ActionTypes.ADD_DONOR,
    payload: data,
  };
};
