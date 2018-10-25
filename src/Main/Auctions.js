import React, {Component} from 'react';
import {
    AppRegistry, Button, Image,
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity,
    ScrollView,
    FlatList, TouchableHighlight

} from 'react-native';

import CategoryButton from '~/src/Main/AuctionsSubView/CategoryButton'
import GoodsListItem from '~/src/Main/AuctionsSubView/GoodsListItem'
import color from '~/CommonUI/color'

export default class Auctions extends Component {
    static navigationOptions = ({navigation, navigationOptions}) => {
        console.log(navigation,navigationOptions);
        return {
            headerMode: 'float',
            tabBarLabel:'ewq',
            navigationOptions: ()=>{

            },
            //主标题
            headerTitle: ({tintColor}) => (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{width: 20, height: 20, marginRight: 10}}
                           source={{uri: 'https://www.chilindo.com/Gfx/Bid-Again.png'}}/>
                    <Text style={{color: color.themeColor, fontWeight: '900', fontSize: 19, fontStyle: 'italic'}}>
                        Chilindo
                    </Text>
                </View>
            ),
            //右边按钮
            headerRight: (
                <TouchableOpacity activeOpacity={0.2} focusedOpacity={0.5}>
                    <Image style={{width: 20, height: 20, marginRight: 10}}
                           source={require('~/resource/rightButton.png')}/>
                </TouchableOpacity>

            ),
            //左边按钮
            headerLeft: (
                <TouchableOpacity activeOpacity={0.2} focusedOpacity={0.5}>
                    <Image style={{width: 20, height: 20, marginLeft: 15}} source={require('~/resource/leftMenu.png')}/>
                </TouchableOpacity>
            ),

        };
    };

    static tabNavigation
    constructor(props) {
        super(props)
        this.state = {
            refreshing: false,
        }
    }

    // 下拉刷新
    headerRefresh = () => {
        this.setState({
            refreshing: true,
        });

        setTimeout(() => {
            this.setState({
                refreshing: false,
            });
        }, 5000)
    }

    render() {
        var goodsList = [];
        for (var i = 0; i < 20; i++) {
            var row = i;
            goodsList.push(row);
        }
        return (
            <View style={{flexDirection: 'column', flex: 1, backgroundColor: 'white'}}>

                <View style={{flexDirection: 'row', justifyContent: 'space-around', margin: 10}}>
                    <CategoryButton title='All' type={0} pic={require('~/resource/all.png')}/>
                    <CategoryButton title='Bid again' type={1} pic={require('~/resource/BidAg.png')}/>
                </View>

                <FlatList
                    data={
                        [
                            {'key': '1'}, {'key': '2'}, {'key': '3'}, {'key': '4'}, {'key': '5'}, {'key': '6'}
                        ]
                    }
                    renderItem={({item, index}) =>
                        <View style={{flexDirection: 'row'}}>
                            <GoodsListItem navigation={this.props.navigation} time={index} price={item.key + ' CNY'}/>
                            <GoodsListItem navigation={this.props.navigation} time={index} price={item.key + ' CNY'}/>
                            <GoodsListItem navigation={this.props.navigation} time={index} price={item.key + ' CNY'}/>
                        </View>
                    }
                    onRefresh={this.headerRefresh}
                    refreshing={this.state.refreshing}
                    removeClippedSubviews={false}

                />
            </View>
        );
    }
}
// <Button onPress={() => this.props.navigation.navigate('GoodsDetail')} title='okok'>  </Button>
