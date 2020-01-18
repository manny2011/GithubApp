import React, {Component} from 'react';
import loadData from '../storeage/index';
import {View, Text, Button} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import ModalExample from '../common/ModalExample';

export default class CollectionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: 'initial data',
        };
    }

    render() {
        return (<View>
            <NavigationBar title={'收藏'} />
            <Button title={'get data'} onPress={() => this._loadData()}/>
            <Text>the response is :{this.state.data}</Text>
            <ModalExample/>
        </View>);
    }

    _loadData() {
        const url = 'http://www.kuaidi100.com/query';
        loadData(url)
            .then(data => {
                this.setState({data: JSON.stringify(data)});
            }).catch(err => {
            this.setState({data: err.toString()});
        });
    }
}
