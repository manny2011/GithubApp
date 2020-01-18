import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TimeSpan from '../model/TimeSpan';

export const TimeSpans = [new TimeSpan('今 天', 'since=daily'),
    new TimeSpan('本 周', 'since=weekly'), new TimeSpan('本 月', 'since=monthly')];

export default class TrendingDialog extends Component {
    state = {
        modalVisible: false,
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        return (<Modal animationType={'slide'}
                       transparent={true}
                       visible={this.state.modalVisible}
                       onRequestClose={() => {

                       }}>
            <TouchableOpacity style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)',alignItems:'center',marginTop:0}}
                              onPress={() => {
                                  this.setModalVisible(!this.state.modalVisible);
                              }}>
                <MaterialIcons
                    name={'arrow-drop-up'}
                    size={36}
                    style={styles.arrow}/>
                <View style={styles.content}>
                    {TimeSpans.map(((value, index, array) => {//map之后返回一个新数组/结果集
                        return <TouchableOpacity key = {index} onPress={()=>{this.onSelectTab(array[index])}}>
                            <View style={styles.text_container}>
                                <Text style={styles.text}>{value.showText}</Text>
                            </View>
                            {index < array.length - 1 ? <View style={{height: 1, backgroundColor: '#000'}}/> : null}
                        </TouchableOpacity>;
                    }))}
                </View>
            </TouchableOpacity>
        </Modal>);
    }

    onSelectTab(tab) {
        this.props.onSelect(tab);
        // Alert.alert(tab.tabName);
        this.setModalVisible(false);

    }
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: 'white',
        borderRadius: 3,
        paddingTop: 3,
        paddingBottom: 3,
        marginRight: 3,
    },
    text: {
        fontSize: 16,
        color: 'black',
        fontWeight: '400',
        padding: 8,
        paddingLeft: 26,
        paddingRight: 26
    },
    text_container: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    arrow: {
        marginTop: 22,
        color: 'white',
        padding: 0,
        margin: -15
    },
});
