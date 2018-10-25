const defaultLanguage = {
    language:false,
}

export default (state = defaultLanguage,action)=>{
    switch (action.type) {
        case 'changeA':
            return {
                ...state,
                language:true,
            }
        case 'changeB':
            return {
                ...state,
                language:false,
            }
        default:
            return state;
    }
}

