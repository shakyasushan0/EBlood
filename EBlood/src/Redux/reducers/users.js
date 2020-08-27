import * as ActionTypes from '../ActionTypes';
export const user = (state = {user: {}}, action) => {
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
    default:
      return state;
  }
};
