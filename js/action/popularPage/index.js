//定义同步action 和 异步action生成函数

import types from '../types';
import {exp} from 'react-native-reanimated';

export function requestData(tabName) {
    return {
        type: types.REQUEST_DATA,
        tabName: tabName,
        isLoading: true,
    };
}

export function receiveDataSuccess(tabName, data, pageSize) {
    return {
        type: types.REFRESH_DATA_SUCCESS,
        tabName: tabName,
        isLoading: false,
        data: pageSize > data.items.length ? data.items:data.items.slice(0,pageSize),
        items: data.items,
    };
}

export function requestLoadMoreData(tabName) {
    return {
        type: types.LOAD_MORE_DATA,
        tabName: tabName,
        isLoadingMore: true,
    };
}

export function loadMoreDataSuccess(tabName, data) {//此数据包括之前已显示的数据，直接替换而不是拼接
    return {
        type: types.LOAD_MORE_DATA_SUCCESS,
        tabName: tabName,
        data: data,
        isLoadingMore: false,
    };
}

export function loadMoreDataFailed(tabName) {
    return {
        type: types.LOAD_MORE_DATA_Fail,
        tabName: tabName,
        isLoadingMore: false,
    };
}

export function receiveDataFail(tabName) {//加载失败时，不要覆盖原数据
    return {
        type: types.REFRESH_DATA_Fail,
        tabName: tabName,
        isLoading: false,
    };
}

export function fetchData(tabName, url, pageSize) {
    return dispatch => {
        dispatch(requestData(tabName));
        return fetch(url)
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
export function LoadMoreData(tabName, pageIndex, pageSize, rawItems) {
    return dispatch => {
        dispatch(requestLoadMoreData(tabName));
        setTimeout(() => {
            if ((pageIndex + 1) * pageSize < rawItems.size) {//还有更多
                pageIndex++;
                let max = pageIndex * pageSize > rawItems.size ? rawItems.size : pageIndex * pageSize;
                dispatch(loadMoreDataSuccess(tabName, rawItems.slice(0, max)));
            } else {//已加载完所有
                dispatch(loadMoreDataFailed(tabName));
            }
        }, 500);

    };
}
