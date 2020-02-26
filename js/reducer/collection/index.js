import types from '../../action/types';

/**
 * collectionData:{
 *  "popular":{
 *      data:items,
 *      isLoading:false,
 *  },
 *  "trending":{
 *      data:items,
 *      isLoading:false,
 *  }
 * }
 */

const defaultState = {
    'POPULAR': {items: [], isLoading: false},
    'TRENDING': {items: [], isLoading: false},
};

export default function onAction(state = defaultState, action) {//reducer是一个初始化state的好地方
    switch (action.type) {
        case types.COLLECTION_LOAD_DATA:
            return {//为什么此处要这么更新呢？因为只是更新了大state中的局部嵌套对象
                ...state,
                [action.tabName]:{
                    ...state[action.tabName],
                    isLoading: action.isLoading,
                }
            };
        case types.COLLECTION_LOAD_DATA_SUCCESS:
            return {
                ...state,
                [action.tabName]:{
                    ...state[action.tabName],
                    isLoading: action.isLoading,
                    items: action.data,
                }
            };

        case types.COLLECTION_LOAD_DATA_Fail:
            return {
                ...state,
                [action.tabName]:{
                    ...state[action.tabName],
                    isLoading: action.isLoading,
                }
            };
        default:
            return state;
    }
}
