export const SET_CALLERID = 'SET_CALLERID';
export const REMOVE_CALLERID = 'REMOVE_CALLERID';
export const LOADING_CALLERID = 'LOADING_CALLERID';

export const setCallerIdAction = (data) => ({
    type: SET_CALLERID,
    data:data
});
export const removeCallerIdAction = (data) => ({
    type: REMOVE_CALLERID,
    data:data
});