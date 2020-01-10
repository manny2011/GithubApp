import React, {Component} from 'react';
import {View, Button} from 'react-native';
import actions from '../action/index';
import {connect} from 'react-redux';
import NavigationBar from '../common/NavigationBar';

class MinePage extends Component {
    render() {
        return (<View>
            <NavigationBar title={'我的'} statusBar={{barStyle:'light-content',hidden:false,backgroundColor:'#999'}}/>
            <Button style={{color: 'orange', fontSize: 18}} title={'改变主题色'}
                    onPress={() => this.props.onThemeChange('pink')}/>
        </View>);
    }
}

const mapDispatch2Props = dispatch => {
    return {
        onThemeChange: (newTheme) => dispatch(actions.onThemeChange(newTheme)),
    };
};

let container = connect(null,mapDispatch2Props)(MinePage);
export default container;
