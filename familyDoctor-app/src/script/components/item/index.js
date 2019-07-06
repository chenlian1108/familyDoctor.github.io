
import "./index.scss"
import React,{Component} from "react";
import {PullToRefresh} from "antd-mobile";
import axios from  "../../../utils/axios"
import {WingBlank,WhiteSpace,List} from "antd-mobile";
import {Link} from "react-router-dom"
import moment from "moment"
import {connect} from "react-redux"
const Item = List.Item;
const Brief = Item.Brief;

export class ComponentItem extends Component{    
    
    render(){
        const {
            heathnewlist,
        } = this.props;    
        
        return(
            <div className="move-in item">
                {
                    heathnewlist.map((val, i) => {
                        return (
                        // <Link to={"/main/my/"+good._id+"?name="+good.name } >
                            <List className="my-list kepulist"  key={i}>
                                <Item
                                    arrow="horizontal"
                                    thumb={val.thumbimg}
                                    multipleLine
                                    onClick={() => { }}
                                >
                                    <span className="keputitle">{val.title} </span>
                                    <Brief>{val.detail}</Brief>
                                    <div className="kepuch">
                                        <span className="kepuchannel">{val.channel}</span>
                                        <span className="kepudate">{moment(val.date).format('YYYY-MM-DD')}</span>  
                                    </div>
                                </Item>
                            </List>
                        // </Link>
                        )
                    })
                }
            </div>
        )
    }
}


var liimg = {width:'100%',height:'260px'}
