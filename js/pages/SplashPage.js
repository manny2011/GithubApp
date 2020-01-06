import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class SplashPage extends Component {
    componentDidMount(): void {
        setTimeout(() => {
            this.props.navigation.navigate('Main');
        }, 2000);
    }

    render() {
        return (<View style={styles.container}>
            <Text style={styles.text}>Welcome Page!</Text>
        </View>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#828',
    },
    text: {
        fontSize: 20,
        color: 'black',
    },

});

