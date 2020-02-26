import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import {createAppContainer} from "react-navigation";
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import FavoriteTabPage from '../common/FavoriteTabPage';
import {FLAG_STORAGE} from '../storeage';
import FavoriteDao, {POPULAR, TRENDING} from '../dao/FavoriteDao';

export default class CollectionPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const TopNav = createAppContainer(createMaterialTopTabNavigator(
            {
                "popular":{
                    screen: props => <FavoriteTabPage {...props} flag={POPULAR}/>,
                    navigationOptions:{
                        tabBarLabel:"最新",
                    }
                },
                "trending":{
                    screen: props => <FavoriteTabPage {...props} flag={TRENDING}/>,
                    navigationOptions:{
                        tabBarLabel:"趋势",
                    }
                }
            }, {
                tabBarOptions: {
                    indicatorStyle: {
                        height: 2,
                    },
                    tabStyle: {
                        minWidth: 50,
                    },
                    scrollEnabled: false,
                },
            }));
        return (<View style={{flex:1}}>
            <NavigationBar title={'收藏'} />
            <TopNav/>
        </View>);
    }
}
