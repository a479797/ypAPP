
export function changeClient(cl) {
    return dispatch => {
        dispatch(b(cl));
    }
}

function a() {
    return {
        type: 'default',
    }
}

function b(cl) {
    return {
        type:'change',
        cl
    }
}
