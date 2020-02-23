import React from 'react';
import {ToastAndroid, TouchableOpacity} from 'react-native';
import FavoriteIcon from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class BaseItem extends React.Component {
    _favoriteDao;

    constructor(props) {
        super(props);
        console.log(props.item);
        this.state = {
            isFavorite: this.props.item.isFavorite,
        };
    }

    /**
     * 牢记：https://github.com/reactjs/rfcs/blob/master/text/0006-static-lifecycle-methods.md
     * componentWillReceiveProps在新版React中不能再用了
     * @param nextProps
     * @param prevState
     * @returns {*}
     */
    static getDerivedStateFromProps(nextProps, prevState) {
        const isFavorite = nextProps.item.isFavorite;
        if (prevState.isFavorite !== isFavorite) {
            return {
                isFavorite: isFavorite,
            };
        }
        return null;
    }

    _renderFavoriteButton() {
        return (<TouchableOpacity style={{padding: 10}}
                                  onPress={() => {
                                      this.onFavoritePressed();
                                  }}>
            <FontAwesome
                name={this.state.isFavorite ? 'star' : 'star-o'}
                color={'red'}
                size={22}/>
        </TouchableOpacity>);
    }

    onFavoritePressed() {
        ToastAndroid.show('Star Pressed', ToastAndroid.SHORT);
        this.setState({isFavorite: !this.state.isFavorite});
        this.props.item.isFavorite = !this.state.isFavorite;
        if(this.props.item.isFavorite){
            this._favoriteDao.saveFavoriteItem(this.props.item.fullName, JSON.stringify(this.props.item), error => {
                console.log(error);
            });
        }else{
            this._favoriteDao.removeFavoriteItem(this.props.item.fullName);
        }
    }
}
