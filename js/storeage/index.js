import {AsyncStorage} from 'react-native';

/**
 * 离线缓存设计的思路：
 * 先获取本地数据，如果存在并且没有过时（超时时间1小时），那么直接返回给调用方；
 * 如果没有或者超时，获取服务器上最新数据，并缓存到本地AsyncStorage中后，再返回给调用方；
 *
 * then回调中如果抛出异常，直接会走后面的catch方法。
 */

export default function loadData(url) {
    return new Promise(((resolve, reject) => {
        loadDataFromLocal(url)
            .then(data => {
                if (data && checkDataAvailable(data)) {
                    resolve(data);
                } else {
                    throw new Error('local data not available');
                }
            }).catch(err => {
            loadDataFromServer(url)
                .then(data => {
                    resolve(data);
                }).catch(err => {
                reject(err);
            });
        });
    }));
}

/**
 * 根据url从本地获取
 * @param url
 */
function loadDataFromLocal(url) {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(url)
            .then(value => {
                if (value) {
                    let jsonData = JSON.parse(value);
                    resolve(jsonData);
                } else {
                    throw new Error('the value corresponding to ${url} is ${value}');
                }
            }).catch(err => {
            reject(err);
        });
    });
}

/**
 * 从网络获取，并缓存本地
 * @param url
 */
function loadDataFromServer(url) {
    return new Promise(((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('no data from server: ${response}');
                }
            })
            .then(responseJson => {//json obj
                saveData(responseJson);
                resolve(responseJson);
            })
            .catch(err => reject(err));
    }));
}

function _wrapData(data) {
    return {...data, timestamp: new Date().getTime()};
}

/**
 * 缓存到本地
 * @param url
 * @param data
 */
function saveData(url, data) {
    AsyncStorage.setItem(url, JSON.stringify(_wrapData(data)))
        .then(() => console.log('saved data: ${url} ==> ${data}'))
        .catch(err => {
            console.log('save data:failed');
        });
}

let timeLimit = 60 * 60 * 1000;

function checkDataAvailable(data) {
    const {timestamp} = data;
    let now = new Date().getTime();
    let diff = now - timestamp;
    return diff <= timeLimit;

}





