global.Promise = require("bluebird");

import "isomorphic-fetch";
import "reflect-metadata";

import * as areIntlLocalesSupported from "intl-locales-supported";
import { Sequelize } from "sequelize-typescript";

import * as config from "./config";
import * as server from "./server";

import { Topic } from "server/models/Topic";
import { UserModel } from "server/models/UserModel";
import { UserSessionModel } from "server/models/UserSessionModel";

if (global.Intl) {
    if (!areIntlLocalesSupported(config.langs)) {
        const IntlPolyfill = require("intl");
        Intl.NumberFormat = IntlPolyfill.NumberFormat;
        Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
    }
} else {
    global.Intl = require("intl");
}

const sequelize = new Sequelize(
    __DEVELOPMENT__
    ? config.database.development
    : config.database.production);

sequelize.addModels([
    UserModel,
    UserSessionModel,
    Topic,
]);

if (__DEVELOPMENT__) {
    sequelize.sync({force: false});
}

process.on("uncaughtException", function(err) {
    // tslint:disable-next-line:no-console
    console.error("uncaught exception:", err);
});

export default function(parameters: any) {
    const chunks = parameters.chunks();

    // tslint:disable-next-line:no-console
    console.log(chunks);

    server.run(chunks.javascript, chunks.styles);
}
