

// vue 项目接口的 路由模块 
var express = require("express");
var router = express.Router();
var {conn}  =  require("./utils/db");
var { setError, aesEncrypt,aesDecrypt, keys } = require("./utils/index");
var {waterfall} = require("async");

router.get("/",(req,res)=>{
    res.send("这是 vue项目的接口 地址 ");
})

// 查询电影   自己做接口，接口只返回json格式
router.get("/movie", (req, res) => {
    var limit = req.query.limit * 1 || 0;
    conn((err, db) => {
        setError(err, res, db);    //如果错误抛出错误          // 1 表示显示                        // 转数组 回调格式
        db.collection("movie").find({}, { title: 1, year: 1, id: 1, genres: 1, images: 1 }).sort({ _id: -1 }).limit(limit).toArray((err, result) => {
            setError(err, res, db);
            res.json({
                code: 200,
                msg: "获取movie数据成功",
                result      // return 格式                
            })
            db.close();   //关闭数据库
        })
    })
})

// 登陆 
router.post("/login",(req,res)=>{
    var body = req.body;
    console.log(req.body); //{ username: 'chenlian', password: '123456' }
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("userinfo").findOne(body, (err, result) => {
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
             /**/
            db.close();
        })
    })
})

// 注册
router.post("/rigister",(req,res)=>{
    var body = req.body;
    console.log(req.body);
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("userinfo").findOne({ username:body.username}, (err, result) => {
            setError(err,res,db);
            console.log("result-----------register-------------register-result");
            console.log(result);
            if(!result){
                // db.collection("users").insert(body, (err, result) =>  {
                db.collection("userinfo").insert(body, (err, result) =>  {
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

//分类  distinct去重
router.get("/getGoodTypes",(req,res)=>{
    conn((err,db)=>{
        setError(err,res,db);  
        
        db.collection("kaogoodinfo").distinct("case",(err,result)=>{
            console.log("--------" + result + "------------" );
            // --------health,skin,fruits,accessory,kitchen,appliances,costume------------
            res.json({
                code:200,
                msg:"分类成功",
                result
            })
        })
        // 出问题时，先用find测试一下
        // db.collection("kaogoodinfo").find({case:"health"},(err,result)=>{
        //     console.log("--------" + result + "------------" );
        //     res.json({
        //         code:200,
        //         msg:"分类成功",
        //         result
        //     })
        // })        
        db.close();
    })
})

//全部商品列表 getAllGoods  // 分类的对应商品
router.get("/getAllGoods",(req,res)=>{
    var query = req.query;
    var obj = {};
    var keyword = query.keyword;
    if(keyword){
        obj = {
            $or:[
                {title:new RegExp(keyword)},
                {'case':new RegExp(keyword)}
            ]
        }
    }

    conn((err,db)=>{
        setError(err,res,db);
        db.collection("kaogoodinfo").find(obj,{}).sort({ _id: -1 }).toArray((err,result)=>{
            setError(err,res,db);
            console.log("------kaogoodinfo -------- 全部商品 --------  result------");
            console.log(result);
            // res.json({
            //     code: 200,
            //     msg: "查询成功",
            //     result
            // })
            if(result){
                res.json({
                    code: 200,
                    msg: "查询成功",
                    result
                })
            }else{
                res.json({
                    code: 400,
                    msg: "购物车空空没有商品",
                    // result
                })
            }
            db.close();
        })
    })
})

//商品详情
var {ObjectId} = require("mongodb");
router.get("/getGoodOne",(req,res)=>{
    var goodId = req.query.goodId;
    var obj = {};
    if(goodId){
        obj._id = ObjectId(goodId);
    }

    conn((err,db)=>{
        setError(err,res,db);
        db.collection("kaogoodinfo").findOne(obj,(err,result)=>{
            console.log("---------- getGoodOne -----------");
            console.log(result);
            setError(err,res,db);
            res.json({
                code: 200,
                msg: "查询商品详情数据 成功",
                result
            })
            db.close();
        })
    })
})

// 加入购物车
router.post("/addcart",(req,res)=>{
    
    var body = req.body;
    var token = req.session.token;
    var username = aesDecrypt(token, keys);  
    console.log( username + "----------加入购物车---------username----");

    body.good = JSON.parse(body.good);
    body.count = body.count * 1;
    
    conn((err,db)=>{
        setError(err,res,db);
        var cars = db.collection("kaocart");
        waterfall([
            (callback)=>{
                cars.findOne({username,goodId:body.goodId},(err,result)=>{
                    console.log(result)
                    callback(err,result);
                })
            },
            (args,callback)=>{
                if(args){
                    console.log("body.goodId"+ body.goodId);
                    // 存在
                    cars.update({
                        username,goodId:body.goodId
                    },{
                        $inc:{
                            count:body.count
                        }
                    },(err,result)=>{
                        callback(err,{msg:"购物车商品数量更新成功",code:200,result,type:0})
                    })
                }else{
                    // 不存在  直接插入 
                    body.username = username;
                    body.time = new Date();
                    cars.insert(body,(err,result)=>{
                        callback(err,{msg:"加入购物车成功",code:200,result,type:1})
                    })
                }
            }
        ],(err,result)=>{
            setError(err,res,db);
            // res.json(result);   
            if(result){
                res.json({
                    code:200,
                    msg:"加入成功",
                    result
                })
            }
            else{
                res.json({
                    code:400,
                    msg:"加入失败", 
                })
            }      
            db.close();
        })
    })
})

// 购物车展示
router.get("/cartgoods",(req,res)=>{
    var token = req.session.token;
    var username = aesDecrypt(token, keys);  
    console.log("+++++++ " + username +"------- req.query -----");
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("kaocart").find({username:username},{}).toArray((err,result)=>{
            setError(err,res,db);
            if(result){
                console.log( "用户购物车商品 " + result +"------- result -----");
                console.log(result);
                res.json({
                    code:200,
                    msg:"用户购物车商品",
                    result,                
                })
            }else{
                res.json({
                    code:400,
                    msg:"购物车里没有商品",
                    result,                
                })
            }
            db.close();
        })
    })
})

// 购物车数量更新
router.post("/updatecart",(req,res)=>{
    var goodId= req.body.agoodId;
    var count = req.body.acount;
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("kaocart").update({goodId:goodId},{
            $inc:{count:count}
        }, (err, result) => {
            setError(err,res,db);
            console.log(result);
            if(result){
                res.json({
                    code:200,
                    msg:"商品数量更新成功",
                    type:1,
                    result
                })                
            }
        })
        db.close();
    })
})

// 删除商品
router.post("/deletecart",(req,res)=>{
    var goodId= req.body.agoodId;
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("kaocart").remove({goodId:goodId},(err, result) => {
            setError(err,res,db);
            console.log(result);
            if(result){
                res.json({
                    code:200,
                    msg:"商品删除成功",
                    type:1,
                    result
                })                
            }
        })
        db.close();
    })
})




// 下拉刷新接口  
// 根据type获取分类数据 kaogoodinfo
router.get("/getGoodByType",(req,res)=>{
    var casek = req.query.case;
    conn((err,db)=>{
        setError(err,res,db);
        db.collection("kaogoodinfo").find({'case':casek},{}).toArray((err,result)=>{
            setError(err,res,db);
            res.json({
                code:200,
                msg:"刷新成功",
                type:1,
                result
            })
            db.close();
        })
    })   
})




//新写法
router.get("/mongoose",(req,res)=>{
    getConn((err,mongoose)=>{
        if(err) throw err;
        var schema = new mongoose.Schema({ age:Number, name: String});
        var Like = mongoose.model("Like",schema);
        var emper = new Like({
            age:18,
            name:"zuzouomu-1"
        })
        emper.save((err,result)=>{
            if(err) throw err;
            console.log(result);
            res.send("mongoose -- 测试")
        })

    })
})

/**/


/* 
// 看不懂

const bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
//每次切换都去调用此接口 用来判断token是否失效 或者过期
router.post('/checkUser',(req,res)=>{
    let token = req.get("Authorization"); // 从Authorization中获取token
    console.log(token);
    let secretOrPrivateKey="jwt"; // 这是加密的key（密钥）
    jwt.verify(token, secretOrPrivateKey, (err, decode)=> {
        if (err) {  //  时间失效的时候 || 伪造的token
            console.log(decode);
            res.send({'status':10010});
        } else {
            res.send({'status':10000});
        }
    })
});

*/


//接口写了是要把结果给前端的，
module.exports = router;
