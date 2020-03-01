import React from 'react';
import PopularPage from '../pages/PopularPage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TrendPage from '../pages/TrendPage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CollectionPage from '../pages/CollectionPage';
import MinePage from '../pages/MinePage';
import Entypo from 'react-native-vector-icons/Entypo';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import TabBarBottom from 'react-navigation-tabs/src/views/BottomTabBar';
import {connect} from 'react-redux';
import {onThemeChange} from '../action/index';
import EventBus from 'react-native-event-bus';
import EventType from '../event/EventType';

const ROUTES = {
    PopularPage: {
        screen: PopularPage,
        navigationOptions: {
            tabBarLabel: '最新',
            tabBarIcon: ({focused, tintColor}) => {
                return <MaterialIcons
                    name={'whatshot'}
                    size={26}
                    style={{color: tintColor}}
                />;
            },
        },
    },
    TrendPage: {
        screen: TrendPage,
        navigationOptions: {
            tabBarLabel: '趋势',
            tabBarIcon: ({focused, tintColor}) => (
                <Ionicons
                    name={'md-trending-up'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        },
    },
    CollectionPage: {
        screen: CollectionPage,
        navigationOptions: {
            tabBarLabel: '收藏',
            tabBarIcon: ({focused, tintColor}) => (
                <MaterialIcons
                    name={'favorite'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        },
    },
    MinePage: {
        screen: MinePage,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({focused, tintColor}) => (
                <Entypo
                    name={'user'}
                    size={26}
                    style={{color: tintColor}}
                />
            ),
        },
    },
};

class DynamicBottomTabNavigator extends React.Component {
    // shouldComponentUpdate(nextProps, nextState): boolean {
    //     console.log('old props is :'+this.props);
    //     console.log('new props is :'+nextProps);
    //     console.log('old state is :'+this.state);
    //     console.log('new state is :'+nextState);
    //     return false;
    // }

    //每次浅比较不等时，就会重新render方法,将之前的组件保留复用一下
    render() {
        console.log(this.props);
        if (this.nav) {
            return <this.nav/>;
        }
        const {PopularPage, TrendPage, CollectionPage, MinePage} = ROUTES;
        PopularPage.navigationOptions.tabBarLabel = '最新A';//动态修改各tab属性
        const routes = {PopularPage: PopularPage, TrendPage, CollectionPage, MinePage};
        const topNav = createBottomTabNavigator(routes, {
            tabBarComponent: props => {
                return <NewTabBarComponent theme={this.props.theme} {...props}/>;
            },
        });
        //对于JSX语法，return 返回的对象必须是一个<View></View>jsx对象，
        // 或者是一个自定义组件<SomeComponent/>
        this.nav = createAppContainer(topNav);//此处包装后就是一个Component,<Component/>如此引用
        return <this.nav
            onNavigationStateChange={(prevState, newState, action) => {
                EventBus.getInstance().fireEvent(EventType.bottom_tab_select, {//发送底部tab切换的事件
                    from: prevState.index,
                    to: newState.index,
                });
            }}//注意这个属性，属于谁，是如何往下传递的？和react-native-webview中的onNavigationStateChange的区别

        />;
    }
}

//回调的原理是什么
class NewTabBarComponent extends React.Component {
    render() {
        return <BottomTabBar
            {...this.props}
            activeTintColor={this.props.theme}
        />;
    }
}

const mapStateToProps = state => ({//此函数必须返回一个对象
    theme: state.theme.theme,
});
const mapDispatchToProps = dispatch => ({//此函数必须返回一个对象
    onThemeChange: newTheme => dispatch(onThemeChange(newTheme)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DynamicBottomTabNavigator);
