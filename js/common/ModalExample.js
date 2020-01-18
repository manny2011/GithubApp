import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default class ModalExample extends Component {
    state = {
        modalVisible: false,
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    render() {
        return (
            <View style={{marginTop: 22}}>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {//按返回键时的回调
                        Alert.alert('Modal has been closed.');
                        this.setModalVisible(!this.state.modalVisible);
                    }}>
                    {/*//下面是弹出层的内容，自己控制弹出层的大小/样式等*/}
                    <TouchableOpacity style={{marginTop: 0,paddingTop:120,backgroundColor:"rgba(0,0,0,0.5)",flex:1,alignItems:'center'}}
                        onPress={()=>{this.setModalVisible(!this.state.modalVisible)}}>
                        <View style={{backgroundColor:'white'}}>
                            <Text>Hello World!</Text>
                            <View>
                                <MaterialIcons
                                    name={'arrow-drop-up'}
                                    size={36}
                                    style={styles.arrow}/>
                            </View>
                            <TouchableHighlight
                                onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Text>Hide Modal</Text>
                            </TouchableHighlight>
                        </View>
                    </TouchableOpacity>
                </Modal>

                <TouchableHighlight
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <Text>Show Modal</Text>
                </TouchableHighlight>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    arrow:{

    }
});
