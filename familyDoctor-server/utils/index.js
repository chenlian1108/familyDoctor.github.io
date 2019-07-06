// 项目中需要封装的方法 功能函数 

//加密 模块 crypto  Node 
var crypto = require("crypto"); // node 模块 

// 加密函数
function aesEncrypt(data, keys) {
    const cipher = crypto.createCipher('aes192', keys);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

// 解密 
function aesDecrypt(encrypted, keys) {
    const decipher = crypto.createDecipher('aes192', keys);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// 密钥
const keys = "doctor201906";
// daydayup   daydayup+wuhan1807
exports.aesEncrypt = aesEncrypt;   // 加密
exports.aesDecrypt = aesDecrypt;   // 解密
exports.keys = keys;        // 密钥 


/*
***  数据库错误  500 
**   返回结果给前端
*/
// 错误提示  setError函数名 也需要定义，否则后面使用也会报错
// exports.setError = function setError (err, res, db) {
function setError (err, res, db) {
    if (err) {
        res.json({
            statusCode: 500,
            msg: "数据库错误",
            err
        })
        db.close();
        throw err;
    }
}
exports.setError = setError;

// 登陆控制  
exports.checkIsLogin = function (req, res, next) {
    console.log("检测------token");
    console.log(req.path);
    if (req.path !== "/vue/login" && req.path!=="/react/sendCode" && req.path!=="/react/testCode"){
    // if (req.path !== "/vue/login"){
        var token = req.session.token;
        if (token) {
            // callback();  // 书写业务逻辑 
            if(req_token === res_token){
                next();
            }else{
                res.json({
                    code:400,
                    msg:"token不匹配",
                    type:0
                })
            }
        } else {
            res.send(`<script>alert('session已经过期,请重新登录');location.href='/login'</script>`)
        }
    }else{
        next();
    }
}

//获取解密的用户名 
exports.username = function (req) {
    return aesDecrypt(req.session.token, keys)
}

// 时间戳
exports.dateFormat = function (time) {
    var date = new Date(time);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
}

// 中间件有三个参数，   req,res,next
// 导入数据库连接函数
var { conn } = require("./db");
// 中间件 ，也可以理解为一个函数，一个封装的函数，方便后面使用
// 登陆登陆中间件 (前端页面无论post，get都能进来) 
exports.login = function (req, res, next) {
    next();
}

exports.rigister = function (req, res, next){
    next();
}

exports.getGoodTypes = function (req, res, next){
    next();
}

exports.addcart = function (req, res, next){
    next();
}







