import types from '../../action/types';

const defaultState = {
    theme: 'blue',
};

export default function (preState = defaultState, action) {//必须显式地返回一个用于初始化的state
    switch (action.type) {
        case types.THEME_CHANGE:
            return {...preState, theme: action.theme};
        default:
            return preState;
    }
}
