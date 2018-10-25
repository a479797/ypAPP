import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    FlatList,
    Image,
    Dimensions,
    LayoutAnimation,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import { I18n } from '~/locales/tools/I18n'

import color from '~/CommonUI/color.js'

import DescriptionItem from '~/src/Main/AuctionsSubView/GoodsDetailSubView/DescriptionItem'
import SpecsButton from '~/src/Main/AuctionsSubView/GoodsDetailSubView/SpecsButton'
import BidPriceItem from '~/src/Main/AuctionsSubView/GoodsDetailSubView/BidPriceItem'
import BidHistory from '~/src/Main/AuctionsSubView/GoodsDetailSubView/BidHistory'
import DeviceInfo from "react-native-device-info";
import connect from "react-redux/es/connect/connect";

var {height, width} = Dimensions.get('window');

class GoodsDetail extends Component {
    static navigationOptions = ({navigation, navigationOptions}) => {
        return {
            headerMode: 'float',
            title: 'iPhone X Retina OS',
            headerTintColor: 'black'
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            isSelect: false,
        }
    }

    // 显示出价历史列表
    bidHistoryShow = () => {
        LayoutAnimation.easeInEaseOut();
        this.setState({isSelect: !this.state.isSelect});
    }

    componentDidMount() {
        var index = 0;
        this.timer = setInterval(
            () => {
                index++;
                if (index >= 4) {
                    index = 0;
                    this.refs.imageBrowser.scrollToOffset({animated: false, offset: 0});
                    return;
                } else {
                    this.refs.imageBrowser.scrollToOffset({animated: true, offset: width * index});
                }
            },
            2000
        );
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);//清除定时器
    }

    //监测scrollview滑动offset
    scrollViewDidSroll=(e)=>{
        console.log(e.nativeEvent.contentOffset.x);
    }

    render() {
        var imageList = [];
        var url = require('~/resource/image1.png');
        imageList.push(require('~/resource/image1.png'));
        imageList.push(require('~/resource/image2.png'));
        imageList.push(require('~/resource/image3.png'));
        imageList.push(require('~/resource/image4.png'));

        var historyDataList = [
            {username: 'kobe', price: '32 CNY', time: '29/08/2018, 11:0029/08/2018, 11:0029/08/2018, 11:00', id: '1'},

        ];

        // for (var i = 0; i < historyDataList.length; i++) {
        //     var dic = historyDataList[i];
        //     dic.id = toString(i);
        //     console.log(toString(i),dic.id);
        // }

        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <ScrollView  style={{flex: 1}}>
                    {/*图片轮播*/}
                    <FlatList
                        onMomentumScrollEnd={this.scrollViewDidSroll}
                        onScrollBeginDrag = {()=>{this.timer && clearTimeout(this.timer)}}
                        ref='imageBrowser'
                        data={[
                            {key: '1'},
                            {key: '2'},
                            {key: '3'},
                            {key: '4'}
                        ]}
                        renderItem={({item, index}) =>
                            <View style={styles.imageWrapper}>
                                <Image style={styles.imageView} source={imageList[index]}/>
                            </View>
                        }
                        horizontal={true}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        removeClippedSubviews={false}
                    />

                    {/*倒计时 价格 获胜者*/}
                    <View style={{flexDirection: 'row', width: width, marginTop: 7}}>
                        <DescriptionItem type='0' content='00:12:30'/>
                        <DescriptionItem type='1' content='8  CNY'/>
                        <DescriptionItem type='2' content='Kobe Bryant'/>
                    </View>

                    {/*规格 出价*/}
                    <View style={{width: width, flexDirection: 'row', marginTop: 7}}>
                        <SpecsButton/>
                        <BidPriceItem/>
                    </View>

                    {/*运输描述*/}
                    <View style={styles.deliverDesWrapper}>
                        <Image style={styles.deliverIcon} source={require('~/resource/deliver.png')}/>
                        <View style={styles.deliverTextWrapper}>
                            <Text style={{color: 'white', fontSize: 13}}>
                                Buy as much as you like!
                            </Text>
                            <Text style={{color: 'white', fontSize: 13}}>
                                We ship to all of china for only 8.88 CNY!
                            </Text>
                        </View>
                    </View>

                    {/*竞拍出价历史*/}
                    <TouchableOpacity onPress={this.bidHistoryShow}>
                        <View style={[styles.deliverDesWrapper, {
                            marginTop: 0,
                            paddingTop: 13,
                            paddingBottom: 13,
                            backgroundColor: 'white',
                            borderBottomWidth: 1,
                            borderColor: color.lineGrayColor
                        }]}>
                            <Image style={styles.deliverIcon} source={require('~/resource/historylogo.png')}/>
                            <Text style={{flex: 1}}>Bidding History</Text>
                            <Image style={styles.logo} source={require('~/resource/arrow_down.png')}/>
                        </View>
                    </TouchableOpacity>

                    {/*出价历史列表*/}
                    {
                        this.state.isSelect ?
                            <View>
                                <BidHistory datas={historyDataList}/>
                            </View>


                            : null
                    }

                    {/*商品详情*/}
                    <View style={{width: width, paddingLeft: 10, paddingRight: 10}}>
                        {/*Product detail*/}
                        <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 10, paddingBottom: 10}}>
                            <Text style={{color: color.fontDarkGrayColor, flex: 1, fontSize: 15}}>Product Details</Text>
                            <TouchableOpacity>
                                <View style={{
                                    paddingTop: 7,
                                    paddingBottom: 7,
                                    paddingLeft: 11,
                                    paddingRight: 11,
                                    backgroundColor: '#7de81b',
                                    borderRadius: 7,
                                }}>
                                    <Text style={{color: 'white', backgroundColor: 'transparent'}}>
                                        In Stock
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {/*--型号--*/}
                        <View style={{padding: 10, backgroundColor: color.backgroundGrayColor, borderRadius: 8}}>
                            <Text>
                                Item No:434-452
                            </Text>
                            <Text style={{fontSize: 14}}>
                                Auction No:2000155596
                            </Text>
                        </View>

                        {/*--描述--*/}
                        <Text style={{color: color.fontDarkGrayColor, fontSize: 14, marginTop: 7, marginBottom: 7}}>
                            Product Description
                        </Text>

                        {/*--详细内容--*/}
                        <View style={{
                            padding: 10,
                            backgroundColor: color.backgroundGrayColor,
                            borderRadius: 8,
                            marginBottom: 10
                        }}>
                            <Text style={{marginBottom: 20}}>
                                {global.lang.t('app.welcome')}
                            </Text>
                            <Text style={{fontSize: 14}}>
                                - Infant clothes gift set
                            </Text>
                            <Text style={{fontSize: 14}}>
                                - Made from 100% cotton,soft to the touch and friendly to the baby's skin
                            </Text>
                            <Text style={{fontSize: 14}}>
                                - Comfy,cozy,and breathabel
                            </Text>
                            <Text style={{fontSize: 14}}>
                                - Suitable for infants 0-6 months old/3-5kg
                            </Text>
                        </View>
                    </View>
                </ScrollView>

                {/*Bid按钮*/}
                <TouchableOpacity onPress={() => this.refreshLanguage(0)}>
                    <View style={{backgroundColor: color.themeColor, alignItems: 'center', padding: 10}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image style={{width: 25, height: 25, resizeMode: 'contain'}}
                                   source={require('~/resource/BidAg.png/')}/>
                            <Text style={{marginLeft: 10, fontSize: 17, color: 'white', fontWeight: '700'}}>
                                Bid
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>

            </View>
        );
    }
    refreshLanguage = (index) => {

        switch (index) {
            case 0:
                I18n.locale = 'en';
                break;
            case 1:
                I18n.locale = 'zh-Hans-US';
                break;
            case 2:
                I18n.locale = 'th';
                break;
            case 3:
                I18n.locale = DeviceInfo.getDeviceLocale();
                break;
        }

        this.setState({
            localeLanguage: I18n.locale
        });
        this.props.changeLanguageAction();

    };
}


const styles = StyleSheet.create({
    imageWrapper: {
        width: width,
        backgroundColor: 'white',
        flex: 1,
        paddingLeft: 30,
        paddingRight: 30,
        alignItems: 'center'
    },
    imageView: {
        flex: 1,
    },
    deliverDesWrapper: {
        backgroundColor: '#4c4c4c',
        width: width,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8
    },
    deliverIcon: {
        height: 30,
        resizeMode: 'contain'
    },
    deliverTextWrapper: {
        flexDirection: 'column',
        marginLeft: 10,
    },
    logo: {
        width: 10,
        height: 6,
        marginRight: 10,
    },


})

//redux绑定数据
const reduxState = (state)=>{
    return{

    }
}

const reduxDispatch = (dispatch)=>{
    return{
        logout:() => {
            // dispatch({ type:'LOGIN_SUCCESS'});
            dispatch(login())
        },
        changeLanguageAction:() => {
            // dispatch({ type:'LOGIN_SUCCESS'});
            dispatch({type:'changeB'})
        },
    }
}
export default connect(reduxState,reduxDispatch)(GoodsDetail);
