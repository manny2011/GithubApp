import types from '../types';

export function onThemeChange(theme) {//action对象生成函数
    return {
        type: types.THEME_CHANGE,
        theme: theme,
    };
}
