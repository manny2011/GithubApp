//在此统一导出combineReducer
//reducer的集合统一
import {combineReducers} from 'redux';
import changeTheme from './theme/index';
import loadDataForPopularPageTab from './popularPage/index';
import loadDataForTrendingPageTab from './trendPage/index';

//这样来看其实都是一个层级的树
/**
 * {//最外层state树
 * theme:{
 *
 * },
 * loadDataForPopularPageTab:{
 *
 * },
 * xxx:{
 *
 * }
 * }
 * 而对于任意一个绑定的组件，你要绑定state树中的哪一小部分state对象呢？
 * 这个 由你决定，具体如何 决定呢？在哪里决定呢？
 * mapState2Props 这里决定你要取state中的哪部分对象来给自己的组件使用呢？
 *
 *
 */
export default combineReducers({
    theme: changeTheme,//似乎这里就是redux的state TREE中，每个state所用的key哦！
    loadDataForPopularPageTab:loadDataForPopularPageTab,
    loadDataForTrendingPageTab:loadDataForTrendingPageTab,
});

