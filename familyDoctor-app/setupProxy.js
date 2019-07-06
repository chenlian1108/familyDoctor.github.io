
const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    // app.use(proxy("/react", {
    //     target: "http://localhost:3015/" , //配置你要请求的服务器地址
    //     changeOrigin: true,
    // }))
    app.use(proxy("/react", {
        target: "http://47.102.144.31:3015/" , //配置你要请求的服务器地址
        changeOrigin: true,
    }))
    // app.use(proxy("/react", {
    //     target: "http://localhost:1901/" , //配置你要请求的服务器地址
    //     changeOrigin: true,
    // }))
};