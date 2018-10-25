import React, {Component} from "react";
import {
    StyleSheet,
    Text,
    View,
    Image, Dimensions,
    TouchableOpacity,
    TextInput,
    Keyboard,
    AsyncStorage,
    Modal,
    TouchableWithoutFeedback,
    Alert
} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import color from '~/CommonUI/color'
import Alpha from '~/CommonUI/alphaBgView'
import SelectCountry from '~/src/LoginAndRegister/selectCountryView/index'
import createrStore from '~/Redux/store/store'

import { compose,withApollo } from 'react-apollo';
import {graphql} from 'react-apollo';
import {REGISTER} from '~/graphql/mutation.js'
import {connect} from 'react-redux'
import {Get_Countrys} from "../../graphql/query";

var {height, width} = Dimensions.get('window');

class Register extends Component {
    static navigationOptions = ({navigation, navigationOptions}) => {
        return {
            headerTintColor: 'black'
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            showSelectCountry: false,
            country:null,
            countryId:null,
        };
    }

    register = async() => {
        var account =  this.refs.accountTextField._lastNativeText;
        var password = this.refs.passwordTextField._lastNativeText;
        var email = this.refs.emailTextField._lastNativeText;
        var country = this.state.country;
        console.log(account,password,email,country);
        try {
            this.props.showLoading();
            console.log(this.props.mutate,this.props)
            const {data} = await this.props.mutate({
                variables: {
                    username: account,
                    email: email,
                    password: password,
                    country: country
                }
            })
            this.props.hideLoading();
            AsyncStorage.setItem('account',account);
            this.props.navigation.navigate('loginView');
        }catch (e) {
            console.log(e)
            this.props.hideLoading();
            global.toast(e.message);
        }

    }

    componentWillReceiveProps(data) {
        global.countrys = data.countries;
    }
    selectCountry = () => {
        this.setState({
            showSelectCountry: !this.state.showSelectCountry,
        })
    }

    render() {
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
                            paddingTop: ((height / 5) - 30) / 3,
                            paddingBottom: ((height / 5) - 30) / 3
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
                                placeholder="Username"
                                clearButtonMode={'while-editing'}
                                placeholderTextColor={color.fontGrayColor}
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
                            marginBottom: 10
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
                        {/*邮箱*/}
                        <View style={{
                            width: width,
                            height: 40,
                            padding: 10,
                            borderBottomWidth: 1,
                            borderColor: color.lineGrayColor,
                            marginBottom: 10
                        }}>
                            <TextInput
                                ref='emailTextField'
                                style={{height: 20, fontSize: 13}}
                                placeholder="Email"
                                clearButtonMode={'while-editing'}
                                placeholderTextColor={color.fontGrayColor}
                                autoCapitalize={"none"}
                            />
                        </View>
                        {/*国家*/}
                        <TouchableOpacity onPress={this.selectCountry}>
                            <View style={{
                                width: width,
                                height: 40,
                                padding: 10,
                                borderBottomWidth: 1,
                                borderColor: color.lineGrayColor,
                                marginBottom: 10,
                                flexDirection:'row',
                                justifyContent: "space-between",
                                alignItems:'center'
                            }}>


                                <TextInput
                                    style={{height: 20, fontSize: 13}}
                                    placeholder="Country"
                                    placeholderTextColor={color.fontGrayColor}
                                    autoCapitalize={"none"}
                                    editable={false}
                                    defaultValue={this.state.country}
                                />

                                <Image style={styles.logo} source={require('~/resource/arrow_down.png')}/>

                                <View style={{width: width, height: 40, position: 'absolute'}}>

                                </View>

                            </View>
                        </TouchableOpacity>

                        {/*注册按钮*/}
                        <TouchableOpacity onPress={this.register}>
                            <View style={{
                                width: width - 60,
                                padding: 10,
                                borderRadius: 8,
                                backgroundColor: color.themeColor,
                                alignItems: 'center'
                            }}>
                                <Text style={{color: 'white', fontSize: 15}}>
                                    Register
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text style={{fontSize: 12, color: color.themeColor, marginTop: 15}}>
                                Forgot Password?
                            </Text>
                        </TouchableOpacity>
                    </View>


                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={this.state.showSelectCountry}
                        style ={{alignItems:'center'}}
                    >
                            <SelectCountry hide={this.hide} seletedCountry = {this.seletedCountry} countryName={this.state.country}/>
                    </Modal>
                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
        );
    }

    seletedCountry = (country)=>{
        console.log(country);
            this.setState({
                country:country.name,
                countryId:country.id,
            })
    }

    hide = ()=>{
        this.setState({
            showSelectCountry:false,
        })
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    logo:{
        width:10,
        height:6,
        marginRight: 8,
    },

});

const reuqestData = compose(graphql(REGISTER),graphql(Get_Countrys,{
    props:({data})=>{
        return data;
    }
}))(withApollo(Register));

//redux绑定数据
const reduxDispatch = (dispatch)=>{
    return{
        showLoading:()=>{
            dispatch({type:'show'})
        },
        hideLoading:()=>{
            dispatch({type:'hide'})
        },
    }
}
const reduxState = (state)=>{
    return{
    }
}


// const query = (query)=>{
//     return {
//        getData:()=>{query({
//            query: Get_Countrys,
//            variables: {
//            }
//        })}
//     }
// }



export default connect(reduxState,reduxDispatch)(reuqestData);

