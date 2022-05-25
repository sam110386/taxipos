import {
    TRIP_LIST_LOAD,
    TRIP_LIST_SUCCESS,
    TRIP_LIST_FAIL,
    TRIP_LIST_UPDATE,
    TRIP_LIST_REMOVE
} from "../actions/TripAction";

const initialState = {
    loading: false,
    tripList: {},
    error: false
};

const TripReducer = (state = initialState, action) => {
    switch (action.type) {
        case TRIP_LIST_LOAD:
            return {
                ...state,
                loading: true,
            };
        case TRIP_LIST_SUCCESS:
            return {
                ...state,
                tripList: action.data
            };
      ;
        case TRIP_LIST_REMOVE:
            return {
                ...state,
                tripList: action.data
            };
        case TRIP_LIST_FAIL:
            return {
                ...state,
                error: true,
            };
        default:
            return state;
    }
};

export default TripReducer;
