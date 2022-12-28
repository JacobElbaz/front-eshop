import { GET_BEST, GET_BEST_MANAGER } from "../actions/products.action";

const initialState = {};

export default function bestSellerReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BEST:
      return action.payload
    case GET_BEST_MANAGER:
      return action.payload
    default: 
      return state;
  }
}