import React from 'react';
import {PropTypes} from 'prop-types';
import {
    View,
    ViewPropTypes,
    StatusBar,
    Text,
    StyleSheet,

} from 'react-native';

const StatusBarShape = {//设置状态栏所接受的属性
    barStyle: PropTypes.oneOf(['light-content', 'default']),
    hidden: PropTypes.bool,
    backgroundColor: PropTypes.string,
};

export default class NavigationBar extends React.Component {
    //提供属性的类型检查
    static propTypes = {
        isNavHidden: PropTypes.bool,//整个导航栏是否隐藏

        title: PropTypes.string,//中间区域
        titleView: PropTypes.element,

        leftView: PropTypes.element,//左右区域
        rightView: PropTypes.element,

        isStatusBarHide: PropTypes.bool,//状态栏
        statusBar: PropTypes.shape(StatusBarShape),

        containerStyle: ViewPropTypes.style,//传递过来style对象
        titleViewStyle: ViewPropTypes.style,//传递过来style对象

    };
    // animated={true}
    // hidden={false}
    // androidtranslucent={true}
    static defaultProps = {//默认属性，如果其中某个属性是undefined，则触发使用默认属性值
        statusBar: {
            hidden: false,
            barStyle: 'light-content',
            backgroundColor:'#6ca8f1',//
        },
        title: 'default title',
        isStatusBarHide:false,
    };

    render() {
        let statusBar = this.props.isStatusBarHide ? null :
            (<View styles={styles.statusBarContainerStyle}>
                <StatusBar {...this.props.statusBar}/>
            </View>);
        let titleView = this.props.titleView ? this.props.titleView :
            <Text ellipsizeMode={'middle'} numberOfLines={1} style={styles.title}>{this.props.title}</Text>;
        let content = this.props.isNavHidden ? null :
            (<View style={styles.navStyle}>
                {this.getLeftView(this.props.leftView)}
                <View style={styles.titleContainer}>
                    {titleView}
                </View>
                {this.props.rightView}
            </View>);

        return (<View style={styles.container}>
            {statusBar}
            {content}
        </View>);
    }

    getLeftView(leftView) {
        return(
            <View style={styles.leftViewStyle}>
                {leftView}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#2196f3',
    },
    titleContainer:{
        position:'absolute',
        alignItems:'center',
        justifyContent:'center',
        left:0,
        right:0,
        top:0,
        bottom:0
    },
    leftViewStyle:{
        padding:10,
        alignItems: 'center',
    },
    statusBarContainerStyle: {
        height: 40,//不生效
        backgroundColor:'black',

    },
    title: {
        color: 'black',
        fontSize: 20,
    },
    navStyle: {
        alignItems: 'center',
        height: 44,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
});

