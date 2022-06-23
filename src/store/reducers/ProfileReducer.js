import { PUBNUB_KEYS,GOOGLE_PLACE_API_KEY } from "../actions/ProfileAction"

const initialState = {
    pubnubkeys: null,
   googleplaceapikey: null
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case PUBNUB_KEYS:
            return {
                ...state,
                pubnubkeys: action.data,
            };
            case GOOGLE_PLACE_API_KEY:
                return {
                    ...state,
                    googleplaceapikey: action.data,
                };
        default:
            return state;
    }
};

export default profileReducer;