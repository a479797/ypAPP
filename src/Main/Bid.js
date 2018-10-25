import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import {connect} from 'react-redux'
import {logOut} from  '~/Redux/actions/LoginAction'
import { I18n } from '~/locales/tools/I18n'
import DeviceInfo from 'react-native-device-info'

class Bid extends Component {
    static navigationOptions = ({navigation, navigationOptions}) => {
        return {
            headerMode: 'float',
            title: navigation.getParam('name', 'Bid'),
            navigationOptions: {}
        };
    };
    componentDidUpdate(){
        console.log('update');
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
    render() {
        const {logout} = this.props;
        return (
            <View>
                <TouchableOpacity onPress={logout}>
                    <Text>
                        退出登录
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.refreshLanguage(2)}>
                    <Text>
                        改语言
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

//redux绑定数据
const reduxState = (state)=>{
    return{

    }
}

const reduxDispatch = (dispatch)=>{
    return{
        logout:() => {
            // dispatch({ type:'LOGIN_SUCCESS'});
            dispatch(logOut())
        },
        changeLanguageAction:() => {
            // dispatch({ type:'LOGIN_SUCCESS'});
            dispatch({type:'changeA'})
        },
    }
}

export default connect(reduxState,reduxDispatch)(Bid);
