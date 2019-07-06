
import "./index.scss";
import React,{Component} from 'react';
import { NavBar, Icon } from 'antd-mobile';
import PropTypes from "prop-types";
import history from "../../../utils/history"



    export class Head extends Component {
        goback=(show)=>{
            const {dispatch} = this.props;
            console.log(document.referrer );
            if(show){
                history.go(-1); 
            }
        }
        goSearch = ()=>{
            history.push("/main/search");
        }    
        render(){
            const {
                title,
                show,
                showsearch
            } = this.props;
            return(
                <header>
                    <NavBar
                    mode="light"
                    icon={show&&<Icon type="left" onClick={this.goback}/>}
                    onLeftClick={() => this.goback}
                    rightContent={[
                        showsearch&&<Icon key="0" onClick={this.goSearch} type="search" style={{ marginRight: '16px' }} />,
                        // <Icon key="1" type="ellipsis" />,
                    ]}
                    >{title}</NavBar>
                </header>
            )
        }
    }

    Head.contextTypes = {
        props:PropTypes.object
    }
    
