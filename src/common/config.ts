const publicConfig = {
    // Language Configuration
    langs: ["en", "th"],
    defaultLang: "th",

    app: {
        title: "MeSchool",
        description: "MeSchool",
        head: {
            defaultTitle: "MeSchool",
            titleTemplate: "%s - MeSchool",
            meta: [
                { charset: "utf-8" },
                { name: "viewport", content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" },
                { name: "ie=edge", httpEquiv: "x-ua-compatible" },
                { name: "description", content: "MeSchool" },
                { name: "theme-color", content: "#16437B" },
                { name: "msapplication-TileImage", content: "/favicons/icon-144x144.png" },
                { name: "msapplication-TileColor", content: "#16437B" },
                { name: "google-site-verification", content: "T8gtkF80zUGCwEB_bqC0_MWrcW0n25_ZMa0vIKyx4Ng" },
                { name: "apple-mobile-web-app-capable", content: "yes" },
                { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
                { name: "apple-touch-fullscreen", content: "yes" },

                { name: "twitter:card", content: "summary" },
                { name: "twitter:site", content: "@isman-usoh" },
                { name: "twitter:title", content: "MeSchool" },
                { name: "twitter:description", content: "MeSchool" },
                { name: "twitter:image:src", content: "./assets/banner/pinsouq_thumbnail.png" },
                { name: "twitter:creator", content: "@isman-usoh" },

                { property: "og:card", content: "summary" },
                { property: "og:site", content: "@isman-usoh" },
                { property: "og:title", content: "MeSchool" },
                { property: "og:description", content: "MeSchool" },
                { property: "og:image", content: "./assets/banner/pinsouq_thumbnail.png" },
                { property: "og:type", content: "website" },
                { property: "og:site_name", content: "MeSchool" },
                { property: "og:creator", content: "@isman-usoh" },

                { property: "fb:app_id", content: "997466673660170" },
            ],
            link: [
                { rel: "shortcut icon", href: "./favicons/favicon.ico", type: "image/x-icon" },
                { rel: "apple-touch-icon", href: "./favicons/icon-192x192.png", sizes: "192x192" },
                { rel: "alternate", hrefLang: "x-default", href: "https://beta.bemuy.com/" },
                { rel: "alternate", hrefLang: "en", href: "https://beta.bemuy.com/?lang=en" },
                { rel: "alternate", hrefLang: "th", href: "https://beta.bemuy.com/?lang=th" },
                { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" },
                { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" },
            ],
        },
    },
    recaptcha: {
        // https://www.google.com/recaptcha/admin#site/336817917
        siteKey: "6Lf9bhMUAAAAAIlEVQQwgCr5EbkVM84j4d-qUFhe",
    },
};

if (__DEVELOPMENT__) {
    // https://www.google.com/recaptcha/admin#site/336898813
    publicConfig.recaptcha.siteKey = "6Lf9qhQUAAAAABwKjHjcw3fgUDvqUGde7M_nLhhr";
}

export = publicConfig;
