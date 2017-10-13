module.exports = {
    server: {
        input: "./server/index.ts",
        output: "./../build/server/index.js"
    },
    excludeFromExternals: ["slick-carousel"]
};