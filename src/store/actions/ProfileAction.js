 export const PUBNUB_KEYS = "PUBNUB_KEYS"
 export const GOOGLE_PLACE_API_KEY = "GOOGLE_PLACE_API_KEY"  
 export const REMOVE_ALL_KEYS = "REMOVE_ALL_KEYS"

export const pubnubkeyaction = (data) =>({
    type: PUBNUB_KEYS,
    data: data
})

export const googlekeyaction = (data) =>({
    type: GOOGLE_PLACE_API_KEY,
    data: data
})

export const removeallkeysaction = () =>({
    type: REMOVE_ALL_KEYS
})


