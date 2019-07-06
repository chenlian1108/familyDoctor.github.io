


import "./index.scss"
import React,{Component} from "react";
import {Head} from '../../components/head'
import {WingBlank,WhiteSpace,List} from "antd-mobile";
import moment from "moment"
// import ReconnectingWebSocket from "reconnecting-websocket";
import { takeEvery, fork } from "redux-saga/effects";
// import { Socket } from 'react-socket-io';
// const io=require('socket.io-client');
// import io from 'socket.io-client';
// const socketIo = io.connect("http://47.102.144.31:3015");

const Item = List.Item;
const Brief = Item.Brief;

const nickname = JSON.parse(sessionStorage.getItem('userInfo')) ? "用户 &nbsp; "+JSON.parse(sessionStorage.getItem('userInfo')).username : '游客身份';

export class Wenda extends Component{

    sendWord=()=>{
        
    }

    render(){   
      

        return(
            <div>
                <Head title="资讯问答"  show={true} showsearch={true}></Head>
                <p>zixun 聊天室</p>
                <div className="chatroom">
                      
                </div>
                <p>
                    <input type="text" placeholder="请输入您的问题" id="word"   onChange={this.changetxt}/>
                    <input type="button" value="发送" id="sendbtn" onClick={this.sendWord}/>
                </p>
                
            </div>
        )
    }
}


