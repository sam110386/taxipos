export const TRIP_LIST_LOAD = "TRIP_LIST_LOAD";
export const TRIP_LIST_SUCCESS = "TRIP_LIST_SUCCESS";
export const TRIP_LIST_FAIL = "TRIP_LIST_FAIL";
export const TRIP_LIST_REMOVE = "TRIP_LIST_REMOVE";
export const TRIP_LIST_UPDATE = "TRIP_LIST_UPDATE";


export const loadTripListData = () => ({
    type: TRIP_LIST_LOAD,
});

export const loadTripListDataSuccess = (data) => ({
    type: TRIP_LIST_SUCCESS,
    data:data
});
export const loadTripListUpdate = (data) => ({
    type: TRIP_LIST_UPDATE,
    data:data
});
export const loadTripListDataRemove = (data) => ({
    type: TRIP_LIST_REMOVE,
    data:data
});

export const loadTripListDataFail = (error) => ({
    type: TRIP_LIST_FAIL,
    data:error
});


