// const proxy = require('http-proxy-middleware')
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        createProxyMiddleware('/ajax', {
            // target:'http://192.168.1.170:8080',
            target:'http://47.106.170.237:8080',
            // target:'localhost:8080',
            changeOrigin:true,
            secure:false,
            pathRewrite: {'^/ajax' : ''},
        })
    )
}