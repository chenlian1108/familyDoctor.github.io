





import axios from  "../utils/axios"

export const getkepu = (url)=>{
    return axios.get(url).then(res=>{
        console.log("---actions-----kePus-------");
        console.log(res.data.result);
        return {
            type:"getkepu",
            kePus:res.data.result
        }
    })
}

export const getBanner = ({url,params,cb})=>{
    return axios.get(url,{
        params
    }).then(res=>{
        cb();
        console.log(res.data.result);
        return {
            type:"getBanner",
            banner:res.data.result
        }
    })
}

export const heathnewlist = ({url,params,cb})=>{
    return axios.get(url,{
        params
    }).then(res=>{
        cb();
        console.log(res.data.result);
        return {
            type:"heathnewlist",
            heathnewlist:res.data.result
        }
    })
}

/*
export const postCode = (url,{body})=>{
    return axios.post(url,{body}).then(res=>{
        console.log("---actions-----kePus-------");
        console.log(res.data.result);
        return {
            type:"postCode",
            myUser:res.data.result
        }
    })
}
*/

/*
axios.post("/react/sendCode",{
    mobile:this.refs.mobile.state.value
}).then(res=>{
    console.log(res);
})
*/

/*
// post 记录
export const addComment = ({url,params,cb})=>{
    return axios.post("http://localhost:3015/react/", { title, content })
    .then(res => {
        this.refs.title.state.value = "";
        this.refs.content.state.value = "";
        // 静态的传递给父组件的是一条标题和评论， 链接数据库后需要将所有结果给父组件从新渲染
        this.props.addComment(res.data.result);
    })
}

*/












/*
export const changeCity  = (city)=>{
    return {
        type:"changeCity",
        city
    }
}
*/
