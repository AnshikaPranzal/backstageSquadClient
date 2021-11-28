export const storeSearchedData = payload => ({
    type : "STORE_SEARCHED_DATA",
    payload
});

export const setLoader = payload => ({
    type : "SET_LOADER",
    payload
});

export const setErrorMsg = payload => ({
    type : "SET_ERROR_MSG",
    payload
});

export const setSuccessMsg = payload => ({
    type : "SET_SUCCESS_MSG",
    payload
});

export const storeSearchedUser = payload => ({
    type : "STORE_SEARCHED_USER",
    payload
});

export const storeSearchResults = payload => ({
    type : "STORE_SEARCHED_RESULT",
    payload
});

export const switchSearchedId = payload => ({
    type : "SWITCH_SEARCH_ID",
    payload
});

export const handleSearchLoading = payload => ({
    type : "HANDLE_SEARCH_LOADING",
    payload
});

export const storeUser = payload => ({
    type : "STORE_USER",
    payload
});

export const storeBestIdea = payload => ({
    type: "STORE_BEST_IDEA",
    payload
});

export const storeAllIdea = payload => ({
    type: "STORE_IDEA",
    payload
})

export const storeAllEvents = payload => ({
    type: "STORE_EVENTS",
    payload
})

export const storeAllSpeakers = payload => ({
    type: "STORE_SPEAKERS",
    payload
})

export const storeAllVenues = payload => ({
    type: "STORE_VENUES",
    payload
})

export const storeEvent = payload => ({
    type: "STORE_EVENT",
    payload
})

export const storeUserEngagements = payload => ({
    type: "STORE_USER_ENGAGEMENTS",
    payload
})