export const SET_NUMBER = 'SET_NUMBER';
export const REMOVE_NUMBER = 'REMOVE_NUMBER';
export const LOADING_NUMBER = 'LOADING_NUMBER';
export const SetNumberAction = (data) => ({
    type: SET_NUMBER,
    data:data
});
export const RemoveNumberAction = (data) => ({
    type: REMOVE_NUMBER,
    data:data
});