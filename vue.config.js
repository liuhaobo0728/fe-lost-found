
module.exports = {
    lintOnSave: false,

    devServer: {
        proxy: {
            '/user': {
                target: "http://62.234.6.224:16001",
                // target: "http://192.168.1.114:16000",   //代理接口
                //代理接口
                changeOrigin: true,
                // pathRewrite: {
                //     '^/api': '/mock'    //代理的路径
                // }
            },
            "/findcore": {
                target: "http://62.234.6.224:16001",
                // target: "http://192.168.1.114:16000",   //代理接口
                //代理接口
                changeOrigin: true,
                // pathRewrite: {
                //     '^/api': '/mock'    //代理的路径
                // }
            },
            "/img": {
                target: "http://62.234.6.224:16001",
                // target: "http://192.168.1.114:16000",   //代理接口
                //代理接口
                changeOrigin: true,
                // pathRewrite: {
                //     '^/api': '/mock'    //代理的路径
                // }
            }
        }
    }
}