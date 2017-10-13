import * as express from "express";

import * as config from "server/config";

export function recaptcha(name: string = "g-recaptcha-response") {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const body = {
            secret: config.recaptcha.secretKey,
            response: req.body[name],
        };
        fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            body: JSON.stringify(body),
        }).then( (response) => {
            return response.json();
        }).then(() => {
            next();
        }).catch((err) => {
            next(err);
        });
    };
}
