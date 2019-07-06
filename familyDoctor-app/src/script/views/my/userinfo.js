

import axios from "axios";
import { Menu, ActivityIndicator, NavBar } from 'antd-mobile';
import React, {Component} from "react";
import './index.scss'
import { Button } from 'antd-mobile';

export class UserInfo extends Component {


    constructor(...args) {
        super(...args);
        this.state = {
         //   initData: data,
            show: false,
            userImg: require('./../../../assets/images/img1.jpg'),
        };
    }

    componentWillMount = () => {
        console.log(localStorage.userInfo);
        if (localStorage.userInfo) {
            this.setState({
                userImg: JSON.parse(localStorage.userInfo).avatar.replace(/public/,'http://47.102.144.31:3015')
            })
        }
    };
    onChange = (e) => {
        let $target = e.target || e.srcElement
        console.log(15115165)
        let file = $target.files[0];
        let data = new FormData();    // 构建表单数据对象  
        data.append('avatar', file);  // 需要上传到 服务器 的数据
        data.append("username", 'huihui');
        const instance = axios.create({
            withCredentials: true
        })
        // instance.post('http://47.102.144.31:3015' + '/vue/upload-avatar', data).then(res => {
        instance.post('http://47.102.144.31:3015' + '/react/upload-avatar', data).then(res => {
            this.setState({
                userImg: res.data.imgUrl.replace(/public/,'http://47.102.144.31:3015' )
            })
            localStorage.userInfo = JSON.stringify({ avatar: res.data.imgUrl });
            console.log(localStorage.userInfo)
        })
    };

    handleClick = (e) => {
        e.preventDefault(); // Fix event propagation on Android
        this.setState({
            show: !this.state.show,
        });
    }
    handHide = () => {
        this.setState({
            show: false,
        });
    }


    render() {

        
        <div className='upload-container'>
            <img src={this.state.userImg} alt="" id='userHeader' className='headerImg' />
            <input type="file" name="image" className='upload-input' onChange={this.onChange} />
        </div>

                    

        return (
            
                <div>
                    <NavBar
                        leftContent="Menu"
                        mode="light"
                        icon={<img src="https://gw.alipayobjects.com/zos/rmsportal/iXVHARNNlmdCGnwWxQPH.svg" className="am-icon am-icon-md" alt="" />}
                        onLeftClick={this.handleClick}

                    >
                        {/* <Foot></Foot> */}
                    </NavBar>
                    {/* { menuEl } */}
                </div>
           
        )
    }
   
}
