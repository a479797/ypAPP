import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    Button,
    TouchableOpacity,
    Alert
} from 'react-native';

import color from '~/CommonUI/color'

var { width} = Dimensions.get('window');

export default class BidPriceItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            amount: 1,
        }
    }

    minus=() =>{
        var num = --this.state.amount ;
        this.setState((previousState, currentProps) =>{
            return {amount:num};
        });
    }

     plus = () => {
        var num = ++this.state.amount ;
         this.setState((previousState, currentProps) =>{
             return {amount:num};
         });
     }

    render() {
        return (
            <View style={styles.wrapper}>
                <TouchableOpacity onPress={this.minus}>
                <View style={styles.calculateButton}>
                    <Text style={styles.button}>-</Text>
                </View>
                </TouchableOpacity>

                <Text style={{flex: 1, textAlign: 'center'}}>
                    {this.state.amount}
                </Text>

                <TouchableOpacity onPress={this.plus}>
                <View style={styles.calculateButton}>
                    <Text style={styles.button}>+</Text>
                </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        width: (width - 30) * 2 / 3,
        borderColor: color.lineGrayColor,
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        marginLeft: 10,
        flexDirection: 'row',
        height: 30
    },

    calculateButton: {
        margin: 5,
        borderRadius: 10,
        backgroundColor: '#ff9502',
    },
    button: {
        color:'white',
        textAlign:'center',
        height:20,
        width:20,
        backgroundColor: 'transparent',
    }
})
