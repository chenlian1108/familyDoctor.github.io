import { Foot } from '../../components/foot'
import axios from "axios";
import { Menu, ActivityIndicator, NavBar,WingBlank, WhiteSpace,Button } from 'antd-mobile';
import React,{Component} from "react";
import './a.scss'
import {Head} from '../../components/head'
export default class UserInfo extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            show: false,
            userImg: require('./../../../assets/images/img1.jpg'),
        };
    }

    componentWillMount = () => {
        // console.log(localStorage.userInfo);
        if (localStorage.userInfo) {
            this.setState({
                userImg: JSON.parse(localStorage.userInfo).avatar.replace(/public/,'http://47.102.144.31:3015')
            })
        }
    };
    onChange = (e) => {
        let $target = e.target || e.srcElement
        console.log(110112119)
        let file = $target.files[0];
        let data = new FormData();    // 构建表单数据对象  
        data.append('avatar', file);  // 需要上传到 服务器 的数据
        const instance = axios.create({
            withCredentials: true
        })
        instance.post('http://47.102.144.31:3015' + '/react/upload-avatar', data).then(res => {
            this.setState({
                userImg: res.data.imgUrl.replace(/public/,'http://47.102.144.31:3015' ),
            })

            localStorage.userInfo = JSON.stringify({ avatar: res.data.imgUrl });
            console.log(localStorage.userInfo)
        })
    };
    
    render() {
        const SuserName = JSON.parse(sessionStorage.getItem('userInfo')) ? "用户 &nbsp; "+JSON.parse(sessionStorage.getItem('userInfo')).username : '游客身份';
        const { initData, show } = this.state;
        const menuEl = (
            <div className='outer-box'>
                    <WhiteSpace/>
                    <WingBlank>                    
                    <div className='upload-container'>
                        <input type="file" name="image" className='headerInput' onChange={this.onChange} />
                        <img src={this.state.userImg} alt="" id='userHeader' className='headerImg' />
                    </div>
                    </WingBlank>
            </div>
        );

        return (
            <div>
                <Head title={SuserName} show={true} showsearch={false}></Head>
                {menuEl}
                <Foot/>
            </div>
        );
    }
}