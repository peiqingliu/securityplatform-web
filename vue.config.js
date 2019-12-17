module.exports = {
    lintOnSave: true,
    productionSourceMap: false,
    chainWebpack: (config) => {
        //忽略的打包文件
        config.externals({
            'vue': 'Vue',
            'vue-router': 'VueRouter',
            'vuex': 'Vuex',
            'axios': 'axios',
            'element-ui': 'ELEMENT',
        });
        const entry = config.entry('app');
/*        entry
            .add('babel-polyfill')
            .end();
        entry
            .add('classlist-polyfill')
            .end()*/
    },
    devServer: {
        host: '127.0.0.1',
        port: 8087,
        proxy: {
            '/': {
                //本地服务接口地址
                target: 'http://localhost:8088',
                ws: true
            }
        }
    }
};
