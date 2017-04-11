module.exports = {
    entry: "./src/AzSearchStore.ts",
    output: {
        filename: "AzSearchStore.bundle.js",
        path: __dirname + "/dist",
        library: 'AzSearchStore',
        libraryTarget: "umd"
    },
    externals: {
        redux: "Redux"
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" }
        ],
    },
};