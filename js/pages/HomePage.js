import React, {Component} from 'react';
import DynamicBottomTabNavigator from '../navigator/DynamicBottomTabNavigator';
import {View} from 'react-native';
import NavigationUtil from '../common/NavigationUtil';


export default class HomePage extends Component {
    render() {
        let {navigation} = this.props;
        NavigationUtil.navigation = navigation;
        return <DynamicBottomTabNavigator/>;

    }
}
