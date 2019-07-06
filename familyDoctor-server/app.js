

var express = require("express");
var app = express();
// var hostname = "localhost";
// var hostname = "0.0.0.0";
var hostname = "47.102.144.31";
var port = 3015;
// var http = require("http");
// var server = http.createServer(app);
var server = require("http").Server(app);
// var io = require('socket.io').listen(server);  //标记1
var cookieParser = require('cookie-parser'); // 处理项目的cookies

app.use(express.json());   // req.body 来 获取 POST 请求 提交的 formData 数据 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());  // 处理 cookies 

app.use(express.static('public'));



// 处理跨域方法   CORS 处理方式   //解决跨域报错
app.all('*',function(req,res,next){
    // res.header("Access-Control-Allow-Headers","Access-Control-Allow-Headers")
    // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();

});


var sesstion = require("express-session");
// 设置session中间件，在路由中间件之前
app.use(sesstion({
    secret:"keyboard cat",
    name:"appTest",
    cookie:{maxAge:60*60*1000},
    resave:false,
    saveUninitialized:true
}));


var {login} = require("./utils/index");
app.use(login);

var {rigister} = require("./utils/index");
app.use(rigister);

var {addcart} = require("./utils/index");
app.use(addcart);


app.get("/",(req,res)=>{
    res.send("这是 我 所有项目的接口 服务器 地址 ")
});


var react = require("./react");
app.use("/react",react);

// 登陆验证先放在后面，方便测试
var {checkIsLogin} =  require("./utils/index");
// app.use(checkIsLogin);


var querystring = require("querystring");


server.listen(
    port,hostname,()=>{
        console.log(`my server is running at http://${hostname}:${port}`)
    }
)

// 标记2
// 1:监听客户端连接
// 2.监听客户端发来的消息
// 3.发送消息给客户端
// 4.监听客户端关闭

// emit发送
// on 监听











