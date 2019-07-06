

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
    console.log("xxxxxx")
    var newName = req.files[0].path;
    console.log(newName);
    res.json({msg:"图片上传成功",code:200,imgUrl:newName});
})


