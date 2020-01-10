import React, {Component} from 'react';
import {Text, View, Button, default as AsyncStorage, TouchableOpacity,ToastAndroid} from 'react-native';
import {connect} from 'react-redux';
import actions from '../action/index';
import NavigationBar from '../common/NavigationBar';
import Icon from 'react-native-vector-icons/AntDesign';
import NativeToastAndroid from 'react-native/Libraries/Components/ToastAndroid/NativeToastAndroid';


class TrendPage extends Component {
    render() {
        return (<View>
            <NavigationBar leftView={this.renderLeftView()}
                           title={'趋势'}
                           statusBar={{barStyle:'default',backgroundColor:'#2196f3',hidden:false}}/>
            <Button title={'改变底部tab为红色'}
                    onPress={(event) => event && this.props.onThemeChange('green')}/>
        </View>);
    }

    renderLeftView() {
        return <TouchableOpacity underlayColor={'#999'} onPress={()=>ToastAndroid.show('go back',300)}>
            <Icon name={'arrowleft'} size={20} color={'black'}/>
        </TouchableOpacity>;
    }
}

function getLocalData() {
    AsyncStorage.setItem('name', 'baozi')
        .then(() => {
            //success
        }).catch(err => {
            //exception

    });
}

const mapDispatchToProps = dispatch => ({
    onThemeChange: newTheme => dispatch(actions.onThemeChange(newTheme)),
});
export default connect(null, mapDispatchToProps)(TrendPage);
