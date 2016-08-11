'use strict'
import React,{Component} from 'react'
import {
  PixelRatio,
  Dimensions,
} from 'react-native'
/***
常用工具
***/
var Util={

  //单位像素
  pixel:1/PixelRatio.get(),
  //屏幕的尺寸
  size:{
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
  },
  //post请求(url:请求地址，data封装body,callback回调)
  post(url,data,callback){
   var feachOptions={
     method:'POST',
     headers:{
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body:JSON.stringify(data),
   };
   fetch(url,feachOptions)
   .then((response)=>response.text())
   .then((responseText)=>{
     callback&&callback(JSON.parse(responseText));
   }).catch((error)=>{
     console.log('error='+error);
   });
 },
 //get请求
 get(url,callback){
   fetch(url)
   .then((response)=>response.text())
   .then((respnseText)=>{
     callback(JSON.parse(responseText));
   });
 }
}

export default Util;
