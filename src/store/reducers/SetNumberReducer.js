import { SET_NUMBER,REMOVE_NUMBER,LOADING_NUMBER} from "../actions/SetNumberAction";

const initialState = {
    loading: false,
    number: [],
    error: false
};

const SetNumberReducer = (state = initialState, action) => {
    console.log(action.data,"action data")
    switch (action.type) {
        case LOADING_NUMBER:
            return {
                ...state,
                loading: true,
            };
        case SET_NUMBER:
            return {
                ...state,
                number:action.payload
            };

        case REMOVE_NUMBER:
            return {
                ...state,
                number: action.data
            };
        default:
            return state;
    }
};

export default SetNumberReducer;
