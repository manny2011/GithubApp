import React, {Component} from 'react';
import {View, Button} from 'react-native';
import actions from '../action/index';
import {connect} from 'react-redux';

class MinePage extends Component {
    render() {
        return (<View>
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
