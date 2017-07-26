var webpack = require('webpack');

module.exports = {
    entry: {
        app: ["./built/index.js"],
    },

    output: {
        libraryTarget: "umd",
        library: "onix",
        filename: "./onix-chess.js",
    },

    plugins:[
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),

        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true,
                warnings: false,
            },
            comments: false,
            sourceMap: false
        }),
        
        new webpack.optimize.OccurrenceOrderPlugin()
    ],

    resolve: {
        extensions: [".webpack.js", ".web.js", ".js"]
    },

    module: {
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
    },
};