import { PropTypes } from 'prop-types';
import React from 'react';
import { View, Button, Text, ScrollView, ToastAndroid, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class AboutMeItem extends React.Component {
  //提供属性的类型检查
  static propTypes = {
    IconClass: PropTypes.element,
    IconName: PropTypes.string,
    label: PropTypes.string,
    callback: PropTypes.function,
  }

  constructor(props) {
    super(props);
  }
  render() {
    const { IconClass, IconName, label, callback } = this.props;
    return (<TouchableOpacity onPress={callback}
      style={{
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', paddingTop: 10, paddingBottom: 10, 
        paddingLeft: 20, paddingRight: 20,height:60
      }}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <IconClass name={IconName} size={16} />
        <Text style={{ marginLeft: 10 }}>{label}</Text>
      </View>
      <Ionicons name={'ios-arrow-forward'} size={16} />
    </TouchableOpacity>);
  }
}