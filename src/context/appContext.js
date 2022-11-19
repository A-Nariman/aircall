import React, { 
    createContext, 
    useReducer,
    useContext } from 'react';

const setItems = (dispatch, payload) => {
    dispatch({
        type: "SETITEM",
        payload: payload
    });
}

const setArchivedItems = (dispatch, payload) => {
    dispatch({
        type: "SETARCHIVEDITEM",
        payload: payload
    });
}
/* -------------------------------------------------------------------------- */
const AppStateContext       = createContext();
const AppDispatchContext    = createContext();

// Initial state of the app context
const initialState = {
    items: [],
    archived_items: []
}

const appReducer = (state, action) => {
    switch (action.type) {
        case "SETITEM":
            return {
                ...state, 
                items: action.payload
            }
        case "SETARCHIVEDITEM":
            return {
                ...state, 
                archived_items: action.payload
            }
        default:
            return state;
    }
}

const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return(
        <AppStateContext.Provider value={state}>
            <AppDispatchContext.Provider value={dispatch}>
                {children}
            </AppDispatchContext.Provider>
        </AppStateContext.Provider>
    )
}

// returns the current state
const useAppState = () => {
    const state = useContext(AppStateContext);
    return state;
}

// returns the dispatch of this context to apply an action
const useAppDispatch = () => {
    const dispatch = useContext(AppDispatchContext);
    return dispatch;
}

export {
    AppProvider,
    useAppState,
    useAppDispatch,
    setItems,
    setArchivedItems
}