import "./index.scss";
import React from 'react';
import  {Link,NavLink} from "react-router-dom";
import { Badge } from "antd-mobile";

export const foots = [
    {txt:"综合",path:"/main/home",name:"quanbu",icon:"icon-icon-el-icon-applications"},
    {txt:"科普",path:"/main/kepu",name:"kepu",icon:"icon-kepuzhishi"},
    {txt:"咨询",path:"/main/wenda",name:"wenda",icon:"icon-wenda"},
    {txt:"记录",path:"/main/jilu",name:"jilu",icon:"icon-jilu"},
    {txt:"我",path:"/main/my",name:"my",icon:"icon-home_my"}
]

export const Foot = ()=>{
    return(
        <footer>
            {
                foots.map((item,i)=>{
                    return(
                        <div key={i}>
                            <NavLink to={item.path} activeClassName="nav-active">
                                <i className={"iconfont icon "+item.icon}></i>
                                <span>{item.txt}</span>
                                {i==2&&<Badge className="hot" text={2} style={{ marginLeft: 5 }}></Badge>}
                            </NavLink>
                        </div>
                    )
                })
            }
        </footer>
    )
}




