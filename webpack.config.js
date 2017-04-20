var webpack = require('webpack');

module.exports = {
    entry: {
        app: ["./built/index.js"],
    },

    output: {
        libraryTarget: "umd",
        library: "onix.chess",
        filename: "./onix-chess.js",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        extensions: [".webpack.js", ".web.js", ".js"]
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: "pre",
                loader: "source-map-loader"
            }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
    },
};