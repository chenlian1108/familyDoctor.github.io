





import "./index.scss";
import React, { Component } from "react";
import { Head } from '../../components/head'
import { WingBlank, WhiteSpace, SearchBar, List, InputItem, Button,Modal } from "antd-mobile";
import axios from "../../../utils/axios"
import { connect } from "react-redux"
import { Link } from "react-router-dom";

// 字母+数字的密码校验的正则表达式  
export const PasswordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/
const alert = Modal.alert;

export default class LoginNP extends Component {

    state = {
        toggle: true,
    }

    // 输入验密码正则校验验密码
    checkPassword = (val) => {
        
        this.setState({
            toggle: !(PasswordReg.test(val))
        })
    }

    userLogin = () => {
        var nickName = this.refs.nickName.state.value;
        var password = this.refs.password.state.value;

        nickName && password && axios.post("/react/logintypetwo", {
            nickName,
            password
        }).then(res => {
            console.log(res);
            if (!!res.data.type) {
                this.props.history.push("/main/my");
                var userInfo = {
                    token: res.data.token
                }
                sessionStorage.userInfo = JSON.stringify(userInfo)
            } else {
                delete sessionStorage['userInfo']
            }
        })

        if (nickName == "" || password == "") {
            console.log("99999999")
            const alertInstance = alert('登陆提示', '账号密码未填完整', [
                { text: '知道了', onPress: () => console.log('cancel') },
            ]);
            setTimeout(() => {
                alertInstance.close();
            }, 500000);
        }
    }



    render() {

        const {
            toggle,
        } = this.state;

        return (
            <div>
                <Head title="账号登陆" show={true} showsearch={false}></Head>

                <List>

                    <WhiteSpace />
                    <InputItem
                        type="text"
                        placeholder="示例：王洁"
                        clear
                        ref="nickName"
                    >
                        <i className={"iconfont icon icon-chengyuan"}></i>
                        昵称
                    </InputItem>

                    <WhiteSpace />
                    <InputItem
                        type="password"
                        placeholder="示例：ABab123"
                        clear
                        ref="password"
                        onChange={this.checkPassword}
                    >
                        <i className={"iconfont icon icon-mima"}></i>
                        密码
                    </InputItem>

                    <WingBlank>
                        <WhiteSpace size="xl" />
                        <Button type="primary" onClick={this.userLogin} disabled={toggle}>登陆</Button>
                    </WingBlank>

                </List>

                <Link to="/main/login">
                    <div className="logintypetwo">
                        <p>注册太麻烦&nbsp;&nbsp;手机验证码快速登陆</p>
                    </div>
                </Link>
                <Link to="/main/register">
                    <div className="logintypetwo">
                        <p>暂无账号&nbsp;&nbsp;账号密码注册</p>
                    </div>
                </Link>


            </div>
        )
    }
}



