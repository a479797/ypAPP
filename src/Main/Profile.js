import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    FlatList,
} from 'react-native';
import {creatUser} from '~/Redux/actions/UserProfileAction'
import {connect} from 'react-redux'
import {graphql} from 'react-apollo';
import {GET_USER} from '~/graphql/query.js'

class Profile extends Component{
    static navigationOptions = ({navigation,navigationOptions }) => {
        return {
            header: null,
        };;
    };

    render(){
        const {userDic,changeLanguage} = this.props;
        console.log('kkkkkkkkkkk');
        return(
            <View style={{justifyContent: 'center',alignItems:'center',flex: 1}}>
                 <Text>{userDic.username}</Text>
                 <Text>{global.lang.t('app.tryagain')}</Text>
            </View>
        );
    }
}

const reuqestData = graphql(GET_USER,{
    props:({data})=>{
        return data;
    }
})(Profile);

//redux绑定数据
const reduxState = (state) => {
    return {
        userDic:state.userprofile.userDic,
        changeLanguage:state.language.language,
    }
}

const reduxDispatch = (dispatch) => {
    return {
        saveUser:(userDic)=>{
            dispatch(creatUser(userDic))
        }
    }
}


export default connect(reduxState, reduxDispatch)(Profile);
