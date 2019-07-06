

import "./index.scss";
import React, { Component } from "react";
import { Head } from '../../components/head'
import { List, InputItem, WhiteSpace, WingBlank ,Button ,DatePicker ,TextareaItem ,Toast , Modal,Card} from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import { createForm } from 'rc-form';
// import axios from "axios";
import axios from "../../../utils/axios"
import {connect} from "react-redux"
import { ICONS } from "_jest-util@24.8.0@jest-util/build/specialChars";
// import moment from "moment"


//  时间
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const utcNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));

let minDate = new Date(nowTimeStamp - 1e7);
const maxDate = new Date(nowTimeStamp + 1e7);
if (minDate.getDate() !== maxDate.getDate()) {
  minDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
}  
//  时间结束




// 分别创建 留言输入组件 和留言展示组件
export default class Jilu extends Component {

    state = {
        jilus: []
    }

    // 钩子函数
    componentWillMount() {
        axios.get("/react/getjilu")
        .then(res => {
            console.log(res);
            this.setState({
                jilus: res.data.result
            })
        })
    }

    addJilu = (newcomments) => {
        // 将数据库返回的所有内容给state
        this.setState({
            jilus: newcomments
        })
    }

    delJilu = (id) => {        
        this.state.jilus.splice(id, 1);
        // 将数据库返回的所有内容给state
        this.setState({
            jilus: this.state.jilus
        })
    }

    render(){
        return(
            <div>
                <Head title="健康记录" show={true} showsearch={false}></Head>
                <div>
                    <BcJilu addJilu={this.addJilu}/>
                </div>
                <div>
                    <Showjilu jilus={this.state.jilus} delJilu={this.delJilu}/>
                </div>                
            </div>
        )
    }
}

// 保存记录组件
class BcJilu extends Component {

    componentDidMount() {
        console.log("1111");
    }

    state = {
        date: now,
        visible: false,
    }

    componentDidMount() {
        
    }
    handleClick = () => {
        console.log("1111");
    }
    addjilu = ()=>{
        var yonghu = this.refs.username.state.value;
        var gaoya = this.refs.lowpressure.state.value;         
        var diya = this.refs.hypertension.state.value; 
        var xinlv = this.refs.Heartrate.state.value; 
        var shuimian = this.refs.shuimian.state.value;         
        var tizhong =  this.refs.bodyweight.state.value; 
        var shijian = this.state.date;
        var beizhu = this.autoFocusInst.state.value;
                
        if( yonghu=="" || gaoya=="" || diya=="" || xinlv=="" || shuimian=="" || tizhong=="" ){
            const alertInstance = alert('健康提示', '健康记录未填完整', [
                { text: '知道了', onPress: () => console.log('cancel') },
              ]);
              setTimeout(() => {
                alertInstance.close();
              }, 500000);            
        }else{
            
            axios.post("/react/addjilu", { yonghu,gaoya, diya, xinlv,shuimian,tizhong,shijian,beizhu})
            .then(res => {
                this.refs.username.state.value = "";
                this.refs.lowpressure.state.value = "";
                this.refs.hypertension.state.value = "";
                this.refs.Heartrate.state.value = "";
                this.refs.shuimian.state.value = ""; 
                this.refs.bodyweight.state.value = "";
                this.state.date = "";
                this.autoFocusInst.state.value = "";
                
                console.log(res.data.result)
                this.props.addJilu(res.data.result);
            })

        }
             

    }

    // -------------------------------------------

    render() {
        // console.log(this.state.date);
        return (
            <div>                
                
                <List className="List">
                    <WingBlank/>
                    <WhiteSpace />
                    <InputItem
                        type="text"
                        placeholder="小红"
                        clear
                        ref="username"
                    >
                    <i className={"iconfont icon icon-home_my"}></i>
                    用户
                    </InputItem>
                    
                    <WingBlank/>
                    <WhiteSpace />
                    <InputItem
                        type="text"
                        placeholder=">139mmHg"
                        clear
                        ref="hypertension"
                    >
                    <i className={"iconfont icon icon-gaoya"}></i>
                    高压
                    </InputItem> 

                    <WingBlank/>
                    <WhiteSpace />
                    <InputItem
                        type="text"
                        placeholder="90/60mmHg"
                        clear
                        ref="lowpressure"
                    >
                    <i className={"iconfont icon icon-gaoya"}></i>
                    低压
                    </InputItem> 

                    <WingBlank/>
                    <WhiteSpace />
                    <InputItem
                        type="text"
                        placeholder="60～100次/分钟"
                        clear
                        ref="Heartrate"
                    >
                    <i className={"iconfont icon icon-jiankang"}></i>
                    心率
                    </InputItem> 

                    <WingBlank/>
                    <WhiteSpace />
                    <InputItem
                        type="text"
                        placeholder="良好"
                        clear
                        ref="shuimian"
                    >
                    <i className={"iconfont icon icon-shuimian"}></i>
                    睡眠
                    </InputItem> 

                    <WingBlank/>
                    <WhiteSpace />
                    <InputItem
                        type="text"
                        placeholder="60kg"
                        clear
                        ref="bodyweight"
                    >
                    <i className={"iconfont icon icon-tizhong"}></i>
                    体重
                    </InputItem>

                    <WingBlank/>
                    <WhiteSpace />
                    <DatePicker
                        value={this.state.date}
                        onChange={date => this.setState({ date })}
                        >
                        <List.Item arrow="horizontal">
                        <i className={"iconfont icon icon-shijian"}></i>
                        时间
                        </List.Item>
                    </DatePicker>
                    <WingBlank/>
                    <WhiteSpace />
        
                    <TextareaItem
                        title={ <i className={"iconfont icon icon-qi "}>
                            <font className={"beizhutitle"}>备注</font>
                        </i>}
                        placeholder="身体状况良好"
                        data-seed="logId"
                        ref={el => this.autoFocusInst = el}
                        autoHeight
                    />             
                        
                    <WhiteSpace size="xl" />
                    <WingBlank>
                    <Button type="primary" onClick={this.addjilu}>保存</Button>
                    </WingBlank>
                    <WhiteSpace size="xl" />

                </List>

            </div>
        )
    }
}
    
// 显示记录组件
const alert = Modal.alert;
class Showjilu extends Component {

/*---时间格式化------*/
dateFormat =(time) =>{
    var date = new Date(time);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    return `${year}-${month}-${day} `;
    // return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
}

    shouldComponentUpdate(nextProps, nextState){
        return true;
    }

    showAlert = () => {
        const alertInstance = alert('健康提示', '确定要删除这条记录吗？', [
          { text: '确定', onPress: () => console.log('ok') },
          { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
        ]);
        setTimeout(() => {
          // 可以调用close方法以在外部close
          console.log('auto close');
          alertInstance.close();
        }, 500000);
      };

      


    changeDelJilu(id, _id){
        var card = "card" + id;

        alert('健康记录提示', '确定要删除这条记录吗？', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: () => 
                axios.get("/react/delJilu", {
                    params: {
                        _id
                    }
                }).then(res => {
                    setTimeout(() => {
                        this.props.delJilu(id);                
                    }, 900);
                    Toast.info(res.data.msg, 1);
                })
            },
          ])

        
        
    }
    
    render() {
        const {jilus} = this.props;
        console.log(jilus);
        console.log("---------jilus------");


        return (
            <div>
                {
                jilus.map((val, i) => {
                    // let shijian = moment(parseInt(val.shijian)).format('YYYY-MM-DD');
                    return (
                        <WingBlank size="lg"  key={i}>
                            <WhiteSpace size="lg" />
                            
                            <Card id={"card" + i}>
                                <Card.Header
                                    title="备注的信息"
                                    thumb={<i className={"iconfont icon icon-kepu"}/>}
                                    extra={<span>{this.dateFormat(val.shijian)}</span>}
                                />
                                <Card.Body>
                                    <div className="cardlist">
                                        <p>高压：{val.gaoya}</p>
                                        <p>低压：{val.diya}</p>
                                        <p>心率：{val.xinlv}</p>
                                        <p>体重：{val.tizhong}</p>
                                        <p>时间：{this.dateFormat(val.shijian)}</p>
                                        <p>备注：{val.beizhu}</p>
                                    </div>
                                </Card.Body>
                                <Card.Footer content={val.yonghu} extra={<div onClick={() => { this.changeDelJilu(i, val._id) }} >删除</div>} />
                            </Card>
                            <WhiteSpace size="lg" />
                        </WingBlank>
                    )}
                )
                }
            </div>
        )
    }
}

      
        /*
        
       记录存放到 doctortodolist   
        
        */
        
