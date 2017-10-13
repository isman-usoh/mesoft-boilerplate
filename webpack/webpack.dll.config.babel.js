import webpack from "webpack";
import path from "path";

import baseConfiguration from "./webpack.config.client";

const configuration = baseConfiguration({ development: true, css_bundle: true });

configuration.entry = {
    vendor: [
        "core-js",
        "lodash",
        "bluebird",
        "classnames",
        "intl",
        "intl-locales-supported",
        "isomorphic-fetch",
        "mobx",
        "mobx-react",
        "mobx-react-form",
        "mobx-react-form-devtools",
        "mobx-react-router",
        "mobx-react-devtools",
        "prop-types",
        "randomstring",
        "react",
        "react-dom",
        "react-helmet",
        "react-intl",
        "react-router",
        "reflect-metadata",
        "universal-cookie",
        "validator"
    ]
};

configuration.output = {
    path: configuration.output.path,
    filename: "[name].dll.js",
    library: "[name]",
    publicPath: configuration.output.publicPath
};

configuration.plugins = configuration.plugins.concat([
    new webpack.DllPlugin({
        name: "[name]",
        path: path.join(configuration.output.path, "[name]-manifest.json"),
    }),
    new webpack.DefinePlugin({
        "process.env":
        {
            // Useful to reduce the size of client-side libraries, e.g. react
            // NODE_ENV: JSON.stringify("production") // 'development' to see non-minified React errors
            NODE_ENV: JSON.stringify("development")
        },

        __CLIENT__: true,
        __SERVER__: false,
        __DEVELOPMENT__: false,
        __DEVTOOLS__: false
    })
]);

export default configuration;