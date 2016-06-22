var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/app'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        postLoaders: [
          { loader: "transform?brfs" }
        ],
        loaders: [
            {
                test: /src\/.+.js$/,
                exclude: /node_modules/,
                loader: 'babel'
            }
        ]
    }
};
