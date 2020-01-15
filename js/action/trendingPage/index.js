//定义同步action和异步action生成函数

import types from '../types';
import GitHubTrending from 'GitHubTrending/trending/GitHubTrending';

export function requestData(tabName) {
    return {
        type: types.TRENDING_REQUEST_DATA,
        tabName: tabName,
        isLoading: true,
    };
}

export function receiveDataSuccess(tabName, data, pageSize) {
    return {
        type: types.TRENDING_REFRESH_DATA_SUCCESS,
        tabName: tabName,
        isLoading: false,
        // data: pageSize > data.items.length ? data.items:data.items.slice(0,pageSize),
        data:data,
        items: data,
        pageIndex:1,
        hasMore:true,
    };
}

export function receiveDataFail(tabName) {//加载失败时，不要覆盖原数据
    return {
        type: types.TRENDING_REFRESH_DATA_Fail,
        tabName: tabName,
        isLoading: false,
    };
}

export function requestLoadMoreData(tabName) {
    return {
        type: types.TRENDING_LOAD_MORE_DATA,
        tabName: tabName,
        isLoadingMore: true,
    };
}

export function loadMoreDataSuccess(tabName, data,pageIndex) {//此数据包括之前已显示的数据，直接替换而不是拼接
    return {
        type: types.TRENDING_LOAD_MORE_DATA_SUCCESS,
        tabName: tabName,
        data: data,
        isLoadingMore: false,
        pageIndex:pageIndex,//当前加载到的页数
        hasMore:true,

    };
}

export function loadMoreDataFailed(tabName) {
    return {
        type: types.TRENDING_LOAD_MORE_DATA_Fail,
        tabName: tabName,
        isLoadingMore: false,
        hasMore:false,
    };
}

//======================以上为同步ACTION，下面为异步ACTION===================//

export function trending_refresh_data(tabName, url, pageSize) {//刷新数据
    return dispatch => {
        dispatch(requestData(tabName));
        new GitHubTrending().fetchTrending(url)
            .then((data)=> {//Array[25]
                dispatch(receiveDataSuccess(tabName, data, pageSize));
            }).catch((error)=> {
            console.log('An error occurred.', error);
            dispatch(receiveDataFail(tabName));
        });
        /*return fetch(url)
            .then(response => {//使用这一种写法，2个回调函数，官方推荐.
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('no response from server.');
                }
            }, err => {
                console.log('An error occurred.', err);
                dispatch(receiveDataFail(tabName));
            })
            .then(responseJson => dispatch(receiveDataSuccess(tabName, responseJson, pageSize)));

         */
    };
}

/**
 *
 * @param tabName 标签名
 * @param pageIndex 目前已经的页面索引号
 * @param pageSize 每页数量
 * @param rawItems 全部数量
 * @returns {Function}
 * @constructor
 */
export function trending_load_more_data(tabName, pageIndex, pageSize, rawItems) {//加载更多数据
    return dispatch => {
        dispatch(requestLoadMoreData(tabName));
        setTimeout(() => {
            if (pageIndex * pageSize < rawItems.length) {//还有更多
                pageIndex++;
                let max = pageIndex * pageSize > rawItems.size ? rawItems.size : pageIndex * pageSize;
                dispatch(loadMoreDataSuccess(tabName, rawItems.slice(0, max),pageIndex));
            } else {//已加载完所有
                dispatch(loadMoreDataFailed(tabName));
            }
        }, 1000);

    };
}
