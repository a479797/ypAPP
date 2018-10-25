import {loginTpye,login_success,login_fail} from '~/Redux/actions/LoginAction'
// import {token} from "~/Tools/token"

const defaultUser = {
    isLogin:true,
}

export default (state = defaultUser,action)=>{
    switch (action.type) {
        case loginTpye:
            return {
                ...state,
                ...defaultUser,
                isLogin:action.isLogin,
            }
        case 'LOGIN_SUCCESS':
                return {
                    ...state,
                    ...defaultUser,
                    isLogin:true,
                }
        case login_fail:
            return {
             ...state,
                ...defaultUser,
                isLogin: false
            }
        default:
            return state;
    }
}

