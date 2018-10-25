import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image, Dimensions,
    TouchableOpacity,
    AsyncStorage

} from 'react-native';
import color from '~/CommonUI/color'
import {login} from '~/Redux/actions/LoginAction'

import {AccessToken} from 'react-native-fbsdk';

import connect from "react-redux/es/connect/connect";

var {height, width} = Dimensions.get('window');



export  default  class LoginModalSubview extends Component {
    goLogin = () => {
        this.props.loginViewPush();
    }

    goRegister = () => {
            this.props.navigation.navigate('register');
    }

    render() {
        return (
            <View style={styles.loginWrapper}>
                <Image style={styles.imageStyle} source={require('~/resource/loginBgLogo.png')}/>
                <Text style={{padding: 10, color: color.fontDarkGrayColor, fontSize: 13}}>
                    Sign up or login with
                </Text>
                <View style={{alignItems:'center',paddingLeft: 18, paddingRight: 15}}>

                    <TouchableOpacity onPress={()=>{this.props.facebookLogin()}}>
                        <View style={styles.facebookLoginButton}>
                            <Text style={{padding: 13, color: 'white', fontSize: 15, fontWeight: '600'}}>
                                Fackbook Login
                            </Text>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={this.goRegister}>
                        <View style={styles.registerButton}>
                            <Text style={{padding: 13, color: 'white', fontSize: 15, fontWeight: '600'}}>
                                Create new Account
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color: color.fontDarkGrayColor, fontSize: 13}}>
                            Already have an account?
                        </Text>
                        <TouchableOpacity onPress={() => {
                            this.goLogin()
                        }}>
                        <Text style={{color:color.themeColor,fontSize:13,marginLeft:7}}>
                            Log In
                        </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        loginWrapper: {
            alignItems: 'center',
            backgroundColor: 'white',
            paddingBottom: 15,
        },
        imageStyle: {
            width: width - 100,
            height: 180,
            resizeMode: 'stretch',
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

// //redux绑定数据
// const reduxState = (state) => {
//     return {}
// }
//
// const reduxDispatch = (dispatch) => {
//     return {
//         login: (value) => {
//             // dispatch({ type:'LOGIN_SUCCESS'});
//             dispatch(login(value))
//         },
//         showLoading: () => {
//             dispatch({type: 'show'})
//         },
//         hideLoading: () => {
//             dispatch({type: 'hide'})
//         },
//         clientChange: (cl) => {
//             dispatch(changeClient(cl))
//         }
//     }
// }
//
// export default connect(reduxState, reduxDispatch)(LoginModalSubview)
