import * as express from "express";
import * as statuses from "statuses";
import { ErrorResponse } from "./errors";

export function apiErrorHandler() {
    return function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
        let status = err.statusCode || 500;
        if (status < 400) {
            status = 500;
        }
        res.setHeader("Content-Type", "application/json");
        res.statusCode = status;

        const body = {
            statusCode: status,
        } as ErrorResponse;
        if (__DEVELOPMENT__) {
            // tslint:disable-next-line:no-console
            console.error(err);
            (body as any).stack = err.stack;
        }

        // Mongoose validation error.
        if (err.name === "ValidationError") {
            const fields = Object.keys(err.errors).map((name) => {
                return {
                    name: err.errors[name].path,
                    message: err.errors[name].message,
                };
            });
            body.statusCode = 401;
            body.name = "ValidationError";
            body.message = statuses[status];
            body.fields = fields;
            res.status(body.statusCode).json(body);
            return next();
        }

        // Internal server errors
        if (status >= 500) {
            body.name = "ServerError";
            body.message = err.message || statuses[status];
            res.status(status).json(body);
            return next();
        }

        // Client errors
        body.message = err.message || statuses[status];
        if (err.name) body.name = err.name;
        if (err.fields) body.fields = err.fields;
        res.status(status).json(body);
    };
}
