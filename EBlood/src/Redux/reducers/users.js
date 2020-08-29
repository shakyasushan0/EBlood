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

    case ActionTypes.UPDATE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          fullName: action.payload.fullName,
          contact: action.payload.fullName,
          age: action.payload.age,
          bloodGroup: action.payload.bloodGroup,
        },
      };

    case ActionTypes.UPDATE_AVATAR:
      return {
        ...state,
        user: {
          ...state.user,
          avatar: action.payload.avatar,
        },
      };
    default:
      return state;
  }
};
