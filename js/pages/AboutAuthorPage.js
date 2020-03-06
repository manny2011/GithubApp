import React from 'react';
import { View, Text, Dimensions, Image, RefreshControl } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import AboutCommon from '../common/AboutCommon';
import AboutMeItem from '../common/AboutMeItem';
import {Menu} from '../common/Menu';
import config from '../common/config';

const PARALLAX_HEADER_HEIGHT = 300
const STICKY_HEADER_HEIGHT = 50;

export default class AboutAuthorPage extends React.Component {
  constructor(props) {
    super(props);
    this.aboutCommon = new AboutCommon(data => { this.setState({ ...data }) });
    this.state = {
      config: config,
    }
  }

  // Inside of a component's render() method:
  render() {
    const contentView = (<View style={{flex:1}}>
      <AboutMeItem IconClass={Menu.tutorial.IconComponent} IconName={Menu.tutorial.IconName} label={Menu.tutorial.Label} callback={() => { this.onItemClick(Menu.tutorial) }} />
      {this.divider()}
      <AboutMeItem IconClass={Menu.tutorial.IconComponent} IconName={this.state.config.aboutMe.Blog.icon} label={this.state.config.aboutMe.Blog.name} callback={() => { this.onItemClick(Menu.tutorial) }} />
      {this.divider()}
      <AboutMeItem IconClass={Menu.tutorial.IconComponent} IconName={this.state.config.aboutMe.Contact.icon} label={this.state.config.aboutMe.Contact.name} callback={() => { this.onItemClick(Menu.tutorial) }} />
      {this.divider()}
      <AboutMeItem IconClass={Menu.tutorial.IconComponent} IconName={this.state.config.aboutMe.QQ.icon} label={this.state.config.aboutMe.QQ.name} callback={() => { this.onItemClick(Menu.tutorial) }} />
      {this.divider()}
      
    </View>);
    //又是这个问题：root view没有添加flex = 1
    return (<View style={{ flex: 1 }}>
      {this.aboutCommon.render(contentView)}
    </View>);
  }

  onItemClick(item){

  }

  
  divider() {
    return <View style={{ height: 0.5, backgroundColor: '#999' }} />;
  }
}
