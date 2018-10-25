import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableHighlight
} from 'react-native';

var {height, width} = Dimensions.get('window');

var space = 3;
var goodsWrapperWidth = width / 3;
var goodsImageViewWidth = goodsWrapperWidth - space * 2
var goodsImageViewHeight = goodsImageViewWidth * 1.4;

export default class GoodsListItem extends Component {

    render() {
        return (
            <View >
                <TouchableHighlight underlayColor='#fff' onPress={() => {
                    this.props.navigation.navigate('GoodsDetail')
                }}>
                    <View style={styles.wrapper}>
                        <Image style={styles.goodsImageView} source={require('~/resource/goodsItem.png')}/>
                        <Text style={[styles.countDownText, {marginBottom: 2.5}]}>
                            00:03:16
                        </Text>
                        <View style={{flexDirection: 'row', paddingLeft: 10, paddingRight: 10, marginBottom: 5}}>
                            <Image style={styles.logo} source={require('~/resource/BidAg.png')}/>
                            <Text style={styles.price}>
                                {this.props.price}
                            </Text>

                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

// 样式文件
const styles = StyleSheet.create({
    wrapper: {
        width: goodsWrapperWidth,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#f0f0f0'
    },
    goodsImageView: {
        width: goodsImageViewWidth,
        height: goodsImageViewHeight,
        margin: space,
    },
    countDownText: {
        color: 'red',
        fontSize: 11,
    },
    logo: {
        width: 13,
        height: 13,
    },
    price: {
        fontSize: 12,
        marginLeft: 8
    }


});

