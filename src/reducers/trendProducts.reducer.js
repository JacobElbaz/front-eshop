import { GET_TREND } from "../actions/products.action";

const initialState = {};

export default function trendProductsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TREND:
      return action.payload
    default: 
      return state;
  }
}