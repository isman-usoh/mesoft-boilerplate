import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as session from "express-session";
import * as helmet from "helmet";
import * as methodOverride from "method-override";
import * as path from "path";
import * as favicon from "serve-favicon";

import * as config from "server/config";
import { apiErrorHandler } from "server/libs/api-error-handler";
import { RegisterRoutes } from "server/routers";

export function run(javascript: any, styles: any) {
    const buildPath = path.resolve(__dirname, "..", "..", "build", "client");
    const publicPath = path.resolve(__dirname, "..", "..", "public");

    const faviconDir = path.resolve(publicPath, "favicons");
    const faviconPath = path.resolve(faviconDir, "favicon.ico");

    const app = express();

    // middleware for Web and API
    app.use(require("compression")());
    if (!__DEVELOPMENT__) {
        app.set("trust proxy", 1);
    }
    app.use(favicon(faviconPath));
    app.use("/favicons", express.static(faviconDir));
    app.use("/assets/build", express.static(buildPath));
    app.use("/assets", express.static(publicPath));
    app.use(cors());
    app.use(helmet());

    // middlerware for Web only
    app.use((req, res, next) => {
        if (req.originalUrl.toLowerCase().startsWith("/api/")) {
            return next();
        } else {
            return session(config.session)(req, res, next);
        }
    });

    // middlerware for API only
    app.use("/api/*", bodyParser.urlencoded({ extended: true }));
    app.use("/api/*", bodyParser.json());
    app.use("/api/*", methodOverride());

    RegisterRoutes(app, javascript, styles);

    app.use("/api/*", apiErrorHandler());

    app.listen(config.app.port, (err) => {
        if (err) {
            // tslint:disable-next-line:no-console
            console.error("Error frontend server:", err);
            return;
        }
        // tslint:disable-next-line:no-console
        console.info(`Start frontend server 127.0.0.1:${config.app.port}`);
    });
}
