import React, { Component } from "react";
import {
    Modal, Text, TouchableHighlight, View, StyleSheet, PixelRatio, Image, TouchableOpacity, Dimensions, AsyncStorage,Alert
} from "react-native";

import LoginModalSubView from '~/src/LoginAndRegister/loginModalSubView/index'
import connect from "react-redux/es/connect/connect";
import {login} from '~/Redux/actions/LoginAction'
import {AccessToken,GraphRequest,GraphRequestManager} from "react-native-fbsdk";

var {height, width} = Dimensions.get('window');

const FBSDK = require('react-native-fbsdk');
const {
    LoginManager,
} = FBSDK;

var facebookToken ='';
class LoginModalView extends Component {
    static navigationOptions = ({navigation, navigationOptions}) => {
        console.log('loginView navigation');
        return {
            header: null,
        };
    };
    constructor(props) {
        super(props);
        this.state = {
            animationType: 'none',
            modalVisible: true,//模态场景是否可见
            transparent: true,//是否透明显示
        };
    }

    render() {
        let modalBackgroundStyle = {
            backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : 'red',
        };
        let innerContainerTransparentStyle = this.state.transparent
            ? { backgroundColor: '#fff'}
            : null;

        return (
                   <View style={{flex:1}}>
                        <View style={[styles.container, modalBackgroundStyle]}>
                            <View style={[styles.whiteWrapper, innerContainerTransparentStyle]}>
                                <LoginModalSubView loginViewPush={this.loginViewPush.bind(this)} navigation={this.props.navigation} facebookLogin = {this.facebookLogin}/>
                         </View>
                        </View>
                   </View>
        );
    }
    _responseInfoCallback = (error, result) => {
        if (error) {
            alert('Error fetching data: ' + error.toString());
        } else {
            alert('Result Name: ' + result.name);
        }
    }
    facebookLogin = ()=>{
        let self = this;
        self.props.showLoading();

        LoginManager.logInWithReadPermissions(['public_profile','email']).then(

            function(result) {
                if (result.isCancelled) {
                    self.props.hideLoading();
                } else {
                    AccessToken.getCurrentAccessToken().then((data) => {
                        const { accessToken } = data;
                        AsyncStorage.setItem('faceBookToken',accessToken);
                        facebookToken = accessToken;
                        const infoRequest = new GraphRequest(
                            '/me?fields=name,picture,email',
                            null,
                            self.getFacebookUserProfile
                        );
                        new GraphRequestManager().addRequest(infoRequest).start();
                    })

                }
            },
            function(error) {
                alert('Login failed with error: ' + error);
            }
        );
    }
    loginViewPush = ()=>{
        this.props.navigation.navigate('loginView')
    }

    getFacebookUserProfile = (error, result) => {
        if (error) {
            alert('Error fetching data: ' + error.toString());
            this.props.hideLoading();

        } else {
            console.log(result);
            this.props.hideLoading();
            this.props.login(facebookToken);
        }
    }

}

const styles = StyleSheet.create({
    container: {
        width:width,
        height:height,
        justifyContent: 'center',
        padding: 50,
        backgroundColor:'yellow',
        position: 'absolute'
    },
    whiteWrapper: {
        borderRadius: 7,
        overflow:'hidden',
        alignItems: 'center',
    },


});
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

export default connect(reduxState, reduxDispatch)(LoginModalView)


//facebook默认 用户数据
// id
// first_name
// last_name
// middle_name
// name
// name_format
// picture
// short_name
