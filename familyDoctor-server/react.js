


// react 项目接口的 路由模块 
var express = require("express");
var router = express.Router();
var { conn } = require("./utils/db");
var { setError, aesEncrypt, aesDecrypt, keys } = require("./utils/index");
var { ObjectID } = require("mongodb");
var { waterfall, series } = require("async");
var util = require('./config/index.js');
// ---------
/*
const multer = require('multer');
const avatarUpload = multer({ dest: 'public/avatar/' });
var multiparty = require("multiparty");  
var fs =require('fs');
*/
router.get("/", (req, res) => {
    res.send(" react项目的接口 地址 ");
})

/*
router.get("/index", (req, res) => {
    res.json({
        msg:'获取数据成功'+req.query.id,
        code:200,
        type:1
    })
})
*/

/*
// ---------头像上传 
router.post("/upload-avatar",avatarUpload.single('avatar'),(req,res)=>{
    console.log("xxxxxx")
    res.json({msg:"图片上传成功",code:200});
})
*/





// ----------健康记录-----------

// 获取所有记录
router.get("/getjilu", (req, res) => {
    conn((err, db) => {
        setError(err, res, db);
        console.log("-----------获取所有记录-------------");
        db.collection("doctortodolist").find({}, {}).toArray((err, result) => {
            setError(err, res, db);
            res.json({
                code: 200,
                msg: "所有记录加载完成",
                result
            })
            db.close();
        })
    })
})

// 添加记录  需要些并行有关联
// series([(callback) => { }, (callback) => { }], (err, result) => { })
router.post("/addjilu", (req, res) => {
    var body = req.body;  //表单里的提交内容是body
    conn((err, db) => {
        setError(err, res, db);
        // 插入评论后，再查询评论，将所有查询结果返回
        series([
            (callback) => {  // [0] err
                db.collection("doctortodolist").insert(body, (err, result) => {
                    callback(err, result);
                })
            },
            (callback) => {  // [1] result
                db.collection("doctortodolist").find({}, {}).sort({ shijian: -1 }).toArray((err, result) => {
                    callback(err, result);
                })
            }
        ],
            (err, result) => {
                console.log("-----addjilu------result-----");
                console.log(result);
                res.json({
                    code: 200,
                    msg: "添加评论成功",
                    result: result[1]
                })
                db.close();
            })
    })
})

// 删除记录
router.get("/delJilu", (req, res) => {
    var _id = req.query._id || "";
    conn((err, db) => {
        setError(err, res, db);
        series([
            (callback) => {  // [0] err
                db.collection("doctortodolist").remove({ _id: ObjectID(_id) }, (err, result) =>{
                    callback(err, result);
                })
            },
            (callback) => {  // [1] result
                db.collection("doctortodolist").find({}, {}).sort({ _id: 1 }).toArray((err, result) => {
                    callback(err, result);
                })
            }
        ],
            (err, result) => {
                res.json({
                    code: 200,
                    msg: "删除记录成功",
                    result: result[1]
                })
                db.close();
            })
    })
})


// ----------科普-----------

// 获取所有科普资讯 
router.get("/getkepu", (req, res) => {
    conn((err, db) => {
        setError(err, res, db);
        db.collection("newlist").find({}, {}).toArray((err, result) => {
            setError(err, res, db);
            console.log("-----getkepu----result-----")
            console.log(result);
            res.json({
                code: 200,
                msg: "科普资讯已成功获取",
                result
            })
            db.close();
        })
    })
})


// ---------


// const multer = require('multer');
// const avatarUpload = multer({ dest: 'public/avatar/' });

// var multiparty = require("multiparty");  
// var fs =require('fs');


// ----------快速登陆----------


// 生成短信验验证码
function getCode() {
    return 100000 + Math.floor(Math.random() * 900000);
}

// 获取短信验证码  
router.post('/sendCode', function(req, res, next) {
    console.log(req.body);
    const mobile = req.body.mobile; //需要发送的号码
    var param = getCode()  //变量内容  需要发送手机的验证码
    console.log(param);

    if (mobile == '') {
        res.json({
            msg:"手机号不能为空",
            code:200
        })
    }else{
        // 云之讯发送验证码到手机 
        util.getResult(param, mobile).then(function(response) {
            console.log(response.data);
            console.log(response.data.code);
            if (response.data.code == '000000') {  // 发送成功 
                conn((err,db)=>{
                    setError(err,res,db);
                    var codes = db.collection("codes");
                    // 数据库 判断验证码是否存在 
                    // 验证码不存在 直接插入
                    // 发送的验证码相同  改变插入时间 
                    waterfall([
                        (callback)=>{
                            codes.findOne({mobile,code:param},(err,result)=>{
                                callback(err,result);
                            })
                        },
                        (args,callback)=>{
                            if(args){
                                // 修改数据 时间
                                var time =  new Date().getTime();
                                codes.update({
                                    mobile,
                                    code:param
                                },{
                                    $set:{
                                        time
                                    }
                                },(err,result)=>{
                                    callback(err,result);
                                })
                            }else{
                                // 直接插入 
                                codes.insert({
                                    mobile,
                                    code:param,
                                    time: new Date().getTime()
                                },(err,result)=>{
                                    callback(err,result);
                                })
                            }
                        }
                    ],(err,result)=>{
                        setError(err,res,db);
                        res.json({
                            msg:"验证码发送成功",
                            result:param,
                            code:200
                        })
                    })
                })
            } else {
               res.json({
                   msg:"发送验证码失败",
                   code:200
               })
            }
    
        }, function(err) {
            res.json({
                msg:"云之讯数据库错误",
                code:200
            })
        })
    }
});

// 接收验证码  判断验证码 正确
router.post("/testCode",(req,res)=>{
    var mobile = req.body.mobile;
    var code = req.body.code * 1;

    conn((err,db)=>{
        setError(err,res,db);
        var codes = db.collection("codes");

        codes.findOne({mobile,code},(err,result)=>{
            setError(err,res,db);
            if(result){
                var time = new Date().getTime();
                var alias = mobile + "chenlian" + code ;
                var token = aesEncrypt(alias,keys);
                req.session.token = token;
                if(time-result.time<60*1000){
                    res.json({
                        code:200,
                        msg:"验证码通过",
                        type:1,
                        mobile,
                        token
                    })
                }else{
                    res.json({
                        code:200,
                        msg:"验证码失效",
                        type:0,
                    })
                }
            }else{
                res.json({
                    msg:"验证码不匹配",
                    code:200,
                    type:0
                })
            }
        })

    })

})

// 登陆 
router.post("/logintypetwo",(req,res)=>{
    var body = req.body;
    console.log(req.body); //{ username: 'chenlian', password: '123456' }
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("doctoruserinfo").findOne(body, (err, result) => {
            setError(err,res,db);
            console.log(result);           
            if(result){
                const token = aesEncrypt(body.username,keys);    
                // 64da83e4b2a962cb681f24da93d77ef7
                req.session.token = token;
                console.log(req.session.token +"-------------req.session.token------");
                console.log("-----------login ------ result-----------")
                console.log(result);
               
                res.json({
                    code:200,
                    msg:"登陆成功",
                    type:1,
                    result,
                    token
                })                
            }else{
                res.json({
                    code: 400,
                    msg: '登陆失败 - login',
                    type: 0
                })
            }
            db.close();
        })
    })
})

// 注册
router.post("/register",(req,res)=>{
    var body = req.body;
    console.log(req.body);
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("doctoruserinfo").findOne({ username:body.username}, (err, result) => {
            setError(err,res,db);
            console.log("result-----------register-------------register-result");
            console.log(result);
            if(!result){
                db.collection("doctoruserinfo").insert(body, (err, result) =>  {
                    setError(err,res,db);
                    console.log(result);
                    if(result){
                        res.json({
                            code:200,
                            msg:"注册成功",
                            type:1,
                            result
                        })                
                    }
                })                         
            }else{
                res.json({
                    code:400,
                    msg:"该用户名已存在",
                    type:0
                })  
            }
            db.close();
        })
    })
})




const multer = require('multer');
var storage = multer.diskStorage({
    //将上传的文件存储在指定的位置（不存在的话需要手动创建）
    destination: function (req, file, cb) {
        cb(null, './public/avatar')
    },
    //将上传的文件做名称的更改
    filename: function (req, file, cb) {
        var fileformat = (file.originalname).split('.');
        console.log(file);
        cb(null, Date.now()+file.originalname);
    }
})
//创建multer对象
var upload = multer({ storage: storage })
const avatarUpload = upload.any();

// 头像上传 
router.post("/upload-avatar",avatarUpload,(req,res)=>{
    console.log(req.files);
    
    var newName = req.files[0].path;
    console.log(newName);

    var username =req.body.username
    console.log(username);
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("users").update({
            username
        },{
            $set:{
                avatar:newName
            }
        },(err,result)=>{
            res.json({msg:"图片上传成功",code:200,imgUrl:newName});
            db.close();
        })
    })
})

router.post("/mobileuserinfo",(req,res)=>{
    var mobile = req.body.mobile;
    console.log(req.body); //
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("doctoruserinfo").findOne({username:mobile}, (err, result) => {            
            setError(err, res, db);
            console.log("-------doctoruserinfo---- result ---")
            console.log(result);
            
                db.collection("doctoruserinfo").insert({username:mobile}, (err, result) => {
                    setError(err, res, db);
                    console.log("-----getkepu----result-----")
                    console.log(result);
                    res.json({
                        code: 200,
                        msg: "用户信息查询成功",
                        result
                    })
                })
            
            db.close();
        })
    })
})
// 更新用户个性签名

router.post("/updateusersigna",(req,res)=>{
    var usersigna = req.body.usersigna;
    var username = req.body.username;
    console.log(req.body); //
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("doctoruserinfo").findOne({username:username},(err, result) => {
            setError(err,res,db);
            console.log(result); 
            if(result){
                db.collection("doctoruserinfo").insert({usersigna:usersigna}, (err, result) => {
                }),(err,result)=>{
                    setError(err,res,db);
                    res.json({
                        code: 200,
                        msg: "用户信息添加成功",
                        result
                    })
                    db.close();
                }
            }else{
                db.collection("doctoruserinfo").update({
                    username
                },{
                    $set:{
                        usersigna:usersigna
                    }
                },(err,result)=>{
                    setError(err,res,db);
                    res.json({
                        code: 200,
                        msg: "用户信息更新完毕",
                        result
                    })
                    db.close();
                })
            }
        } )
    })
})
/**/


// 查询电影   自己做接口，接口只返回json格式
router.get("/doctorbanner1", (req, res) => {
    var limit = req.query.limit * 1 || 0;
    conn((err, db) => {
        setError(err, res, db);    //如果错误抛出错误          // 1 表示显示                        // 转数组 回调格式
        db.collection("doctorbanner1").find({}, { title: 1, channel: 1, img: 1, }).sort({ _id: -1 }).limit(limit).toArray((err, result) => {
            setError(err, res, db);
            res.json({
                code: 200,
                msg: "获取banner数据成功",
                result      // return 格式                
            })
            db.close();   //关闭数据库
        })
    })
})


// 搜索   
// 查所有 
router.get("/heathnewlist",(req,res)=>{
    // var query = req.query;
    // var limit  = query.limit * 1 || 0;
    var keyword = req.query.keyword;
    var obj = {};
    if(keyword){
        obj = {
            $or:[
                {'title':new RegExp(keyword)},
                {'detail':new RegExp(keyword)},
                {'channel':new RegExp(keyword)}
            ]
        }
    }
    conn((err,db)=>{
        setError(err,res,db);                            // .limit(limit)
        db.collection("newlist").find(obj,{}).sort({_id:-1}).toArray((err,result)=>{
            setError(err,res,db);
            if(!result==null){
                console.log(result);
                res.json({
                    code:200,
                    msg:"查询成功",
                    result
                })
            }else{
                res.json({
                    code:400,
                    msg:"暂无查询结果",
                    result
                })
            }
            db.close();
        })
    })
})


//接口写了是要把结果给前端的，
module.exports = router;

