import { UPDATE_SALES, UPDATE_STATUS } from '../actions/order.action';
import { GET_MY_ORDERS } from '../actions/order.action';

const initialState = {};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case UPDATE_SALES:
      return {
        ...state,
        data: action.payload,
      };

    case GET_MY_ORDERS:
      return action.payload;

    default:
      return state;
  }
}
