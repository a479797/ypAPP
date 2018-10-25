import React, {Component} from 'react';
import {ApolloProvider} from 'react-apollo';
import Master from "./master";
import {connect} from "react-redux";
import { I18n } from '~/locales/tools/I18n'

class Root extends Component {
    render() {
        const {client} = this.props;
        global.lang = I18n;
        return (
            <ApolloProvider client={client}>
                    <Master/>
            </ApolloProvider>
        )
    }
}


const reduxDispatch = (dispatch)=>{
    return{

    }
}
const reduxState = (state)=>{
    return{
        client:state.httpClient.cl
    }
}
export default connect(reduxState,reduxDispatch)(Root);

