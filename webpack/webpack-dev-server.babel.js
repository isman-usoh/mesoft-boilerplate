import "core-js";
import path from "path";
import express from "express";
import favicon from "serve-favicon";
import webpack from "webpack";
import configuration from "./webpack.config.client.dev.babel";

// http://webpack.github.io/docs/webpack-dev-server.html
const options = {
    hot: true,
    inline: true,
    serverSideRender: true,
    publicPath: configuration.output.publicPath,
    headers: { "Access-Control-Allow-Origin": "*" },
    // stats: "minimal"
	stats: {
      children: false  
    }
};

const compiler = webpack(configuration);
const app = new express();

app.use(favicon(path.resolve(__dirname, "..", "public", "favicons", "favicon.ico")));
app.use("/assets", express.static(path.resolve(__dirname, "..", "public")));
app.use("/assets/build", express.static(path.resolve(__dirname, "..", "build", "client")));
app.use("/favicons", express.static(path.resolve(__dirname, "..", "public", "favicons")));


app.use(require("webpack-dev-middleware")(compiler, options));
app.use(require("webpack-hot-middleware")(compiler));
app.get("*", (req, res) => {
    const assetsByChunkName = res.locals.webpackStats.toJson().assetsByChunkName;

    let lang = req.query["lang"] ? req.query["lang"].toLowerCase().split("-")[0] : "th";
    res.header("Access-Control-Allow-Origin", "*");
    res.send(`
        <!doctype html>
        <html lang="${lang}">

        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />        

            <title>MeSchool</title>
            ${
                Object
                    .values(assetsByChunkName)
                    .filter(element => !Array.isArray(element) && element.endsWith(".css"))
                    .map(path => `<link rel="stylesheet" href="/build/${path}" >`)
            }
            <link rel="alternate" hreflang="x-default" href="/">
            <link rel="alternate" hreflang="en" href="/?lang=en">
            <link rel="alternate" hreflang="th" href="/?lang=th">
    
            <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:400,400i,500,500i,700,700i" />
            <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />

            <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
            <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
            <!--[if lt IE 9]>
              <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
              <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
            <![endif]-->

            <script type="text/javascript" charSet="UTF-8" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js"></script>
            <script type="text/javascript" charSet="UTF-8" src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/0.6.4/popper.js"></script>
            <script type="text/javascript" charSet="UTF-8" src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.js"></script>
        <body>
            <div id="app"></div>
            <script src="/assets/build/vendor.dll.js"></script>
            ${
            Object
                    .values(assetsByChunkName)
                    .map((element) => {
                        if (Array.isArray(element)) {
                            return element.map(path => {
                                if(path.endsWith(".css")) {
                                    return `<link rel="stylesheet" href="/assets/build/${path}"></link>`;
                                }else {
                                    return `<script src="/assets/build/${path}"></script>`;
                                }
                            }).join("");
                        } else if (element.endsWith(".js")) {
                            return `<script src="/assets/build/${element}"></script>`;
                        } else if (element.endsWith(".css")) {
                            return `<link rel="stylesheet" href="/assets/build/${element}"></link>`;
                        } else {
                                return "";
                        }
                    }).join("")
            }
        </body>
        </html>
    `);
});
app.listen(3001, (error) => {
    if (error) {
        console.error(error.stack || error);
        throw error;
    }

    console.log("[webpack-dev-server] 127.0.0.1:3001");
});