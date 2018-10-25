import React, {Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    Text
} from 'react-native';

var {height, width} = Dimensions.get('window');

export default class AlphaBgView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={{color: 'white', fontSize: 26}}>Loading...</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        width: width,
        height: height,
        position: 'absolute',
        justifyContent: "center"
    }
});
