import {AsyncStorage} from "react-native";

import {AccessToken} from 'react-native-fbsdk';

const FBSDK = require('react-native-fbsdk');
const {
    LoginManager,
} = FBSDK;

export const loginType = 'LOGIN'
export const login_success = 'LOGIN_SUCCESS'
export const login_fail = 'LOGIN_FAIL'


// 访问登录接口 根据返回结果来划分action属于哪个type,然后返回对象,给reducer处理
export function login(token) {
    return dispatch => {
        if(typeof token == "string"){
            AsyncStorage.setItem('token',token);
            dispatch(loginSuccess());
            global.token = token;
        }else {
            AsyncStorage.removeItem('token');
            dispatch(loginError());
        }
    }
}
export function logOut() {
    return dispatch => {
            AsyncStorage.removeItem('token');
            AsyncStorage.removeItem('faceBookToken');
            LoginManager.logOut();

            dispatch(loginError());
    }
}

export  function tokenExist() {
    return async dispatch => {
        const token = await AsyncStorage.getItem('token');
        const faceBookToken = await AsyncStorage.getItem('faceBookToken');
        // const data = await AccessToken.getCurrentAccessToken();

        console.log(token,faceBookToken,'33333');

        if (faceBookToken && !token){
            dispatch(login(faceBookToken));
        } else {
            dispatch(login(token));
        }
        // AsyncStorage.getItem('token').then((atoken) => {
        //     if (atoken) {
        //         dispatch(login(atoken));
        //     }
        // })
        // AccessToken.getCurrentAccessToken().then((data) => {
        //     const { accessToken } = data
        //     dispatch(login(accessToken));
        // })
    }
}


function loginSuccess() {
    console.log('loginSuccess')
    return {
        type: login_success,

    }
}

function loginError() {
    console.log('loginFail')
    return {
        type:login_fail,

    }
}
