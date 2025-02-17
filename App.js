/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';

import { Provider } from 'react-redux';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SplashPage from './js/pages/SplashPage';
import HomePage from './js/pages/HomePage';
import { createStore, applyMiddleware } from 'redux';
import rootReducers from './js/reducer/index';
import store from './js/store/index';
import DetailPage from './js/pages/DetailPage';
import WebViewPage from './js/pages/WebViewPage';
import ThemePage from './js/pages/ThemePage';
import AboutAuthorPage from './js/pages/AboutAuthorPage';

const InitNav = createStackNavigator({
    Splash: {
        screen: SplashPage,
        navigationOptions: {
            header: null,
        },
    },
}, {});

const MainNav = createStackNavigator({
    Home: {
        screen: HomePage,
        navigationOptions: {
            header: null,
        },
    },
    DetailPage: {
        screen: DetailPage,
        navigationOptions: {
            header: null,
        }
    },
    WebViewPage: {
        screen: WebViewPage,
        navigationOptions: {
            header: null,
        }
    },
    ThemePage: {
        screen: ThemePage,
        navigationOptions: {
            header: null,
        }
    },
    AboutAuthorPage:{
        screen:AboutAuthorPage,
        navigationOptions:{
            header:null,
        }
    }
}, {
    initialRouteName: 'Home',
});

// const LoginNav = createStackNavigator({}, {});

const App = createAppContainer(createSwitchNavigator({
    Init: {
        screen: InitNav,
    },
    Main: {
        screen: MainNav,
    },
}, {
    initialRouteName: 'Init',
    defaultNavigationOptions: {
        header: null,
    },
}));


export default class Container extends React.Component {
    render() {
        return (<Provider store={store}>
            <App />
        </Provider>);
    }
}


