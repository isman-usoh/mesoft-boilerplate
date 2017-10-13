var universalWebpack = require("universal-webpack");
var universalWebpacksettings = require("./../webpack/universal-webpack-settings");
var webpackConfig = require("./../webpack/webpack.config");

universalWebpack.server(webpackConfig, universalWebpacksettings);
