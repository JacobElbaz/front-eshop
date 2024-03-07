import {
  FORGOT_PASSWORD,
  GET_USER,
  UPDATE_PASSWORD,
  UPDATE_PROFILE,
  UPDATE_USERNAME,
  UPDATE_WISH_PRODUCT,
  ADD_WISH_PRODUCT,
  REMOVE_WISH_PRODUCT,
  DELETE_USER,
  GET_CURRENT_USER,
} from '../actions/user.action';

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CURRENT_USER:
      return action.payload;
      
    case GET_USER:
      return action.payload;

    case UPDATE_PROFILE:
      return {
        ...state,
        data: action.payload,
      };

    case FORGOT_PASSWORD:
      return {
        ...state,
        data: action.payload,
      };

    case UPDATE_PASSWORD:
      return {
        ...state,
        data: action.payload,
      };

    case UPDATE_USERNAME:
      return {
        ...state,
        data: action.payload,
      };

    case UPDATE_WISH_PRODUCT:
      return {
        ...state,
        data: {
          ...state.data,
          wishlist: [...action.payload],
        },
      };
    case ADD_WISH_PRODUCT:
      return {
        ...state,
        data: {
          ...state.data,
          wishlist: [...action.payload],
        },
      };
    case REMOVE_WISH_PRODUCT:
      return {
        ...state,
        data: {
          ...state.data,
          wishlist: [...action.payload],
        },
      };

    case DELETE_USER:
      return { ...state };

    default:
      return state;
  }
}
