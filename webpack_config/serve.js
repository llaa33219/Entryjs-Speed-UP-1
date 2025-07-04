'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isWebGLEnabled = process.argv.some(
    (arg) => arg.startsWith('--webgl') && arg.split('=')[1] === 'true'
);
const templateName = (() => {
    if (process.env.NODE_ENV === 'serve') {
        return isWebGLEnabled ? 'example_webgl.ejs' : 'example.ejs';
    } else {
        return 'example_mini.ejs';
    }
})();
const template = path.resolve('example', templateName);
const devServerPort = 8080;

module.exports = {
    mode: 'development',
    module: {
        rules: [],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template,
            title: 'Entry Example',
            filename: path.resolve('dist', 'index.html'),
            inject: false,
            hash: true,
        }),
        // OnlyRun 모드를 위한 별도 HTML 플러그인
        new HtmlWebpackPlugin({
            template: path.resolve('example', 'onlyrun.ejs'),
            title: 'Entry.js OnlyRun Mode',
            filename: path.resolve('dist', 'onlyrun.html'),
            inject: false,
            hash: true,
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, '../'),
        },
        port: devServerPort,
        historyApiFallback: {
            rewrites: [
                // /onlyrun/프로젝트ID 경로를 onlyrun.html로 리다이렉트
                { from: /^\/onlyrun\/[a-zA-Z0-9]+$/, to: '/onlyrun.html' },
                // 기본 히스토리 폴백
                { from: /./, to: '/index.html' }
            ]
        },
        devMiddleware: {
            publicPath: '/',
        },
        proxy: {
            '/lib/entry-js': {
                target: `http://localhost:${devServerPort}`,
                pathRewrite: { '^/lib/entry-js': '' },
            },
            '/dist': {
                target: `http://localhost:${devServerPort}`,
                pathRewrite: { '^/dist': '' },
            },
        },
    },
    devtool: 'source-map',
};
