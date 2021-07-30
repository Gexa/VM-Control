import * as actionTypes from './actionTypes';
import Request from '../../service/request';

const startProgress = () => {
    return {
        type: actionTypes.VM_IN_PROGRESS
    }
}

const vmListInstances = (instanceList = []) => {
    return {
        type: actionTypes.VM_LIST_INSTANCES,
        payload: instanceList
    }
};

export const vmGetInstanceList = () => dispatch => {
    dispatch(startProgress());
    return Request({ url: '/listInstances' })
    .done( res => {
        dispatch(vmListInstances(res.servers));
    })
    .fail( err => {
        console.log("Failed to Fetch InstanceList from Server", err);
    });
}

const vmSelectInstance = (instanceData = null) => {
    return {
        type: actionTypes.VM_SELECT_INSTANCE,
        payload: instanceData
    }
}

export const vmGetInstance = (id = null) => dispatch => {
    dispatch(startProgress());
    return Request({
        url: '/getInstance',
        method: 'get',
        data: { id: id }
    })
    .done( res => {
        if (!res.server || res.server.length === 0) {
            dispatch(vmGetInstanceList());
        } else {
            dispatch(vmSelectInstance(res));
        }
    })
    .fail( err => {
        console.log("Failed to Fetch InstanceData from Server", err);
    });
}

/* const vmCreateInstance = (instanceData = null) => {
    return {
        type: actionTypes.VM_CREATE_INSTANCE,
        payload: instanceData
    }
} */

export const createInstance = () => dispatch => {
    dispatch(startProgress());
    return Request({
        url: '/createInstance',
        method: 'post'
    })
    .done( res => {
        dispatch(vmGetInstanceList());
    })
    .fail( err => {
        console.log("Failed to Fetch InstanceData from Server", err);
    });
}

/* const vmStartInstance = (instanceData = null) => {
    return {
        type: actionTypes.VM_START_INSTANCE,
        payload: instanceData
    }
} */

export const startInstance = (id = null) => dispatch => {
    dispatch(startProgress());
    return Request({
        url: '/startInstance',
        method: 'post',
        data: { id: id }
    })
    .done( res => {
        //dispatch(vmStartInstance(res.server));
        dispatch(vmGetInstanceList());
    })
    .fail( err => {
        console.log("Failed to Start Instance", err);
    });
}

/* const vmStopInstance = (instanceData = null) => {
    return {
        type: actionTypes.VM_STOP_INSTANCE,
        payload: instanceData
    }
} */

export const stopInstance = (id = null) => dispatch => {
    dispatch(startProgress());
    return Request({
        url: '/stopInstance',
        method: 'post',
        data: { id: id }
    })
    .done( res => {
        //dispatch(vmStopInstance(res.server));
        dispatch(vmGetInstanceList());
    })
    .fail( err => {
        console.log("Failed to Stop Instance", err);
    });
}

/* const vmResetInstance = (instanceData = null) => {
    return {
        type: actionTypes.VM_RESET_INSTANCE,
        payload: instanceData
    }
}
 */
export const resetInstance = (id = null) => dispatch => {
    dispatch(startProgress());
    return Request({
        url: '/resetInstance',
        method: 'post',
        data: { id: id }
    })
    .done( res => {
        //dispatch(vmResetInstance(res.server));
        dispatch(vmGetInstanceList());
    })
    .fail( err => {
        console.log("Failed to Restart Instance", err);
    });
}

const vmDeleteInstance = () => {
    return {
        type: actionTypes.VM_DELETE_INSTANCE
    }
}

export const deleteInstance = (id = null) => dispatch => {
    dispatch(startProgress());
    return Request({
        url: '/deleteInstance',
        method: 'post',
        data: { id: id }
    })
    .done( res => {
        dispatch(vmDeleteInstance());
        dispatch(vmGetInstanceList());
    })
    .fail( err => {
        console.log("Failed to Restart Instance", err);
    });
}
