import * as ActionTypes from '../ActionTypes';
export const user = (state = {user: {}, currentLocation: {}}, action) => {
  switch (action.type) {
    case ActionTypes.STORE_USER:
      return {
        ...state,
        user: action.payload,
      };

    case ActionTypes.CLEAR_USER:
      return {
        ...state,
        user: action.payload,
      };
    case ActionTypes.ADD_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: action.payload,
      };
    default:
      return state;
  }
};
