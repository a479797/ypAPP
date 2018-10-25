import React, {Component} from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    TouchableHighlight,
    Alert,
    SectionList

} from 'react-native';
import color from '~/CommonUI/color'
import CountryCell from '~/src/LoginAndRegister/selectCountryView/subViews/countryCell'

import {graphql} from 'react-apollo';
import {Get_Countrys} from '~/graphql/query.js'

var {height, width} = Dimensions.get('window');

 class SelectCountryView extends Component {
    //点击列表点击每一行
    clickItem(item) {
        this.props.hide();
        this.props.seletedCountry(item);
    }

    constructor(props){
        super(props);
        if (global.countrys){
            this.state ={
                dataList:global.countrys,
            }
        } else {
            this.state ={
                dataList:[],
            }
        }

    }
    componentWillReceiveProps(data) {
        console.log('111');
        global.countrys = data.countries;
        this.setState({
            dataList:data.countries,
        })
    }
    sectionHeader = (item) => {
        return (
            <View style={[styles.size, styles.topTitle]}>
                <Text style={{fontSize: 14}}>
                   Select Country
                </Text>
                <Text style={{fontSize: 14, position: 'absolute', right: 10, top: 10}} onPress={this.props.hide}>
                    X
                </Text>
            </View>
        )
    }
    cell = ({item}) => {
        return (
            <TouchableOpacity onPress={this.clickItem.bind(this,item)}>
                <CountryCell country={item} isSelected={item.name == this.props.countryName?true:false}/>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <SectionList
                        renderItem={this.cell.bind(this)}
                        renderSectionHeader={this.sectionHeader.bind(this)}
                        sections={[
                            {data: this.state.dataList}
                        ]}
                        keyExtractor={(item, index) => item.id}
                    />
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    wrapper: {
        backgroundColor: 'white',
        width: width - 30,
        maxHeight: height - 100,
        alignItems: 'center',
        borderRadius: 8,
        overflow: 'hidden',
    },

    topTitle: {
        borderBottomWidth: 1,
        borderColor: color.lineGrayColor,
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor:'white'
    },


    size: {
        width: width - 30,
    }
});


const reuqestData = graphql(Get_Countrys,{props:({data})=>{ return data; }})

const dataView = reuqestData(SelectCountryView);

export default  global.countrys?SelectCountryView:dataView
