import React, { Component } from 'react';
import { View, Button, Text, ScrollView, ToastAndroid, TouchableOpacity, StyleSheet } from 'react-native';
import actions from '../action/index';
import { connect } from 'react-redux';
import NavigationBar from '../common/NavigationBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Menu from '../common/Menu';
import AboutMeItem from '../common/AboutMeItem';

class MinePage extends Component {
    render() {
        return (<View style={{ flex: 1 }}>
            <NavigationBar title={'我的'} statusBar={{ barStyle: 'light-content', hidden: false, backgroundColor: '#999' }} />
            <ScrollView overScrollMode={'always'} horizontal={false}>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20 }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name={'logo-github'} size={40} />
                        <Text style={{ marginLeft: 10 }}>Github Popular</Text>
                    </View>
                    <Ionicons name={'ios-arrow-forward'} size={16} />
                </TouchableOpacity>
                {this.divider()}
                <AboutMeItem IconClass={Menu.tutorial.IconComponent} IconName={Menu.tutorial.IconName} label={Menu.tutorial.Label} callback={() => { this.onItemClick(Menu.tutorial) }} />
                <Text style={styles.groupTitle}>趋势管理</Text>
                <AboutMeItem IconClass={Menu.customLanguage.IconComponent} IconName={Menu.customLanguage.IconName} label={Menu.customLanguage.Label} callback={() => { this.onItemClick(Menu.tutorial) }} />
                {this.divider()}
                <AboutMeItem IconClass={Menu.sortLabel.IconComponent} IconName={Menu.sortLabel.IconName} label={Menu.sortLabel.Label} callback={() => { this.onItemClick(Menu.tutorial) }} />
                <Text style={styles.groupTitle}>最热管理</Text>
                <AboutMeItem IconClass={Menu.customLabel.IconComponent} IconName={Menu.customLabel.IconName} label={Menu.customLabel.Label} callback={() => { this.onItemClick(Menu.customLabel) }} />
                {this.divider()}
                <AboutMeItem IconClass={Menu.sortLabel.IconComponent} IconName={Menu.sortLabel.IconName} label={Menu.sortLabel.Label} callback={() => { this.onItemClick(Menu.sortLabel) }} />
                {this.divider()}
                <AboutMeItem IconClass={Menu.removeLabel.IconComponent} IconName={Menu.removeLabel.IconName} label={Menu.removeLabel.Label} callback={() => { this.onItemClick(Menu.removeLabel) }} />
                {this.divider()}
                <Text style={styles.groupTitle}>设置</Text>
                <AboutMeItem IconClass={Menu.customTheme.IconComponent} IconName={Menu.customTheme.IconName} label={Menu.customTheme.Label} callback={() => { this.onItemClick(Menu.customTheme) }} />
                {this.divider()}
                <AboutMeItem IconClass={Menu.aboutAuthor.IconComponent} IconName={Menu.aboutAuthor.IconName} label={Menu.aboutAuthor.Label} callback={() => { this.onItemClick(Menu.aboutAuthor) }} />
                {this.divider()}
                <AboutMeItem IconClass={Menu.feedback.IconComponent} IconName={Menu.feedback.IconName} label={Menu.feedback.Label} callback={() => { this.onItemClick(Menu.feedback) }} />
                {this.divider()}
                <AboutMeItem IconClass={Menu.CodePush.IconComponent} IconName={Menu.CodePush.IconName} label={Menu.CodePush.Label} callback={() => { this.onItemClick(Menu.CodePush) }} />
                {this.divider()}
            </ScrollView>
            <View>

            </View>
        </View>);
    }

    onItemClick(item) {
        var RouteName;
        switch (item) {
            case Menu.tutorial:
                    // RouteName = 'WebViewPage';
                    // params.title = '教程';
                    // params.url = 'https://coding.m.imooc.com/classindex.html?cid=304';
                    break;
                // case Menu.aboutAuthor:
                    // RouteName = 'AboutPage';
                    // break;
                case Menu.customTheme:
                    // const {onShowCustomThemeView} = this.props;
                    // onShowCustomThemeView(true);
                    break;
                case Menu.CodePush:
                    RouteName = 'CodePushPage';
                    break;
                case Menu.sortLabel:
                    RouteName = 'SortKeyPage';
                    // params.flag = FLAG_LANGUAGE.flag_key;
                    break;
                case Menu.sortLanguage:
                    RouteName = 'SortKeyPage';
                    // params.flag = FLAG_LANGUAGE.flag_language;
                    break;
                case Menu.customLabel:
                case Menu.customLanguage:
                case Menu.removeLabel:
                    RouteName = 'CustomKeyPage';
                    // params.isRemoveKey = menu === Menu.Remove_Key;
                    // params.flag = menu !== Menu.Custom_Language ? FLAG_LANGUAGE.flag_key : FLAG_LANGUAGE.flag_language;
                    break;
                case Menu.aboutAuthor:
                    RouteName = 'AboutMePage';
                    break;
                case Menu.feedback:
                    RouteName = 'feedback';
                    break;
        }
    }

    divider() {
        return <View style={{ height: 0.5, backgroundColor: '#999' }} />;
    }
}

const styles = StyleSheet.create({
    groupTitle: {
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 5,
        fontSize: 12,
        color: 'gray',
        backgroundColor: '#999',
    }
})

const mapDispatch2Props = dispatch => {
    return {
        onThemeChange: (newTheme) => dispatch(actions.onThemeChange(newTheme)),
    };
};

const mapState2Prop = state => ({

});

let container = connect(mapState2Prop, mapDispatch2Props)(MinePage);
export default container;
