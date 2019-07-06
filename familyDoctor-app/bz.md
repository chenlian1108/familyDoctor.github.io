


春雨医生
https://m.chunyuyisheng.com/


丁香医生
https://m.dxy.com/column


icon 图标
file:///D:/Three%20stages/familyDoctor/doctor-app/src/styles/fonts/demo_index.html


高级的rc-form@2.4.6
http://react-component.github.io/form/examples/redux.html


UI组件库
https://antd-mobile.gitee.io/components/wing-blank-cn/


github   chenlian1108  CH4395chaIAN
https://github.com/chenlian1108/familyDoctor.github.io


Redux 入门教程（三）：React-Redux 的用法
http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html

https://github.com/jackielii/simplest-redux-example/blob/master/index.js


短信验证 何晨曦
18186493202

#> show collections

disease    疾病种类
doctorinfo  医师信息
newlist   科普
news      资讯新闻详情
doctortodolist  健康记录
doctoruserinfo  用户信息



react-redux
1.在组件发出dispatcher
@connect(
    state=>{
        return {
            num:state.count,
            ...state
        }
    },
    dispatch=>{
        return {
            add:()=>dispatch({type:"countAdd"}),
            increment:(num)=>dispatch(increment(num)),
            desc:num=>dispatch(countDesc(num)),
            changeCity:city=>dispatch(changeCity(city))
        }
    }
)

2.在Actions 里发送异步请求,返回结果和type
import axios from  "@/utils/axios"
export const getBanner = ({url,params,cb})=>{
    return axios.get(url,{
        params
    }).then(res=>{
        cb();
        return {
            type:"getBanner",
            banner:res.data.result
        }
    })
}

3.在reducers 里定义默认值并修改state
const defaultState = {
    count:20000,
    banner:[],
    goods:[],
    carNum:18,
    selectedTab:"home"
}
export default (state=defaultState,action)=>{
    console.log(action);
    case "getBanner":
        return {...state,banner:action.banner } 
        break;
        default:
        return state;
        break;
    }
}




cnpm install --save moment  日期格式化 有问题
import moment from "moment"
let statusPassTime = moment(parseInt(entity.statusPassTime)).format('YYYY-MM-DD');



表示长度为6-12位包含数字、字母、特殊字符的密码  
export const PasswordReg = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{6,12}$/

字母+数字的密码校验的正则表达式
前两部分限制，字母+数字，必须同时存在； 第三部分，限制位数 6~18位
export const PasswordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/