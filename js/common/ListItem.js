import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  ToastAndroid,
} from 'react-native';
import FavoriteIcon from 'react-native-vector-icons/Entypo';
import BaseItem from './BaseItem';
import FavoriteDao, {POPULAR} from '../dao/FavoriteDao';

export default class ListItem extends BaseItem {
  constructor(props) {
    super(props);
    this._favoriteDao = props.favoriteDao;
  }

  render() {
    const {item, onItemPress} = this.props;
    console.log(item);
    if (!item) {
      return null;
    }
    return (
      <TouchableOpacity onPress={() => onItemPress(item)}>
        <View style={styles.container}>
          <Text style={styles.fullName}>{item.full_name}</Text>
          <Text style={styles.intro}>{item.description}</Text>

          <View style={styles.bottomContainer}>
            <View style={{flexDirection: 'row'}}>
              <Text>Author:</Text>
            </View>

            <Text>Stars:{item.stargazers_count}</Text>

            {this._renderFavoriteButton()}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 3,
    borderColor: '#dddddd',
    borderWidth: 0.5,
    borderRadius: 2,
    shadowColor: 'gray',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 2,
  },
  fullName: {
    fontSize: 16,
    marginBottom: 2,
    color: '#212121',
  },

  intro: {
    fontSize: 14,
    marginBottom: 2,
    color: '#757575',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
