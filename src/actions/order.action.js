import axios from 'axios';
export const CREATE_ORDER = 'CREATE_ORDER';
export const UPDATE_STATUS = 'UPDATE_STATUS';
export const GET_MY_ORDERS = 'GET_MY_ORDERS';
export const UPDATE_SALES = 'UPDATE_SALES';

export const createOrder = (order) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}api/order`,
        order
      );
      dispatch({ type: CREATE_ORDER });
    } catch (err) {
      console.log(err);
    }
  };
};
export const updateSales = (cart) => {
  console.log(cart);
  return async (dispatch) => {
    return axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}api/order/updatesales`,
      data: { cart },
    })
      .then((res) => {
        dispatch({ type: UPDATE_SALES, payload: cart });
      })
      .catch((err) => console.log(err + ' rdstg ' + cart));
  };
};

export const updateStatus = (orderId, status) => {
  return async (dispatch) => {
    return axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}api/order/` + orderId,
      data: { status },
    })
      .then((res) => {
        dispatch({ type: UPDATE_STATUS, payload: status });
      })
      .catch((err) => console.log(err));
  };
};


export const getMyOrders = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}api/order/${id}/myorders`
      );
      dispatch({ type: GET_MY_ORDERS, payload: res.data });
    } catch (err) {
      return console.log(err);
    }
  };
};
