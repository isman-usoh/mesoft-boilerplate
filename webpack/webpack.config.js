var path = require("path");
var webpack = require("webpack");

module.exports = {
    devServer: {
        contentBase: path.join(__dirname),
        compress: true,
        port: 9000
    },

    context: path.resolve(__dirname, "..", "src"),
    entry: {
        main: [
            "bootstrap-loader",
            "./browser/client",
        ]
    },
    output: {
        path: path.resolve(__dirname, "..", "build", "client"),
        publicPath: "/assets/build/",
        filename: "[name].[hash].js",
        chunkFilename: "[name].[hash].js"
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            enforce: 'pre',
            loader: 'tslint-loader',
        }, {
            test: /\.(scss)$/,
            use: [{
                    loader: 'style-loader',
                    options: { sourceMap: true }
                },
                {
                    loader: 'css-loader',
                    options: { sourceMap: true }
                },
                {
                    loader: 'postcss-loader',
                    options: { sourceMap: true }
                },
                {
                    loader: 'sass-loader',
                    options: { sourceMap: true }
                }
            ]
        }, {
            test: /\.css$/,
            use: [{
                    loader: "style-loader",
                    options: { sourceMap: true }
                },
                {
                    loader: "css-loader",
                    options: { sourceMap: true }
                }
            ]
        }, {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            use: [{
                loader: "file-loader",
                options: {
                    mimetype: "application/font-woff"
                }
            }]
        }, {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            use: [{
                loader: "file-loader",
                options: {
                    mimetype: "application/font-woff"
                }
            }]
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            use: [{
                loader: "file-loader",
                options: {
                    mimetype: "application/octet-stream"
                }
            }]
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            use: ["file-loader"]
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            use: [{
                loader: "file-loader",
                options: {
                    mimetype: "image/svg+xml"
                }
            }]
        }, {
            test: /\.(jpg|png|gif)$/,
            use: ["file-loader"]
        }]
    },
    resolve: {
        alias: {
            browser: path.resolve(__dirname, "..", "src", "browser"),
            common: path.resolve(__dirname, "..", "src", "common"),
            server: path.resolve(__dirname, "..", "src", "server"),
        },
        modules: ["node_modules"],
        extensions: ['.ts', '.tsx', '.js', '.scss', 'css']
    }
}