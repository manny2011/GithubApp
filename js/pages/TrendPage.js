import React, {Component} from 'react';
import {
    ActivityIndicator,
    Button,
    default as AsyncStorage,
    FlatList,
    RefreshControl, StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native';
import TestPage from '../pages/TestPage';
import {connect} from 'react-redux';
import actions from '../action/index';
import NavigationBar from '../common/NavigationBar';
import Icon from 'react-native-vector-icons/AntDesign';
import ListItem from '../common/ListItem';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import TrendItem from '../common/TrendItem';
import SplashPage from './SplashPage';

const API_URL = 'https://github.com/trending/';
const PAGE_SIZE = 8;//设置常量

function genFetchUrl(language) {
    return API_URL + language;
}

class TrendTab extends Component {
    constructor(props) {
        super(props);
        const {tabName} = props;
        this.tabName = tabName;//做成一个对象的成员属性
    }

    componentDidMount(): void {
        this._loadData();
    }

    _getPartialState() {
        const {loadDataForTrendingPageTab, tabName} = this.props;
        return loadDataForTrendingPageTab[tabName];
    }

    _loadData() {
        const {dispatch, tabName} = this.props;
        let url = genFetchUrl(tabName);
        dispatch(actions.trending_refresh_data(tabName, url, PAGE_SIZE));//发起异步action
    }

    _loadMoreData() {
        console.log('load more');
        const {dispatch, tabName} = this.props;
        let partialState = this._getPartialState();
        const {items} = partialState;
        dispatch(actions.trending_load_more_data(tabName, partialState.pageIndex, PAGE_SIZE, items));
    }

    render() {
        const {loadDataForTrendingPageTab} = this.props;//动态获取state树中的某部分对象
        let partialState = loadDataForTrendingPageTab[this.tabName];
        if (!partialState) {//初始化
            partialState = {isLoading: false, data: []};
            loadDataForTrendingPageTab[this.tabName] = partialState;
        }
        const {isLoading, data} = partialState;

        return <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({item}) => <TrendItem item={item}/>}
                keyExtractor={(item) => item.fullName}
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

class TrendPage extends Component {

    constructor(props) {
        super(props);
        this.tabNames = ['CSS', 'Dart', 'Python', 'Java', 'JavaScript', 'Kotlin'];
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
        const Nav = createAppContainer(createMaterialTopTabNavigator(this._getTabs(),{
            tabBarOptions:{
                scrollEnabled:true,
                tabStyle:{
                    height:40,
                },
                indicatorStyle:{
                    height:2,
                },
            },
            tabBarPosition:'top',

        }));

        return (<View style={{flex:1}}>
            {/*一字之差导致的错误，styles vs style,查一下《view>默认使用多在的属性值，*/}
            <NavigationBar leftView={this.renderLeftView()}
                           title={'趋势'}
                           statusBar={{barStyle: 'default', backgroundColor: '#2196f3', hidden: false}}/>
            {/*<Button title={'改变底部tab为红色'}*/}
            {/*        onPress={(event) => event && this.props.onThemeChange('green')}/>*/}
            <Nav/>
        </View>);
    }

    renderLeftView() {
        return <TouchableOpacity underlayColor={'#999'} onPress={() => ToastAndroid.show('go back', 300)}>
            <Icon name={'arrowleft'} size={20} color={'black'}/>
        </TouchableOpacity>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

const mapState2Props = state => ({//这应该是最外层 的那个state树对象。
    loadDataForTrendingPageTab: state.loadDataForTrendingPageTab,
});

const TabContainer = connect(mapState2Props)(TrendTab);//变成容器型组件

const mapDispatchToProps = dispatch => ({
    onThemeChange: newTheme => dispatch(actions.onThemeChange(newTheme)),
});
export default connect(null, mapDispatchToProps)(TrendPage);
