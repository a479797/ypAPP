import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

export default class GoodsDetail extends Component{
    render(){
        return(
            <View style={{alignItems: 'center'}}>
                <Image style={{width:35,height:35}} source={this.props.pic}/>
                <Text style={[this.props.type == 0?styles.all:styles.bidAg,{fontSize:12,paddingTop:3}]}>
                    {this.props.title}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    all:{
        color:'#8bd737',
    },
    bidAg:{
        color:'#435a62',
    }
})
