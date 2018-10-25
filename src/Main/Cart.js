import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    SwipeableFlatList,TouchableHighlight
} from 'react-native';
import {graphql} from 'react-apollo';
import {Get_Countrys} from '~/graphql/query.js'
const CITY_NAMES = ['北京', '上海', '广州','杭州', '苏州'];

class Cart extends Component {
    static navigationOptions = ({navigation, navigationOptions}) => {
        return {
            headerMode: 'float',
            title: navigation.getParam('name', 'Cart'),
            navigationOptions: {}
        };
    };
    componentWillReceiveProps(newProps) {
        console.log('网络请求回来的')
        console.log(newProps);
    }
    getQuickActions=()=>{
        return <View style={styles.quickAContent}>
            <TouchableHighlight
                onPress={()=>alert("确认删除？")}
            >
                <View style={styles.quick}>
                    <Text style={styles.delete}>删除</Text>
                </View>
            </TouchableHighlight>
        </View>
    };

    render() {

        return (
            <View>
                <Text>
                    Cart
                </Text>
                <SwipeableFlatList
                    //1数据的获取和渲染
                    data={CITY_NAMES}
                    renderItem={(data) =>   <View style={styles.item}>
                        <Text style={styles.text}>{data.item}</Text>
                    </View>}

                    //2创建侧滑菜单
                    renderQuickActions={()=>this.getQuickActions()}//创建侧滑菜单
                    maxSwipeDistance={80}//可展开（滑动）的距离
                    bounceFirstRowOnMount={false}//进去的时候不展示侧滑效果
                />
            </View>
        );
    }
}

const reuqestData = graphql(Get_Countrys,{
    props:({data})=>{
        return data;
    }
})
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        backgroundColor: '#aeffb1',
        height: 100,
        marginRight: 15,
        marginLeft: 15,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation:5,//漂浮的效果
        borderRadius:5,//圆角
    },
    text: {
        color: '#444444',
        fontSize: 20,
    },
    //侧滑菜单的样式
    quickAContent:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end',
        marginRight:15,
        marginBottom:10,
    },
    quick:{
        backgroundColor:"#ff1d49",
        flex:1,
        alignItems:'flex-end',//水平靠右
        justifyContent:'center',//上下居中
        width:100,
        borderRadius:5,
        elevation:5,//漂浮的效果

    },
    delete:{
        color:"#d8fffa",
        marginRight:30
    }
});

const dataView = reuqestData(Cart);

export default dataView