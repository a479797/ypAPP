import client from '~/graphql/graphqlClient'

var aClient = client();

const dc = {
    cl:aClient,
}

export default (state = dc,action)=>{
    switch (action.type) {
        case 'default':
            return {
                ...state,
            }
        case 'change':
            return {
                ...state,
                ...action
            }
        default:
            return state;
    }
}

