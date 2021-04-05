const {createProxyMiddleWare} = require('http-proxy-middleware');

module.exports = function(index) {
    index.use(createProxyMiddleWare('/api', {
        target: 'http://127.1.0.0:8000',
        pathRewrite: {
            '^/api':''
        },
        changeOrigin:true,
        secure: false
    }))
}