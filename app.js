/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Util from './Util';
import MenuBall from './MenuBall';

export default class app extends Component {
  render() {
    return (
      <View style={styles.container}>

      <View style={{flex:1,width:Util.size.width/2,height:Util.size.height,flexDirection:'row',position:'absolute'}}>
      <View style={{flex:1,width:Util.size.width/2,backgroundColor:'black'}}/>
      <View style={{flex:1,width:Util.size.width/2,backgroundColor:'white'}}/>
      </View>

      <MenuBall/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
