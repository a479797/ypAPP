import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    FlatList,
} from 'react-native';

import color from '~/CommonUI/color'

var {height, width} = Dimensions.get('window');

export default class BidHistory extends Component {
    _keyExtractor = (item, index) => item.id;

    render() {
        return (
            <View >
                <View style={styles.MenuWrapper}>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}>
                            Username
                        </Text>
                    </View>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}>
                            Amount
                        </Text>
                    </View>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}>
                            Time
                        </Text>
                    </View>
                </View>
                <FlatList style={[styles.flatlistWrapper]}
                          data={this.props.datas}
                          renderItem={({item, index}) =>
                              <View style={[styles.MenuWrapper,{alignItems:'center'}]}>
                                  <Text style={[styles.listContent,{textAlign:'left'}]}>
                                      {item.username}
                                  </Text>
                                  <Text style={styles.listContent}>
                                      {item.price}
                                  </Text>
                                  <Text style={[styles.listContent,{textAlign:'right'}]}>
                                      {item.time}
                                  </Text>
                              </View>
                          }
                          keyExtractor={this._keyExtractor}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    flatlistWrapper:{
      maxHeight:130
    },
    MenuWrapper: {
        width: width,
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: color.lineGrayColor,
    },
    titleWrapper: {
        flex: 1,
        borderRightWidth: 1,
        borderColor: color.lineGrayColor,
        alignItems: 'center'
    },
    title: {
        fontSize: 11,
        textAlign: 'center'
    },
    listContent: {
        flex: 1,
        fontSize: 10,
        textAlign: 'center'
    }
})
