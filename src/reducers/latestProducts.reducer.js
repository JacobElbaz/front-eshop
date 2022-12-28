import { GET_LATEST } from "../actions/products.action";

const initialState = {};

export default function latestProductsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LATEST:
      return action.payload
    default: 
      return state;
  }
}