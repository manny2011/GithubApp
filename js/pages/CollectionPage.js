import React, {Component} from 'react';
import loadData from '../storeage/index';
import {View, Text, Button} from 'react-native';

export default class CollectionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: 'initial data',
        };
    }

    render() {
        return (<View>
            <Button title={'get data'} onPress={() => this._loadData()}/>
            <Text>the response is :{this.state.data}</Text>
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
