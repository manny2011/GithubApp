import ParallaxScrollView from 'react-native-parallax-scroll-view';
import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const PARALLAX_HEADER_HEIGHT = 270;
const nav_bar_height_ios = 44;
const nav_bar_height_android = 50;
const STICKY_HEADER_HEIGHT = (Platform.OS === 'ios') ? nav_bar_height_ios + TOP : nav_bar_height_android;
const window = Dimensions.get('window');


export default class AboutCommon {
  constructor(updateFunc) {
    this.updateState = updateFunc;
  }

  componentDidMount() {
    fetch('https://www.devio.org/io/GitHubPopular/json/github_app_config.json')
    .then(response=>{
      if(response.code==200){
        return JSON.parse(response.body);
      }
    }).then(config=>{
      if(config){
        this.updateState({data:config});
      }
    }).catch(err=>{

    });
  }

  componentWillUnmount() {

  }

  render(contentView) {
    return (
      <ParallaxScrollView
        backgroundColor='#fff'
        contentBackgroundColor="#f3f3f4"
        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
        stickyHeaderHeight = {STICKY_HEADER_HEIGHT}
        renderStickyHead = {()=>(
          <View style={{flex:1,height:STICKY_HEADER_HEIGHT,justifyContent:'center',alignItems:'center',backgroundColor:'#f0f'}}>
            <Text style={styles.forgroundTitle}>CrazyCodeBoy</Text>
          </View>
        )}
        renderForeground={() => (
          <View style={{ height: 300, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.forgroundTitle}>CrazyCodeBoy</Text>
            <Text style={styles.forgroundText}>专注于移动开发，分享知识，共享快乐</Text>
          </View>
        )}
        renderBackground={() => (
          <View>
            <Image source={{ uri: 'https://www.devio.org/io/GitHubPopular/img/for_githubpopular_about_me.jpg' }}
              style={{ width: window.width, height: PARALLAX_HEADER_HEIGHT }} />
          </View>
        )}>

        {contentView}

      </ParallaxScrollView>
    )
  }
}

const styles = StyleSheet.create({
  forground: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 270,
  },
  background: {

  },
  forgroundTitle: {
    fontSize: 20,
    color: 'white'
  },
  forgroundText: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,
  },
  forgroundImage: {
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT,
  },

});