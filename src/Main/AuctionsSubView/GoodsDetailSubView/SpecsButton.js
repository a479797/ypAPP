import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image, Dimensions,
} from 'react-native';
var {height, width} = Dimensions.get('window');

import color from '~/CommonUI/color'

export default class SpecsButton extends Component{
    render(){
        return(
            <View style={[styles.specsSelectWrapper,this.props.type==1?styles.right:'']} >
                <View style={{flex:1,flexDirection: 'row',alignItems: 'center'}}>
                    <Text  style={{color:color.fontGrayColor,flex: 1,textAlign: 'center'}}>Pink</Text>
                    <View>
                        <Image style={styles.logo} source={require('~/resource/arrow_down.png')}/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    specsSelectWrapper:{
        borderColor: color.lineGrayColor,
        borderWidth: 1,
        borderRadius:10,
        alignItems: 'center',
        marginLeft: 10,
        width: (width-30)/3,
        height:30,
    },
    logo:{
        width:10,
        height:6,
        marginRight: 8,
    },
    right:{
        width:(width-30)*2/3,
    }

})
