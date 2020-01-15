//统一管理action生成函数
import {onThemeChange} from './theme/index';
import {fetchData} from './popularPage/index';
import {LoadMoreData} from './popularPage/index';
import {trending_refresh_data} from './trendingPage/index';
import {trending_load_more_data} from './trendingPage/index';

export default {
    onThemeChange,
    fetchData,
    LoadMoreData,
    trending_refresh_data,
    trending_load_more_data,
};
