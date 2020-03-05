import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ToastAndroid,
    BackHandler,

} from 'react-native';
import {WebView} from 'react-native-webview';
import NavigationBar from '../common/NavigationBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const TRENDING_URL = 'https://github.com/';

export default class DetailPage extends Component {

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        const {projectModel} = this.params;
        console.log(projectModel);
        this.state = {
            isFavorite: false,
            url:projectModel.html_url ? projectModel.html_url:(TRENDING_URL+projectModel.url),
            title:projectModel.fullName || projectModel.full_name,
        };
        this._goBack = this.goBack.bind(this);//此处的function必须显式绑定下当前对象，否则在backHandler回调环境中的this已经不再是指向当前DetailPage对象了。
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this._goBack);//对比于：goBack()此处需要传递的是一个Function引用，加上括号就成了在addListener()函数执行时，直接执行这个函数了
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    render() {
        return <View style={{flex: 1}}>
            <NavigationBar
                isNavHidden={false}
                title={this.state.title}
                leftView={this.genLeftView(() => this.goBack())}
                rightView={this.renderRightButton()}
                titleContainerStyle={{marginRight:20,marginLeft:20}}
                statusBar={{hidden: false, backgroundColor: '#839', barStyle: 'light-content'}}/>

            <WebView
                startInLoadingState={true}
                ref={webView => this.webView = webView}
                onNavigationStateChange={navState => this.onNavigationStateChange(navState)}
                source={{uri: this.state.url}}/>
        </View>;
    }

    goBack(){
        if(this.state.canGoBack){
            this.webView.goBack();
        }else{
            this.props.navigation.goBack();
        }
        return true;
    }

    onNavigationStateChange(navState){
        this.setState({
            canGoBack:navState.canGoBack,
            url:navState.url,
        })
    }

    genLeftView(callback) {
        return <TouchableOpacity
            style={{padding: 8, paddingLeft: 12}}
            onPress={callback}>
            <Ionicons
                name={'ios-arrow-back'}
                size={26}
                style={{color: 'white'}}/>
        </TouchableOpacity>;
    }

    getShareButton(callBack) {
        return <TouchableOpacity
            underlayColor={'transparent'}
            onPress={callBack}>
            <Ionicons
                name={'md-share'}
                size={20}
                style={{opacity: 0.9, marginRight: 10, color: 'white'}}/>
        </TouchableOpacity>;
    }

    renderRightButton() {
        return (<View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                    onPress={() => this.onFavoriteButtonClick()}>
                    <FontAwesome
                        name={this.state.isFavorite ? 'star' : 'star-o'}
                        size={20}
                        style={{color: 'white', marginRight: 10}}
                    />
                </TouchableOpacity>
                {this.getShareButton(() => {
                    // let shareApp = share.share_app;
                    // ShareUtil.shareboard(shareApp.content, shareApp.imgUrl, this.url, shareApp.title, [0, 1, 2, 3, 4, 5, 6], (code, message) => {
                    //     console.log("result:" + code + message);
                    // });
                })}
            </View>
        );
    }

    onFavoriteButtonClick() {
        ToastAndroid.show('favorite clicked', 200);
    }
}
