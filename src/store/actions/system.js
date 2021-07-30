import * as actionTypes from './actionTypes';

export const systemSetMessage = (msgData) => {
    return {
        type: actionTypes.SYSTEM_SET_MESSAGE,
        payload: msgData
    }
};

export const systemClearMessage = () => {
    return {
        type: actionTypes.SYSTEM_CLEAR_MESSAGE
    }
};