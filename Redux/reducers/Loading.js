
const defaultUser = {
    netloading:false,
}

export default (state = defaultUser,action)=>{
    switch (action.type) {
        case 'show':
            return {
                ...state,
                netloading:true,
            }
        case 'hide':
            return {
                ...state,
                netloading:false,
            }
        default:
            return state;
    }
}

