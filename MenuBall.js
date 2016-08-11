import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PanResponder,
} from 'react-native';

var _previousLeft=0;
var _previousTop=0;

var lastLeft=0;
var lastTop=0;

const CIRCLE_SIZE=80;

import Util from './Util';
/**
自定义拖拽菜单
**/
export default class MenuBall extends Component{

  constructor(props){
    super(props);

    this.state={
      style:{
          backgroundColor:'blue',
      },
    }

    this.onStartShouldSetPanResponder=this.onStartShouldSetPanResponder.bind(this);
    this.onMoveShouldSetPanResponder=this.onMoveShouldSetPanResponder.bind(this);
    this.onPanResponderGrant=this.onPanResponderGrant.bind(this);
    this.onPanResponderMove=this.onPanResponderMove.bind(this);
    this.onPanResponderEnd=this.onPanResponderEnd.bind(this);
  }

  //用户开始触摸屏幕的时候，是否愿意成为响应者；
  onStartShouldSetPanResponder(evt, gestureState){
   return true;
  }
  //在每一个触摸点开始移动的时候，再询问一次是否响应触摸交互；
  onMoveShouldSetPanResponder(evt, gestureState){
   return true ;
  }
  // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
  onPanResponderGrant(evt, gestureState){
    console.log('onPanResponderGrant...');
   this.setState({
     style:{
         backgroundColor:'red',
         left:_previousLeft,
         top:_previousTop,
     }
   });
  }
  // 最近一次的移动距离为gestureState.move{X,Y}
  onPanResponderMove(evt, gestureState){
     _previousLeft=lastLeft+gestureState.dx;
     _previousTop=lastTop+gestureState.dy;

     if(_previousLeft<=0){
       _previousLeft=0;
     }
     if(_previousTop<=0){
       _previousTop=0;
     }
     if(_previousLeft>=Util.size.width-CIRCLE_SIZE){
       _previousLeft=Util.size.width-CIRCLE_SIZE;
     }
     if(_previousTop>=Util.size.height-CIRCLE_SIZE){
       _previousTop=Util.size.height-CIRCLE_SIZE;
     }

    //实时更新
    this.setState({
      style:{
          backgroundColor:'red',
          left:_previousLeft,
          top:_previousTop,
      }
    });
  }
  // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
  // 一般来说这意味着一个手势操作已经成功完成。
  onPanResponderEnd(evt, gestureState){

    lastLeft=_previousLeft;
    lastTop=_previousTop;

    this.changePosition();
  }

  /**
   根据位置做出相应处理
  **/
  changePosition(){

  if(_previousLeft+CIRCLE_SIZE/2<=Util.size.width/2){
    //left
    _previousLeft=lastLeft=0;

    this.setState({
            style:{
                left:_previousLeft,
                top:_previousTop,
            }
          });
  }else{
  _previousLeft=lastLeft=Util.size.width-CIRCLE_SIZE;

  this.setState({
          style:{
              left:_previousLeft,
              top:_previousTop,
          }
        });
  }
  }

  componentWillMount(evt, gestureState){
    this._panResponder=PanResponder.create({
      onStartShouldSetPanResponder:this.onStartShouldSetPanResponder,
      onMoveShouldSetPanResponder:this.onMoveShouldSetPanResponder,
      onPanResponderGrant:this.onPanResponderGrant,
      onPanResponderMove:this.onPanResponderMove,
      onPanResponderRelease:this.onPanResponderEnd,
      onPanResponderTerminate:this.onPanResponderEnd,
    });
  }

  render(){
    return(
      <View
      {...this._panResponder.panHandlers}
      style={[styles.circle,this.state.style]}/>
    );
  }
}

const styles=StyleSheet.create({
  circle:{
    width:CIRCLE_SIZE,
    height:CIRCLE_SIZE,
    borderRadius:CIRCLE_SIZE/2,
    backgroundColor:'blue',
    position: 'absolute',
  }
});
