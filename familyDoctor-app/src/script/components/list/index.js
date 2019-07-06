

import "./index.scss"
import { Item } from "../item";
import React,{Component} from "react";
import {PullToRefresh, Button} from "antd-mobile";
import axios from  "../../../utils/axios"

export class List extends Component{
    state = {
        refreshing:false,
        down:true,  // 下拉 
        data:[],
        count:1901
    }
    
    // 分类父组件 将刷新事件
    render(){
        const { 
            goods,changeAllGoods, 
        } = this.props;
        console.log(goods);
        return(
            <div>  
                <ul>
                    <PullToRefresh
                        damping={60}
                        ref={() =>"loadmore"}
                        indicator={  { deactivate: '下拉刷新' }}
                        direction={  'down' }
                        refreshing={this.state.refreshing}
                        onRefresh={() => {
                            this.setState({ refreshing: true }); // 正在刷新
                            setTimeout(() => {
                              changeAllGoods()
                              this.setState({ refreshing: false });  // 刷新结束 
                            }, 1000);
                        }}    
                    >
                    
                    {
                        goods.map((item,i)=>{
                            return(
                                <li key={i}>
                                    <Item gooditem={item}/>
                                </li>
                            )
                        })
                    }
                    </PullToRefresh>
                </ul>
            </div>
        )
    }
} 


