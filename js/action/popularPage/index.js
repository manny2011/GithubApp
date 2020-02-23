//定义同步action 和 异步action生成函数

import types from '../types';
import {exp} from 'react-native-reanimated';
import FavoriteDao, {POPULAR, TRENDING} from '../../dao/FavoriteDao';

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
        pageIndex:1,
        hasMore:true,
    };
}

export function requestLoadMoreData(tabName) {
    return {
        type: types.LOAD_MORE_DATA,
        tabName: tabName,
        isLoadingMore: true,
    };
}

export function loadMoreDataSuccess(tabName, data,pageIndex) {//此数据包括之前已显示的数据，直接替换而不是拼接
    return {
        type: types.LOAD_MORE_DATA_SUCCESS,
        tabName: tabName,
        data: data,
        isLoadingMore: false,
        pageIndex:pageIndex,//当前加载到的页数
        hasMore:true,

    };
}

export function loadMoreDataFailed(tabName) {
    return {
        type: types.LOAD_MORE_DATA_Fail,
        tabName: tabName,
        isLoadingMore: false,
        hasMore:false,
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
            .then(data => {//data.items是真正的数据，此处为每一个item添加上isFavorite字段，标识是否已收藏
                handleDataWithFavoriteCheck(data,(processedData)=>{
                    dispatch(receiveDataSuccess(tabName, processedData, pageSize))
                })
            })
            .catch(err=>{
                console.log(err);
            })
    };
}

function handleDataWithFavoriteCheck(data,callback) {//Array[] 在此处对data array进行是否收藏进行处理，添加isFavorite字段
    new FavoriteDao(POPULAR).getFavoriteKeys()
        .then(favoriteKeys => {
            for (let i = 0; i < data.items.length; i++) {
                data.items[i].isFavorite = false;
                for (let j = 0; j < favoriteKeys.length; j++) {
                    if (favoriteKeys[j] === data.items[i].id.toString()) {
                        data.items[i].isFavorite = true;
                        break;
                    }
                }
            }
            callback(data);
        });

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
