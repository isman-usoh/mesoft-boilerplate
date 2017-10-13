import * as publicConfig from "common/config";

const packageJson = require("./../../package.json");
const appName = packageJson.name;
const appVersion = packageJson.version;

const secretConfig = {
    app: {
        name: appName,
        version: appVersion,
        port: process.env.POST || 3000,
    },

    session: {
        name: "_SESSION_ID",
        secret: "yWe9NclnjFfQyDXUpqWTkB1Q4tnMtzAH",
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: !__DEVELOPMENT__,
            maxAge: 365 * 24 * 60 * 60 * 1000, // 365 day
        },
    },

    mails: {
        from: {
            name: "Pinsouq.com",
            email: "pinsouq@gmail.com",
        },
        server: "smtp.gmail.com",
        username: "bemuyshop@gmail.com",
        password: "IVIweWF8QmVAdXR5",
        ssl: true,
        sslPort: 465,
        tls: true,
        tlsPort: 587,
    },

    database: {
        development: {
            "host": "127.0.0.1",
            "username": "root",
            "password": "123456789",
            "database": "meschool_development",
            "dialect": "mysql",
        },
        production: {
            "host": process.env.DB_USERNAME || "127.0.0.1",
            "username": process.env.DB_USERNAME || "root",
            "password": process.env.DB_PASSWORD || "123456789",
            "database": process.env.DB_NAME || "meschool_production",
            "dialect": "mysql",
        },
    },

    recaptcha: {
        secretKey: "6Lf9bhMUAAAAAAI1E9jhCbExigdwJ9k_k6uIZZ00",
    },
};

if (__DEVELOPMENT__) {
    secretConfig.recaptcha.secretKey = "6Lf9qhQUAAAAAD3ivw1c7qwA55N4PVbPBwKBbfwu";
}
const config = Object.assign({}, publicConfig, secretConfig);
export = config;
