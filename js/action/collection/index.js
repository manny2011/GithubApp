import types from '../types';
import FavoriteDao from '../../dao/FavoriteDao';

export function collection_load_data(tabName) {
    return {
        type: types.COLLECTION_LOAD_DATA,
        tabName: tabName,
        isLoading: true,
    };
}

export function collection_load_data_success(tabName,items) {
    return {
        type: types.COLLECTION_LOAD_DATA_SUCCESS,
        tabName: tabName,
        data:items,
        isLoading: false,
    };
}

export function collection_load_data_failed(tabName) {
    return {
        type: types.COLLECTION_LOAD_DATA_Fail,
        tabName: tabName,
        isLoading: false,
    };
}

//async Action Functions
export function collection_load_data_async(flag) {
    return dispatch=>{
        dispatch(collection_load_data(flag));
        new FavoriteDao(flag)
            .getAllFavoriteItems()
            .then(items=>{
                dispatch(collection_load_data_success(flag,items));
            }).catch(err=>{
                console.log(err);
                dispatch(collection_load_data_failed(flag));
        })
    }
}
