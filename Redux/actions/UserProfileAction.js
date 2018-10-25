import {AsyncStorage} from "react-native";


export function creatUser(userDic) {
    return dispatch => {
            dispatch(editUser(userDic));
    }
}

export function editUser(userDic) {
    return {
        type: 'editUser',
        userDic
    }
}

export function removeUser() {
    return {
        type: 'removeUser',
    }
}
