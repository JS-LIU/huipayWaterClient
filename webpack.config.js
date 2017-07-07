const path = require('path');
const webpack = require('webpack');
module.exports = {
    devtool: 'eval-source-map',// 调试时定位到编译前的代码位置，推荐安装react插件
    entry: [
        './src/index.js',
        "babel-polyfill"
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'  // 打包输出的文件
    },
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /(node_modules|bower_components)/,

            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react'],
                plugins: ['transform-decorators-legacy','transform-class-properties' ],
            },

        },{
            test: /\.css$/,
            use: ['style-loader', {
                loader: 'css-loader',
                options: {
                    modules: true,//让css-loader支持Css Modules。
                },
            },]
        },{
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader']
        }]
    },
    resolve: {
        // 现在你import文件的时候可以直接使用import Func from './file'，不用再使用import Func from './file.js'
        extensions: ['.js', '.jsx', '.json', '.css']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin() // Enable HMR
    ],
    devServer: {
        port: 7777,
        host: 'localhost',
        proxy:{
            "**":{
                target: 'http://192.168.1.242:9216/water/',
                secure: false,
                bypass: function (req, res, proxyOptions) {
                    if (req.headers.accept.indexOf('html') !== -1) {
                        return '/index.html';
                    }
                    if (req.headers.accept.indexOf('css') !== -1) {
                        return '/src/Util/base.css';
                    }
                    if (req.headers.accept.indexOf('images') !== -1) {
                        return req.url;
                    }
                }
            }
        }
    }
};