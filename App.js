/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';

import Root from '~/src/root'
import {
    AppRegistry,
} from 'react-native';
import Provider from "react-redux/es/components/Provider";
import createrStore from '~/Redux/store/store'
const store = createrStore();

export default class App extends Component{
    render() {
        return (
            <Provider store={store}>
                <Root/>
            </Provider>
        )
    }
}


