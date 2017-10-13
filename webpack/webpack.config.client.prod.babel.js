import path from "path";
import webpack from "webpack";
import WebpackCleanPlugin from "clean-webpack-plugin";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import baseConfiguration from "./webpack.config.client";

const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

const configuration = baseConfiguration({
    development: false
});

configuration.devtool = "devtool";
configuration.plugins = configuration.plugins.concat(
    new ExtractTextPlugin({
        filename: "pinsouq.css",
        allChunks: true
    }),
    new OptimizeCssAssetsPlugin(),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery",
        Tether: "tether",
        "window.Tether": "tether",
    }),
    // clears the output folder
    new WebpackCleanPlugin(
        [
            path.relative(path.resolve(__dirname, ".."), configuration.output.path)
        ], {
            root: path.resolve(__dirname, ".."),
            verbose: true
        }
    ),
    // environment variables
    new webpack.DefinePlugin({
        __CLIENT__: true,
        __SERVER__: false,
        __DEVELOPMENT__: false,
        __DEVTOOLS__: false
    }),
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
            warnings: false
        },
        output: {
            comments: false
        }
    }),
    new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
    })
);
configuration.module.rules.push({
    test: /\.tsx?$/,
    use: [{
        loader: 'ts-loader',
        options: {
            compilerOptions: {
                target: "es5"
            }
        }
    }]
});

export default configuration;