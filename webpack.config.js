var webpackUglifyJsPlugin = require('webpack-uglify-js-plugin');
module.exports = {
    target: 'node',
    entry: './dist/index.js',
    output: {
        path: './build',
        filename: 'bundle.js'
    },
    plugins: [
        new webpackUglifyJsPlugin({
            cacheFolder: './dist',
            debug: true,
            minimize: true,
            sourceMap: false,
            output: {
                comments: false
            },
            compressor: {
                warnings: false
            }
        })
    ]
};