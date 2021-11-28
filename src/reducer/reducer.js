// const speakers = [
//     {name: 'Anshika Pranzal', about: 'Coder & Speaker', email: 'anshika@gmail.com'},
//     {name: 'Poulomi Chandra', about: 'Coder & Speaker', email: 'poulomi@gmail.com'},
//     {name: 'Saman Ayesha', about: 'Coder & Speaker', email: 'saman@gmail.com'},
//     {name: 'Rasika Kedia', about: 'Coder & Speaker', email: 'rasika@gmail.com'},
//     {name: 'Prachet Bhuyan', about: 'Coder & Speaker', email: 'prachet@gmail.com'}
// ];

const initState = {
    user : {},
    loader: true,
    errorMsg: '',
    successMsg: '',
    bestIdea: {},
    openEvent: {},
    allIdeas : [],
    allEvents : [],
    allSpeakers: [],
    allVenues: [],
    searchedId : 0,
    searchedUser:[],
    searchedData : '',
    searchedResult : [],
    searchLoading: false
};

const myReducer = (state = initState, action) => {
    switch(action.type){
        case "STORE_SEARCHED_DATA":
            return {
                ...state,
                searchedData : action.payload
            };
        case "SET_LOADER":
            return {
                ...state,
                loader : action.payload
            };
        case "SET_ERROR_MSG":
            return {
                ...state,
                errorMsg : action.payload
            };
        case "SET_SUCCESS_MSG":
            return {
                ...state,
                successMsg : action.payload
            };
        case "STORE_SEARCHED_USER":
            return {
                ...state,
                searchedUser : action.payload
            };
        case "STORE_SEARCHED_RESULT":
            return {
                ...state,
                searchedResult :  [...action.payload]
            };
        case "SWITCH_SEARCH_ID":
            return {
                ...state,
                searchedId: action.payload,
                searchedResult: []
            };
        case "HANDLE_SEARCH_LOADING":
            return{
                ...state,
                searchLoading : action.payload
            };
        case "STORE_USER":
            return{
                ...state,
                user : action.payload
            }
        case "STORE_BEST_IDEA":
            return {
                ...state,
                bestIdea: action.payload
            }
        case "STORE_IDEA":
            return {
                ...state,
                allIdeas: action.payload
            }
        case "STORE_EVENTS":
            return {
                ...state,
                allEvents: action.payload
            }
        case "STORE_EVENT":
            return {
                ...state,
                openEvent: action.payload
            }
        case "STORE_SPEAKERS":
            return {
                ...state,
                allSpeakers: action.payload
            }
        case "STORE_VENUES":
            return {
                ...state,
                allVenues: action.payload
            }
        default :
            return state;
            
    }
}

export default myReducer;