const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    target: 'node',
    output: {
        path: path.resolve('dist'),
        filename: 'index.js'
    },
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    // Here you should change 'env' to '@babel/preset-env'
                    presets: ['@babel/preset-env'],
                },
            }
        }],
    },
    resolve: {
        extensions: ['.js'],
    },
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
};