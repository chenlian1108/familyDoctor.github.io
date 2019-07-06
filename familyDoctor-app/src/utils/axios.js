


import axios from "axios";
import {Toast } from 'antd-mobile';
import history from "./history"
// import { Indicator ,Toast } from 'mint-ui';
// import  router from "../router"
// router要导入history

//axios.defaults.baseURL = "http://localhost:3015/";  //基路径
 
// let token = "";
// axios.defaults.withCredentials = false;
// axios.defaults.headers.common['token'] = token;   // 请求头token空 
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';//配置请求头

const load = (msg)=>{
  Toast.loading(msg, 10, () => {
      console.log('Load complete !!!');
    });
}
const info = (msg)=>{
  Toast.info(msg, 1);
}

// axios 拦截器 
//  添加一个请求拦截器  request 
axios.interceptors.request.use(function (config) {
  let userInfo = window.sessionStorage.userInfo;
  if(userInfo){
      userInfo = JSON.parse(userInfo);
      // token = userInfo.token;
  }
  //config.headers.common['token'] = token;
  Toast.hide();
  load("加载中");
  return config;
}, function (error) {
  info("未知错误-req");
  Toast.hide();
  return Promise.reject(error);
});


// // 添加一个响应拦截器 response 
axios.interceptors.response.use(function (response) {

    setTimeout(()=>{
      info(response.data.msg);
    },500);
    if(response.data.code=="401"){
        history.push("/login");
    }
    return response;
    
  }, function (error) {
    info("未知错误-res");
    Toast.hide();
    return Promise.reject(error);
  })

export default axios;