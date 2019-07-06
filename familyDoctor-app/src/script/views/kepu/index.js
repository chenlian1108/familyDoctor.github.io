

import "./index.scss";
import React, { Component } from "react";
import { Head } from '../../components/head'
import {connect} from "react-redux"
import { List, WhiteSpace, WingBlank, Button, } from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker/locale/en_US';
import axios from "../../../utils/axios"
import moment from "moment"
import {getkepu} from "../../../actions"


const Item = List.Item;
const Brief = Item.Brief;

@connect(
    state=>{
        return {
            kePus:state.kePus,
            ...state
        }
    }
)
class Kepu extends Component {

    // 钩子函数
    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(getkepu("/react/getkepu"));
    }

    render() {
        const {
            kePus,
        } = this.props;

        console.log("--------kePus-------");
        console.log(this.props.kePus);

        return (
            <div>
                <Head title="科普" show={true} showsearch={true}></Head>
                {
                    kePus.map((val, i) => {
                        return (
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
                        )
                    })
                }
            </div>
        )
    }
}
export default Kepu;


/*
{
    kePus.map((val, i) => {
        return (
            <div key={i}>
                <p>{val.title}</p>
            </div>
        )
    })
}

*/

/*

<Item arrow="horizontal" multipleLine onClick={() => { }}>
                        Title <Brief>subtitle</Brief>
                    </Item>

*/