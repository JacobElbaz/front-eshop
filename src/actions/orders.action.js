import axios from 'axios';
export const GET_ORDERS = 'GET_ORDERS';


export const getOrders = () => {
    return async (dispatch) => {
        try {
            const res = await axios
                .get(`${process.env.REACT_APP_API_URL}api/order`);
            dispatch({ type: GET_ORDERS, payload: res.data });
        } catch (err) {
            return console.log(err);
        }
    };
}