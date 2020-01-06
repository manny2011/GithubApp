import {createStore, applyMiddleware} from 'redux';
import rootReducers from '../reducer/index';
import thunk from 'redux-thunk';

//action发起后，到reducer处理前
/**
 * 记录所有被发起的 action 以及产生的新的 state。
 */
const logger = store => next => action => {
    console.group(action.type);
    console.info('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    console.groupEnd(action.type);
    return result;
};

/**
 * 在 state 更新完成和 listener 被通知之后发送崩溃报告。
 */
const crashReporter = store => next => action => {
    try {
        return next(action)
    } catch (err) {
        console.error('Caught an exception!', err);
        /*Raven.captureException(err, {
            extra: {
                action,
                state: store.getState()
            }
        });*/
        throw err
    }
};

export default createStore(rootReducers, applyMiddleware(thunk, logger,crashReporter));

