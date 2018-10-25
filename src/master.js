import React, {Component} from 'react';
//导入 react-navigation 组件
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image, Modal
} from 'react-native';

import {
    createStackNavigator,
    createBottomTabNavigator,
    createMaterialTopTabNavigator,
} from 'react-navigation';
import {I18n} from '~/locales/tools/I18n'

import Auctions from './Main/Auctions';
import Bid from './Main/Bid';
import Cart from './Main/Cart';
import Orders from './Main/Orders';
import Profile from './Main/Profile';
import GoodsDetail from './Main/SubjectPages/GoodsDetail';
import color from '~/CommonUI/color'
import LoadingView from '~/CommonUI/alphaBgView'
import Toast, {DURATION} from 'react-native-easy-toast'


//登录模块
import loginModalView from '~/src/LoginAndRegister/loginModalView'
import loginView from '~/src/LoginAndRegister/loginView'

import register from '~/src/LoginAndRegister/register'


import {login, tokenExist} from '~/Redux/actions/LoginAction'
import {creatUser} from '~/Redux/actions/UserProfileAction'

import {connect} from 'react-redux'
import {compose, graphql, withApollo} from 'react-apollo';

import {GET_USER} from '~/graphql/query'

//登录页
const LoginModalViewNav = createStackNavigator({
        loginModalView: {
            screen: loginModalView,
        },
        GoodsDetail: {
            screen: GoodsDetail,
        },
        loginView: {
            screen: loginView,
        },
        register: {
            screen: register,
        },
    }, {
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#fff',//导航栏背景颜色
            },
            headerTintColor: color.themeColor,
            headerTitleStyle: {
                fontSize: 15
            },
        },
    }
)


//首页
const AuctionsNav = createStackNavigator({
        Auctions: {
            screen: Auctions,
        },
        GoodsDetail: {
            screen: GoodsDetail,
        }
    }, {
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#fff',//导航栏背景颜色
                borderBottomWidth: 0, //可以去掉底部的线
            },
            headerTintColor: color.themeColor,
            headerTitleStyle: {
                fontSize: 15
            }
        },
    }
)

//Bid
const BidNav = createStackNavigator({
        Bid: {
            screen: Bid,
        },
        GoodsDetail: {
            screen: loginModalView,
        }
    }, {
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#fff',//导航栏背景颜色
                borderBottomWidth: 0, //可以去掉底部的线
            },
            headerTintColor: color.themeColor,
            headerTitleStyle: {
                fontSize: 15
            }
        },
    }
)


const CartNav = createStackNavigator({
        Cart: {
            screen: Cart,
        },

    }, {
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#fff',//导航栏背景颜色
                borderBottomWidth: 0, //可以去掉底部的线
            },
            headerTintColor: color.themeColor,
            headerTitleStyle: {
                fontSize: 15
            }
        },
    }
)

const ProfileNav = createStackNavigator({
        Profile: {
            screen: Profile,
        },

    }, {
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#fff',//导航栏背景颜色
                borderBottomWidth: 0, //可以去掉底部的线
            },
            headerTintColor: color.themeColor,
            headerTitleStyle: {
                fontSize: 15
            }
        },
    }
)


var Tab = createBottomTabNavigator({
        Auctions: {
            screen: AuctionsNav,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <Image
                        source={require('../resource/home.png')}
                        style={[{height: 20, width: 20}, {tintColor: tintColor}]}
                    />
                ),
            }
        },
        Bid: {
            screen: BidNav,
            navigationOptions: {
                tabBarLabel: 'Bid',
                tabBarIcon: ({tintColor}) => (
                    <View style={{flexDirection: 'row',alignItems: 'center'}}>
                    <Image
                        source={require('../resource/category.png')}
                        style={[{height: 20, width: 20}, {tintColor: tintColor}]}
                    />
                        <View style={{justifyContent:'center',position:'absolute',top:-5,right:-14,borderRadius:9,overflow: 'hidden',flex: 1,alignItems:'center'}}>
                            <Text style={{borderRadius:5,backgroundColor:'red',fontSize:11,color:'white',width:18,height:18,textAlign:'center',lineHeight:18}}>12</Text>
                        </View>
                    </View>
                ),
            }
        },
        Cart: {
            screen: CartNav,
            navigationOptions: {
                tabBarLabel: 'Cart',
                tabBarIcon: ({tintColor}) => (
                    <Image
                        source={require('../resource/cart.png')}
                        style={[{height: 20, width: 20}, {tintColor: tintColor}]}
                    />
                )
            }
        },
        Orders: {
            screen: Orders,
            navigationOptions: {
                tabBarLabel: 'Orders',
                tabBarIcon: ({tintColor}) => (
                    <Image
                        source={require('../resource/newest.png')}
                        style={[{height: 20, width: 20}, {tintColor: tintColor}]}
                    />
                )
            }
        },
        Profile: {
            screen: ProfileNav,
            navigationOptions: {
                tabBarLabel: 'Profile',
                tabBarIcon: ({tintColor}) => (
                    <Image
                        source={require('../resource/user.png')}
                        style={[{height: 20, width: 20}, {tintColor: tintColor}]}
                    />
                )
            }
        },
    },
    {
        tabBarOptions: {
            // label和icon的前景色 活跃状态下（选中）
            activeTintColor: color.themeColor,
            // label和icon的背景色 不活跃状态下
            inactiveBackgroundColor: 'white',
            // label和icon的前景色 不活跃状态下(未选中)
            inactiveTintColor: color.darkGrey,
        },
    }
);

let self; //将App组件中的this赋给全局的self
global.toast = false; //所有子页面均可直接调用global.toast("")来吐司提示消息

class Master extends Component {
    componentDidMount() {
        this.props.click();
        self = this;
        global.toast = function (message) {
            self.refs.toast.show(message);
        };
    }

    constructor(props) {
        super(props);
        this.state = {}
    }


    componentWillReceiveProps(data) {
        if ('user' in data) {
            this.props.saveUser(data.user);
        }
    }

    render() {

        AuctionsNav.navigationOptions = ({navigation}) => {
            let tabBarVisible = true;
            if (navigation.state.index > 0) {
                tabBarVisible = false;
            }
            return {
                tabBarVisible,
                tabBarLabel: I18n.t('app.welcome'),
                tabBarIcon: ({tintColor}) => (
                    <View>
                        <Image
                            source={require('../resource/category.png')}
                            style={[{height: 20, width: 20}, {tintColor: tintColor}]}
                        />
                        <Text style={{padding: 5,borderRadius:5,backgroundColor:'red'}}>12</Text>
                    </View>
                )
            };
        };

        const {isLogin, netloading, saveUser, changeLanguage} = this.props;


        return (
            <View style={{flex: 1}}>

                {
                    isLogin ? <Tab/> : <LoginModalViewNav/>
                }
                {
                    netloading ? <Modal
                        animationType='none'
                        transparent={true}
                        visible={netloading}
                        style={{alignItems: 'center'}}
                    >
                        <LoadingView/>
                    </Modal> : null
                }
                <Toast ref="toast"/>
            </View>
        )
    }
}

const reuqestData = graphql(GET_USER, {
    props: ({data}) => {
        return data;
    }
});

//redux绑定数据
const reduxState = (state) => {
    return {
        isLogin: state.login.isLogin,
        netloading: state.loading.netloading,
        changeLanguage: state.language.language,
    }
}

const reduxDispatch = (dispatch) => {
    return {
        click: () => {
            dispatch(tokenExist())
        },
        saveUser: (userDic) => {
            dispatch(creatUser(userDic))
        }
    }
}


export default connect(reduxState, reduxDispatch)(reuqestData(Master));

