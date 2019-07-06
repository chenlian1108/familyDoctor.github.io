
import React,{Component} from "react";
import { NavBar, Icon } from "antd-mobile";
import PropTypes from "prop-types";

export class Head extends Component {

    goback=(show)=>{
        const {history} = this.context.props;
        if(show){
            history.go(-1);
        }        
    }
    goSearch = ()=>{
        const {history} = this.context.props;
        history.push("/search");
    }
    render() {
        const {
            title,
            show
        } = this.props;
        return (
            <div>
                <NavBar
                    mode="dark"
                    icon={ show&&<Icon type="left" />}
                    onLeftClick={() => this.goback(show)}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} onClick={this.goSearch}/>,
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >{title}</NavBar>
            </div>
        )
    }
}

// 子组件用虫洞context接收父组件传递的props
// 子组件定义接收props类型  ，props包含了match,locstion,history
Head.contextTypes = {
    props:PropTypes.object
}
