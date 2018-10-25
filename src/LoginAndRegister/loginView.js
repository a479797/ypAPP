import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image, Dimensions,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    AsyncStorage,
} from 'react-native';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {GET_USER} from '~/graphql/query'

import client from '~/graphql/graphqlClient'


import color from '~/CommonUI/color'

import {graphql, withApollo} from 'react-apollo';
import {LOGIN} from '~/graphql/mutation.js'
import createrStore from '~/Redux/store/store'
import {login} from '~/Redux/actions/LoginAction'
import {changeClient} from '~/Redux/actions/ClientAction'
import connect from "react-redux/es/connect/connect";

var {height, width} = Dimensions.get('window');

class LoginView extends Component {
    static navigationOptions = ({navigation, navigationOptions}) => {
        return {
            headerTintColor: 'black'
        };
    };

    componentWillReceiveProps(newProps) {
        console.log('网络请求回来的')
        console.log(newProps);
    }

    async componentWillMount() {
        const value = await AsyncStorage.getItem('account');
        this.setState({
            account: value,
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            account: ''
        }
    }

    async gologin() {
        var account = this.refs.accountTextField._lastNativeText;
        var password = this.refs.passwordTextField._lastNativeText;
        if (typeof account != "string") {
            account = this.state.account;
        }
        try {
            this.props.showLoading();
            const {data} = await this.props.mutate({
                variables: {username: account, password: password}
            })
            this.props.hideLoading();
            AsyncStorage.setItem('account', account)
            this.creatClient(data.login.token);
        } catch (e) {
            this.props.hideLoading();
            global.toast(e.message)
        }
    }

    async creatClient(token) {
        var newClient = await client({token: token});
        this.props.clientChange(newClient);
        this.props.login(token);
        this.getUser(newClient);
    }

    async getUser(client) {
        const {data} = await this.props.client.query({
            query: GET_USER,
        })
    }


    render() {
        const {showLoading} = this.props;
        return (
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss()
            }}>
                <KeyboardAwareScrollView
                    style={{flex: 1, backgroundColor: 'white'}}
                    bounces={false}
                >
                    {/*头*/}
                    <View style={styles.wrapper}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingTop: ((height / 2) - 30) / 3,
                            paddingBottom: ((height / 2) - 30) / 3
                        }}>
                            <Image style={{width: 30, height: 30, marginRight: 10}}
                                   source={{uri: 'https://www.chilindo.com/Gfx/Bid-Again.png'}}/>
                            <Text
                                style={{color: color.themeColor, fontWeight: '900', fontSize: 27, fontStyle: 'italic'}}>
                                Chilindo
                            </Text>
                        </View>
                        {/*输入用户名*/}
                        <View style={{
                            width: width,
                            height: 40,
                            padding: 10,
                            borderBottomWidth: 1,
                            borderColor: color.lineGrayColor,
                            marginBottom: 10
                        }}>
                            <TextInput
                                ref='accountTextField'
                                style={{height: 20, fontSize: 13}}
                                placeholder="Username or Email"
                                clearButtonMode={'while-editing'}
                                placeholderTextColor={color.fontGrayColor}
                                defaultValue={this.state.account}
                                autoCapitalize={"none"}
                            />
                        </View>
                        {/*输入密码*/}
                        <View style={{
                            width: width,
                            height: 40,
                            padding: 10,
                            borderBottomWidth: 1,
                            borderColor: color.lineGrayColor,
                            marginBottom: 20
                        }}>
                            <TextInput
                                ref='passwordTextField'
                                style={{height: 20, fontSize: 13}}
                                placeholder="Password"
                                secureTextEntry={true}
                                clearButtonMode={'while-editing'}
                                placeholderTextColor={color.fontGrayColor}
                            />
                        </View>
                        {/*登录按钮*/}
                        <TouchableOpacity onPress={this.gologin.bind(this)}>
                            <View style={{
                                width: width - 60,
                                padding: 10,
                                borderRadius: 8,
                                backgroundColor: color.themeColor,
                                alignItems: 'center'
                            }}>
                                <Text style={{color: 'white', fontSize: 15}}>
                                    Login
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text style={{fontSize: 12, color: color.themeColor, marginTop: 15}}>
                                Forgot Password?
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text style={{fontSize: 12, color: color.fontDarkGrayColor, marginTop: 15}}>
                                Sign up or login with
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text style={{fontSize: 12, color: color.fontDarkGrayColor, marginTop: 15}}>
                                Fackbook Login
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text style={{fontSize: 12, color: color.fontDarkGrayColor, marginTop: 15}}>
                                Don't have an account? <Text style={{color: color.themeColor}}>Sign Up</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create(
    {
        wrapper: {
            flex: 1,
            alignItems: 'center',
            backgroundColor: 'white',
        },
        imageStyle: {
            width: width - 100,
            height: 180,
            resizeMode: 'stretch'
        },
        facebookLoginButton: {
            width: width - 100 - 30,
            borderRadius: 8,
            backgroundColor: '#3c5aa4',
            alignItems: 'center',
            marginBottom: 18,

        },
        registerButton: {
            width: width - 100 - 30,
            borderRadius: 8,
            backgroundColor: color.themeColor,
            alignItems: 'center',
            marginBottom: 25,

        }
    }
)

const reuqestData = graphql(LOGIN)(withApollo(LoginView));



//redux绑定数据
const reduxState = (state) => {
    return {}
}

const reduxDispatch = (dispatch) => {
    return {
        login: (value) => {
            // dispatch({ type:'LOGIN_SUCCESS'});
            dispatch(login(value))
        },
        showLoading: () => {
            dispatch({type: 'show'})
        },
        hideLoading: () => {
            dispatch({type: 'hide'})
        },
        clientChange: (cl) => {
            dispatch(changeClient(cl))
        }
    }
}

export default connect(reduxState, reduxDispatch)(reuqestData);


