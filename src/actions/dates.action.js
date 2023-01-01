import axios from 'axios';

export const ADD_DATE = 'ADD_DATE';
export const GET_DATES = 'GET_DATES';

export const addDate = (newDate) => async (dispatch) => {

    
    try {
      const { data } = await axios.put(`${process.env.REACT_APP_API_URL}api/dates/`, {newDate});
  
      dispatch({ type: ADD_DATE, payload: data });
  
    } catch (error) {
      console.log(error);
    }
  };

export const getDates = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}api/dates/`);
    dispatch({ type: GET_DATES, payload: data});
  } catch (err) {
    console.log(err);
  }
};