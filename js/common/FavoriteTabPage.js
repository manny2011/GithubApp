import React from 'react';
import FavoriteDao, {POPULAR, TRENDING} from '../dao/FavoriteDao';
import actions from '../action';
import {ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import ListItem from './ListItem';
import NavigationUtil from './NavigationUtil';
import {connect} from 'react-redux';
import collectionData from '../reducer/collection';
import {collection_load_data_async} from '../action/collection';
import TrendItem from './TrendItem';
import EventBus from 'react-native-event-bus';
import EventType from '../event/EventType';

class FavoriteTabPage extends React.Component {

    constructor(props) {
        super(props);
        this.flag = this.props.flag;
        this.favoriteDao = new FavoriteDao(this.flag);//就是此处的问题，最新与收藏界面分别用的是不同的Dao,此处通过flag来区分的；
    }

    componentDidMount() {
        this._loadData();
        EventBus.getInstance().addListener(EventType.bottom_tab_select,this.listener = (params)=>{
            if(params && params.to ===2){
                this._loadData();
            }
        })
    }

    componentWillUnmount(): void {
        EventBus.getInstance().removeListener(this.listener);
    }

    _loadData() {
        const {loadData} = this.props;
        loadData(this.flag);//发起异步action
    }

    render() {
        const {collectionData} = this.props;
        const data = collectionData[this.flag];
        const {items, isLoading} = data;
        if(!items)
            return null;
        if(this.flag === TRENDING){
            console.log("trending items: "+items);
        }
        let Item = this.flag === POPULAR ? ListItem : TrendItem;
        return <View style={styles.container}>
            <FlatList
                data={items}
                renderItem={({item}) => <Item item={item}
                                              favoriteDao={this.favoriteDao}
                                              onItemPress={item => NavigationUtil.navigation.navigate('DetailPage', {projectModel: item})}/>
                }
                keyExtractor={(item) => {
                    if(item){
                        if(item.id){
                            return item.id;
                        }else{
                            return item.fullName;
                        }
                    }
                }}
                refreshControl={
                    <RefreshControl
                        title={'loading'}
                        titleColor={'red'}
                        refreshing={isLoading}
                        tintColor={'red'}
                        onRefresh={() => this._loadData()}/>
                }
                /*
                onEndReached={() => {
                    if (!this.onEndReachedCalledDuringMomentum) {
                        this._loadMoreData();
                        this.onEndReachedCalledDuringMomentum = true;
                    }
                }}
                onEndReachedThreshold={0.1}
                onMomentumScrollBegin={() => {
                    this.onEndReachedCalledDuringMomentum = false;
                }}
                 */
            />

        </View>;
    }

}

const mapStateToProps = (state) => {//此处的state是总的那个state吗？！ 这是一个理解的关键点；而且此处如果只返回一个对象，可以简化为({});
    return {collectionData: state.collectionData};
};

const mapDispatchToProps = (dispatch) => ({
    loadData: flag => dispatch(collection_load_data_async(flag)),
});
export default connect(mapStateToProps, mapDispatchToProps)(FavoriteTabPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});
