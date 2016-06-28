var path = require('path');
var webpack = require('webpack');

var devFlagPlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

module.exports = {
    entry: path.resolve(__dirname, 'src/app'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        postLoaders: [
          { loader: 'transform?brfs'}
        ],
        loaders: [
            {
                test: /src\/.+.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            }
        ]
    },
    plugins: [
        devFlagPlugin
    ]
};
