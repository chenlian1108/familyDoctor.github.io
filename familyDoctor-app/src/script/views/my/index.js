





import "./index.scss";
import React, { Component } from "react";
import { MyHead } from '../../components/head/myhead'
import { WingBlank, WhiteSpace, SearchBar, List, InputItem, Button,Result, Grid, Carousel} from "antd-mobile";
import axios from "../../../utils/axios"
import { Link } from 'react-router-dom'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { createForm } from 'rc-form';

import loginstate from "../../../mobx/index";


import {observer} from "mobx-react";
// observer  订阅  当被观察者observable 改变 重新刷新 组件 

const Item = List.Item;
const Brief = Item.Brief;

//外面const 不会更新

// JSON.parse(localStorage.userInfo).avatar.replace(/public/,'http://localhost:3015');
// public\avatar\156160566971020150519231117_wmYEU.thumb.700_0.jpeg
// http://localhost:3015/avatar/156160566971020150519231117_wmYEU.thumb.700_0.jpeg
// sessionStorage.getItem('userInfo')
// {"token":"cea3e57b40e28c0afd87ed094707fb1a07b5829a15ebbe3d66485231333f3685","mobile":"18186493202","username":"18186493202"}

// @observer
export class My extends Component{   

    Signature=()=>{
        var usersigna = this.one.value;
        console.log(usersigna);

        const username = JSON.parse(sessionStorage.getItem('userInfo')) ? +JSON.parse(sessionStorage.getItem('userInfo')).username : "";

        username && axios.post("/react/updateusersigna", {username,usersigna})
        .then(res => {
            console.log(res);
        })
    }

    Myiconleft = ()=>{
        console.log("Myiconleft")        
    }
    Myiconright = ()=>{
        console.log("Myiconright")
    }

    render() {

        //里面const 会更新
        const userinfoimg = localStorage.userInfo ? JSON.parse(localStorage.userInfo).avatar.replace(/public/,'http://47.102.144.31:3015') : 'http://b-ssl.duitang.com/uploads/item/201505/19/20150519231117_wmYEU.thumb.700_0.jpeg' ;

        const SuserName = JSON.parse(sessionStorage.getItem('userInfo')) ? "用户 &nbsp; "+JSON.parse(sessionStorage.getItem('userInfo')).username : '游客身份';

        const Loginflag = JSON.parse(sessionStorage.getItem('userInfo')) ? "none" : "blcok";
        const Signa = JSON.parse(sessionStorage.getItem('userInfo')) ? "blcok" : "none";

        return (
            <div  className="MyPage">
                {/* <MyHead title="个人中心"></MyHead> */}
                {/* <Link to="/main/login">
                    <Button className="l-btn" ref="btn" inline type="warning">登陆</Button>
                </Link> */}
                <div className="Mybanner">
                    <div className="Mybannericon">
                        <i className={"iconfont icon icon-yingyong"} onClick={this.Myiconleft}></i>
                        <i className={"iconfont icon icon-set"} onClick={this.Myiconright}></i>
                    </div>
                    <div id="photo">
                        <Link  to="/main/userinfo" className="ohuo">
                            <img src={userinfoimg} onClick={this.updateimg} className="ohuo"/>
                        </Link>
                        <p className="Myusername">{SuserName} </p> 
                        <Link to="/main/login">
                            <p className="Myusertologin" style={{display:Loginflag}}>欢迎，请登陆</p>
                        </Link>
                        <p className="Myuserdismat" style={{display: Signa}}> 
                            <input onBlur={this.Signature} type="text" ref={el=>this.one=el} placeholder="添加个性签名描述"/>
                        </p>
                        {/*  */}
                        {/* style={{display:"none"}} */}
                        
                    </div>
                    
                </div>
                
                <div className="Mylistserver">
                    <List className="Myserver">
                        <Item
                        thumb={<i className={"iconfont icon icon-yisheng"}/>}
                        arrow="horizontal"
                        onClick={() => {}}
                        >我的医生</Item>                                    
                    </List>
                    <List>
                        <Item
                        thumb={<i className={"iconfont icon icon-icon-el-icon-applications"}/>}
                        arrow="horizontal"
                        onClick={() => {}}
                        >全部服务</Item>
                        <Item
                        thumb={<i className={"iconfont icon icon-kepu"}/>}
                        arrow="horizontal"
                        onClick={() => {}}
                        >我的账户</Item> 
                    </List>
                    <List className="Myserver">
                        <Item
                        thumb={<i className={"iconfont icon icon-xinaixin"}/>}
                        arrow="horizontal"
                        onClick={() => {}}
                        >我的优惠券</Item>                                    
                    </List>
                    <List>
                        <Item
                        thumb={<i className={"iconfont icon icon-baogao-"}/>}
                        arrow="horizontal"
                        onClick={() => {}}
                        >意见反馈</Item>
                        <Item
                        thumb={<i className={"iconfont icon icon-jikediancanicon42"}/>}
                        arrow="horizontal"
                        onClick={() => {}}
                        >下载家庭医生</Item> 
                    </List>
                </div>
                
                <div>
                <WhiteSpace />
                    
                <WhiteSpace />
                </div>

                
                
                {/* <p>loginflag == {loginflag}</p> */}
                
                {/* <p> <input onChange={this.change} type="text" ref={el=>this.one=el} placeholder="please"/></p> */}


            </div>
        )
    }
}



