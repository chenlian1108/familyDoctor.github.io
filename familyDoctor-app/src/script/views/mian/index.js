



import "../../../styles/index.scss";
import React, { Component } from "react";
import {Head} from '../../components/head'
import {MyHead} from '../../components/head/myhead'
import {Foot} from '../../components/foot';
import SearchCop from '../../components/search/index';

import Home from "../home"
import  Kepu  from "../kepu"
import {Wenda} from "../wenda"
import Jilu from "../jilu"
import { My } from "../my"

import UserInfo from "../my/a"  //上传用户头像
import  Login from "../login/index"
import  NPLogin from "../login/loginnp"
import  Register from "../register"

import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";

export class Main extends Component{
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/main/home" component={Home} />
                    <Route path="/main/kepu" component={Kepu} />
                    <Route path="/main/wenda" component={Wenda} />
                    <Route path="/main/jilu" component={Jilu} />
                    <Route path="/main/my" component={My} />
                    <Route path="/main/userinfo" component={UserInfo} />
                    <Route path="/main/login" component={Login} />
                    <Route path="/main/nplogin" component={NPLogin} />
                    <Route path="/main/register" component={Register} />
                    <Route path="/main/search" component={SearchCop} />
                    
                    <Route render={() => (<Redirect to="/main/home/" />)} />
                </Switch>
                <Foot></Foot>
            </div>
        )
    }
}

