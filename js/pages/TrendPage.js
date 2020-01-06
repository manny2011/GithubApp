import React, {Component} from 'react';
import {Text, View, Button, default as AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import actions from '../action/index';

class TrendPage extends Component {
    render() {
        return (<View>
            <Button title={'改变底部tab为红色'}
                    onPress={(event) => event && this.props.onThemeChange('green')}/>
        </View>);
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
