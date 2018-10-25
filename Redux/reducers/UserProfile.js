
const defaultUser = {
    userDic: {
        username: '',
        name: '',
        lastname: '',
        email: '',
        phone: '',
        language: '',
        subscribe: '',
        id: ''
    }
}

export default (state = defaultUser,action)=>{

    switch (action.type) {
        case 'editUser':
            return {
                ...state,
                ...action
        }
        case 'removeUser':
            return {
                ...state,
                ...defaultUser,
            }
        default:
            return state;
    }
}

