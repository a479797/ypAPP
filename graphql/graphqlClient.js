import {setContext} from 'apollo-link-context';
import {createHttpLink} from 'apollo-link-http';
import {HttpLink, InMemoryCache} from "apollo-client-preset";
import ApolloClient from 'apollo-client';

import {
    AsyncStorage
} from 'react-native';


var aClient = (parms) => {
    console.log(parms,'uuuu')

    var httpUri = 'http://dev-backend.u-pin.org:81/api/graphql/';
    var httpToken = null;
    if (parms && typeof(parms) =='object' ) {
        if ('uri' in parms) {
            if (typeof(parms.uri) == 'string') {
                httpUri = parms.uri;
            }
        }
        if ('token' in parms) {
            if (typeof(parms.token) == 'string') {
                httpToken = parms.token;
                AsyncStorage.setItem('token',httpToken)
            }
        }
    }
    var httpLink = createHttpLink({
        uri: httpUri
    });

    var authLink = setContext(async (_, {headers}) => {

        var token = await AsyncStorage.getItem('token');

        if (typeof(httpToken) == 'string'){
            token = httpToken;
        }
        console.log(httpToken,token,parms,'changeLoginToken')

        return {
            headers: {
                ...headers,
                authorization: token ? token : ''
            }
        }
    });



    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
    });
}

export default aClient;
