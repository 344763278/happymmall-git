/*
* @Author: Rosen
* @Date:   2017-05-08 15:28:19
* @Last Modified by:   Rosen
* @Last Modified time: 2017-05-30 16:50:46
*/
var webpack             = require('webpack');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin   = require('html-webpack-plugin');

// 环境变量配置，dev / online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';

// 获取html-webpack-plugin参数的方法 
var getHtmlConfig = function(name, title){
    return {
        template    : './src/view/' + name + '.html',
        filename    : 'view/' + name + '.html',
        title       : title,
        inject      : true,
        hash        : true,
        chunks      : ['common', name]
    };
};
// webpack config
var config = {
    entry: {
        'common'            : ['./src/page/common/index.js'],
        'index'             : ['./src/page/index/index.js'],
        'user-login'        : ['./src/page/user-login/index.js'],
        'user-reg'          : ['./src/page/user-reg/index.js'],
        'user-look-for-pass': ['./src/page/user-look-for-pass/index.js'],
        'user-pass-updata'  : ['./src/page/user-pass-updata/index.js'],
        'user-info-edit'    : ['./src/page/user-info-edit/index.js'],
        'about-mmall'       : ['./src/page/about-mmall/index.js'],
        'my-mmall'          : ['./src/page/my-mmall/index.js'],
        'product-list'      : ['./src/page/product-list/index.js'],
        'product-detail'    : ['./src/page/product-detail/index.js'],
        'shop-car'          : ['./src/page/shop-car/index.js'],
        'order-confirm'     : ['./src/page/order-confirm/index.js'],
        'order-list'        : ['./src/page/order-list/index.js'],
        'order-detail'      : ['./src/page/order-detail/index.js'],
        'order-pay'         : ['./src/page/order-pay/index.js'],
        'result'            : ['./src/page/result/index.js']
    },
    output: {
        path: './dist',
        publicPath : '/dist',
        filename: 'js/[name].js'
    },
    externals : {
        'jquery' : 'window.jQuery'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
            { test: /\.string$/, loader: 'html-loader'}
        ]
    },
    resolve : {
        alias : {
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image'
        }
    },
    plugins: [
        // 独立通用模块到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/base.js'
        }),
        // 把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        // html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')), 
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户注册')), 
        new HtmlWebpackPlugin(getHtmlConfig('user-reg', '用户登录')), 
        new HtmlWebpackPlugin(getHtmlConfig('user-look-for-pass', '找回密码')), 
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-updata', '修改密码')), 
        new HtmlWebpackPlugin(getHtmlConfig('user-info-edit', '修改用户信息')), 
        new HtmlWebpackPlugin(getHtmlConfig('about-mmall', '关于mmall')), 
        new HtmlWebpackPlugin(getHtmlConfig('my-mmall', '关于mmall')), 
        new HtmlWebpackPlugin(getHtmlConfig('product-list', '产品列表')), 
        new HtmlWebpackPlugin(getHtmlConfig('product-detail', '商品详情')), 
        new HtmlWebpackPlugin(getHtmlConfig('shop-car', '购物车')), 
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm', '订单确认')), 
        new HtmlWebpackPlugin(getHtmlConfig('order-list', '订单列表')), 
        new HtmlWebpackPlugin(getHtmlConfig('order-detail', '订单详情')), 
        new HtmlWebpackPlugin(getHtmlConfig('order-pay', '订单支付')), 
        new HtmlWebpackPlugin(getHtmlConfig('result', '结果显示')) 
    ]
};

if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;