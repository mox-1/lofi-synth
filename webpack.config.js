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
    },
    resolve: {
        alias: {

            // temporary fix for missing require in `react-ga`
            // cf. https://github.com/react-ga/react-ga/issues/53
            'react/lib/Object.assign': 'object-assign',

        },
    },
};
