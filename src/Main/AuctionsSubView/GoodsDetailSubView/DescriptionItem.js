import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
} from 'react-native';

import color from '~/CommonUI/color'

var {height, width} = Dimensions.get('window');

export default class DescriptionItem extends Component{
    render(){
        return(
            <View style={styles.wrapper}>
                <Text style={{fontSize:10,color:color.fontGrayColor}}>
                    {this.props.type=='0'?'Ends In':(this.props.type=='1'?'Current Bid':"Current Winner")}
                </Text>
                <Text style={[this.props.type==0?styles.countDown:(this.props.type==1?styles.currentBid:styles.winner),{marginTop:3}]}>
                    {this.props.content}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        width:width/3,
        borderRightWidth:1,
        borderColor:color.lineGrayColor,
        alignItems:'center',
    },
    countDown: {
        color:'red',
        fontSize: 14,
    },
    currentBid: {
        fontSize:14,
    },
    winner: {
        fontSize:11,
    }


})
