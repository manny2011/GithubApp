import AsyncStorage from '@react-native-community/async-storage';
import {call} from 'react-native-reanimated';


/**
 * 这个类用来进行对喜欢项目的储存和读取，删除操作等
 */
const FAVORITE_TYPE = 'FAVORITE_TYPE_';
export const TRENDING = 'TRENDING';
export const POPULAR = 'POPULAR';

export default class FavoriteDao {

    constructor(flag) {
        this.favoriteKey = FAVORITE_TYPE + flag;
    }

    saveFavoriteItem(key, value, callback?) {
        AsyncStorage.setItem(key, value)
            .then(() => {
                this.updateFavoriteKey(key, true);
            })
            .catch(error => {
                callback && callback(error);
            });
    }

    removeFavoriteItem(key){
        AsyncStorage.removeItem(key)
            .then(()=>{
                this.updateFavoriteKey(key,false);
            });
    }

    /**
     *
     * @param key item唯一一个
     * @param isAdd 添加还是删除操作
     */
    updateFavoriteKey(key, isAdd) {
        AsyncStorage.getItem(this.favoriteKey, ((error, result) => {
            if (!error) {
                let favoriteKeys = [];
                if (result) {//如果保存有内容，再解析，否则用默认值就好；undefined/null == false
                    favoriteKeys = JSON.parse(result);
                }
                let index = favoriteKeys.indexOf(key);
                if (isAdd) {
                    if (index === -1) {
                        favoriteKeys.push(key);
                    }else{
                        return;
                    }
                } else {
                    if (index !== -1) {
                        favoriteKeys.splice(index, 1);
                    }else{
                        return;
                    }
                }
                AsyncStorage.setItem(this.favoriteKey, JSON.stringify(favoriteKeys));//将更新后的key集合保存到本地
                console.log(favoriteKeys);
            }
        }));
    }

    getFavoriteKeys() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(this.favoriteKey, (error, result) => {
                if (error) {
                    reject(error);
                }
                resolve(JSON.parse(result));
            });
        });
    }

    getAllFavoriteItems() {
        return new Promise((resolve, reject) => {
            this.getFavoriteKeys()
                .then(keys => {
                    let favoriteItems = [];
                    if(keys) {
                        AsyncStorage.multiGet(keys, ((errors, results) => {
                            if (!errors) {
                                //array.map的作用：对数组中的每个值应用一下回调函数，结果就是转换后的值
                                //multiGet([key1,key2])=>[[key1,value1],[key2,value2]],如此转换关系而已... results is a [[],[],[]],二维数组
                                results.map((value, index, arrays) => {
                                    favoriteItems.push(JSON.parse(arrays[index][1]));
                                });
                            }
                            console.log("All Items:" + this.favoriteKey + "\n" + favoriteItems);
                        }));
                    }
                    resolve(favoriteItems);

                })
                .catch(e => {
                    reject(e);
                });
        });
    }
}
