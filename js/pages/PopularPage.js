import React, {Component} from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import {View} from 'react-native';
import {
    Text,
    FlatList,
    RefreshControl,
    StyleSheet,
    ActivityIndicator,

} from 'react-native';
import {connect} from 'react-redux';
import actions from '../action/index';//导包+解构遇到的问题，何时用解构，何时直接用变量
import ListItem from '../common/ListItem';

/**
 * 引入async action Creator，给thunk中间件处理。
 * .1.定义同步action
 *  2.定义异步action函数，返回值为函数
 *  3.applyMiddleWare中间件的支持
 *  4.绑定组件，即封装展示型组件--->窗口型组件。
 *  https://api.github.com/search/repositories?q=java&sort=stars
 *
 *  目前这种写法应该是有问题的，刷新时，导致其它列表界面重新渲染了一遍。
 *  因为共用了一个更新共同的一个state:loadDataForPopularPageTab
 *
 */

const API_URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const PAGE_SIZE = 8;//设置常量

function genFetchUrl(category) {
    return API_URL + category + QUERY_STR;
}

export default class PopularPage extends Component {
    constructor(props) {
        super(props);
        this.tabNames = ['Java', 'Android', 'React', 'React Native', 'JavaScript', 'Kotlin'];
    }

    _getTabs() {
        let routes = {};
        this.tabNames.forEach((item, index) => {
            routes[`tab${index}`] = {
                screen: props => <TabContainer {...props} tabName={item}/>,
                navigationOptions: {
                    tabBarLabel: item,
                },
            };
        });
        return routes;
    }

    render() {
        const TopNav = createAppContainer(createMaterialTopTabNavigator(
            this._getTabs(), {
                tabBarOptions: {
                    indicatorStyle: {
                        height: 2,
                    },
                    tabStyle: {
                        minWidth: 50,
                    },
                    scrollEnabled: true,
                },
            }));
        return <View style={{flex: 1}}>
            <TopNav/>
        </View>;
    }
}

class PopularTab1 extends Component {

    constructor(props) {
        super(props);
        const {tabName} = props;
        this.tabName = tabName;//做成一个对象的成员属性
    }

    componentDidMount(): void {
        this._loadData();
    }

    _getPartialState() {
        const {loadDataForPopularPageTab, tabName} = this.props;
        let partialState = loadDataForPopularPageTab[tabName];
        return partialState;
    }

    _loadData() {
        const {dispatch, tabName} = this.props;
        let url = genFetchUrl(tabName);
        dispatch(actions.fetchData(tabName, url, PAGE_SIZE));//发起异步action
    }

    _loadMoreData() {
        console.log('load more');
        const {dispatch, tabName} = this.props;
        let partialState = this._getPartialState();
        const {items} = partialState;
        dispatch(actions.LoadMoreData(tabName, partialState.pageIndex, PAGE_SIZE, items));
    }

    render() {
        const {loadDataForPopularPageTab} = this.props;//动态获取state树中的某部分对象
        let partialState = loadDataForPopularPageTab[this.tabName];
        if (!partialState) {//初始化
            partialState = {isLoading: false, data: []};
            loadDataForPopularPageTab[this.tabName] = partialState;
        }
        const {isLoading, data} = partialState;

        return <View style={styles.container}>
            {/*<Text>{'this is textview'}</Text>*/}
            <FlatList
                data={data}
                renderItem={({item}) => <ListItem item={item}/>}
                keyExtractor={(item) => item.id}
                refreshControl={
                    <RefreshControl
                        title={'loading'}
                        titleColor={'red'}
                        refreshing={isLoading}
                        tintColor={'red'}
                        onRefresh={() => this._loadData()}/>
                }
                ListFooterComponent={this._getFooter()}
                onEndReached={() => {
                    if (!this.onEndReachedCalledDuringMomentum) {
                        this._loadMoreData();
                        this.onEndReachedCalledDuringMomentum = true;
                    }
                }}
                onEndReachedThreshold={0.1}
                onMomentumScrollBegin={() => {
                    this.onEndReachedCalledDuringMomentum = false;
                }}
            />

        </View>;
    }

    _renderItem(item) {
        const {full_name} = item;
        return <View styles={{height: 50, backgroundColor: 'pink'}}>
            <Text style={{color: 'blue', height: 30}}>{full_name}</Text>
        </View>;
    }

    _getFooter() {
        let getPartialState = this._getPartialState();
        const {hasMore} = getPartialState;
        return hasMore ? (<View>
            <ActivityIndicator
                size={'large'}
                color={'blue'}/>
            <Text style={{alignSelf: 'center'}}>正在加载</Text>
        </View>) : null;
    }
}

const mapState2Props = state => ({//这应该是最外层 的那个state树对象。
    loadDataForPopularPageTab: state.loadDataForPopularPageTab,
});

const TabContainer = connect(mapState2Props)(PopularTab1);//变成容器型组件

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});
