



import "./index.scss";
import {Head} from '../../components/head'
// import Search from '../../components/search/index'

import React,{Component} from "react";
import { WingBlank, WhiteSpace, SearchBar, List, InputItem, Button,Result, Grid, Carousel, Icon} from "antd-mobile";
import {Link} from "react-router-dom"
import {connect} from "react-redux"
import { getBanner } from "../../../actions";
import history from "../../../utils/history"

import axios from "../../../utils/axios"
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { createForm } from 'rc-form';

import loginstate from "../../../mobx/index";


import {observer} from "mobx-react";
// observer  订阅  当被观察者observable 改

const ArrayIcon = [
  {
      icon: 'icon-meirong-heicopy',
      text: "美容",
  },
  {
      icon: 'icon-kouqiang',
      text: "口腔",
  },
  {
      icon: 'icon-waike',
      text: "外科",
  },
  {
      icon: 'icon-zhongyi1',
      text: "中医",
  },
  {
      icon: 'icon-guke',
      text: "骨科",
  },
  {
      icon: 'icon-jiankang',
      text: "心血管",
  },
  {
      icon: 'icon-fuke1',
      text: "妇科",
  },
  {
      icon: 'icon-nanke',
      text: "男科",
  },
  {
      icon: 'icon-chanke',
      text: "产科",
      
  },
  {
      icon: 'icon-erke',
      text: "儿科",
  },
  {
      icon: 'icon-er',
      text: "耳科",
  },
  {
      icon: 'icon-yinshi',
      text: "营养",
  }
]
  
const data = ArrayIcon.map((_val, i) => ({
  icon: _val.icon,
  text: _val.text,
}));

 
const Item = List.Item;
const Brief = Item.Brief;


@connect(
  state=>{   
    // console.log(state.banner)   
      return {
          ...state
      }
  }
)
class Home extends Component{

      componentWillMount(){
        console.log(this.props);
        const {dispatch} = this.props;
        dispatch(getBanner({
            url:"/react/doctorbanner",
            params:{
                limit:4
            },
            cb(){}
        }))        
      }

    gotosearch=()=>{
        history.push("/main/search");
    }

    render(){  
      console.log(this.props);
      const {
        dispatch ,
        banner
      } = this.props; 
      var Mybanner = banner?banner:"";
      
      console.log(Mybanner);      
         
        return(
            <div className="homePage">
                {/* <Head title={<i className={'iconfont icon icon-yisheng HomeHeadTitleIcon'}><span className="HomeHeadTitleText">家庭医生</span></i>} show={false} showsearch={true}></Head> */}
                
                <div className="SearchBox">
                  <span className="SearchLeft"><i className={"iconfont icon icon-552dc065f0478"}></i></span>
                  <SearchBar  className="homeSearch"  onFocus={this.gotosearch}></SearchBar >
                  <span className="SearchRight"><i className={"iconfont icon icon-lingdang"}></i></span>
                </div>
                
                <div className="homeBanner">
                    <WingBlank>
                    <Carousel
                    autoplay={true}
                    infinite                    
                    >
                    {
                    Mybanner&&Mybanner.map((val,i) => (
                      
                      <Link
                        key={i}
                        to="/main/zixun"
                        style={{ display: 'inline-block', width: '100%', height:'3.5rem' }}
                        >
                        <img
                            src={val.img}
                            alt=""
                            style={{ width: '100%', height:'100%', verticalAlign: 'top' }}
                            onLoad={() => {
                              window.dispatchEvent(new Event('resize'));
                            }}
                        />
                      </Link>
                    ))
                    }
                    </Carousel>
                </WingBlank>
                </div>

                <div>
                    <Grid data={data}
                        columnNum={4}
                        renderItem={dataItem => (
                            <div className="GridDiv">
                                <i className={"iconfont icon"+dataItem.icon}></i>
                                <p>{dataItem.text}</p>
                            </div>
                        )}
                    />
                </div>

                

            </div>
        )
    }
}

export default Home;