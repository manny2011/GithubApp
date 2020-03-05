import React from 'react';
import { ScrollView, Text, View,TouchableOpacity } from 'react-native';
import { ThemeFlags } from '../common/ThemeFactory';

export default class ThemePage extends React.Component {
  constructor(props) {
    super(props);
  }

  renderThemeItems() {
    let views = [];
    for (let i = 0, keys = Object.keys(ThemeFlags), k = keys.length; i < k; i += 3) {
      const k1 = keys[i], k2 = keys[i + 1], k3 = keys[i + 2];
      views.push(<View style={{ flex: 1, flexDirection: 'row' }}>
        {this.getThemeItemView(k1, ThemeFlags[k1])}
        {this.getThemeItemView(k2, ThemeFlags[k2])}
        {this.getThemeItemView(k3, ThemeFlags[k3])}
      </View>);//JSX中使用变量/方法，必须使用{}来引用
    }
    return views;
  }

  getThemeItemView(themeName, colorValue) {
    return (<TouchableOpacity style={{ flex: 1, height: 120, margin: 10, backgroundColor: colorValue, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{themeName}</Text>
    </TouchableOpacity>);
  }

  render() {
    return (<ScrollView>
      {this.renderThemeItems()}
    </ScrollView>);
  }

}