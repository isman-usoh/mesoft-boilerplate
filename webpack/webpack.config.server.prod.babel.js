import webpack from "webpack";
import baseConfiguration from "./webpack.config.server";

const configuration = Object.assign({}, baseConfiguration);

configuration.plugins = configuration.plugins.concat(
    new webpack.DefinePlugin({
        __CLIENT__: false,
        __SERVER__: true,
        __DEVELOPMENT__: false,
        __DEVTOOLS__: false
    })
);
configuration.module.rules.push({
    test: /\.tsx?$/,
    use: [{
        loader: 'ts-loader',
    }]
});

export default configuration;