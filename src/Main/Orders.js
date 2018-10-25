import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class Orders extends Component{
    static navigationOptions = ({navigation,navigationOptions }) => {
        return {
            headerMode:'float',
            title: navigation.getParam('name', 'Orders'),
            navigationOptions:{
            }
        };
    };



    render(){

        return(
            <View>
                <Text>
                    Orders
                </Text>
            </View>
        );
    }
}
