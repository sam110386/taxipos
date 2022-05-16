import { SET_CALLERID,REMOVE_CALLERID,LOADING_CALLERID} from "../actions/SetCallerIdAction";

const initialState = {
    loading: false,
    callerid: [],
    error: false
};

const SetCallerIdReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_CALLERID:
            return {
                ...state,
                loading: true,
            };
        case SET_CALLERID:
            return {
                ...state,
                callerid:state.callerid.concat(action.data)
            };

        case REMOVE_CALLERID:
            return {
                ...state,
                callerid:state.callerid.filter((callerid,i)=>callerid.url_send_id !== action.data) 
            };
        default:
            return state;
    }
};

export default SetCallerIdReducer;
