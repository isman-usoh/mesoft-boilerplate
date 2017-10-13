import "core-js";
import path from "path";
import webpack from "webpack";

import baseConfiguration from "./webpack.config.client";

const configuration = baseConfiguration({
    development: true,
    css_bundle: true
});

configuration.output.publicPath = "//127.0.0.1:3001/assets/build/";
configuration.devtool = "eval";
configuration.plugins.push(
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery",
        Tether: "tether",
        "window.Tether": "tether",
    }),
    new webpack.DefinePlugin({
        __CLIENT__: true,
        __SERVER__: false,
        __DEVELOPMENT__: true,
        __DEVTOOLS__: true
    }),
    new webpack.DllReferencePlugin({
        context: path.join(__dirname, "../"),
        manifest: require(path.join(configuration.output.path, "vendor-manifest.json")),
    }),
    new webpack.HotModuleReplacementPlugin()
);

// enable webpack development server
configuration.entry.main = [
    "react-hot-loader/patch",
    "webpack-hot-middleware/client?path=http://localhost:3001/__webpack_hmr",
    ...configuration.entry.main
];

configuration.module.rules.push({
    test: /\.tsx?$/,
    use: [
        {
            loader: 'react-hot-loader/webpack'
        }, {
            loader: 'ts-loader',
            options: {
                compilerOptions: {
                    target: "es5"
                }
            }
        }
    ]
})

export default configuration;