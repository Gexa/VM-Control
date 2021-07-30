import * as actionTypes from '../actions/actionTypes';

const initialState = {
    systemMessage: null
};

const reducer = (state = initialState, action) => {
    //console.log('[DISPATCHING] [SYSTEM]', action);
    switch (action.type) {
        case actionTypes.SYSTEM_SET_MESSAGE:
            return { ...state, systemMessage: action.payload };
        case actionTypes.SYSTEM_CLEAR_MESSAGE:
            return { ...state, systemMessage: null };
        default:
            return state;
    }
}

export default reducer;