

import "./index.scss";
import React, { Component } from "react";
import { Head } from '../../components/head'
import { SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import { NavBar, Icon } from 'antd-mobile';
import {connect} from "react-redux"
import history from "../../../utils/history"
import {heathnewlist} from "../../../actions"
import { ComponentItem } from '../item'

@connect(
    state=>{
        return {
            ...state.heathnewlist,
            ...state
        } 
    }
)

class SearchCop extends Component {
    
    // componentDidMount() {
    //     console.log('onFocus');
    // }
   
    newlist=()=>{
        console.log(this.word.state.value);
        const keyword = this.word.state.value ? this.word.state.value : "";
        const {dispatch} = this.props;
        keyword && dispatch(heathnewlist({
            url:"/react/heathnewlist",
            params:{
                keyword:keyword,
            },
            cb(){
                console.log("search success");
            }
        }))
        this.word.state.value = "";
    }

    Cancel=()=>{        
        console.log("----Cancel-------");
    }

    goback=()=>{
        history.go(-1); 
    }

    render() {

        const {
            heathnewlist,
        } = this.props;
        
        return (
            <div>
                <div className="SearchBoxtwo">
                <span className="SearchLeft" onClick={this.goback}>
                    <i className={"iconfont icon icon-fanhui"}></i>
                </span>
                <SearchBar  className="Searchpage" maxLength={8}  ref={el=>this.word=el}  onBlur={this.newlist} onCancel={this.Cancel}  placeholder="搜索关键字"></SearchBar >
                </div>
                <ComponentItem heathnewlist={heathnewlist}></ComponentItem>
            </div>
        )
    }
}

// class SearchList extends Component{
//     render(){
//         return(
//             <div>
//                 f-SearchList
//             </div>
//         )
//     }
// }

export default SearchCop;





