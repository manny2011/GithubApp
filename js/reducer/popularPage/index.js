//处理对应popularPage的action
//到此设计state的结构很重要。
/**
 * key:{
 *     isLoading:false,
 *     isLoadingMore:false,
 *     data:{...},
 *     items:[],
 * }
 * ###
 * 更新后，需要更改state树的结构为
 * key{
 *     tab1:{
 *          isLoading:false,
 *          isLoadingMore:false,
 *          data:{}
 *          items:[],
 *     },
 *     tab2:{
 *          isLoading:false,
 *          isLoadingMore:false,
 *          data:{}
 *          items:[],
 *     }
 * }
 */
import types from '../../action/types';

export default function onAction(state = {}, action) {
    const {tabName,type} = action;//取出是哪个tab的操作
    switch (type) {
        case types.REQUEST_DATA:
            /*return Object.assign(
                {},
                state, //此处的state就是对应状态树中的一小部分state
                [tabName]{}
            );*/
            return {
                ...state,
                [tabName]: {//这里要利用以前已有的数据items
                    ...state[tabName],
                    isLoading: true,
                },
            };
        case types.REFRESH_DATA_SUCCESS:
            return Object.assign({}, state,
                {
                    [tabName]: {
                        isLoading: false,
                        data: action.data,//目前要显示的数据
                        items:action.items,//items是全数据
                    },
                });
            //上下两种写法都行。
            /*return {
                ...state,
                [tabName]: {
                    isLoading: false,
                    data: action.data,
                },
            };*/
        case types.REFRESH_DATA_Fail:
            /*return Object.assign({}, state, {
                isLoading: false,//后面新加的属性会覆盖之前state中已有的属性
            });*/
            return {
                ...state,
                [tabName]: {
                    ...state[tabName],
                    isLoading: false,//后面新加的属性会覆盖之前state中已有的属性
                },
            };
        case types.LOAD_MORE_DATA:
            return {
              ...state,
              [tabName]:{
                  ...state[tabName],
                  isLoadingMore:true,
              }
            };
        case types.LOAD_MORE_DATA_SUCCESS:
            return {
                ...state,
                [tabName]:{
                    ...state[tabName],
                    isLoadingMore:false,
                    data:action.data,
                }
            };
        case types.LOAD_MORE_DATA_Fail:
            return {
                ...state,
                [tabName]:{
                    ...state[tabName],
                    isLoadingMore:false,
                }
            };
        default:
            return state;
    }
}
