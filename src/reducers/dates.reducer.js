import { ADD_DATE, GET_DATES } from "../actions/dates.action";

const initialState = {};

export default function datesReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_DATE:
            return {
                ...state,
                data: {
                    ...state.data,
                    dates: [...action.payload],
                },
            };

        case GET_DATES:
            return action.payload;
        default:
            return state;

    }
}