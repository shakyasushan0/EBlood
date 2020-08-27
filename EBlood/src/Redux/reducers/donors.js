import * as ActionTypes from '../ActionTypes';

export const donors = (state = {donors: []}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_DONOR:
      return {
        ...state,
        donors: action.payload,
      };
    default:
      return state;
  }
};
