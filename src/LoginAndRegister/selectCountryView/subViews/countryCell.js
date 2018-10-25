import React, {Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';
import color from '~/CommonUI/color'

var {height, width} = Dimensions.get('window');

export default class SelectCountryView extends Component {
    render() {
        const {isSelected} = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.countryWrapper}>
                    <Image source={require('~/resource/chinaflag.png')}/>
                    <Text style={{marginLeft: 15}}>
                        {this.props.country.name}
                    </Text>
                </View>
                {
                    isSelected ? <Image style={styles.iconSize} source={require('~/resource/check.png')}/> : null
                }
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'row',
        width: width - 30,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: color.lineGrayColor,
        padding: 10,
        justifyContent: 'space-between'
    },
    countryWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    iconSize: {
        width: 22,
        height: 12,
        resizeMode: 'contain'
    }

});
