import * as express from "express";

import * as server from "browser/server";
import { RegisterRoutes as RegisterAPIRoutes } from "./apis/routes";

export function RegisterRoutes(app: express.Application, javascript: any, styles: any) {

    RegisterAPIRoutes(app);

    app.get("/_ah/healthz", (req, res) => {
        res.status(200).end("Ok");
    });

    app.get("*", async (req, res) => {
        await server.render(req, res, javascript, styles);
    });
}
