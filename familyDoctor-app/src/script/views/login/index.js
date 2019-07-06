





import "./index.scss";
import React, { Component } from "react";
import { Head } from '../../components/head'
import { WingBlank, WhiteSpace, SearchBar, List, InputItem, Button } from "antd-mobile";
import axios from "../../../utils/axios"
import { connect } from "react-redux"
import { Link } from "react-router-dom";

export const mobileReg = /^1(3|5|7|8|9)\d{9}$/
export const codeReg = /^\d{6}$/
let timer = null;

export default class Login extends Component {

    state = {
        toggle: true,
        mobileDis: true,
        flag: true,
        count: 5,
        txt: "获取验证码"
    }

    // 输入手机号正则校验手机号
    checkMobile = (mobile) => {
        console.log(mobile);
        if (this.state.flag) {
            this.setState({
                mobileDis: !mobileReg.test(mobile)
            })
        }
    }

    // 发送验证码后开启倒计时
    startTime = () => {

        timer = setInterval(() => {
            if (this.state.count > 0) {
                this.setState({
                    count: --this.state.count,
                    txt: this.state.count + ' s 后继续',
                    mobileDis: true,
                })

            } else {
                clearInterval(timer);
                timer = null;
                this.setState({
                    txt: "获取验证码",
                    mobileDis: false,
                    flag: true,
                    count: 5,
                })
            }
        }, 1000)
    }

    // 获取验证码
    getCode = () => {
        var mobile = this.refs.mobile.state.value;

        if (mobile == "") {
            const alertInstance = alert('登陆提示', '请先完整填写登陆信息', [
                { text: '知道了', onPress: () => console.log('cancel') },
            ]);
            setTimeout(() => {
                alertInstance.close();
            }, 500000);
        } else {

            axios.post("/react/sendCode", {
                mobile: mobile
            }).then(res => {
                console.log(res);
            })

            this.setState({
                mobileDis: true,
                flag: false
            })
            /**/

            this.startTime()
        }
    }

    // 输入验证码正则校验验证码
    checkCode = (val) => {
        var mobile = this.refs.mobile.state.value;
        this.setState({
            toggle: !(codeReg.test(val) && mobileReg.test(mobile))
        })
    }

    userLogin = () => {
        var mobile = this.refs.mobile.state.value;
        var code = this.refs.mobilecode.state.value;
        // var username = "";
        axios.post("/react/testCode", {
            mobile,
            code
        }).then(res => {
            var mobile=res.data.mobile
            console.log(res);
            if (!!res.data.type) { 
                this.goHome(mobile)            
                 
            } else {
                delete sessionStorage['userInfo']
            }
        })
    }
    goHome(mobile){
        axios.post("/react/mobileuserinfo", {
            mobile,
        }).then(res => {
            console.log(res)
            // console.log("-------login mobile token ");
            var userInfo = {
                token: res.data.token,
                mobile:res.data.mobile,
                username:res.data.mobile,
                // {"token":"cea3e57b40e28c0afd87ed094707fb1a07b5829a15ebbe3d66485231333f3685","mobile":"18186493202","username":"18186493202"}
            }
            sessionStorage.userInfo = JSON.stringify(userInfo);
            this.props.history.push("/main/my");
        })                
     }


    render() {

        const {
            toggle,
            mobileDis,
            txt
        } = this.state;

        return (
            <div>
                <Head title="短信登陆" show={true} showsearch={false}></Head>


                <List>

                    <WhiteSpace />
                    <InputItem
                        type="tel"
                        placeholder="示例：139 712 3658"
                        clear
                        onChange={this.checkMobile}
                        ref="mobile"
                    >
                        <i className={"iconfont icon icon-dianhuazixunhuawuzongheguanlibl"}></i>
                        手机号
                    </InputItem>

                    <WhiteSpace />
                    <InputItem
                        type="tel"
                        placeholder="请输入 6 位手机验证码"
                        clear
                        onChange={this.checkCode}
                        ref="mobilecode"
                    >
                        <i className={"iconfont icon icon-mark"}></i>
                        验证码
                    </InputItem>

                    <WingBlank>
                        <WhiteSpace size="xl" />
                        <Button type="primary" onClick={this.getCode} disabled={mobileDis} > {txt}</Button>
                        <WhiteSpace size="sm" />
                        <Button type="primary" onClick={this.userLogin} disabled={toggle}>快速登陆</Button>
                    </WingBlank>

                </List>

                <Link to="/main/nplogin">
                    <div className="logintypetwo">
                        <p>已有账号&nbsp;&nbsp;使用账号密码登陆</p>
                    </div>
                </Link>
                <Link to="/main/register">
                    <div className="logintypetwo">
                        <p>暂无账号&nbsp;&nbsp;账号密码注册</p>
                    </div>
                </Link>

                <div className="threeLogin">
                    <button type="button" onclick="authLogin('sinaweibo')" className="mui-icon mui-icon-weibo" >微博</button>
                    <button type="button" onclick="authLogin('weixin')" className="mui-icon mui-icon-weixin" >微信</button>
                    <button type="button" onclick="authLogin('qq')" className="mui-icon mui-icon-qq" >QQ</button>
                </div>
            </div>
        )
    }
}


