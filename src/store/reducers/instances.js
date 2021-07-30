import * as actionTypes from '../actions/actionTypes';

const initialState = {
    instanceCount: 0,
    instanceList: [],
    instanceSelected: null,
    instanceSelectedData: null,
    processing: true,

    serverStatus: null,
    streamStatus: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
        case actionTypes.VM_IN_PROGRESS:
            return {
                ...state,
                processing: true
            }
        case actionTypes.VM_LIST_INSTANCES:
            let newInstanceSelectedData = null;
            let newState = {
                ...state,
                processing: false,
                instanceList: action.payload,
                instanceCount: action.payload.length
            }
            if (state.instanceSelected !== null) {
                [ newInstanceSelectedData ] = action.payload.map(inst => {
                    return inst.name === state.instanceSelected && inst
                }).filter( el => el !== false);
            }
            if (newInstanceSelectedData) {
                newState = {
                    ...newState,
                    instanceSelected: newInstanceSelectedData.name,
                    instanceSelectedData: newInstanceSelectedData
                }
            }
            return newState;
        case actionTypes.VM_SELECT_INSTANCE:
        case actionTypes.VM_START_INSTANCE:
        case actionTypes.VM_STOP_INSTANCE:
        case actionTypes.VM_RESET_INSTANCE:
            return {
                ...state,
                processing: false,
                instanceSelected: action.payload.server.name,
                instanceSelectedData: action.payload.server,
                serverStatus: action.payload.status,
                streamStatus: action.payload.users
            };
        case actionTypes.VM_CREATE_INSTANCE:
            return {
                ...state,
                processing: false
            };
        case actionTypes.VM_DELETE_INSTANCE:
            return {
                ...state,
                processing: false,
                instanceSelected: null,
                instanceSelectedData: null,
                serverStatus: null,
                streamStatus: null
            };
    }
}

export default reducer;