import { GET_DEALS } from "../actions/products.action";

const initialState = {};

export default function dealsProductsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DEALS:
      return action.payload
    default: 
      return state;
  }
}