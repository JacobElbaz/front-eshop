import { GET_ORDERS } from "../actions/orders.action";

const initialState = {};

export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.payload
    default: 
      return state;
  }
}